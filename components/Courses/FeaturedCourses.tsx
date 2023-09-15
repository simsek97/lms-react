import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

import CoursesList from '@/components/Courses/CoursesList';
import { variants } from '@/styles/theme';
import { ICourse } from '@/data/course';
import getCourses from '@/utils/getCourses';
import { updateFeaturedCoursesAction } from '@/store/actions/courseActions';
import { IReduxStore } from '@/store/index';

const FeaturedCourses = ({ user }) => {
  const [isLoading, setLoading] = React.useState<boolean>(false);

  const dispatch = useDispatch();

  const featuredCourses = useSelector((store: IReduxStore) => store.course.featuredCourses);
  const pageSize = 8;

  const fetchCourses = async (limit: number, nextToken: string, filter: any) => {
    setLoading(true);

    try {
      setLoading(true);
      const dbCourses = await getCourses(limit, nextToken, filter);

      const updatedCourses = [...dbCourses.items];

      dispatch(updateFeaturedCoursesAction(updatedCourses));
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchCourses(pageSize, null, { inHomePage: { eq: 'true' } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='feature-dcourses-area bg-color-f6fafb pt-100 pb-70'>
      <div className='container'>
        <div className='title-btn d-flex justify-content-between align-items-center'>
          <motion.div className='section-title left-title' initial='hidden' whileInView='visible' variants={variants}>
            <span className='top-title'>Featured Courses</span>
            <h2>Find Yours From The Featured</h2>
          </motion.div>
          <Link href='/courses'>
            <a className='default-btn'>View All</a>
          </Link>
        </div>
        <CoursesList courseType='featured' isLoading={isLoading} courses={featuredCourses} user={user} />
      </div>

      {/* <img src='/images/courses-shape.png' className='courses-shape' alt='Image' /> */}
    </div>
  );
};

export default FeaturedCourses;
