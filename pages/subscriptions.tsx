import { GraphQLQuery } from '@aws-amplify/api';
import Grid from '@mui/material/Grid';
import { API, graphqlOperation } from 'aws-amplify';
import { useRouter } from 'next/router';
import React from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

import SubscriptionCard from '@/components/Subsciption/SubscriptionCard';
import PageContent from '@/components/_App/PageContent';
import { ListSubscriptionTiersQuery, SubscriptionTier } from '@/src/API';
import { listSubscriptionTiers } from '@/src/graphql/queries';
import { IReduxStore } from '@/store/index';
import { toastSuccessStyle } from '@/utils/toast';

const SubscriptionsPage = () => {
  const [subscriptions, setSubscriptions] = React.useState([]);
  const [isAdding, setAdding] = React.useState<string>();

  const router = useRouter();
  const dispatch = useDispatch();

  const user = useSelector((state: IReduxStore) => state.user.profile);
  const storeSubscriptions = useSelector((state: IReduxStore) => state.subscription.subscriptions);

  const pageSize = 20;

  const handleClickSubscribe = (tier: SubscriptionTier) => {
    if (user?.subscription) {
      const subscriptionMessage = `You already have a subscription. You can manage your subscription from your profile.`;
      toast.success(subscriptionMessage, toastSuccessStyle);
    } else {
      handleAddToCart(tier);
    }
  };

  const handleAddToCart = (tier: SubscriptionTier) => {
    try {
      setAdding(tier.id);

      dispatch({
        type: 'ADD_TO_CART',
        data: tier
      });

      setTimeout(() => {
        setAdding(null);
        router.push(`/checkout`);
      }, 3000);
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    const listTiers = async (limit: number) => {
      try {
        const { data } = await API.graphql<GraphQLQuery<ListSubscriptionTiersQuery>>(
          graphqlOperation(listSubscriptionTiers, { limit })
        );

        const updatedSubscriptions = [...subscriptions, ...data.listSubscriptionTiers.items];
        setSubscriptions(updatedSubscriptions.sort((a, b) => a.id - b.id));
      } catch (e) {
        console.log(e);
      }
    };

    if (storeSubscriptions.length === 0) {
      listTiers(pageSize);
    } else {
      setSubscriptions(storeSubscriptions);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageContent pageTitle='Subscription'>
      <Grid container spacing={3} sx={{ p: 2, mt: 3 }}>
        <Grid item xs={12} sx={{ fontSize: '1.1rem', mt: 3, mb: 3, textAlign: 'center', paddingTop: '0 !important' }}>
          Select your subscription for your kid&apos;s grade in order to access all learning contents.
        </Grid>

        <Grid item xs={12}>
          <Grid container item spacing={3}>
            {subscriptions
              .sort((a, b) => a.id - b.id)
              .map((tier: SubscriptionTier) => (
                <Grid key={tier.id} item xs={3}>
                  <SubscriptionCard tier={tier} adding={isAdding} handleClick={() => handleClickSubscribe(tier)} />
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>
    </PageContent>
  );
};

export default SubscriptionsPage;
