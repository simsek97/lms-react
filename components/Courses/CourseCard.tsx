import axios from 'axios';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';

import { IReduxStore } from '@/store/index';
import baseUrl from '@/utils/baseUrl';

const CourseCard = ({ course, onFav, onUnFav, userId, onAddCart }) => {
  const router = useRouter();
  const [fav, setfavs] = React.useState(false);
  const [add, setAdd] = React.useState(false);
  const [buy, setBuy] = React.useState(false);

  const { id, title, slug, shortDesc, latestPrice, beforePrice, lessons, image, category, level } = course;
  const cartItems = useSelector((state: IReduxStore) => state.cart.cartItems);

  React.useEffect(() => {
    setAdd(cartItems.some((cart) => cart.id === id));
    if (userId && course && id) {
      const payload = {
        params: { userId: userId, courseId: id }
      };
      const url = `${baseUrl}/api/courses/course/exist`;
      axios.get(url, payload).then((result) => {
        if (result && result.data.enroll === true) setBuy(result.data.enroll);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course, cartItems]);

  React.useEffect(() => {
    if (userId) {
      const payload = {
        params: {
          userId: userId,
          courseId: id
        }
      };

      const url = `${baseUrl}/api/favourites/new`;
      axios.get(url, payload).then((result) => {
        setfavs(result.data);
      });
    } else {
      setfavs(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fav]);

  return (
    <div className='col-lg-3 col-md-6'>
      <div className='single-courses'>
        <div className='courses-main-img'>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image || '/images/courses/course-9.jpg'} alt='Course Image' />
        </div>
        <div className='courses-content'>
          <h3>{title}</h3>
          <div className='courses-price'>${latestPrice}</div>
        </div>

        <div className='courses-hover-content'>
          <div className='sk'>
            <div>
              <h3>
                <Link href={`/course/${slug}`}>
                  <a>{title}</a>
                </Link>
              </h3>
              <p>{shortDesc?.slice(0, 108)}</p>

              <div className='courses-btn d-flex justify-content-between align-items-center'>
                {buy ? (
                  <button className='default-btn' onClick={() => router.push(`/learning/course/${slug}`)}>
                    View My Course
                  </button>
                ) : (
                  <>
                    {add ? (
                      <button className='default-btn' onClick={() => router.push('/checkout')}>
                        View Cart
                      </button>
                    ) : (
                      <button className='default-btn' onClick={() => onAddCart(course)}>
                        Add To Cart
                      </button>
                    )}
                  </>
                )}

                {fav ? (
                  <motion.button
                    whileTap={{ scale: 3 }}
                    transition={{ duration: 0.5 }}
                    className='default-btn wish'
                    onClick={() => {
                      onUnFav(id);
                      setfavs(!fav);
                    }}>
                    <i className='ri-heart-fill'></i>
                    <i className='ri-heart-fill hover'></i>
                  </motion.button>
                ) : (
                  <motion.button
                    whileTap={{ scale: 3 }}
                    transition={{ duration: 0.5 }}
                    className='default-btn wish'
                    onClick={() => {
                      onFav(id);
                      setfavs(!fav);
                    }}>
                    <i className='ri-heart-line'></i>
                    <i className='ri-heart-fill hover'></i>
                  </motion.button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
