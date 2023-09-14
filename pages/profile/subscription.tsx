import { GraphQLQuery } from '@aws-amplify/api';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import Link from 'next/link';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { API, graphqlOperation } from 'aws-amplify';
import axios from 'axios';
import { useRouter } from 'next/router';

import PageContent from '@/components/_App/PageContent';
import UserNavbar from '@/components/_App/UserNavbar';
import { GetUserQuery } from '@/src/API';
import { getUser } from '@/src/graphql/queries';
import { updateUserSubscriptionAction } from '@/store/actions/userActions';
import { IReduxStore } from '@/store/index';

const PricingList = styled('ul')({
  margin: 0,
  padding: 0,
  listStyle: 'none'
});

const Subscription = () => {
  const [showConfirm, setShowConfirm] = React.useState(false);

  const dispacth = useDispatch();
  const router = useRouter();

  const user = useSelector((state: IReduxStore) => state.user.profile);

  const activeSubscription = user?.subscription;
  const individualSubscriber = user?.stripeCustomerId;

  const isCanceled = activeSubscription?.canceled === 'yes' ? true : false;
  const isExpires = activeSubscription?.expiresAt ? true : false;
  const subheader = isExpires
    ? `Subscription is valid until ${activeSubscription?.expiresAt}`
    : `Subscribed on ${activeSubscription?.subscribedAt}`;

  const handleCloseModal = () => {
    setShowConfirm(false);
  };

  const handleCancelSubscription = () => {};

  const handleManageSubscription = async () => {
    try {
      const response = await axios.post('/api/stripe/customer-portal', {
        customer: user.stripeCustomerId
      });

      if (response) {
        router.push(response.data.session_url);
      }
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    const getUserInfo = async () => {
      const { data } = await API.graphql<GraphQLQuery<GetUserQuery>>(graphqlOperation(getUser, { id: user.id }));

      if (data) {
        const userInfo = data.getUser;

        dispacth(updateUserSubscriptionAction(userInfo?.subscription));
      }
    };

    getUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageContent>
      <Grid container spacing={3} sx={{ p: 3 }}>
        <Grid item xs={12}>
          <UserNavbar active='/profile/subscription' />
        </Grid>

        {activeSubscription ? (
          <Grid container item spacing={3}>
            <Grid item xs={12} sm={6}>
              <Box>
                <Card sx={{ maxWidth: 450 }}>
                  <CardHeader title={`${activeSubscription.title} ${isCanceled ? '[Canceled]' : ''}`} subheader={subheader} />
                  <CardContent>
                    {individualSubscriber && (
                      <Typography variant='h6' color='text.primary'>
                        ${activeSubscription.price}/mo
                      </Typography>
                    )}

                    <PricingList>
                      {activeSubscription?.description?.map((line: string) => (
                        <Typography component='li' variant='subtitle1' align='center' key={line}>
                          {line}
                        </Typography>
                      ))}
                    </PricingList>
                  </CardContent>
                  <CardActions>
                    {(user?.stripeCustomerId && (
                      <Button type='submit' size='small' onClick={handleManageSubscription}>
                        Manage Subscription
                      </Button>
                    )) || <Typography>Your subscription is managed by your organization.</Typography>}
                  </CardActions>
                </Card>
              </Box>
            </Grid>
          </Grid>
        ) : (
          <Grid container item spacing={3}>
            <Grid item xs={12} sm={6}>
              <Box>
                <p>There is no active subscription.</p>
                <Link href='/subscription'>
                  <a>Go to Subscriptions</a>
                </Link>
              </Box>
            </Grid>
          </Grid>
        )}
      </Grid>

      {showConfirm && (
        <Dialog open={true} onClose={handleCloseModal} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
          <DialogTitle>
            Confirm <strong>Cancel Subscription</strong>
          </DialogTitle>

          <Divider />

          <DialogContent sx={{ width: 450 }}>
            Are you sure to cancel your subscription? This will cancel your subscription and you will not be able to access any
            services.
            <br />
            <br />
            If you cancel your subscription, you will get refunded for the remaining months of your subscription term.
          </DialogContent>

          <DialogActions>
            <Button color='error' onClick={handleCancelSubscription}>
              Cancel Subscription
            </Button>
            <Button onClick={handleCloseModal}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </PageContent>
  );
};

export default Subscription;
