import { GraphQLQuery } from '@aws-amplify/api';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import { API, graphqlOperation } from 'aws-amplify';
import { FormikProps, prepareDataForValidation, useFormik, validateYupSchema, yupToFormErrors } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

import AdminLayout from '@/components/Admin/AdminLayout';
import { CourseForm } from '@/components/Course/CourseForm';
import { ICourse } from '@/data/course';
import { ListCoursesQuery, UpdateCourseMutation } from '@/src/API';
import { updateCourse } from '@/src/graphql/mutations';
import { listCourses } from '@/src/graphql/queries';
import SubmitButton from '@/utils/SubmitButton';
import { toastErrorStyle, toastSuccessStyle } from '@/utils/toast';

const UpdateCourse = ({ user }) => {
  const router = useRouter();
  const [isLoading, setLoading] = React.useState(true);
  const [isUpdating, setUpdating] = React.useState<boolean>(false);

  const { id } = router.query;

  const initialValues: ICourse = {
    id: id as string,
    title: '',
    slug: '',
    shortDesc: '',
    overview: '',
    latestPrice: 0,
    beforePrice: 0,
    lessons: '',
    duration: '',
    catID: '',
    levelID: '',
    inHomePage: ''
  };

  const submitForm = async (values: ICourse) => {
    setUpdating(true);

    try {
      // Update the subscription tier on Dynamodb
      const { data } = await API.graphql<GraphQLQuery<UpdateCourseMutation>>({
        query: updateCourse,
        variables: {
          input: values
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
      });

      toast.error('The record has been successfully updated.', toastSuccessStyle);
      setTimeout(() => {
        router.push('/admin/courses');
      }, 1000);
    } catch (e) {
      console.log(e);
      toast.error(e.message, toastErrorStyle);
    } finally {
      setUpdating(false);
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

  const { handleSubmit, handleChange, values, setValues, errors, touched }: FormikProps<ICourse> = useFormik<ICourse>({
    validate: (values: ICourse) => validateForm(values),
    onSubmit: (values: ICourse) => submitForm(values),
    initialValues: initialValues
  });

  const fetchCourse = async (id: string) => {
    setLoading(true);

    try {
      setLoading(true);
      const { data } = await API.graphql<GraphQLQuery<ListCoursesQuery>>(
        graphqlOperation(listCourses, {
          filter: {
            id: { eq: id }
          }
        })
      );

      const course = data.listCourses.items[0];
      setValues({
        id: id,
        title: course.title,
        slug: course.slug,
        shortDesc: course.shortDesc,
        overview: course.overview,
        latestPrice: course.latestPrice,
        beforePrice: course.beforePrice,
        lessons: course.lessons,
        duration: course.duration,
        catID: course.catID,
        levelID: course.levelID,
        inHomePage: course.inHomePage
      });
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchCourse(id as string);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AdminLayout title='Update Course' user={user}>
      {(isLoading && <LinearProgress />) || (
        <form id='update-form' onSubmit={handleSubmit}>
          <CourseForm values={values} touched={touched} errors={errors} handleChange={handleChange} />

          <Box sx={{ mt: 2 }}>
            <SubmitButton disabled={isUpdating} loading={isUpdating} btnText='Save' />
            <Button onClick={() => router.push('/admin/courses')}>Cancel</Button>
            <input type='submit' hidden />
          </Box>
        </form>
      )}
    </AdminLayout>
  );
};

export default UpdateCourse;
