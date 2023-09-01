import { GraphQLQuery } from '@aws-amplify/api';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import React, { useState } from 'react';

import AdminLayout from '@/components/Admin/AdminLayout';
import { ListSubscriptionTiersQuery } from '@/src/API';
import { listSubscriptionTiers } from '@/src/graphql/queries';

const prepareUsers = (page: number, pageSize: number, users: any) => {
  const usersArray = [];

  users.forEach((user: any, index: number) => {
    const row = {};
    const userAttributes = user.Attributes;
    userAttributes.forEach((attr) => {
      const { Name, Value } = attr;
      row[Name] = Value;
    });

    row['rowNumber'] = page * pageSize + index + 1;
    row['id'] = user.Username;
    row['enabled'] = user.Enabled;
    row['status'] = user.UserStatus;
    row['created_at'] = user.UserCreateDate.toLocaleString();
    row['full_name'] = `${row['given_name']} ${row['family_name']}`;

    usersArray.push(row);
  });

  return usersArray;
};

const Index = ({ user }) => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [page, setPage] = React.useState(0);
  const [pageToken, setPageToken] = React.useState(null);
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [selectedUserRole, setSelectedUserRole] = React.useState(null);

  const pageSize = 10;

  const columns = [
    {
      flex: 1,
      field: 'number',
      headerName: '#',
      renderCell: (params) => {
        const { row } = params;

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography noWrap variant='caption'>
              {row.rowNumber}
            </Typography>
          </Box>
        );
      }
    },
    {
      flex: 10,
      minWidth: 200,
      field: 'full_name',
      headerName: 'Name',
      renderCell: (params) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
                {params.row.full_name}
              </Typography>
            </Box>
          </Box>
        );
      }
    },
    {
      flex: 10,
      minWidth: 150,
      field: 'email',
      headerName: 'Email',
      renderCell: (params) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography noWrap variant='caption'>
                {params.row.email}
              </Typography>
            </Box>
          </Box>
        );
      }
    },
    // {
    //   flex: 1,
    //   minWidth: 75,
    //   field: 'enabled',
    //   headerName: 'Enabled',
    //   renderCell: (params) => {
    //     return <Chip size='small' color={params.row.enabled ? 'success' : 'default'} label={params.row.enabled ? 'True' : 'False'} />;
    //   }
    // },
    {
      flex: 1,
      minWidth: 150,
      field: 'status',
      headerName: 'Status',
      renderCell: (params) => {
        return <Chip size='small' color={params.row.status === 'CONFIRMED' ? 'success' : 'default'} label={params.row.status} />;
      }
    },
    {
      flex: 1,
      minWidth: 60,
      field: 'actions',
      headerName: '',
      renderCell: (params) => {
        return (
          <IconButton size='small' onClick={() => handleActions(params.row)}>
            <MoreVertIcon />
          </IconButton>
        );
      }
    }
  ];

  const handleCloseModal = () => {
    setSelectedUser(null);
    setSelectedUserRole(null);
  };

  const handleActions = (user) => {
    console.log(user);
    setSelectedUser(user);
    setSelectedUserRole(null);
  };

  const handleChangeRole = (event, user) => {
    console.log(user);
    setSelectedUserRole(event.target.value);
  };

  const handleUserUpdate = async () => {
    if (selectedUser['custom:role'] === selectedUserRole) {
      return;
    }

    try {
      let apiName = 'AdminQueries';
      let path = '/addUserToGroup';
      let myInit = {
        body: {
          username: selectedUser.id,
          groupname: selectedUserRole
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
        }
      };
      const response = await API.post(apiName, path, myInit);

      console.log(response);

      setSelectedUser(null);
      setSelectedUserRole(null);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    const listSubscriptions = async (limit: number) => {
      try {
        setLoading(true);
        const { data } = await API.graphql<GraphQLQuery<ListSubscriptionTiersQuery>>(
          graphqlOperation(listSubscriptionTiers, { limit })
        );

        setPageToken(data.listSubscriptionTiers.nextToken);

        const newSubscriptions = prepareUsers(page, pageSize, data.listSubscriptionTiers.items);
        setSubscriptions([...subscriptions, ...newSubscriptions]);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    listSubscriptions(pageSize);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <AdminLayout title='Subscriptions' user={user}>
      <DataGrid autoHeight loading={isLoading} rows={subscriptions} columns={columns} hideFooter={true} />
      <Box sx={{ textAlign: 'center', p: 1, gap: 1 }}>
        {pageToken && (
          <Button
            startIcon={isLoading && <CircularProgress size={12} color='inherit' />}
            variant='contained'
            onClick={() => setPage(page + 1)}>
            Show More
          </Button>
        )}
      </Box>

      {selectedUser && (
        <Dialog open={true} onClose={handleCloseModal} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
          <DialogTitle>Update User: {selectedUser.full_name}</DialogTitle>

          <Divider />

          <DialogContent sx={{ width: 400 }}>
            <FormControl sx={{ mt: 2 }} fullWidth>
              <InputLabel id='select-role-label'>User Role</InputLabel>
              <Select
                labelId='select-role-label'
                id='select-role-select'
                label='User Role'
                defaultValue=''
                onChange={(event) => handleChangeRole(event, selectedUser)}>
                <MenuItem value='Admin'>Admin</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>

          <DialogActions>
            {selectedUserRole && <Button onClick={handleUserUpdate}>Save</Button>}
            <Button onClick={handleCloseModal}>Cancel</Button>
          </DialogActions>
        </Dialog>
      )}
    </AdminLayout>
  );
};

export default Index;
