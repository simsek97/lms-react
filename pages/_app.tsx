import { ThemeProvider } from '@mui/material';
import { Amplify } from 'aws-amplify';
import axios from 'axios';
import { AppProps } from 'next/app';
import { destroyCookie, parseCookies } from 'nookies';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import '@etchteam/next-pagination/dist/index.css';
import 'react-accessible-accordion/dist/fancy-example.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'react-loading-skeleton/dist/skeleton.css';
import 'react-tabs/style/react-tabs.css';
import 'swiper/css';
import 'swiper/css/bundle';

// Global Styles
import '@/styles/animate.min.css';
import '@/styles/bootstrap.min.css';
import '@/styles/boxicons.min.css';
import '@/styles/flaticon.css';
import '@/styles/nprogress.css';
import '@/styles/remixicon.css';
import '@/styles/responsive.scss';
import '@/styles/style.scss';

// Dashboard
import '@/styles/dashboard.scss';

import Layout from '@/components/_App/Layout';
import awsExports from '@/src/aws-exports';
import store, { persistor } from '@/store/index';
import { theme } from '@/styles/theme';
import { redirectUser } from '@/utils/auth';

const userRoutes = ['/profile', '/profile/userinfo', '/profile/subscription', '/profile/photo', '/checkout'];

Amplify.configure({ ...awsExports, ssr: true });

function App({ Component, pageProps }: AppProps) {
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

App.getInitialProps = async ({ Component, ctx }) => {
  const { lms_react_users_token } = parseCookies(ctx);
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  // if a user not logged in then user can't access those pages
  const isUserRoute = userRoutes.includes(ctx.pathname);
  const isAdminRoute = ctx?.pathname.includes('/admin/');
  const isApiRoute = ctx?.pathname.includes('/api/');

  if (isApiRoute) {
    return {
      pageProps
    };
  } else {
    if (!lms_react_users_token) {
      if (isUserRoute || isAdminRoute) {
        redirectUser(ctx, '/auth/login');
      }
    } else {
      // if a user logged in then user can't access those pages
      const ifLoggedIn = ctx.pathname === '/auth/login' || ctx.pathname === '/auth/register' || ctx.pathname === '/forgot-password';
      if (ifLoggedIn) {
        redirectUser(ctx, '/');
      }

      try {
        const payload = { headers: { Authorization: lms_react_users_token } };
        const response = await axios.get('/api/users/getuser', payload);

        const user = response && response.data.user;

        if (!user) {
          destroyCookie(ctx, 'lms_react_users_token');
          redirectUser(ctx, '/auth/login');
        }
      } catch (err) {
        console.log('error', err);
        destroyCookie(ctx, 'lms_react_users_token');
        // redirectUser(ctx, "/");
      }
    }
  }

  return {
    pageProps
  };
};

export default App;
