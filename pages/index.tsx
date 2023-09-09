import React from 'react';

import FeaturedCourses from '@/components/Courses/FeaturedCourses';
import Features from '@/components/Features/Features';
import Banner from '@/components/Index/Banner';
import Categories from '@/components/Index/Categories';
import Testimonials from '@/components/Index/Testimonials';
import PageContent from '@/components/_App/PageContent';
import { updateCategoriesAction, updateCoursesAction } from '@/store/actions/courseActions';
import baseUrl from '@/utils/baseUrl';
import { useDispatch } from 'react-redux';

const Index = ({ courses, coursesToken, categories, categoriesToken, user }) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(updateCoursesAction(courses));
    dispatch(updateCategoriesAction(categories));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageContent>
      <Banner user={user} />
      <Features />
      <FeaturedCourses courses={courses} coursesToken={coursesToken} user={user} />
      <Categories categories={categories} categoriesToken={categoriesToken} />
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
  const { courses, coursesToken, categories, categoriesToken } = await res.json();

  // Pass data to the page via props
  return { props: { courses, coursesToken, categories, categoriesToken } };
}

export default Index;
