import { GraphQLQuery } from '@aws-amplify/api';
import Grid from '@mui/material/Grid';
import { API, Storage } from 'aws-amplify';
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
import { getS3File } from '@/utils/getS3File';
import { toastErrorStyle, toastSuccessStyle } from '@/utils/toast';

const Photo = () => {
  const [avatar, setAvatar] = React.useState<File>();
  const [profilePreview, setProfilePreview] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);

  const dispatch = useDispatch();

  const userProfile = useSelector((state: IReduxStore) => state.user.profile);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    const profilePhotoSize = files[0].size / 1024 / 1024;
    if (profilePhotoSize > 2) {
      toast.error('The profile photo size greater than 2 MB. Make sure less than 2 MB.', toastErrorStyle);
      e.target.value = null;
      return;
    }

    setAvatar(files[0]);

    setProfilePreview(window.URL.createObjectURL(files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!avatar) {
        return false;
      }
      console.log(avatar);
      const upload = await Storage.put(avatar['name'], avatar, {
        level: 'private'
      });

      // Get S3 signed url
      const uploadUrl = await getS3File(upload.key, 'private');

      // Update user on DynamoDB
      const { data } = await API.graphql<GraphQLQuery<UpdateUserMutation>>({
        query: updateUser,
        variables: {
          input: {
            id: userProfile.id,
            avatar: {
              key: upload.key,
              url: uploadUrl
            }
          }
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
      });

      // Update the store
      dispatch(updateUserAction({ ...userProfile, avatarKey: upload.key, avatarUrl: uploadUrl }));

      setLoading(false);
      toast.success('Profile Picture has been successfully saved.', toastSuccessStyle);
    } catch (err) {
      console.log(err);
      toast.error('Profile Picture could not be saved.', toastErrorStyle);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    const getProfilePhoto = async (filename: string) => {
      const photo = await getS3File(filename, 'private');

      return photo;
    };

    if (userProfile?.avatarKey) {
      getProfilePhoto(userProfile.avatarKey).then((data) => setProfilePreview(data));
    }
  }, [userProfile?.avatarKey]);

  return (
    <PageContent>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3} sx={{ p: 3 }}>
          <Grid item xs={12}>
            <UserNavbar active='/profile/photo' />
          </Grid>

          <Grid container item spacing={3}>
            <Grid item xs={12} sm={6}>
              <div className='form-group'>
                <label className='form-label fw-semibold'>Profile Image</label>
                <input
                  type='file'
                  className='form-control file-control'
                  name='profilePhoto'
                  accept='image/*'
                  onChange={handleChange}
                  required={true}
                />
                <div className='form-text mt-2'>Upload image size 200x200 pixels!</div>

                <div className='mt-3'>
                  {profilePreview ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={profilePreview} alt='image' className='img-thumbnail mw-200px' />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src='/images/avatar.jpg' alt='image' className='img-thumbnail mw-200px' />
                  )}
                </div>
              </div>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <SubmitButton disabled={false} loading={isLoading} btnText='Upload' btnClass='btn default-btn' />
          </Grid>
        </Grid>
      </form>
    </PageContent>
  );
};

export default Photo;
