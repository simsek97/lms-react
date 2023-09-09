import { GraphQLQuery } from '@aws-amplify/api';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { API } from 'aws-amplify';
import React from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

import PageContent from '@/components/_App/PageContent';
import UserNavbar from '@/components/_App/UserNavbar';
import { UpdateUserMutation } from '@/src/API';
import { updateUser } from '@/src/graphql/mutations';
import { updateUserAction } from '@/store/actions/userActions';
import { IReduxStore } from '@/store/index';
import SubmitButton from '@/utils/SubmitButton';
import { toastErrorStyle, toastSuccessStyle } from '@/utils/toast';

const UserInfo = () => {
  const userProfile = useSelector((state: IReduxStore) => state.user.profile);

  const [userUpdate, setUserUpdate] = React.useState(userProfile);
  const [loading, setLoading] = React.useState(false);

  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUserUpdate((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await API.graphql<GraphQLQuery<UpdateUserMutation>>({
        query: updateUser,
        variables: {
          input: {
            id: userUpdate.id,
            firstname: userUpdate.firstname,
            lastname: userUpdate.lastname,
            email: userUpdate.email,
            owner: userUpdate.owner,
            address: userUpdate.address,
            city: userUpdate.city,
            state: userUpdate.state,
            zipCode: userUpdate.zipCode,
            country: userUpdate.country
          }
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
      });

      // Update the store
      dispatch(
        updateUserAction({
          ...userProfile,
          firstname: userUpdate.firstname,
          lastname: userUpdate.lastname,
          address: userUpdate.address,
          city: userUpdate.city,
          state: userUpdate.state,
          zipCode: userUpdate.zipCode,
          country: userUpdate.country
        })
      );

      toast.success('User info has been saved successfully', toastSuccessStyle);
    } catch (err) {
      console.log(err);
      toast.error('User info could not be saved!', toastErrorStyle);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContent>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3} sx={{ p: 3 }}>
          <Grid item xs={12}>
            <UserNavbar active='/profile/userinfo' />
          </Grid>

          <Grid container item spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth name='firstname' label='First Name' value={userUpdate?.firstname} onChange={handleChange} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField fullWidth name='lastname' label='Last Name' value={userUpdate?.lastname} onChange={handleChange} />
            </Grid>
          </Grid>

          <Grid container item spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth name='address' label='Address' value={userUpdate?.address || ''} onChange={handleChange} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField fullWidth name='city' label='City' value={userUpdate?.city || ''} onChange={handleChange} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField fullWidth name='state' label='State' value={userUpdate?.state || ''} onChange={handleChange} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField fullWidth name='zipCode' label='Zip Code' value={userUpdate?.zipCode || ''} onChange={handleChange} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField fullWidth name='country' label='Country' value={userUpdate?.country || ''} onChange={handleChange} />
            </Grid>
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <SubmitButton disabled={false} loading={loading} btnText='Save' btnClass='btn default-btn' />
          </Grid>
        </Grid>
      </form>
    </PageContent>
  );
};

export default UserInfo;
