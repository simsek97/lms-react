import RegisterForm from '@/components/Authentication/RegisterForm';
import PageContent from '@/components/_App/PageContent';
import { motion } from 'framer-motion';

const Register = () => {
  return (
    <PageContent pageTitle='Register'>
      <div className='register-area ptb-100'>
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-lg-6'>
              <div className='register-img'>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src='/images/register-img.png' alt='Image' />
              </div>
            </div>
            <div className='col-lg-6'>
              <div className='register-form'>
                <motion.h2 initial={{ scale: 0 }} animate={{ scale: 1, x: 0 }} exit={{ scale: 0 }}>
                  Create your account
                </motion.h2>

                <div className='tab-content'>
                  <RegisterForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContent>
  );
};

export default Register;
