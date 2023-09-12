import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import FeaturedCourses from '@/components/Courses/FeaturedCourses';
import Features from '@/components/Features/Features';
import Banner from '@/components/Index/Banner';
import Categories from '@/components/Index/Categories';
import Grades from '@/components/Index/Grades';
import Testimonials from '@/components/Index/Testimonials';
import PageContent from '@/components/_App/PageContent';
import { ILevel } from '@/data/level';
import { updateCategoriesAction, updateCoursesAction, updateLevelsAction } from '@/store/actions/courseActions';
import { IReduxStore } from '@/store/index';
import baseUrl from '@/utils/baseUrl';

const Index = ({ levels, levelsToken, categories, categoriesToken, courses, coursesToken }) => {
  const dispatch = useDispatch();

  const user = useSelector((store: IReduxStore) => store.user.profile);
  const sortedLevels = levels.sort((a: ILevel, b: ILevel) => Number(a.id) - Number(b.id));

  React.useEffect(() => {
    dispatch(updateLevelsAction(sortedLevels));
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
