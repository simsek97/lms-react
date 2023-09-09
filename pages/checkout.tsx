import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

import CheckoutList from '@/components/Checkout/CheckoutList';
import PlaceOrderBtn from '@/components/Checkout/PlaceOrderBtn';
import { ISubscription } from '@/components/Subsciption/tiers';
import PageContent from '@/components/_App/PageContent';
import { resetCartAction } from '@/store/actions/cartActions';
import { IReduxStore } from '@/store/index';
import { calculateCartTotal } from '@/utils/calculateCartTotal';
import { toastErrorStyle } from '@/utils/toast';

const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = () => {
  const [cartAmout, setCartAmaount] = React.useState<number>(0);
  const [isWarningShown, setWarningShown] = React.useState<boolean>(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector((state: IReduxStore) => state.user.profile);
  const cartItems = useSelector((state: IReduxStore) => state.cart.cartItems);

  const activeSubscription = user?.subscription || null;

  const handleRemove = async () => {
    dispatch(resetCartAction());
  };

  React.useEffect(() => {
    const { cartTotal } = calculateCartTotal(cartItems, 'monthly');

    setCartAmaount(parseFloat(cartTotal));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems]);

  React.useEffect(() => {
    if (activeSubscription && cartItems.length > 0 && !isWarningShown) {
      toast.error('You already have a subscription. You can manage your subscription from your profile.', toastErrorStyle);

      setTimeout(() => {
        router.push('/profile/subscription');
      }, 1500);
    }

    return () => {
      // dispatch(resetCartAction());
      setWarningShown(true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageContent pageTitle='Checkout'>
      <Elements stripe={stripePromise}>
        <div className='cart-area ptb-100'>
          <div className='container'>
            <div className='row justify-content-center'>
              <div className='col-lg-7'>
                <div className='cart-content'>
                  <ul className='single-cart'>
                    {cartItems.length > 0 ? (
                      <AnimatePresence>
                        {cartItems.map((cart: ISubscription) => (
                          <CheckoutList key={cart.id} {...cart} onRemove={() => handleRemove()} />
                        ))}
                      </AnimatePresence>
                    ) : (
                      <motion.div
                        className='col-lg-12 text-center'
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1 }}>
                        <h3
                          style={{
                            textAlign: 'center',
                            fontWeight: 'bold',
                            color: '#0000001f',
                            fontSize: '93px'
                          }}>
                          Empty
                        </h3>
                        <Link href='/subscriptions'>
                          <a className='default-btn'>Go to Subscriptions</a>
                        </Link>
                      </motion.div>
                    )}
                  </ul>
                </div>
              </div>

              {cartItems.length > 0 && (
                <div className='col-lg-5'>
                  <div className='cart-total'>
                    <h3>
                      Total <span>${cartAmout}</span>
                    </h3>

                    <PlaceOrderBtn user={user} cartItems={cartItems} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Elements>
    </PageContent>
  );
};

export default CheckoutForm;
