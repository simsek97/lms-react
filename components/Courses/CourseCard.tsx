import axios from 'axios';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';

import { IReduxStore } from '@/store/index';
import baseUrl from '@/utils/baseUrl';
import { ISubscriptionTier } from '@/data/subscription-tier';
import { ICourse } from '@/data/course';
import { IUser } from '@/data/user';
import Image from 'next/image';

interface ICourseCard {
  course: ICourse;
  user: IUser;
  subscriptions: ISubscriptionTier[];
  onAddCart: any;
}

const CourseCard = ({ course, user, subscriptions, onAddCart }: ICourseCard) => {
  const router = useRouter();

  const courses = useSelector((state: IReduxStore) => state.course.courses);

  const courseInfo = courses.find((c: ICourse) => c.id === course.id);
  const { id, title, slug, shortDesc, latestPrice, beforePrice, lessons, image, category, level } = courseInfo;

  const subscriptionTier: ISubscriptionTier = subscriptions.find((s: ISubscriptionTier) => s.tier === level.slug);

  const isUserSubscribedToCourse = user?.subscription?.tier === subscriptionTier.tier;

  return (
    <div className='col-lg-3 col-md-6'>
      <div className='single-courses'>
        <div className='courses-main-img'>
          {(image?.url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={image?.url} alt='Course' width='100%' />
          )) || (
            // eslint-disable-next-line @next/next/no-img-element
            <img src='/images/courses/course-9.jpg' alt='Course' width='100%' />
          )}
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
                {isUserSubscribedToCourse ? (
                  <button className='default-btn' onClick={() => router.push(`/learning/course/${slug}`)}>
                    View My Course
                  </button>
                ) : (
                  <button className='default-btn' onClick={() => onAddCart(subscriptionTier)}>
                    {`Subscribe to ${subscriptionTier.title}`}
                  </button>
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
