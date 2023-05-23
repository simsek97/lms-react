import React, { useState } from 'react';
import Link from 'next/link';
import { handleLogout } from '@/utils/auth';
import { motion } from 'framer-motion';

const TopHeader = ({ user }) => {
  return (
    <motion.div
      className='top-header-area bg-color-a7c724'
      initial={{ y: -25 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}>
      <div className='container-fluid'>
        <div className='row align-items-center'>
          <div className='col-lg-8'>
            {/* <div className='header-left-content'>
              <p>
                Keep learning with free resources during COVID-19.{' '}
                <Link href='/about-us'>
                  <a className='read-more'>
                    Learn more <i className='ri-arrow-right-line'></i>
                  </a>
                </Link>
              </p>
            </div> */}
          </div>

          <div className='col-lg-4'>
            <ul className='header-right-content'>
              <li>
                <Link href='/auth/register'>
                  <a>Register</a>
                </Link>
              </li>
              <li className='auth-link'>
                {user ? (
                  <Link href='#'>
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        handleLogout();
                      }}>
                      <i className='bx bx-log-out'></i> Logout
                    </a>
                  </Link>
                ) : (
                  <Link href='/auth/login'>
                    <a>
                      <i className='ri-arrow-right-line'></i> Login
                    </a>
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TopHeader;
