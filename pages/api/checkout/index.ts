import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

//@ts-ignore
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      await createSubscription(req, res);
      break;
    default:
      res.status(405).json({
        message: `Method ${req.method} not allowed`
      });
  }
}

const createSubscription = async (req: NextApiRequest, res: NextApiResponse) => {
  const { cartItem, user, paymentMethodId } = req.body;

  try {
    let customerId = user?.stripeCustomerId || null;
    if (!customerId) {
      // Create a stripe customer
      const customer = await stripe.customers.create({
        name: `${user.firstname} ${user.lastname}`,
        email: user.email,
        payment_method: paymentMethodId,
        invoice_settings: {
          default_payment_method: paymentMethodId
        }
      });

      customerId = customer.id;
    }

    // get the price id from the front-end
    const priceId = cartItem.montlyPriceId;

    // create a stripe subscription
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      payment_settings: {
        payment_method_options: {
          card: {
            request_three_d_secure: 'any'
          }
        },
        payment_method_types: ['card'],
        save_default_payment_method: 'on_subscription'
      },
      expand: ['latest_invoice.payment_intent']
    });

    res.status(200).json({
      customerId: customerId,
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
      subscriptionId: subscription.id,
      message: 'Payment has been completed successfully.'
    });
  } catch (error) {
    res.status(400).json({
      error_code: 'create_subscription',
      message: error.message
    });
  }
};
