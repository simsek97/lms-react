import ContactForm from '@/components/ContactUs/ContactForm';
import ContactInfo from '@/components/ContactUs/ContactInfo';
import PageContent from '@/components/_App/PageContent';

const ContactUs = ({ user }) => {
  return (
    <PageContent pageTitle='Contact Us'>
      <ContactInfo />
      <ContactForm />
    </PageContent>
  );
};

export default ContactUs;
