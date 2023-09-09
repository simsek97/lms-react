import { motion } from 'framer-motion';
import Link from 'next/link';

import CoursesList from '@/components/Courses/CoursesList';
import { variants } from '@/styles/theme';

const FeaturedCourses = ({ courses, coursesToken, user }) => {
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
        <CoursesList courses={courses} user={user} />
      </div>

      {/* <img src='/images/courses-shape.png' className='courses-shape' alt='Image' /> */}
    </div>
  );
};

export default FeaturedCourses;
