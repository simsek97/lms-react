import React from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/components/_App/Navbar';
import PageBanner from '@/components/Common/PageBanner';
import Footer from '@/components/_App/Footer';
import axios from 'axios';
import toast from 'react-hot-toast';

import baseUrl from '@/utils/baseUrl';
import CoursesDetailsContent from '@/components/SingleCourses/CoursesDetailsContent';
import PageContent from '@/components/_App/PageContent';
import { ICourse } from '@/data/course';
import getCourseBySlug from '@/utils/getCourseBySlug';

const CourseDeatails = ({ user }) => {
  const [course, setCourse] = React.useState<ICourse>();
  const [isLoading, setLoading] = React.useState<boolean>(false);

  const router = useRouter();
  const { slug } = router.query;

  const fetchCourse = async (slug: string) => {
    setLoading(true);

    try {
      setLoading(true);
      const dbCourse = await getCourseBySlug(slug);

      setCourse(dbCourse);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchCourse(slug as string);
  }, [slug]);

  return (
    <PageContent
      pageTitle={course?.title || ''}
      parentPageUrl='/courses'
      parentPageText='Courses'
      activePageText={course?.title || ''}>
      {course && <CoursesDetailsContent user={user} course={course} />}
    </PageContent>
  );
};

export default CourseDeatails;
