import React, { useState } from 'react';
import Link from 'next/link';
import CoursesDetailsSidebar from './CoursesDetailsSidebar';
import WhatYouWillLearn from '../Course/WhatYouWillLearn';
import InstructorProfile from '../Course/InstructorProfile';
import { formatDate } from '@/utils/helper';
import TabContent from './TabContent';
import { IUser } from '@/data/user';
import { ICourse } from '@/data/course';

interface ICoursesDetailsContent {
  user: IUser;
  course: ICourse;
}

const CoursesDetailsContent = ({ course }: ICoursesDetailsContent) => {
  const { title, slug, overview, whatYouWillLearn, whoIsThisCourseFor, requirements, isClass, updatedAt, category, level } = course;

  return (
    <div className='course-details-area ptb-100'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-8'>
            <div className='course-details-content'>
              <h2 className='title'>{title}</h2>
              <ul className='best-seller'>
                {level && (
                  <li>
                    <Link href={`/grade/${level.slug}`}>
                      <a>{level.name}</a>
                    </Link>
                  </li>
                )}
                {category && (
                  <li>
                    <Link href={`/category/${category.slug}`}>
                      <a>{category.name}</a>
                    </Link>
                  </li>
                )}
                <li>
                  Last Updated <span>{formatDate(updatedAt)}</span>
                </li>
              </ul>

              <div className='gap-mb-30'></div>

              <WhatYouWillLearn whatYouWillLearn={whatYouWillLearn} />

              <div className='gap-mb-50'></div>

              <TabContent
                overview={overview}
                slug={slug}
                requirements={requirements}
                whoIsThisCourseFor={whoIsThisCourseFor}
                isClass={isClass}
              />
            </div>
          </div>

          <CoursesDetailsSidebar course={course} />
        </div>
      </div>
    </div>
  );
};

export default CoursesDetailsContent;
