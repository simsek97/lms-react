import { GraphQLQuery } from '@aws-amplify/api';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import { DataGrid } from '@mui/x-data-grid';
import { API, graphqlOperation } from 'aws-amplify';
import { FormikProps, prepareDataForValidation, useFormik, validateYupSchema, yupToFormErrors } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

import AdminLayout from '@/components/Admin/AdminLayout';
import { CategoryForm } from '@/components/Category/CategoryForm';
import { ICategory } from '@/data/category';
import { DeleteCategoryMutation, ListCategoriesQuery, UpdateCategoryMutation } from '@/src/API';
import { deleteCategory, updateCategory } from '@/src/graphql/mutations';
import { listCategories } from '@/src/graphql/queries';
import SubmitButton from '@/utils/SubmitButton';
import { toastErrorStyle, toastSuccessStyle } from '@/utils/toast';

const initialValues: ICategory = {
  id: '',
  name: '',
  slug: ''
};

const Categories = ({ user }) => {
  const router = useRouter();
  const [categories, setCategories] = React.useState([]);
  const [pageToken, setPageToken] = React.useState(null);
  const [page, setPage] = React.useState(0);
  const [updateRecord, setUpdateRecord] = React.useState(null);
  const [isUpdating, setUpdating] = React.useState<boolean>(false);
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
      headerName: 'Remove',
      renderCell: (params) => {
        return (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              size='small'
              color='primary'
              variant='text'
              onClick={() => {
                setUpdateRecord(params.row);
                setValues({
                  id: params.row.id,
                  name: params.row.name,
                  slug: params.row.slug
                });
              }}>
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

  const confirmDelete = (category) => {
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

  const handleDelete = async (category) => {
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

  const handleUpdate = async (values: ICategory) => {
    setUpdating(true);

    try {
      const updatedCategory: Partial<ICategory> = {
        id: values.id,
        name: values.name,
        slug: values.slug
      };
      // Update the subscription tier on Dynamodb
      const { data } = await API.graphql<GraphQLQuery<UpdateCategoryMutation>>({
        query: updateCategory,
        variables: {
          input: updatedCategory
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
      });

      // Update the subscription on ui
      const updatedCategories = categories.map((s: ICategory) => {
        if (s.id === updatedCategory.id) {
          return { ...s, ...data.updateCategory };
        }

        return s;
      });

      setCategories([...updatedCategories]);
      toast.error('The record has been successfully updated.', toastSuccessStyle);
    } catch (e) {
      console.log(e);
      toast.error(e.message, toastErrorStyle);
    } finally {
      setUpdating(false);
      setUpdateRecord(null);
    }
  };

  // Form validation rules
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    slug: Yup.string().required('Slug is required')
  });

  const validateForm = (values: ICategory) => {
    const formValues = prepareDataForValidation(values);
    const validate = validateYupSchema(formValues, validationSchema);

    return validate.then(
      (_response) => {
        return {};
      },
      (error) => {
        return yupToFormErrors(error);
      }
    );
  };

  const { handleSubmit, handleChange, setValues, values, errors, touched }: FormikProps<ICategory> = useFormik<ICategory>({
    validate: (values: ICategory) => validateForm(values),
    onSubmit: (values: ICategory) => handleUpdate(values),
    initialValues: initialValues
  });

  const fetchCategories = async (limit: number) => {
    setLoading(true);

    try {
      setLoading(true);
      const { data } = await API.graphql<GraphQLQuery<ListCategoriesQuery>>(graphqlOperation(listCategories, { limit }));

      setPageToken(data.listCategories.nextToken);

      const updatedSubscriptions = [...categories, ...data.listCategories.items];
      setCategories(updatedSubscriptions.sort((a, b) => Number(a.id) - Number(b.id)) as ICategory[]);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchCategories(pageSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

        <Dialog open={Boolean(updateRecord)} onClose={() => setUpdateRecord(null)}>
          <form id='update-form' onSubmit={handleSubmit}>
            <DialogTitle>Update Record</DialogTitle>
            <Divider />

            <DialogContent sx={{ width: 600 }}>
              <TextField hidden name='id' value={values?.id || ''} />
              <CategoryForm values={values} touched={touched} errors={errors} handleChange={handleChange} />
            </DialogContent>

            <DialogActions>
              <SubmitButton disabled={isUpdating} loading={isUpdating} btnText='Update' />
              <Button onClick={() => setUpdateRecord(null)}>Cancel</Button>
            </DialogActions>
            <input type='submit' hidden />
          </form>
        </Dialog>
      </Box>
    </AdminLayout>
  );
};

export default Categories;
