import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { Auth } from 'aws-amplify';
import { FormikProps, prepareDataForValidation, useFormik, validateYupSchema, yupToFormErrors } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import * as Yup from 'yup';

import SubmitButton from '@/utils/SubmitButton';

type TFormValues = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type TPasswordRequirement = {
  description: string;
  value: boolean;
};
const PasswordRequirement1 = 'Password must be at least 8 characters.';
const PasswordRequirement2 = 'Password must be include at least one lower case character.';
const PasswordRequirement3 = 'Password must be include at least one upper case character.';
const PasswordRequirement4 = 'Password must be include at least one number.';
const PasswordRequirement5 = 'Password must be include at least one special character. @$!%*?&';
const initialPasswordRequirements: Record<string, TPasswordRequirement> = {
  first: {
    description: PasswordRequirement1,
    value: false
  },
  second: {
    description: PasswordRequirement2,
    value: false
  },
  third: {
    description: PasswordRequirement3,
    value: false
  },
  fourth: {
    description: PasswordRequirement4,
    value: false
  },
  fifth: {
    description: PasswordRequirement5,
    value: false
  }
};

const RegisterForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState({
    password: false,
    confirmPassword: false
  });
  const [passwordRequirements, setPasswordRequirements] =
    React.useState<Record<string, TPasswordRequirement>>(initialPasswordRequirements);
  const [status, setStatus] = React.useState<string>('');
  const [statusError, setStatusError] = React.useState<string>('');
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const defaultValues: TFormValues = {
    firstname: process?.env?.NEXT_PUBLIC_FIRSTNAME || '',
    lastname: process?.env?.NEXT_PUBLIC_LASTNAME || '',
    email: process?.env?.NEXT_PUBLIC_USERNAME || '',
    password: process?.env?.NEXT_PUBLIC_PASSWORD || '',
    confirmPassword: process?.env?.NEXT_PUBLIC_PASSWORD || ''
  };

  const { handleSubmit, handleChange, values, errors, touched }: FormikProps<TFormValues> = useFormik<TFormValues>({
    initialValues: defaultValues,
    validate: (values: TFormValues) => validateForm(values),
    onSubmit: (values: TFormValues) => submitForm(values)
  });

  // Min 8 characters, 1 upper case letter, 1 lower case letter, 1 number, 1 special character
  const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // Form validation rules
  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required('First Name is required').min(2, 'First Name must be at least 2 characters long'),
    lastname: Yup.string().required('Last Name is required').min(2, 'Last Name must be at least 2 characters long'),
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(passwordRules, 'Password does not meet the minimum requirements'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required')
  });

  const validateForm = (values: TFormValues) => {
    const formValues = prepareDataForValidation(values);
    const validate = validateYupSchema(formValues, validationSchema);

    // Check password requirements
    let newRequirements = { ...passwordRequirements };

    if (values.password.length > 7) {
      newRequirements = { ...newRequirements, first: { description: PasswordRequirement1, value: true } };
    } else {
      newRequirements = { ...newRequirements, first: { description: PasswordRequirement1, value: false } };
    }
    if (/[a-z]/.test(values.password)) {
      newRequirements = { ...newRequirements, second: { description: PasswordRequirement2, value: true } };
    } else {
      newRequirements = { ...newRequirements, second: { description: PasswordRequirement2, value: false } };
    }
    if (/[A-Z]/.test(values.password)) {
      newRequirements = { ...newRequirements, third: { description: PasswordRequirement3, value: true } };
    } else {
      newRequirements = { ...newRequirements, third: { description: PasswordRequirement3, value: false } };
    }
    if (/[0-9]/.test(values.password)) {
      newRequirements = { ...newRequirements, fourth: { description: PasswordRequirement4, value: true } };
    } else {
      newRequirements = { ...newRequirements, fourth: { description: PasswordRequirement4, value: false } };
    }
    if (/[@$!%*?&]/.test(values.password)) {
      newRequirements = { ...newRequirements, fifth: { description: PasswordRequirement5, value: true } };
    } else {
      newRequirements = { ...newRequirements, fifth: { description: PasswordRequirement5, value: false } };
    }

    setPasswordRequirements(newRequirements);

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
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    try {
      setStatus('submitting');

      const { user } = await Auth.signUp({
        username: values.email,
        password: values.password,
        attributes: {
          family_name: values.lastname,
          given_name: values.firstname,
          email: values.email
        },
        autoSignIn: {
          enabled: true
        }
      });

      if (user) {
        setStatus('success');
        setTimeout(() => {
          router.push(`/confirm-email?email=${values.email}`);
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

  const handleClickShowPassword = (elt: any) => () => {
    setShowPassword({ ...showPassword, [elt]: !showPassword[elt] });
  };

  const handleMouseDownPassword = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  return (
    <Box sx={{ mt: 5, mb: 3 }}>
      <Box sx={{ mb: 3 }}>
        {status === 'submitting' && <Alert severity='info'>Your form is being submitted. Please wait...</Alert>}
        {status === 'success' && <Alert severity='success'>Your form has been submitted succesfully. Please wait...</Alert>}
        {status === 'error' && <Alert severity='error'>{statusError}</Alert>}
      </Box>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name='firstname'
              label='First Name'
              value={values.firstname}
              onChange={handleChange}
              error={Boolean((touched?.firstname && errors?.firstname) || false)}
              helperText={(Boolean(touched?.firstname && errors?.firstname) && errors?.firstname) || false}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              name='lastname'
              label='Last Name'
              value={values.lastname}
              onChange={handleChange}
              error={Boolean((touched?.lastname && errors?.lastname) || false)}
              helperText={(Boolean(touched?.lastname && errors?.lastname) && errors?.lastname) || false}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              name='email'
              label='Email'
              value={values.email}
              onChange={handleChange}
              error={Boolean((touched?.email && errors?.email) || false)}
              helperText={(Boolean(touched?.email && errors?.email) && errors?.email) || false}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              type={showPassword.password ? 'text' : 'password'}
              fullWidth
              name='password'
              label='Password'
              value={values.password}
              onChange={handleChange}
              // error={Boolean((touched?.password && errors?.password) || false)}
              // helperText={errors?.password || ''}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      tabIndex={-1}
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword('password')}
                      onMouseDown={handleMouseDownPassword}
                      size='large'>
                      {showPassword.password ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <Box sx={{ whiteSpace: 'normal', mt: 2 }}>
              {Object.keys(passwordRequirements).map((k: string) => (
                <Alert key={k} sx={{ m: 0, py: 0 }} severity={(passwordRequirements[k].value && 'success') || 'warning'}>
                  {passwordRequirements[k].description}
                </Alert>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12}>
            <TextField
              type={showPassword.confirmPassword ? 'text' : 'password'}
              fullWidth
              name='confirmPassword'
              label='Confirm Password'
              value={values.confirmPassword}
              onChange={handleChange}
              error={Boolean((touched?.confirmPassword && errors?.confirmPassword) || false)}
              helperText={(Boolean(touched?.confirmPassword && errors?.confirmPassword) && errors?.confirmPassword) || false}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      tabIndex={-1}
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword('confirmPassword')}
                      onMouseDown={handleMouseDownPassword}
                      size='large'>
                      {showPassword.confirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <SubmitButton disabled={status === 'submitting'} loading={status === 'submitting'} btnText='Register' />
          </Grid>
        </Grid>
      </form>

      <Grid container sx={{ mt: 3 }}>
        <Grid item xs={12}>
          Already Have Account? <Link href='/auth/login'>Login</Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RegisterForm;
