import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';

import CoursesList from '@/components/Courses/CoursesList';
import Features from '@/components/Features/Features';
import Banner from '@/components/Index/Banner';
import Categories from '@/components/Index/Categories';
import Testimonials from '@/components/Index/Testimonials';
import PageContent from '@/components/_App/PageContent';
import { updateCoursesAction } from '@/store/actions/courseActions';
import store from '@/store/index';
import baseUrl from '@/utils/baseUrl';
import FeaturedCourses from '@/components/Courses/FeaturedCourses';

const Index = ({ courses, categories, user }) => {
  React.useEffect(() => {
    store.dispatch(updateCoursesAction(courses));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageContent>
      <Banner user={user} />
      <Features />
      <FeaturedCourses courses={courses} user={user} />
      <Categories categories={categories} />
      {/* <Transform /> */}
      <Testimonials />
      {/* <Partners /> */}
      {/* <Teaching /> */}
      {/* <Business /> */}
    </PageContent>
  );
};

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`${baseUrl}/api/home-courses`);
  const { courses, coursesToken, categories } = await res.json();

  // Pass data to the page via props
  return { props: { courses, coursesToken, categories } };
}

export default Index;
