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
import { CategoryForm } from '@/components/Category/CategoryForm';
import { ICategory } from '@/data/category';
import { ListCategoriesQuery, UpdateCategoryMutation } from '@/src/API';
import { updateCategory } from '@/src/graphql/mutations';
import { listCategories } from '@/src/graphql/queries';
import SubmitButton from '@/utils/SubmitButton';
import { toastErrorStyle, toastSuccessStyle } from '@/utils/toast';

const UpdateCategory = ({ user }) => {
  const router = useRouter();
  const [isLoading, setLoading] = React.useState(true);
  const [isUpdating, setUpdating] = React.useState<boolean>(false);

  const { id } = router.query;

  const initialValues: ICategory = {
    id: id as string,
    name: '',
    slug: ''
  };

  const submitForm = async (values: ICategory) => {
    setUpdating(true);

    try {
      // Update the subscription tier on Dynamodb
      const { data } = await API.graphql<GraphQLQuery<UpdateCategoryMutation>>({
        query: updateCategory,
        variables: {
          input: values
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
      });

      toast.error('The record has been successfully updated.', toastSuccessStyle);
      setTimeout(() => {
        router.push('/admin/categories');
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

  const { handleSubmit, handleChange, values, setValues, errors, touched }: FormikProps<ICategory> = useFormik<ICategory>({
    validate: (values: ICategory) => validateForm(values),
    onSubmit: (values: ICategory) => submitForm(values),
    initialValues: initialValues
  });

  const fetchCategory = async (id: string) => {
    setLoading(true);

    try {
      setLoading(true);
      const { data } = await API.graphql<GraphQLQuery<ListCategoriesQuery>>(
        graphqlOperation(listCategories, {
          filter: {
            id: { eq: id }
          }
        })
      );

      const category = data.listCategories.items[0];
      setValues({ id: id, name: category.name, slug: category.slug });
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchCategory(id as string);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AdminLayout title='Update Category' user={user}>
      {(isLoading && <LinearProgress />) || (
        <form id='update-form' onSubmit={handleSubmit}>
          <CategoryForm values={values} touched={touched} errors={errors} handleChange={handleChange} />

          <Box sx={{ mt: 2 }}>
            <SubmitButton disabled={isUpdating} loading={isUpdating} btnText='Save' />
            <Button onClick={() => router.push('/admin/categories')}>Cancel</Button>
            <input type='submit' hidden />
          </Box>
        </form>
      )}
    </AdminLayout>
  );
};

export default UpdateCategory;
