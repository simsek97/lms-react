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
import { LevelForm } from '@/components/Level/LevelForm';
import { ILevel } from '@/data/level';
import { ListLevelsQuery, UpdateLevelMutation } from '@/src/API';
import { updateLevel } from '@/src/graphql/mutations';
import { listLevels } from '@/src/graphql/queries';
import SubmitButton from '@/utils/SubmitButton';
import { toastErrorStyle, toastSuccessStyle } from '@/utils/toast';

const UpdateLevel = ({ user }) => {
  const router = useRouter();
  const [isLoading, setLoading] = React.useState(true);
  const [isUpdating, setUpdating] = React.useState<boolean>(false);

  const { id } = router.query;

  const initialValues: ILevel = {
    id: id as string,
    name: '',
    slug: ''
  };

  const submitForm = async (values: ILevel) => {
    setUpdating(true);

    try {
      // Update the subscription tier on Dynamodb
      const { data } = await API.graphql<GraphQLQuery<UpdateLevelMutation>>({
        query: updateLevel,
        variables: {
          input: values
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
      });

      toast.error('The record has been successfully updated.', toastSuccessStyle);
      setTimeout(() => {
        router.push('/admin/levels');
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

  const { handleSubmit, handleChange, values, setValues, errors, touched }: FormikProps<ILevel> = useFormik<ILevel>({
    validate: (values: ILevel) => validateForm(values),
    onSubmit: (values: ILevel) => submitForm(values),
    initialValues: initialValues
  });

  const fetchLevel = async (id: string) => {
    setLoading(true);

    try {
      setLoading(true);
      const { data } = await API.graphql<GraphQLQuery<ListLevelsQuery>>(
        graphqlOperation(listLevels, {
          filter: {
            id: { eq: id }
          }
        })
      );

      const level = data.listLevels.items[0];
      setValues({ id: id, name: level.name, slug: level.slug });
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchLevel(id as string);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AdminLayout title='Update Level' user={user}>
      {(isLoading && <LinearProgress />) || (
        <form id='update-form' onSubmit={handleSubmit}>
          <LevelForm values={values} touched={touched} errors={errors} handleChange={handleChange} />

          <Box sx={{ mt: 2 }}>
            <SubmitButton disabled={isUpdating} loading={isUpdating} btnText='Save' />
            <Button onClick={() => router.push('/admin/levels')}>Cancel</Button>
            <input type='submit' hidden />
          </Box>
        </form>
      )}
    </AdminLayout>
  );
};

export default UpdateLevel;
