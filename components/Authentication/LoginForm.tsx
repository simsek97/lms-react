import { GraphQLQuery } from '@aws-amplify/api';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { API, Auth } from 'aws-amplify';
import axios from 'axios';
import { FormikProps, prepareDataForValidation, useFormik, validateYupSchema, yupToFormErrors } from 'formik';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import React from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import { UpdateUserMutation } from '@/src/API';
import { updateUser } from '@/src/graphql/mutations';
import { resetUserAction, updateUserAction } from '@/store/actions/userActions';
import SubmitButton from '@/utils/SubmitButton';
import { handleLogin } from '@/utils/auth';
import { getS3File } from '@/utils/getS3File';

const LoginForm = () => {
  const [status, setStatus] = React.useState<string>('');
  const [statusError, setStatusError] = React.useState<string>('');
  const dispatch = useDispatch();
  const router = useRouter();

  type TFormValues = {
    email: string;
    password: string;
  };

  const defaultValues: TFormValues = {
    email: process?.env?.NEXT_PUBLIC_USERNAME || '',
    password: process?.env?.NEXT_PUBLIC_PASSWORD || ''
  };

  // Form validation rules
  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email cannot be empty'),
    password: Yup.string().required('Password cannot be empty')
  });

  const { handleSubmit, handleChange, values, errors, touched }: FormikProps<TFormValues> = useFormik<TFormValues>({
    initialValues: defaultValues,
    validate: (values: TFormValues) => validateForm(values),
    onSubmit: (values: TFormValues) => submitForm(values)
  });

  const validateForm = (values: TFormValues) => {
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

  const submitForm = async (values: TFormValues) => {
    try {
      setStatus('submitting');
      const user = await Auth.signIn(values.email, values.password);

      if (user) {
        const response = await axios.post(`/api/users/login`, { email: values.email, cognitoUser: user });

        // Handle login for cookie
        handleLogin(response.data.isid_user_token, router);

        // Check the user profile photo
        const userFromDb = response.data.user;
        let avatarUrl = userFromDb?.avatarUrl;

        if (userFromDb.avatarKey) {
          avatarUrl = await getS3File(userFromDb.avatarKey, 'private');

          // Clean the fields that are not part of update
          delete userFromDb.createdAt;
          delete userFromDb.updatedAt;

          // Update
          await API.graphql<GraphQLQuery<UpdateUserMutation>>({
            query: updateUser,
            variables: {
              input: { ...userFromDb, avatarUrl: avatarUrl }
            },
            authMode: 'AMAZON_COGNITO_USER_POOLS'
          });
        }

        dispatch(updateUserAction({ ...userFromDb, avatarUrl: avatarUrl }));

        setStatus('success');
        setTimeout(() => {
          if (router.query && router.query.next) {
            Router.push(router.query.next as string);
          } else {
            Router.push('/');
          }
        }, 3000);
      } else {
        setStatus('error');
        setStatusError('An error occurred!');
      }
    } catch (e) {
      setStatus('error');
      setStatusError(e.message);
    }
  };

  React.useEffect(() => {
    Auth.signOut();
    dispatch(resetUserAction());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ mt: 5, mb: 3 }}>
      <Box sx={{ mb: 3 }}>
        {status === 'submitting' && <Alert severity='info'>Your form is being submitted. Please wait...</Alert>}
        {status === 'success' && <Alert severity='success'>You have logged in succesfully. Please wait...</Alert>}
        {status === 'error' && <Alert severity='error'>{statusError}</Alert>}
      </Box>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              autoFocus
              name='email'
              label='Email Address'
              value={values.email}
              error={Boolean((touched?.email && errors?.email) || false)}
              helperText={(Boolean(touched?.email && errors?.email) && errors?.email) || ''}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              type='password'
              name='password'
              label='Password'
              value={values.password}
              error={Boolean((touched?.password && errors?.password) || false)}
              helperText={(Boolean(touched?.password && errors?.password) && errors?.password) || ''}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <SubmitButton disabled={status === 'submitting'} loading={status === 'submitting'} btnText='Login' />
          </Grid>
        </Grid>
      </form>

      <Grid container sx={{ mt: 3 }}>
        <Grid item xs={12}>
          <Link href='/forgot-password'>Forgot Password?</Link>
        </Grid>

        <Grid item xs={12} sx={{ mt: 1 }}>
          No account? <Link href='/register'>Click here to register</Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoginForm;
