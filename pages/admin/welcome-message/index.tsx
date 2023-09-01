import { GraphQLQuery } from '@aws-amplify/api';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { API, graphqlOperation } from 'aws-amplify';
import { FormikProps, prepareDataForValidation, useFormik, validateYupSchema, yupToFormErrors } from 'formik';
import React from 'react';
import * as Yup from 'yup';

import AdminLayout from '@/components/Admin/AdminLayout';
import { ListWelcomeMessagesQuery, UpdateWelcomeMessageMutation, WelcomeMessage } from '@/src/API';
import { listWelcomeMessages } from '@/src/graphql/queries';
import SubmitButton from '@/utils/SubmitButton';
import { updateWelcomeMessage } from '@/src/graphql/mutations';

type TFormValues = {
  id?: string;
  title?: string;
  content: string;
  footer?: string;
};

const defaultValues: TFormValues = {
  id: '',
  title: '',
  content: '',
  footer: ''
};

// Form validation rules
const validationSchema = Yup.object().shape({
  content: Yup.string().required('Content is required')
});

const Index = ({ user }) => {
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [page, setPage] = React.useState(0);
  const [status, setStatus] = React.useState<string>('');
  const [statusError, setStatusError] = React.useState<string>('');

  const { handleSubmit, handleChange, setValues, values, errors, touched, isSubmitting, setSubmitting }: FormikProps<TFormValues> =
    useFormik<TFormValues>({
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
  const submitForm = async (data: any) => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    try {
      setStatus('submitting');

      const { data } = await API.graphql<GraphQLQuery<UpdateWelcomeMessageMutation>>({
        query: updateWelcomeMessage,
        variables: {
          input: values
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
      });

      if (data) {
        setStatus('success');
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
    const getWelcomeMessage = async (limit: number) => {
      try {
        setLoading(true);
        const { data } = await API.graphql<GraphQLQuery<ListWelcomeMessagesQuery>>(graphqlOperation(listWelcomeMessages, { limit }));

        const welcomeMessage: WelcomeMessage = data.listWelcomeMessages.items[0];
        setValues({
          id: welcomeMessage.id,
          title: welcomeMessage.title,
          content: welcomeMessage.content,
          footer: welcomeMessage.footer
        });
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    getWelcomeMessage(1);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AdminLayout title='Welcome Message' user={user}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField fullWidth name='title' label='Title' value={values.title} onChange={handleChange} />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              name='content'
              label='Content'
              multiline
              rows={10}
              value={values.content}
              onChange={handleChange}
              error={Boolean((touched?.content && errors?.content) || false)}
              helperText={errors?.content || ''}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth name='footer' label='Footer' value={values.footer} onChange={handleChange} />
          </Grid>

          <Grid item xs={12}>
            <SubmitButton disabled={status === 'submitting'} loading={status === 'submitting'} btnText='Save' />
          </Grid>
        </Grid>
      </form>
    </AdminLayout>
  );
};

export default Index;
