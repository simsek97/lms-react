import React from 'react';
import { motion } from 'framer-motion';

import PageBanner from '@/components/Common/PageBanner';
import Footer from '@/components/_App/Footer';
import Navbar from '@/components/_App/Navbar';
import LoginForm from '@/components/Authentication/LoginForm';

const Login = () => {
  return (
    <>
      <Navbar />
      <PageBanner pageTitle='Auth' homePageUrl='/' homePageText='Home' activePageText='Authentication' />
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
                  Login
                </motion.h2>

                <LoginForm />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Login;
