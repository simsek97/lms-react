import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { DataGrid } from '@mui/x-data-grid';
import { API, Auth } from 'aws-amplify';
import React, { useState } from 'react';

import AdminLayout from '@/components/Admin/AdminLayout';

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
  const [admins, setAdmins] = useState([]);
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [page, setPage] = React.useState(0);
  const [pageToken, setPageToken] = React.useState(null);

  const pageSize = 10;

  const columns = [
    {
      flex: 0.1,
      field: 'rowNumber',
      headerName: '#'
    },
    {
      flex: 0.3,
      minWidth: 200,
      field: 'full_name',
      headerName: 'Name'
    },
    {
      flex: 0.4,
      minWidth: 150,
      field: 'email',
      headerName: 'Email'
    },
    {
      flex: 0.2,
      minWidth: 60,
      field: 'actions',
      headerName: 'Remove',
      renderCell: (params) => {
        return (
          <Button size='small' variant='outlined' onClick={() => handleRemove(params.row)}>
            Remove
          </Button>
        );
      }
    }
  ];

  const handleRemove = async (user) => {
    try {
      let apiName = 'AdminQueries';
      let path = '/removeUserFromGroup';
      let myInit = {
        body: {
          username: user.id,
          groupname: 'Admin'
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
        }
      };

      await API.post(apiName, path, myInit);

      const updatedAdmins = admins.filter((admin) => admin.id !== user.id);

      setAdmins(updatedAdmins);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    const listUsersInGroup = async (limit: number) => {
      try {
        setLoading(true);

        let apiName = 'AdminQueries';
        let path = '/listUsersInGroup';
        let myInit = {
          queryStringParameters: {
            groupname: 'Admin',
            limit: limit,
            token: pageToken
          },
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
          }
        };
        const { NextToken, Users } = await API.get(apiName, path, myInit);

        setPageToken(NextToken);

        const newAdmins = prepareUsers(page, pageSize, Users);
        setAdmins([...admins, ...newAdmins]);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    listUsersInGroup(pageSize);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <AdminLayout title='Admins' user={user}>
      <DataGrid autoHeight loading={admins.length === 0} rows={admins} columns={columns} hideFooter={true} />
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

export default Index;
