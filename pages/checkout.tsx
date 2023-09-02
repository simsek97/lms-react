import CheckoutForm from '@/components/Checkout/CheckoutForm';
import PageContent from '@/components/_App/PageContent';

const Checkout = ({ user }) => {
  return (
    <PageContent pageTitle='Checkout'>
      <CheckoutForm user={user} />
    </PageContent>
  );
};

export default Checkout;
