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
import { CourseForm } from '@/components/Course/CourseForm';
import { ICourse } from '@/data/course';
import { CreateCourseMutation } from '@/src/API';
import { createCourse } from '@/src/graphql/mutations';
import SubmitButton from '@/utils/SubmitButton';
import { toastErrorStyle, toastSuccessStyle } from '@/utils/toast';

const initialValues: ICourse = {
  title: '',
  slug: '',
  shortDesc: '',
  overview: '',
  latestPrice: 0,
  beforePrice: 0,
  lessons: '',
  duration: '',
  catID: '',
  levelID: ''
};

const AddCourse = ({ user }) => {
  const router = useRouter();
  const [isAdding, setAdding] = React.useState<boolean>(false);

  const submitForm = async (values: ICourse) => {
    setAdding(true);

    try {
      // Update the subscription tier on Dynamodb
      const { data } = await API.graphql<GraphQLQuery<CreateCourseMutation>>({
        query: createCourse,
        variables: {
          input: values
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
      });

      toast.error('The record has been successfully added.', toastSuccessStyle);
      setTimeout(() => {
        router.push('/admin/courses');
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
    title: Yup.string().required('Title is required'),
    slug: Yup.string().required('Slug is required')
  });

  const validateForm = (values: ICourse) => {
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

  const { handleSubmit, handleChange, values, errors, touched }: FormikProps<ICourse> = useFormik<ICourse>({
    validate: (values: ICourse) => validateForm(values),
    onSubmit: (values: ICourse) => submitForm(values),
    initialValues: initialValues
  });

  return (
    <AdminLayout title='Add Course' user={user}>
      <form id='add-form' onSubmit={handleSubmit}>
        <CourseForm values={values} touched={touched} errors={errors} handleChange={handleChange} />

        <Box sx={{ mt: 2 }}>
          <SubmitButton disabled={isAdding} loading={isAdding} btnText='Save' />
          <Button onClick={() => router.push('/admin/courses')}>Cancel</Button>
          <input type='submit' hidden />
        </Box>
      </form>
    </AdminLayout>
  );
};

export default AddCourse;
