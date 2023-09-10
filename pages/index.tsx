import React from 'react';

import FeaturedCourses from '@/components/Courses/FeaturedCourses';
import Features from '@/components/Features/Features';
import Banner from '@/components/Index/Banner';
import Categories from '@/components/Index/Categories';
import Grades from '@/components/Index/Grades';
import Testimonials from '@/components/Index/Testimonials';
import PageContent from '@/components/_App/PageContent';
import { updateCategoriesAction, updateCoursesAction, updateLevelsAction } from '@/store/actions/courseActions';
import baseUrl from '@/utils/baseUrl';
import { useDispatch } from 'react-redux';

const Index = ({ levels, levelsToken, categories, categoriesToken, courses, coursesToken, user }) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(updateLevelsAction(levels));
    dispatch(updateCategoriesAction(categories));
    dispatch(updateCoursesAction(courses));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageContent>
      <Banner user={user} />
      <Features />
      <FeaturedCourses courses={courses} coursesToken={coursesToken} user={user} />
      <Grades levels={levels} levelsToken={levelsToken} />
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
  const { levels, levelsToken, categories, categoriesToken, courses, coursesToken } = await res.json();

  // Pass data to the page via props
  return { props: { levels, levelsToken, categories, categoriesToken, courses, coursesToken } };
}

export default Index;
