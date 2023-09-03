import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Amplify, Auth } from 'aws-amplify';
import Router, { useRouter } from 'next/router';
import React from 'react';

import SubmitButton from '@/utils/SubmitButton';

const defaultValues = {
  username: '',
  confcode: ''
};

const ConfirmEmail = () => {
  const router = useRouter();
  const [user, setUser] = React.useState();
  const [formData, setFormData] = React.useState(defaultValues);
  const [status, setStatus] = React.useState<string>('');
  const [statusError, setStatusError] = React.useState<string>('');

  const handleCodeChange = (event: any) => {
    setFormData({ ...formData, confcode: event.target.value });
  };

  const confirmEmail = async () => {
    try {
      setStatus('submitting');
      const response = await Auth.confirmSignUp(formData.username, formData.confcode);

      if (response === 'SUCCESS') {
        setStatus('success');
        setTimeout(() => {
          router.push('/auth/login');
        }, 5000);
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
    const getCurrentUser = async () => {
      const congitoUser = await Auth.currentAuthenticatedUser();
      setUser(congitoUser);
    };

    getCurrentUser();
  }, []);

  React.useEffect(() => {
    setFormData({ ...defaultValues, username: router.query.email as string });
  }, [router]);

  return (
    <Box sx={{ mt: 5, mb: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Alert severity='info'>
          We have sent an email with the confirmation code. Please check your inbox and use the confirmation code in the form below to
          finish your registration.
        </Alert>
      </Box>
      <Box sx={{ mb: 3 }}>
        {status === 'submitting' && <Alert severity='info'>Your form is being submitted. Please wait...</Alert>}
        {status === 'success' && (
          <Alert severity='success'>Registration has been successfully completed. Redirecting to login page. Please wait...</Alert>
        )}
        {status === 'error' && <Alert severity='error'>{statusError}</Alert>}
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField fullWidth name='username' label='Email Address' value={router.query.email} />
        </Grid>

        <Grid item xs={12}>
          <TextField fullWidth autoFocus name='confcode' label='Confirmation Code' onChange={handleCodeChange} />
        </Grid>

        <Grid item xs={12}>
          <SubmitButton
            disabled={status === 'submitting'}
            loading={status === 'submitting'}
            btnText='Confirm Registration'
            btnOnClick={confirmEmail}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ConfirmEmail;
