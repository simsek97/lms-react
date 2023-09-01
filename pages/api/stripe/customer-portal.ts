import { NextApiRequest, NextApiResponse } from 'next';

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15'
});

export default async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      await createCustomerPortalSession(req, res);
      break;
    default:
      res.status(405).json({
        message: `Method ${req.method} not allowed`
      });
  }
}

const createCustomerPortalSession = async (req: NextApiRequest, res: NextApiResponse) => {
  const { customer } = req.body;

  var host = 'https://' + req.headers.host;

  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: customer,
      return_url: host + '/profile/subscription'
    });

    // res.redirect(session.url);
    res.status(200).json({
      session_url: session.url,
      message: 'Customer portal session has been created.'
    });
  } catch (error) {
    res.status(400).json({
      error_code: 'create_customer_portal',
      message: error.message
    });
  }
};
