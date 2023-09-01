import React from 'react';
import Router from 'next/router';
import NProgress from 'nprogress';
import Link from '@/utils/ActiveLink';
import ProfileDropdown from './ProfileDropdown';
import Cart from './Cart';
import SearchForm from './SearchForm';
import TopHeader from './TopHeader';
import { motion } from 'framer-motion';
import { handleLogout } from '@/utils/auth';

// Router events
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

interface INavbar {
  user?: any;
}

const Navbar = ({ user }: INavbar) => {
  const [menu, setMenu] = React.useState(true);

  const toggleNavbar = () => {
    setMenu(!menu);
  };

  React.useEffect(() => {
    let elementId = document.getElementById('navbar');
    document.addEventListener('scroll', () => {
      if (window.scrollY > 170) {
        elementId.classList.add('is-sticky');
      } else {
        elementId.classList.remove('is-sticky');
      }
    });
  });

  const classOne = menu ? 'collapse navbar-collapse' : 'collapse navbar-collapse show';
  const classTwo = menu ? 'navbar-toggler navbar-toggler-right collapsed' : 'navbar-toggler navbar-toggler-right';

  return (
    <>
      {/* <TopHeader user={user} /> */}
      <div id='navbar' className='navbar-area'>
        <div className='desktop-nav'>
          <div className='container-fluid'>
            <div className='navbar navbar-expand-lg navbar-light'>
              <Link href='/'>
                <a onClick={toggleNavbar} className='navbar-brand'>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src='/images/logo.png' alt='logo' />
                </a>
              </Link>

              <button onClick={toggleNavbar} className={classTwo} type='button'>
                <span className='icon-bar top-bar'></span>
                <span className='icon-bar middle-bar'></span>
                <span className='icon-bar bottom-bar'></span>
              </button>

              <div className={classOne} id='navbarSupportedContent'>
                <div className='others-options pe-0'>
                  <SearchForm formClass='search-form style1' btnClass='src-btn' />
                </div>

                <ul className='navbar-nav ms-auto'>
                  <motion.li
                    className='nav-item'
                    whileHover={{
                      scale: 1.1,
                      transition: { duration: 0.5 }
                    }}
                    whileTap={{ scale: 0.9 }}>
                    <Link href='/' activeClassName='active'>
                      <a onClick={toggleNavbar} className='nav-link'>
                        Home
                      </a>
                    </Link>
                  </motion.li>

                  <motion.li
                    className='nav-item'
                    whileHover={{
                      scale: 1.1,
                      transition: { duration: 0.5 }
                    }}
                    whileTap={{ scale: 0.9 }}>
                    <Link href='/courses' activeClassName='active'>
                      <a onClick={toggleNavbar} className='nav-link'>
                        Courses
                      </a>
                    </Link>
                  </motion.li>

                  {!user && (
                    <>
                      <motion.li
                        className='nav-item'
                        whileHover={{
                          scale: 1.1,
                          transition: { duration: 0.5 }
                        }}
                        whileTap={{ scale: 0.9 }}>
                        <Link href='/auth/register'>
                          <a className='nav-link'>Register</a>
                        </Link>
                      </motion.li>
                      <motion.li
                        className='nav-item'
                        whileHover={{
                          scale: 1.1,
                          transition: { duration: 0.5 }
                        }}
                        whileTap={{ scale: 0.9 }}>
                        <Link href='/auth/login'>
                          <a className='nav-link'>Login</a>
                        </Link>
                      </motion.li>
                    </>
                  )}
                </ul>
              </div>

              <div className='others-options'>
                <ul className='d-flex align-items-center'>
                  <li
                    style={{
                      marginLeft: '8px',
                      marginRight: '8px',
                      marginTop: '6px'
                    }}>
                    <Cart />
                  </li>

                  {user && (
                    <li className='profile_li'>
                      <ProfileDropdown {...user} />
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
