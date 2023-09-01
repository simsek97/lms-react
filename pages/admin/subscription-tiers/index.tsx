import { GraphQLQuery } from '@aws-amplify/api';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import { API, graphqlOperation } from 'aws-amplify';
import { FormikProps, prepareDataForValidation, useFormik, validateYupSchema, yupToFormErrors } from 'formik';
import React from 'react';
import * as Yup from 'yup';

import AdminLayout from '@/components/Admin/AdminLayout';
import { ListSubscriptionTiersQuery, SubscriptionTier, UpdateSubscriptionTierMutation } from '@/src/API';
import { updateSubscriptionTier } from '@/src/graphql/mutations';
import { listSubscriptionTiers } from '@/src/graphql/queries';
import SubmitButton from '@/utils/SubmitButton';

interface ISubscriptionTier {
  id: string;
  tier: string;
  title: string;
  price: number;
  description?: string[];
  descriptionString?: string;
  montlyPriceId?: string;
  yearlyPriceId?: string;
}

const initialValues = {
  id: '',
  tier: '',
  title: '',
  price: 0,
  description: [],
  descriptionString: '',
  montlyPriceId: '',
  yearlyPriceId: ''
};

const Index = ({ user }) => {
  const [subscriptions, setSubscriptions] = React.useState<ISubscriptionTier[]>([]);
  const [selectedTier, setSelectedTier] = React.useState(null);
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [isUpdating, setUpdating] = React.useState<boolean>(false);
  const [status, setStatus] = React.useState<string>('');
  const [statusError, setStatusError] = React.useState<string>('');
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [page, setPage] = React.useState(0);
  const [pageToken, setPageToken] = React.useState(null);

  const pageSize = 10;

  const columns = [
    {
      flex: 1,
      field: 'id',
      headerName: 'ID',
      renderCell: (params) => {
        const { row } = params;

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography noWrap variant='caption'>
              {row.id}
            </Typography>
          </Box>
        );
      }
    },
    {
      flex: 10,
      minWidth: 200,
      field: 'tier',
      headerName: 'Tier'
    },
    {
      flex: 10,
      minWidth: 200,
      field: 'title',
      headerName: 'Title'
    },
    {
      flex: 10,
      minWidth: 75,
      field: 'price',
      headerName: 'Price',
      renderCell: (params) => {
        return <Box sx={{ display: 'flex', alignItems: 'center' }}>${params.row.price}</Box>;
      }
    },
    {
      flex: 10,
      minWidth: 150,
      field: 'priceApi',
      headerName: 'Price API',
      renderCell: (params) => {
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography>{(params.row?.montlyPriceId && `Monthly: ${params.row?.montlyPriceId}`) || ''}</Typography>
            <Typography>{(params.row?.yearlyPriceId && `Yearly: ${params.row?.yearlyPriceId}`) || ''}</Typography>
          </Box>
        );
      }
    },
    {
      flex: 30,
      minWidth: 150,
      field: 'description',
      headerName: 'Description',
      renderCell: (params) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ul>
              {params.row.description.map((d) => (
                <Typography key={d} component='li'>
                  {d}
                </Typography>
              ))}
            </ul>
          </Box>
        );
      }
    },
    {
      width: 75,
      field: 'actions',
      headerName: 'Actions',
      renderCell: (params) => {
        return (
          <IconButton size='small' onClick={() => handleActions(params.row)}>
            <MoreVertIcon />
          </IconButton>
        );
      }
    }
  ];

  // Form validation rules
  const validationSchema = Yup.object().shape({
    tier: Yup.string().required('Tier is required'),
    title: Yup.string().required('Title is required'),
    price: Yup.string().required('Price is required')
  });

  const validateForm = (values: ISubscriptionTier) => {
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

  const { handleSubmit, handleChange, setValues, values, errors, touched }: FormikProps<ISubscriptionTier> =
    useFormik<ISubscriptionTier>({
      validate: (values: ISubscriptionTier) => validateForm(values),
      onSubmit: (values: ISubscriptionTier) => submitForm(values),
      initialValues: initialValues
    });

  const handleCloseModal = () => {
    setSelectedTier(null);
    setValues(initialValues);
  };

  const handleActions = (tier: ISubscriptionTier) => {
    setSelectedTier(tier);
    setValues({ ...tier, descriptionString: tier.description.join(',') });
  };

  const submitForm = async (values: ISubscriptionTier) => {
    setUpdating(true);

    try {
      const updatedTier: Partial<SubscriptionTier> = {
        id: values.id,
        tier: values.tier,
        title: values.title,
        price: values.price,
        description: values.descriptionString.split(','),
        montlyPriceId: values.montlyPriceId,
        yearlyPriceId: values.yearlyPriceId
      };
      // Update the subscription tier on Dynamodb
      const { data } = await API.graphql<GraphQLQuery<UpdateSubscriptionTierMutation>>({
        query: updateSubscriptionTier,
        variables: {
          input: updatedTier
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
      });

      // Update the subscription on ui
      const updatedSubscriptions = subscriptions.map((s: ISubscriptionTier) => {
        if (s.id === updatedTier.id) {
          return { ...s, ...data.updateSubscriptionTier };
        }

        return s;
      });

      setSubscriptions([...updatedSubscriptions]);
    } catch (e) {
      console.log(e);
    } finally {
      setUpdating(false);
      setSelectedTier(null);
    }
  };

  React.useEffect(() => {
    const listTiers = async (limit: number) => {
      try {
        setLoading(true);
        const { data } = await API.graphql<GraphQLQuery<ListSubscriptionTiersQuery>>(
          graphqlOperation(listSubscriptionTiers, { limit })
        );

        setPageToken(data.listSubscriptionTiers.nextToken);

        const updatedSubscriptions = [...subscriptions, ...data.listSubscriptionTiers.items];
        setSubscriptions(updatedSubscriptions.sort((a, b) => Number(a.id) - Number(b.id)) as ISubscriptionTier[]);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    listTiers(pageSize);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <AdminLayout title='Subscription Tiers' user={user}>
      <DataGrid autoHeight loading={isLoading} rows={subscriptions} columns={columns} hideFooter={true} rowHeight={100} />
      <Box sx={{ textAlign: 'center', p: 1, gap: 1 }}>
        {pageToken && (
          <Button
            startIcon={isLoading && <CircularProgress size={12} color='inherit' />}
            variant='contained'
            onClick={() => setPage(page + 1)}>
            Show More
          </Button>
        )}
      </Box>

      <Dialog open={Boolean(selectedTier)} onClose={handleCloseModal}>
        <form id='update-tier-form' onSubmit={handleSubmit}>
          <DialogTitle>Update Subscription Tier</DialogTitle>

          <Divider />

          <DialogContent sx={{ width: 450 }}>
            <TextField hidden name='id' value={values?.id || ''} />

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name='tier'
                  label='Tier'
                  value={values?.tier || ''}
                  onChange={handleChange}
                  error={Boolean((touched?.tier && errors?.tier) || false)}
                  helperText={errors?.tier || ''}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name='title'
                  label='Title'
                  value={values?.title || ''}
                  onChange={handleChange}
                  error={Boolean((touched?.title && errors?.title) || false)}
                  helperText={errors?.title || ''}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name='price'
                  label='Price'
                  value={values?.price || 0}
                  onChange={handleChange}
                  error={Boolean((touched?.price && errors?.price) || false)}
                  helperText={errors?.price || ''}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name='descriptionString'
                  label='Description - comma separated'
                  value={values?.descriptionString || ''}
                  onChange={handleChange}
                  error={Boolean((touched?.descriptionString && errors?.descriptionString) || false)}
                  helperText={errors?.descriptionString || ''}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name='montlyPriceId'
                  label='Monthly Price API'
                  value={values?.montlyPriceId || ''}
                  onChange={handleChange}
                  error={Boolean((touched?.montlyPriceId && errors?.montlyPriceId) || false)}
                  helperText={errors?.montlyPriceId || ''}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name='yearlyPriceId'
                  label='Yearly Price API'
                  value={values?.yearlyPriceId || ''}
                  onChange={handleChange}
                  error={Boolean((touched?.yearlyPriceId && errors?.yearlyPriceId) || false)}
                  helperText={errors?.yearlyPriceId || ''}
                />
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions>
            <SubmitButton disabled={isUpdating} loading={isUpdating} btnText='Save' />
            <Button onClick={handleCloseModal}>Cancel</Button>
          </DialogActions>
          <input type='submit' hidden />
        </form>
      </Dialog>
    </AdminLayout>
  );
};

export default Index;
