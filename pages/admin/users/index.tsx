import { GraphQLQuery } from '@aws-amplify/api';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import React, { useState } from 'react';

import AdminLayout from '@/components/Admin/AdminLayout';
import { ListSubscriptionTiersQuery, ListUsersQuery, UpdateUserMutation, User, UserSubscriptionInput } from '@/src/API';
import { updateUser } from '@/src/graphql/mutations';
import { listSubscriptionTiers, listUsers } from '@/src/graphql/queries';
import { useRouter } from 'next/router';

const Index = ({ user }) => {
  const [subscriptionTiers, setSubscriptionTiers] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [isUpdating, setUpdating] = React.useState<Record<string, boolean>>({ role: false, subscription: false });
  const [page, setPage] = React.useState(0);
  const [pageToken, setPageToken] = React.useState(null);
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [newRole, setNewRole] = React.useState<string>();
  const [newSubscriptionId, setNewSubscriptionId] = React.useState<string>();
  const [subscriptionTerm, setSubscriptionTerm] = React.useState<string>('monthly');

  const router = useRouter();

  const pageSize = 10;

  const columns = [
    {
      minWidth: 100,
      field: 'id',
      headerName: 'ID'
    },
    {
      flex: 1,
      minWidth: 150,
      field: 'firstname',
      headerName: 'Name',
      renderCell: (params) => {
        return (
          <Box>
            <Typography>
              {params.row.firstname} {params.row.lastname}
            </Typography>
          </Box>
        );
      }
    },
    {
      flex: 1,
      minWidth: 150,
      field: 'email',
      headerName: 'Email'
    },
    {
      flex: 1,
      minWidth: 150,
      field: 'role',
      headerName: 'Role'
    },
    {
      width: 200,
      field: 'subscription',
      headerName: 'Subscription',
      renderCell: (params) => {
        return (
          <Chip
            size='small'
            color={params.row?.subscription ? 'success' : 'default'}
            label={params.row.subscription?.title || 'None'}
          />
        );
      }
    },
    {
      width: 75,
      field: 'actions',
      headerName: 'Actions',
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
    setNewRole(null);
    setNewSubscriptionId(null);
  };

  const handleActions = (user) => {
    setSelectedUser(user);
  };

  const handleChangeRole = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewRole(event.target.value);
  };

  const handleChangeSubscription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewSubscriptionId(event.target.value);
  };

  const handleUserRoleUpdate = async () => {
    setUpdating({ ...isUpdating, role: true });

    try {
      if (newRole === 'Admin') {
        // Add the user in the selected group on Cognito
        await API.post('AdminQueries', '/addUserToGroup', {
          body: {
            username: selectedUser.sub,
            groupname: 'Admin'
          },
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
          }
        });
      } else {
        // Remove the user from the previous group on Cognito
        await API.post('AdminQueries', '/removeUserFromGroup', {
          body: {
            username: selectedUser.sub,
            groupname: 'Admin'
          },
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
          }
        });
      }

      // Update the user role on Dynamodb
      const { data } = await API.graphql<GraphQLQuery<UpdateUserMutation>>({
        query: updateUser,
        variables: {
          input: { id: selectedUser.id, role: newRole }
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
      });

      const updatedUser: User = data.updateUser;
      users.map((u: User) => {
        if (u.id === updatedUser.id) {
          u.role = updatedUser.role;
        }
      });
      setUsers([...users]);

      setSelectedUser(null);
    } catch (error) {
      console.log(error);
    } finally {
      setUpdating({ ...isUpdating, role: false });
    }
  };

  const handleUserSubscriptionUpdate = async () => {
    setUpdating({ ...isUpdating, subscription: true });

    try {
      if (newSubscriptionId === 'cancel') {
        // Update the user subscription on Dynamodb
        const { data } = await API.graphql<GraphQLQuery<UpdateUserMutation>>({
          query: updateUser,
          variables: {
            input: { id: selectedUser.id, subscription: null }
          },
          authMode: 'AMAZON_COGNITO_USER_POOLS'
        });

        const updatedUser: User = data.updateUser;
        users.map((u: User) => {
          if (u.id === updatedUser.id) {
            u.subscription = updatedUser.subscription;
          }
        });
        setUsers([...users]);
      } else {
        // Get the selected plan
        const selectedPlan = subscriptionTiers.find((s) => s.id === newSubscriptionId);

        const subscribedAt = new Date();
        const subscribedDate = new Date();
        const expiresAt =
          subscriptionTerm === 'yearly'
            ? new Date(subscribedDate.setFullYear(subscribedDate.getFullYear() + 1))
            : new Date(subscribedDate.setMonth(subscribedDate.getMonth() + 1));

        const newSubscription: UserSubscriptionInput = {
          tier: selectedPlan.tier,
          title: selectedPlan.title,
          price: selectedPlan.price,
          subscribedAt: subscribedAt.toDateString(),
          expiresAt: expiresAt.toDateString()
        };

        // Update the user subscription on Dynamodb
        const { data } = await API.graphql<GraphQLQuery<UpdateUserMutation>>({
          query: updateUser,
          variables: {
            input: { id: selectedUser.id, subscription: newSubscription }
          },
          authMode: 'AMAZON_COGNITO_USER_POOLS'
        });

        const updatedUser: User = data.updateUser;
        users.map((u: User) => {
          if (u.id === updatedUser.id) {
            u.subscription = updatedUser.subscription;
          }
        });
        setUsers([...users]);
      }

      setSelectedUser(null);
    } catch (error) {
      console.log(error);
    } finally {
      setUpdating({ ...isUpdating, subscription: false });
    }
  };

  // const sendEmail = async (approvedUser) => {
  //   console.log(approvedUser);

  //   try {
  //     console.log('Sending email');
  //     const command = new SendEmailCommand({
  //       Destination: {
  //         ToAddresses: [approvedUser.email]
  //       },
  //       FromEmailAddress: 'support@ceplaybooks.io',
  //       Content: {
  //         Simple: {
  //           Subject: { Data: 'Account Approval' },
  //           Body: {
  //             Text: {
  //               Data: 'Your account has been approved.'
  //             },
  //             Html: {
  //               Data: 'Your account has been approved.'
  //             }
  //           }
  //         }
  //       }
  //     });

  //     await sesClient.send(command);
  //     console.log('Email sent!');
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  React.useEffect(() => {
    const getUsers = async (limit: number) => {
      try {
        setLoading(true);

        const { data } = await API.graphql<GraphQLQuery<ListUsersQuery>>(graphqlOperation(listUsers, { limit }));

        setPageToken(data.listUsers.nextToken);

        setUsers([...users, ...data.listUsers.items]);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    getUsers(pageSize);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  React.useEffect(() => {
    const getTiers = async () => {
      try {
        setLoading(true);

        const { data } = await API.graphql<GraphQLQuery<ListSubscriptionTiersQuery>>(
          graphqlOperation(listSubscriptionTiers, { limit: 10 })
        );

        setSubscriptionTiers([...subscriptionTiers, ...data.listSubscriptionTiers.items]);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    getTiers();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AdminLayout
      title='Users'
      user={user}
      button={
        <Button startIcon={<GroupAddIcon />} onClick={() => router.push('/admin/subscriptions/add-bulk')}>
          Add Bulk Subscriptions
        </Button>
      }>
      <DataGrid autoHeight loading={isLoading && users.length === 0} rows={users} columns={columns} hideFooter={true} />
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

      {selectedUser && (
        <Dialog open={true} onClose={handleCloseModal} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
          <DialogTitle>
            Update User: {selectedUser.firstname} {selectedUser.lastname}
          </DialogTitle>

          <Divider />

          <DialogContent sx={{ width: 450 }}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Card sx={{ mb: 3 }}>
                  <CardContent>
                    <TextField fullWidth select label='User Role' defaultValue={selectedUser.role} onChange={handleChangeRole}>
                      <MenuItem value='Admin'>Admin</MenuItem>
                      <MenuItem value='User'>User</MenuItem>
                    </TextField>
                  </CardContent>

                  <CardActions>
                    <Button
                      disabled={!newRole}
                      onClick={handleUserRoleUpdate}
                      startIcon={isUpdating.role ? <CircularProgress size={16} /> : null}>
                      Save
                    </Button>
                  </CardActions>
                </Card>
              </Grid>

              {!selectedUser?.stripeCustomerId && (
                <Grid item xs={12}>
                  <Card>
                    <CardContent>
                      <TextField
                        sx={{ mb: 3 }}
                        fullWidth
                        select
                        label='User Subscription'
                        defaultValue={selectedUser.subscription?.id || 'No subscription'}
                        onChange={handleChangeSubscription}>
                        {subscriptionTiers
                          .sort((a, b) => a.id - b.id)
                          .map((tier) => (
                            <MenuItem key={tier.id} value={tier.id}>
                              {tier.title}
                            </MenuItem>
                          ))}
                        <MenuItem divider />
                        <MenuItem value='cancel'>Cancel Subscription</MenuItem>
                      </TextField>

                      <TextField
                        fullWidth
                        select
                        label='Subscription Term'
                        defaultValue='monthly'
                        onChange={(e) => setSubscriptionTerm(e.target.value)}>
                        <MenuItem value='monthly'>Montly</MenuItem>
                        <MenuItem value='yearly'>Yearly</MenuItem>
                      </TextField>
                      <FormHelperText>
                        If you change the subscription, the existing subscription will be cancelled and the user will be subscribed to
                        the new plan.
                      </FormHelperText>
                    </CardContent>

                    <CardActions>
                      <Button
                        disabled={!newSubscriptionId}
                        onClick={handleUserSubscriptionUpdate}
                        startIcon={isUpdating.subscription ? <CircularProgress size={16} /> : null}>
                        Save
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              )}
            </Grid>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleCloseModal}>Cancel</Button>
          </DialogActions>
        </Dialog>
      )}
    </AdminLayout>
  );
};

export default Index;
