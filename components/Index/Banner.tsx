import Link from 'next/link';
import React from 'react';
import SearchForm from '@/components/_App/SearchForm';
import AnimatedCharacters from './BannerText';
import { motion } from 'framer-motion';

const Banner = () => {
  const headingText = [
    {
      type: 'heading',
      text: 'What is SmartKid?'
    }
  ];

  const variants = {
    visible: {
      transition: {
        staggerChildren: 0.025
      }
    }
  };

  const pVariants = {
    hidden: {
      scale: 0.8,
      opacity: 0
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        delay: 1.9
      }
    }
  };

  return (
    <div className='banner-area bg-1'>
      <div className='container-fluid'>
        <div className='row align-items-center'>
          <div className='col-lg-6'>
            <div className='banner-img'>
              <motion.img initial={{ scale: 0 }} animate={{ scale: 1 }} src='/images/home/kid.png' alt='banner' />
            </div>
          </div>

          <div className='col-lg-6'>
            <motion.div initial='hidden' animate='visible' variants={variants} className='banner-content'>
              {headingText.map((item, index) => {
                return <AnimatedCharacters {...item} key={index} />;
              })}

              <motion.p initial='hidden' animate='visible' variants={pVariants}>
                <span>SmartKid.Games</span> is where kids can learn at <span>any time</span>, in <span>any place</span> and at an{' '}
                <span>individual pace</span> with having <span>fun</span>
              </motion.p>

              <div
                style={{
                  display: 'flex',
                  alignContent: 'space-between',
                  justifyContent: 'space-between',
                  marginBottom: '36px'
                }}>
                <motion.div initial='hidden' animate='visible' variants={pVariants} style={{ textAlign: 'center' }}>
                  <img src='/images/home/best.png' width={64} alt='best' />
                  <br />
                  <span>Best Choice</span>
                </motion.div>
                <motion.div initial='hidden' animate='visible' variants={pVariants} style={{ textAlign: 'center' }}>
                  <img src='/images/home/voice.png' width={64} alt='best' />
                  <br />
                  <span>Voice Interaction</span>
                </motion.div>
                <motion.div initial='hidden' animate='visible' variants={pVariants} style={{ textAlign: 'center' }}>
                  <img src='/images/home/everywhere.png' width={64} alt='best' />
                  <br />
                  <span>Use Everywhere</span>
                </motion.div>
              </div>

              <ul className='client-list'>
                <li>
                  <img src='/images/banner/client-1.jpg' alt='banner' />
                  <img src='/images/banner/client-2.jpg' className='client' alt='banner' />
                  <img src='/images/banner/client-3.jpg' className='client' alt='banner' />
                </li>
                <li>
                  <p>
                    50K+ kids already trusted on <span>SmartKid.Games</span>
                  </p>
                </li>
              </ul>

              <div
                style={{
                  marginTop: '48px'
                }}>
                <SearchForm formClass='search-form' btnClass='default-btn' banner={true} />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <img src='/images/banner/shape-1.svg' className='shape shape-1' alt='banner' />
      <img src='/images/banner/shape-2.svg' className='shape shape-2' alt='banner' />
      <img src='/images/banner/shape-3.svg' className='shape shape-3' alt='banner' />
    </div>
  );
};

export default Banner;
