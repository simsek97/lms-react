import { GraphQLQuery } from '@aws-amplify/api';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { API } from 'aws-amplify';
import { FormikProps, prepareDataForValidation, useFormik, validateYupSchema, yupToFormErrors } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

import AdminLayout from '@/components/Admin/AdminLayout';
import { LevelForm } from '@/components/Level/LevelForm';
import { ILevel } from '@/data/level';
import { CreateLevelMutation } from '@/src/API';
import { createLevel } from '@/src/graphql/mutations';
import SubmitButton from '@/utils/SubmitButton';
import { toastErrorStyle, toastSuccessStyle } from '@/utils/toast';

const initialValues: ILevel = {
  name: '',
  slug: ''
};

const AddLevel = ({ user }) => {
  const router = useRouter();
  const [isAdding, setAdding] = React.useState<boolean>(false);

  const submitForm = async (values: ILevel) => {
    setAdding(true);

    try {
      // Update the subscription tier on Dynamodb
      const { data } = await API.graphql<GraphQLQuery<CreateLevelMutation>>({
        query: createLevel,
        variables: {
          input: values
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
      });

      toast.error('The record has been successfully added.', toastSuccessStyle);
      setTimeout(() => {
        router.push('/admin/levels');
      }, 1000);
    } catch (e) {
      console.log(e);
      toast.error(e.message, toastErrorStyle);
    } finally {
      setAdding(false);
    }
  };

  // Form validation rules
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    slug: Yup.string().required('Slug is required')
  });

  const validateForm = (values: ILevel) => {
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

  const { handleSubmit, handleChange, values, errors, touched }: FormikProps<ILevel> = useFormik<ILevel>({
    validate: (values: ILevel) => validateForm(values),
    onSubmit: (values: ILevel) => submitForm(values),
    initialValues: initialValues
  });

  return (
    <AdminLayout title='Add Level' user={user}>
      <form id='add-form' onSubmit={handleSubmit}>
        <LevelForm values={values} touched={touched} errors={errors} handleChange={handleChange} />

        <Box sx={{ mt: 2 }}>
          <SubmitButton disabled={isAdding} loading={isAdding} btnText='Save' />
          <Button onClick={() => router.push('/admin/levels')}>Cancel</Button>
          <input type='submit' hidden />
        </Box>
      </form>
    </AdminLayout>
  );
};

export default AddLevel;
