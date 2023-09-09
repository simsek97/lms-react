import { GraphQLQuery } from '@aws-amplify/api';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { DataGrid } from '@mui/x-data-grid';
import { API } from 'aws-amplify';
import { useRouter } from 'next/router';
import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import toast from 'react-hot-toast';

import AdminLayout from '@/components/Admin/AdminLayout';
import { ICategory } from '@/data/category';
import { DeleteCategoryMutation } from '@/src/API';
import { deleteCategory } from '@/src/graphql/mutations';
import getCategories from '@/utils/getCategories';
import { toastErrorStyle, toastSuccessStyle } from '@/utils/toast';

const Categories = ({ user }) => {
  const router = useRouter();
  const [categories, setCategories] = React.useState<ICategory[]>([]);
  const [pageToken, setPageToken] = React.useState(null);
  const [page, setPage] = React.useState(0);
  const [isLoading, setLoading] = React.useState(true);

  const pageSize = 10;

  const columns = [
    {
      flex: 0.3,
      minWidth: 200,
      field: 'name',
      headerName: 'Category'
    },
    {
      flex: 0.4,
      minWidth: 150,
      field: 'slug',
      headerName: 'Slug'
    },
    {
      flex: 0.2,
      minWidth: 60,
      field: 'actions',
      headerName: 'Actions',
      renderCell: (params) => {
        return (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button size='small' color='primary' variant='text' onClick={() => router.push(`/admin/categories/${params.row.id}`)}>
              Update
            </Button>
            <Button size='small' color='secondary' variant='text' onClick={() => confirmDelete(params.row)}>
              Remove
            </Button>
          </Box>
        );
      }
    }
  ];

  const confirmDelete = (category: ICategory) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: `Are you sure to delete ${category.name}? This may effect on courses if any of course are under this category`,
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleDelete(category)
        },
        {
          label: 'No'
        }
      ]
    });
  };

  const handleDelete = async (category: ICategory) => {
    try {
      setLoading(true);

      await API.graphql<GraphQLQuery<DeleteCategoryMutation>>({
        query: deleteCategory,
        variables: {
          input: { id: category.id }
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
      });

      const updatedCategories = categories.filter((cat) => cat.id != category.id);
      setCategories(updatedCategories);
      toast.error('The record has been successfully deleted.', toastSuccessStyle);
    } catch (e) {
      console.log(e);
      toast.error(e.message, toastErrorStyle);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async (limit: number) => {
    setLoading(true);

    try {
      setLoading(true);
      const dbCategories = await getCategories(limit, null);

      setPageToken(dbCategories.nextToken);

      const updatedCategories = [...categories, ...dbCategories.items];
      setCategories(updatedCategories.sort((a, b) => Number(a.id) - Number(b.id)) as ICategory[]);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchCategories(pageSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <AdminLayout
      title='Categories'
      user={user}
      button={
        <Button startIcon={<AddIcon />} onClick={() => router.push('/admin/categories/add')}>
          Add Category
        </Button>
      }>
      <DataGrid autoHeight loading={categories.length === 0} rows={categories} columns={columns} hideFooter={true} />
      <Box sx={{ textAlign: 'center', p: 1, gap: 1 }}>
        {pageToken && (
          <Button
            startIcon={isLoading && <CircularProgress size={14} color='inherit' />}
            variant='contained'
            onClick={() => setPage(page + 1)}>
            Show More
          </Button>
        )}
      </Box>
    </AdminLayout>
  );
};

export default Categories;
