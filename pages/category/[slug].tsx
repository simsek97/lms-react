import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import CoursesList from '@/components/Courses/CoursesList';
import PageContent from '@/components/_App/PageContent';
import baseUrl from '@/utils/baseUrl';

export default function CoursesPage({ user }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { slug } = router.query;

  const fetchCourses = async () => {
    setLoading(true);

    const response = await axios.get(`${baseUrl}/api/categories/${slug}`);
    setCourses(response.data.courses.courses);
    setLoading(false);
  };

  useEffect(() => {
    fetchCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  return (
    <PageContent pageTitle='Category'>
      <div className='pt-100 pb-70'>
        <div className='container'>
          <CoursesList courses={courses} user={user} />
        </div>
      </div>
    </PageContent>
  );
}
