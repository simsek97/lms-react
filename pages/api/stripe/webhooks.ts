import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

import { SubscriptionTier, UserSubscriptionInput } from '@/src/API';
import getRawBody from '@/utils/getRawBody';
import getTiers from '@/utils/getTiers';
import getUserByCustomerId from '@/utils/getUserByCustomerId';
import updateUserById from '@/utils/updateUserById';

const STRIPE_WEBHOOKS_SECRET = process.env.STRIPE_WEBHOOKS_SECRET;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15'
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      await implementWebhooks(req, res);
      break;
    default:
      res.status(405).json({
        message: `Method ${req.method} not allowed`
      });
  }
}

export const config = {
  api: {
    bodyParser: false
  }
};

const implementWebhooks = async (req: NextApiRequest, res: NextApiResponse) => {
  const rawBody = await getRawBody(req);

  const sig = req.headers['stripe-signature'];

  try {
    const event: Stripe.Event = stripe.webhooks.constructEvent(rawBody, sig, STRIPE_WEBHOOKS_SECRET);

    let error = null;

    switch (event.type) {
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
        const subscription: Stripe.Subscription = event.data.object as Stripe.Subscription;

        const customerId = subscription?.customer || null;
        const newPrice = subscription?.items?.data[0]?.price || null;

        if (!customerId) {
          new Error('Customer does not exist');
        }
        if (!newPrice) {
          new Error('Subscription item does not exist');
        }

        if (newPrice) {
          const priceId = newPrice.id;

          const plans = await getTiers(20);

          const filteredPlans = plans.filter((p: SubscriptionTier) => p.montlyPriceId === priceId || p.yearlyPriceId === priceId);
          const newPlan = filteredPlans.length > 0 ? filteredPlans[0] : null;

          if (newPlan) {
            let newSubscription: UserSubscriptionInput;
            if (subscription.canceled_at) {
              const expiresAt = new Date(subscription.cancel_at);
              newSubscription = {
                tier: newPlan.tier,
                title: newPlan.title,
                price: newPlan.price,
                canceled: 'yes',
                expiresAt: expiresAt.toDateString()
              };
            } else {
              const subscribedAt = new Date();
              newSubscription = {
                tier: newPlan.tier,
                title: newPlan.title,
                price: newPlan.price,
                subscribedAt: subscribedAt.toDateString()
              };
              if (priceId === newPlan.yearlyPriceId) {
                newSubscription['yearlyPriceId'] = newPlan.yearlyPriceId;
              } else {
                newSubscription['montlyPriceId'] = newPlan.montlyPriceId;
              }
            }

            // Find the user by customer id
            const user = await getUserByCustomerId(customerId as string);

            // Update user subscription
            await updateUserById({
              id: user.id,
              subscription: newSubscription
            });
          }
        }
        break;

      case 'customer.subscription.deleted':
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
        error = `Unhandled event type ${event.type}`;
        break;
    }

    if (error) {
      res.status(400).json({
        error_code: 'stripe_webhooks',
        message: error
      });
    } else {
      res.status(200).json({
        message: 'Success'
      });
    }
  } catch (err) {
    console.log(`Webhook Error: ${err.message}`);
    res.status(400).json({
      error_code: 'stripe_webhooks',
      message: `Webhook Error: ${err.message}`
    });
  }
};
