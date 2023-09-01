import axios from 'axios';
import { AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';

import GoTop from '@/components/_App/GoTop';
import baseUrl from '@/utils/baseUrl';
import Modal from '@/components/Modal';
import { appConfig } from '@/store/index';
import Navbar from '@/components/_App/Navbar';
import Footer from '@/components/_App/Footer';

const Layout = ({ children }) => {
  const [modalOpen, setModalOpen] = useState<boolean>();
  const [modalImage, setModalImage] = useState<string>('');

  useEffect(() => {
    const fetchSetting = async () => {
      const resp = await axios.get(`${baseUrl}/settings.json`);
      setModalOpen(resp.data.siteModal);
      setModalImage(resp.data.siteModalImage);
      if (resp.data.siteModal) {
        document.body.style.overflow = 'hidden';
      }
    };
    fetchSetting();
  }, []);

  const close = () => {
    setModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  return (
    <>
      <Head>
        <title>{appConfig.appName}</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <link rel='icon' href='/favicon.png' />
      </Head>

      <Navbar />

      {children}

      <Script src='https://meet.jit.si/external_api.js' />

      <Footer />

      <Toaster />

      <GoTop />

      <AnimatePresence initial={false} onExitComplete={() => null} mode='wait'>
        {modalOpen && modalImage && <Modal handleClose={close} image_url={modalImage} />}
      </AnimatePresence>
    </>
  );
};

export default Layout;
