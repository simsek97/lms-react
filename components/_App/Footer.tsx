import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <div className='footer-area bg-color-f6fafb pt-100 pb-70'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-3 col-sm-6'>
              <div className='single-footer-widget'>
                <a href='index.html' className='logo'>
                  <img src='/images/logo.png' className='main-logo' alt='logo' />
                  <img src='/images/white-logo.png' className='white-logo' alt='logo' />
                </a>
                <p>SmartKid Games is an educatinal technology platform for kids, serving hundreds of thousands around the world.</p>
                <p>We provide the industry’s most creative online content using cutting-edge machine learning technologies.</p>
              </div>
            </div>

            <div className='col-lg-3 col-sm-6'>
              <div className='single-footer-widget pl-40'>
                <h3>Quick Links</h3>

                <ul className='import-link'>
                  <motion.li
                    whileHover={{
                      scale: 1.1,
                      originX: 0,
                      transition: { duration: 0.5 }
                    }}>
                    <Link href='/about-us'>
                      <a>About Us</a>
                    </Link>
                  </motion.li>{' '}
                  <motion.li
                    whileHover={{
                      scale: 1.1,
                      originX: 0,
                      transition: { duration: 0.5 }
                    }}>
                    <Link href='/courses'>
                      <a>Courses</a>
                    </Link>
                  </motion.li>
                  <motion.li
                    whileHover={{
                      scale: 1.1,
                      originX: 0,
                      transition: { duration: 0.5 }
                    }}>
                    <Link href='/terms-conditions'>
                      <a>Terms & Conditions</a>
                    </Link>
                  </motion.li>
                  <motion.li
                    whileHover={{
                      scale: 1.1,
                      originX: 0,
                      transition: { duration: 0.5 }
                    }}>
                    <Link href='/privacy-policy'>
                      <a>Privacy Policy</a>
                    </Link>
                  </motion.li>
                </ul>
              </div>
            </div>

            <div className='col-lg-3 col-sm-6'>
              <div className='single-footer-widget pl-40'>
                <h3>Help Center</h3>

                <ul className='import-link'>
                  <motion.li
                    whileHover={{
                      scale: 1.1,
                      originX: 0,
                      transition: { duration: 0.5 }
                    }}>
                    <Link href='/contact-us'>
                      <a>Support</a>
                    </Link>
                  </motion.li>
                  <motion.li
                    whileHover={{
                      scale: 1.1,
                      originX: 0,
                      transition: { duration: 0.5 }
                    }}>
                    <Link href='/faq'>
                      <a>Get Help</a>
                    </Link>
                  </motion.li>
                </ul>
              </div>
            </div>

            <div className='col-lg-3 col-sm-6'>
              <div className='single-footer-widget'>
                <h3>Contact Info</h3>

                <ul className='info'>
                  <li>4237 Red Maple Ct, Burtonsville, MD 20866</li>
                  <li>
                    <a href='mailto:info@smartkid.games'>info@smartkid.games</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <img src='/images/footer-shape-1.png' className='shape shape-1' alt='footer' />
        <img src='/images/footer-shape-2.png' className='shape shape-2' alt='footer' />
      </div>

      <div className='copy-right-area bg-color-f6fafb'>
        <div className='container'>
          <p>
            &copy; SmartKid.Games {currentYear} is Proudly Powered by{' '}
            <a href='http://smartclass.biz/' target='_blank' rel='noreferrer'>
              SmartClass
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
