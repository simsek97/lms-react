import Box from '@mui/material/Box';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

interface IPageContent {
  pageTitle?: string;
  activePageText?: string;
  parentPageUrl?: string;
  parentPageText?: string;
}

const PageContent = (props: PropsWithChildren<IPageContent>) => {
  const { pageTitle, activePageText, parentPageUrl, parentPageText } = props;

  const variants = {
    hidden: {
      scale: 0.8,
      opacity: 0
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        delay: 0.2
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
        delay: 0.4
      }
    }
  };

  return (
    <Box sx={{ minHeight: 800 }}>
      {pageTitle && (
        <Box className='pages-banner-area ptb-100'>
          <Box className='container'>
            <Box className='pages-banner-content'>
              <motion.h2 initial='hidden' animate='visible' variants={variants}>
                {pageTitle}
              </motion.h2>
              <motion.ul initial='hidden' animate='visible' variants={pVariants}>
                <li>
                  <Link href='/'>
                    <a>Home</a>
                  </Link>
                </li>
                {parentPageText && (
                  <li>
                    <Link href={parentPageUrl}>
                      <a>{parentPageText}</a>
                    </Link>
                  </li>
                )}
                {activePageText && <li>{activePageText}</li>}
              </motion.ul>
            </Box>
          </Box>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src='/images/page-banner-shape-1.svg' className='shape shape-1' alt='courses' />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src='/images/page-banner-shape-2.svg' className='shape shape-2' alt='courses' />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src='/images/page-banner-shape-3.svg' className='shape shape-3' alt='courses' />
        </Box>
      )}

      <Box>{props?.children || null}</Box>
    </Box>
  );
};

export default PageContent;
