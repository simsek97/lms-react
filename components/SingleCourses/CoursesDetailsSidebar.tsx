import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

import BuyCourseBtn from './BuyCourseBtn';
import { calculateDiscount } from '@/utils/helper';
import baseUrl from '@/utils/baseUrl';
import { IReduxStore } from '@/store/index';
import { ISubscriptionTier } from '@/data/subscription-tier';
import { toastSuccessStyle } from '@/utils/toast';
import { getS3File } from '@/utils/getS3File';
import { ICourse } from '@/data/course';
import { updateCoursesAction } from '@/store/actions/courseActions';

const CoursesDetailsSidebar = ({ course }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const courses = useSelector((state: IReduxStore) => state.course.courses);
  const subscriptions = useSelector((state: IReduxStore) => state.subscription.subscriptions);
  const user = useSelector((state: IReduxStore) => state.user.profile);

  const subscriptionTier: ISubscriptionTier = subscriptions.find((s: ISubscriptionTier) => s.tier === course?.level?.slug);
  const isUserSubscribedToCourse = user?.subscription?.tier === subscriptionTier.tier;

  const addToCart = (subscriptionTier: ISubscriptionTier) => {
    dispatch({
      type: 'ADD_TO_CART',
      data: subscriptionTier
    });

    toast.success('Subscription added to your cart', toastSuccessStyle);

    setTimeout(() => {
      router.push('/checkout');
    }, 1000);
  };

  const handleImageError = async () => {
    if (course?.image?.key) {
      const imageUrl = await getS3File(course.image.key);

      const updatedCourses = courses.map((c: ICourse) => {
        if (c.id === course.id) {
          c.image.url = imageUrl;
        }
        return c;
      });
      dispatch(updateCoursesAction(updatedCourses));
    }
  };

  return (
    <div className='col-lg-4'>
      <div className='course-details-sidebar'>
        <div className='course-preview'>
          {(course?.image?.url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={course.image.url} alt='Course' width='100%' onError={handleImageError} />
          )) || (
            // eslint-disable-next-line @next/next/no-img-element
            <img src='/images/courses/course-9.jpg' alt='Course' width='100%' />
          )}
        </div>

        <div className='sidebar-futcher'>
          <ul>
            <li>
              <i className='ri-bar-chart-fill'></i>
              Grade
              <span>{course?.level && course.level.name}</span>
            </li>
            <li>
              <i className='ri-bar-chart-fill'></i>
              Category
              <span>{course?.category && course.category.name}</span>
            </li>
            <li>
              <i className='ri-time-line'></i>
              Duration
              <span>{course.duration}</span>
            </li>
          </ul>

          {user?.role === 'admin' && (
            <div className='cart-wish d-flex justify-content-between'>
              <button onClick={() => router.push(`/course/${course.slug}`)} className='default-btn'>
                View Course
              </button>
            </div>
          )}

          <div className='cart-wish d-flex justify-content-between'>
            {isUserSubscribedToCourse ? (
              <button className='default-btn' onClick={() => router.push(`/learning/course/${course?.slug}`)}>
                View My Course
              </button>
            ) : (
              <button className='default-btn' onClick={() => addToCart(subscriptionTier)}>
                {`Subscribe to ${subscriptionTier.title}`}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesDetailsSidebar;
