import { GraphQLQuery } from '@aws-amplify/api';
import { Box } from '@mui/material';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { API } from 'aws-amplify';
import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';

import { SubscriptionTier, UpdateUserMutation, UserSubscriptionInput } from '@/src/API';
import { updateUser } from '@/src/graphql/mutations';
import { resetCartAction } from '@/store/actions/cartActions';
import { updateUserAction } from '@/store/actions/userActions';
import SubmitButton from '@/utils/SubmitButton';
import { toastErrorStyle, toastSuccessStyle } from '@/utils/toast';

const PlaceOrderBtn = ({ user, cartItems }) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();

  const cartItem: SubscriptionTier = cartItems[0];

  const handleCreateSubscription = async (token) => {
    setLoading(true);

    try {
      // create a payment method
      const paymentMethod = await stripe?.createPaymentMethod({
        type: 'card',
        card: elements?.getElement(CardElement)!,
        billing_details: {
          name: token?.card?.name || `${user.firstname} ${user.lastname}`,
          email: token?.email || user.email
        }
      });

      const response = await axios.post('/api/checkout', {
        cartItem,
        user,
        paymentMethodId: paymentMethod.paymentMethod.id
      });

      const confirmPayment = await stripe?.confirmCardPayment(response.data.clientSecret);

      if (confirmPayment?.error) {
        toast.error(confirmPayment.error.message, toastErrorStyle);
      } else {
        toast.success(response.data.message, toastSuccessStyle);
      }

      // Update user
      const subscribedAt = new Date();
      const userSubscription: UserSubscriptionInput = {
        tier: cartItem.tier,
        title: cartItem.title,
        price: cartItem.price,
        subscribedAt: subscribedAt.toDateString(),
        montlyPriceId: cartItem.montlyPriceId
      };

      const updateInput = user.stripeCustomerId
        ? {
            id: user.id,
            subscription: userSubscription
          }
        : {
            id: user.id,
            subscription: userSubscription,
            stripeCustomerId: response.data.customerId
          };

      await API.graphql<GraphQLQuery<UpdateUserMutation>>({
        query: updateUser,
        variables: {
          input: updateInput
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
      });

      // Update the user in the store
      const updateInputStore = user.stripeCustomerId
        ? {
            subscription: userSubscription
          }
        : {
            subscription: userSubscription,
            stripeCustomerId: response.data.customerId
          };

      dispatch(updateUserAction({ ...user, ...updateInputStore }));

      toast.success('Subscription has been saved successfully.', toastSuccessStyle);

      setLoading(false);

      setTimeout(() => {
        // Clear the store
        dispatch(resetCartAction());

        router.push('/profile/subscription');
      }, 3000);
    } catch (err) {
      console.log(err);
      const errorMessage = err?.response?.data?.message || 'Error occurred!';

      toast.error(errorMessage, {
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

  return (
    <>
      <Box sx={{ height: 36, border: '1px solid #d2d2d2', borderRadius: '4px', mb: 2, p: 1 }}>
        <CardElement options={{ style: { base: { padding: '8px' } } }} />
      </Box>

      <SubmitButton
        buttonType='button'
        loading={loading}
        disabled={cartItems.length == 0 || loading}
        btnText='Place Order'
        btnClass='w-100 default-btn'
        btnOnClick={handleCreateSubscription}
      />
    </>
  );
};

export default PlaceOrderBtn;
