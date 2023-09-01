import { GraphQLQuery } from '@aws-amplify/api';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { API, graphqlOperation } from 'aws-amplify';
import { FormikProps, prepareDataForValidation, useFormik, validateYupSchema, yupToFormErrors } from 'formik';
import React from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

import AdminLayout from '@/components/Admin/AdminLayout';
import { CreateFaqMutation, DeleteFaqMutation, Faq, ListFaqsQuery } from '@/src/API';
import { createFaq, deleteFaq } from '@/src/graphql/mutations';
import { listFaqs } from '@/src/graphql/queries';
import SubmitButton from '@/utils/SubmitButton';
import Button from '@mui/material/Button';

export const faqCategories = ['Registration/Login', 'Subscriptions', 'Billing', 'Need More Help?'];

type TFormValues = {
  category: string;
  question: string;
  answer: string;
};

const Index = ({ user }) => {
  const [faqs, setFaqs] = React.useState<Faq[]>([]);
  const [isLoading, setLoading] = React.useState<boolean>(false);

  const pageSize = 10;

  const defaultValues: TFormValues = {
    category: '',
    question: '',
    answer: ''
  };

  const { handleSubmit, handleChange, values, setValues, errors, touched, setTouched }: FormikProps<TFormValues> =
    useFormik<TFormValues>({
      initialValues: defaultValues,
      validate: (values: TFormValues) => validateForm(values),
      onSubmit: (values: TFormValues) => submitForm(values)
    });

  // Form validation rules
  const validationSchema = Yup.object().shape({
    category: Yup.string().required('Category is required'),
    question: Yup.string().required('Question is required'),
    answer: Yup.string().required('Answer is required')
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
      // Insert the banner on DynamoDB
      const { data } = await API.graphql<GraphQLQuery<CreateFaqMutation>>({
        query: createFaq,
        variables: {
          input: values
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
      });

      const updatedFaqs = [...faqs, data.createFaq];
      setFaqs(updatedFaqs);

      setLoading(false);
      setValues(defaultValues);
      setTouched({});

      toast.success('Faq has been successfully saved.');
    } catch (err) {
      console.log(err);
      toast.error('Faq could not be saved.', {
        style: {
          border: '1px solid #ff0033',
          padding: '16px',
          color: '#ff0033'
        },
        iconTheme: {
          primary: '#ff0033',
          secondary: '#FFFAEE'
        }
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (faq: Faq) => {
    try {
      // Remove the faq from DynamoDB
      await API.graphql<GraphQLQuery<DeleteFaqMutation>>({
        query: deleteFaq,
        variables: {
          input: {
            id: faq.id
          }
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
      });

      const updatedFaqs = faqs.filter((b) => b.id !== faq.id);
      setFaqs(updatedFaqs);

      toast.success('Faq has been successfully deleted.');
    } catch (err) {
      console.log(err);
      toast.error('Faq could not be deleted.', {
        style: {
          border: '1px solid #ff0033',
          padding: '16px',
          color: '#ff0033'
        },
        iconTheme: {
          primary: '#ff0033',
          secondary: '#FFFAEE'
        }
      });
    }
  };

  React.useEffect(() => {
    const getFaqs = async (limit: number) => {
      try {
        setLoading(true);
        const { data } = await API.graphql<GraphQLQuery<ListFaqsQuery>>(graphqlOperation(listFaqs, { limit }));

        const updatedFaqs = [...faqs, ...data.listFaqs.items];
        setFaqs(updatedFaqs.sort((a, b) => (a.createdAt as any) - (b.createdAt as any)));
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    getFaqs(pageSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AdminLayout title='FAQs' user={user}>
      <Box sx={{ mt: 3 }}>
        {faqCategories.map((faqCat) => {
          const faqsForCategory = faqs.filter((faq) => faq.category === faqCat);

          return (
            <Box key={faqCat} sx={{ p: 1 }}>
              {faqsForCategory.map((faq) => (
                <Card key={faq.id}>
                  <CardHeader title={faq.question} subheader={faq.category} />
                  <CardContent sx={{ px: 2 }}>{faq.answer}</CardContent>
                  <CardActions sx={{ px: 2 }}>
                    <Button size='small' startIcon={<i className='bx bxs-trash'></i>} onClick={() => handleDelete(faq)}>
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              ))}
            </Box>
          );
        })}

        <Box sx={{ mt: 1 }}>
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader title='Add New Question/Answer' />
              <CardContent sx={{ px: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  fullWidth
                  select
                  name='category'
                  label='Category'
                  value={values.category}
                  onChange={handleChange}
                  error={Boolean((touched?.category && errors?.category) || false)}
                  helperText={errors?.category || ''}>
                  {faqCategories.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  fullWidth
                  name='question'
                  label='Question'
                  value={values.question}
                  onChange={handleChange}
                  error={Boolean((touched?.question && errors?.question) || false)}
                  helperText={errors?.question || ''}
                />
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  name='answer'
                  label='Answer'
                  value={values.answer}
                  onChange={handleChange}
                  error={Boolean((touched?.answer && errors?.answer) || false)}
                  helperText={errors?.answer || ''}
                />
              </CardContent>

              <CardActions sx={{ px: 2 }}>
                <SubmitButton disabled={false} loading={isLoading} btnText='Save' btnClass='btn default-btn' />
              </CardActions>
            </Card>
          </form>
        </Box>
      </Box>
    </AdminLayout>
  );
};

export default Index;
