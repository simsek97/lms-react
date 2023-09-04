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
import { CategoryForm } from '@/components/Category/CategoryForm';
import { ICategory } from '@/data/category';
import { CreateCategoryMutation } from '@/src/API';
import { createCategory } from '@/src/graphql/mutations';
import SubmitButton from '@/utils/SubmitButton';
import { toastErrorStyle, toastSuccessStyle } from '@/utils/toast';

const initialValues: ICategory = {
  name: '',
  slug: ''
};

const AddCategory = ({ user }) => {
  const router = useRouter();
  const [isAdding, setAdding] = React.useState<boolean>(false);

  const submitForm = async (values: ICategory) => {
    setAdding(true);

    try {
      // Update the subscription tier on Dynamodb
      const { data } = await API.graphql<GraphQLQuery<CreateCategoryMutation>>({
        query: createCategory,
        variables: {
          input: values
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
      });

      toast.error('The record has been successfully added.', toastSuccessStyle);
      setTimeout(() => {
        router.push('/admin/categories');
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

  const validateForm = (values: ICategory) => {
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

  const { handleSubmit, handleChange, values, errors, touched }: FormikProps<ICategory> = useFormik<ICategory>({
    validate: (values: ICategory) => validateForm(values),
    onSubmit: (values: ICategory) => submitForm(values),
    initialValues: initialValues
  });

  return (
    <AdminLayout title='Add Category' user={user}>
      <form id='update-form' onSubmit={handleSubmit}>
        <CategoryForm values={values} touched={touched} errors={errors} handleChange={handleChange} />

        <Box sx={{ mt: 2 }}>
          <SubmitButton disabled={isAdding} loading={isAdding} btnText='Save' />
          <Button onClick={() => router.push('/admin/categories')}>Cancel</Button>
          <input type='submit' hidden />
        </Box>
      </form>
    </AdminLayout>
  );
};

export default AddCategory;
