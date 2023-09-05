import { GraphQLQuery } from '@aws-amplify/api';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { DataGrid } from '@mui/x-data-grid';
import { API, graphqlOperation } from 'aws-amplify';
import { useRouter } from 'next/router';
import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import toast from 'react-hot-toast';

import AdminLayout from '@/components/Admin/AdminLayout';
import { ILevel } from '@/data/level';
import { DeleteLevelMutation, ListLevelsQuery } from '@/src/API';
import { deleteLevel } from '@/src/graphql/mutations';
import { listLevels } from '@/src/graphql/queries';
import { toastErrorStyle, toastSuccessStyle } from '@/utils/toast';

const Levels = ({ user }) => {
  const router = useRouter();
  const [levels, setLevels] = React.useState<ILevel[]>([]);
  const [pageToken, setPageToken] = React.useState(null);
  const [page, setPage] = React.useState(0);
  const [isLoading, setLoading] = React.useState(true);

  const pageSize = 10;

  const columns = [
    {
      flex: 0.3,
      minWidth: 200,
      field: 'name',
      headerName: 'Level'
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
            <Button size='small' color='primary' variant='text' onClick={() => router.push(`/admin/levels/${params.row.id}`)}>
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

  const confirmDelete = (level: ILevel) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: `Are you sure to delete ${level.name}? This may effect on courses if any of course are under this level`,
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleDelete(level)
        },
        {
          label: 'No'
        }
      ]
    });
  };

  const handleDelete = async (level: ILevel) => {
    try {
      setLoading(true);

      await API.graphql<GraphQLQuery<DeleteLevelMutation>>({
        query: deleteLevel,
        variables: {
          input: { id: level.id }
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
      });

      const updatedLevels = levels.filter((cat) => cat.id != level.id);
      setLevels(updatedLevels);
      toast.error('The record has been successfully deleted.', toastSuccessStyle);
    } catch (e) {
      console.log(e);
      toast.error(e.message, toastErrorStyle);
    } finally {
      setLoading(false);
    }
  };

  const fetchLevels = async (limit: number) => {
    setLoading(true);

    try {
      setLoading(true);
      const { data } = await API.graphql<GraphQLQuery<ListLevelsQuery>>(graphqlOperation(listLevels, { limit }));

      setPageToken(data.listLevels.nextToken);

      const updatedLevels = [...levels, ...data.listLevels.items];
      setLevels(updatedLevels.sort((a, b) => Number(a.id) - Number(b.id)) as ILevel[]);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchLevels(pageSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AdminLayout
      title='Levels'
      user={user}
      button={
        <Button startIcon={<AddIcon />} onClick={() => router.push('/admin/levels/add')}>
          Add Level
        </Button>
      }>
      <DataGrid autoHeight loading={levels.length === 0} rows={levels} columns={columns} hideFooter={true} />
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

export default Levels;
