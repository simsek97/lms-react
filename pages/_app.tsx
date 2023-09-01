import { Amplify, Auth } from 'aws-amplify';
import React from 'react';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { parseCookies, destroyCookie } from 'nookies';
import axios from 'axios';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from '@mui/material';

import 'react-accessible-accordion/dist/fancy-example.css';
import 'react-tabs/style/react-tabs.css';
import 'swiper/css';
import 'swiper/css/bundle';
import 'react-confirm-alert/src/react-confirm-alert.css';
import '@etchteam/next-pagination/dist/index.css';
import 'react-loading-skeleton/dist/skeleton.css';

// Global Styles
import '@/styles/bootstrap.min.css';
import '@/styles/animate.min.css';
import '@/styles/boxicons.min.css';
import '@/styles/flaticon.css';
import '@/styles/remixicon.css';
import '@/styles/nprogress.css';
import '@/styles/style.scss';
import '@/styles/responsive.scss';

// Dashboard
import '@/styles/dashboard.scss';

import { redirectUser } from '@/utils/auth';
import baseUrl from '@/utils/baseUrl';
import store, { persistor } from '@/store/index';
import Layout from '@/components/_App/Layout';
import awsExports from '@/src/aws-exports';
import { theme } from '@/styles/theme';

const userRoutes = ['/profile', '/profile/userinfo', '/profile/subscription', '/profile/photo', '/checkout'];
const adminRoutes = [
  '/admin',
  '/admin/admins',
  '/admin/banner-ads',
  '/admin/dashboard',
  '/admin/faqs',
  '/admin/subscription-tiers',
  '/admin/subscriptions',
  '/admin/users',
  '/admin/welcome-message'
];

Amplify.configure({ ...awsExports, ssr: true });

function LmsApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

LmsApp.getInitialProps = async ({ Component, ctx }) => {
  const { isid_user_token } = parseCookies(ctx);
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  // if a user not logged in then user can't access those pages
  const isUserRoute = userRoutes.includes(ctx.pathname);
  const isAdminRoute = adminRoutes.includes(ctx.pathname) || ctx?.pathname.includes('/admin/');
  const isApiRoute = ctx?.pathname.includes('/api/');

  if (isApiRoute) {
    return {
      pageProps
    };
  } else {
    if (!isid_user_token) {
      if (isUserRoute || isAdminRoute) {
        redirectUser(ctx, '/login');
      }
    } else {
      // if a user logged in then user can't access those pages
      const ifLoggedIn = ctx.pathname === '/login' || ctx.pathname === '/reset-password';
      if (ifLoggedIn) {
        redirectUser(ctx, '/');
      }

      try {
        const payload = { headers: { Authorization: isid_user_token } };
        const response = await axios.get('/api/users/getuser', payload);
        const user = response && response.data.user;

        if (!user) {
          destroyCookie(ctx, 'isid_user_token');
          redirectUser(ctx, '/auth/login');
        }
      } catch (err) {
        console.log('error', err);
        destroyCookie(ctx, 'isid_user_token');
        // redirectUser(ctx, "/");
      }
    }
  }

  return {
    pageProps
  };
};

export default LmsApp;
