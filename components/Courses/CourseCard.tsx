import axios from 'axios';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';

import { IReduxStore } from '@/store/index';
import baseUrl from '@/utils/baseUrl';
import { ISubscriptionTier } from '@/data/subscription-tier';

const CourseCard = ({ course, userId, subscriptions, onAddCart }) => {
  const router = useRouter();
  const [add, setAdd] = React.useState(false);
  const [buy, setBuy] = React.useState(false);

  const { id, title, slug, shortDesc, latestPrice, beforePrice, lessons, image, category, level } = course;
  const cartItems = useSelector((state: IReduxStore) => state.cart.cartItems);

  const subscriptionTier: ISubscriptionTier = subscriptions.find((s: ISubscriptionTier) => s.tier === level.slug);

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

  return (
    <div className='col-lg-3 col-md-6'>
      <div className='single-courses'>
        <div className='courses-main-img'>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image || '/images/courses/course-9.jpg'} alt='Course Image' />
        </div>
        <div className='courses-content'>
          <h3>{title}</h3>
          <div className='courses-tags'>
            <div className='badge bg-primary courses-level-tag'>{level.name}</div>
            <div className='badge bg-success courses-category-tag'>{category.name}</div>
            <div className='courses-price'>${latestPrice}</div>
          </div>
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
                      <button className='default-btn' onClick={() => onAddCart(subscriptionTier)}>
                        {`Subscribe to ${subscriptionTier.title}`}
                      </button>
                    )}
                  </>
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
