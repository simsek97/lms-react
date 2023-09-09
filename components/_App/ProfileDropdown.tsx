import React, { useState } from 'react';
import { motion } from 'framer-motion';

import Link from '@/utils/ActiveLink';
import { handleLogout } from '@/utils/auth';
import { Auth } from 'aws-amplify';
import { resetUserAction } from '@/store/actions/userActions';
import { useDispatch } from 'react-redux';

const ProfileDropdown = ({ user }) => {
  const [isMouse, toggleMouse] = useState(false);
  const dispatch = useDispatch();

  const isAdmin = ((user?.role as string) || '').toLowerCase() === 'admin';

  const toggleMouseMenu = () => {
    toggleMouse(!isMouse);
  };

  const handleUserLogout = async () => {
    try {
      // Logout user
      await Auth.signOut({ global: true });

      // Clear the store
      dispatch(resetUserAction());

      // Remove cookies
      handleLogout();
    } catch (e) {
      console.log(e);
    }
  };

  const subMenuAnimate = {
    enter: {
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.3
      },
      display: 'block'
    },
    exit: {
      opacity: 0,
      rotateX: -15,
      transition: {
        duration: 0.3
        // delay: 0.3,
      },
      transitionEnd: {
        display: 'none'
      }
    }
  };

  return (
    <motion.div className='dropdown profile-dropdown' onMouseEnter={toggleMouseMenu} onMouseLeave={toggleMouseMenu}>
      <div className='img ptb-15'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={user?.avatarUrl || '/images/avatar.jpg'} alt={`${user.firstname} ${user.lastname}`} width={36} height={36} />
      </div>
      <motion.ul className='dropdown-menu' initial='exit' animate={isMouse ? 'enter' : 'exit'} variants={subMenuAnimate}>
        <li>
          <Link href='/profile/basic-information/'>
            <a className='dropdown-item author-dropdown-item'>
              <div className='d-flex align-items-center'>
                <div className='img'>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={user?.avatarUrl || '/images/avatar.jpg'}
                    alt={`${user.firstname} ${user.lastname}`}
                    width={36}
                    height={36}
                  />
                </div>

                <span className='ps-3'>
                  <span className='fw-semibold fs-16 d-block'>{`${user.firstname} ${user.lastname}`}</span>
                  <span className='d-block fs-12 mt-minus-2'>{user.email}</span>
                  {isAdmin && (
                    <span className='d-block fs-12 mt-minus-2' style={{ color: 'red' }}>
                      Admin
                    </span>
                  )}
                </span>
              </div>
            </a>
          </Link>
        </li>

        <li>
          <hr className='dropdown-divider' />
        </li>

        <li>
          <Link href='/learning/my-courses/'>
            <a className='dropdown-item'>
              <i className='bx bx-book'></i>
              My Learning
            </a>
          </Link>
        </li>

        <li>
          <Link href='/learning/wishlist/'>
            <a className='dropdown-item'>
              <i className='bx bxs-heart'></i>
              Wishlist
            </a>
          </Link>
        </li>

        <li>
          <Link href='/profile/subscription/'>
            <a className='dropdown-item'>
              <i className='bx bx-credit-card-front'></i>
              My Subscription
            </a>
          </Link>
        </li>

        <li>
          <Link href='/profile/userinfo/'>
            <a className='dropdown-item'>
              <i className='bx bxs-user-account'></i> My Account
            </a>
          </Link>
        </li>

        <li>
          <hr className='dropdown-divider' />
        </li>

        {isAdmin && (
          <>
            <li>
              <Link href='/admin/dashboard'>
                <a className='dropdown-item'>
                  <i className='bx bxs-dashboard'></i> Admin
                </a>
              </Link>
            </li>

            {/* <li>
              <Link href='/instructor/courses'>
                <a className='dropdown-item'>
                  <i className='bx bx-book'></i>
                  Courses
                </a>
              </Link>
            </li> */}

            <li>
              <hr className='dropdown-divider' />
            </li>
          </>
        )}

        <li>
          <button type='submit' onClick={handleUserLogout} className='dropdown-item'>
            <i className='bx bx-log-out'></i> Log out
          </button>
        </li>
      </motion.ul>
    </motion.div>
  );
};

export default ProfileDropdown;
