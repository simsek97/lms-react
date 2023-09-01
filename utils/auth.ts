import { Auth } from 'aws-amplify';
import cookie from 'js-cookie';
import Router from 'next/router';

export const handleLogin = (t: string, routeNext: any) => {
  cookie.set('lms_react_users_token', t);
  if (routeNext.query && routeNext.query.next) {
    Router.push(routeNext.query.next);
  } else {
    Router.push('/');
  }
};

export const handleLogout = async () => {
  try {
    await Auth.signOut();
  } catch (error) {
    console.log('error signing out: ', error);
  }
  cookie.remove('lms_react_users_token');
  Router.push('/');
};

export const destroyCookie = () => {
  cookie.remove('lms_react_users_token');
  //@ts-ignore
  Router.reload('/');
};

export const redirectUser = (ctx, location) => {
  if (ctx.req) {
    ctx.res.writeHead(302, { Location: location });
    ctx.res.end();
  } else {
    Router.push({ pathname: location, query: { next: ctx.pathname } });
  }
};

export const slugify = (string) => {
  return string
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};
