import React, { useState, useEffect } from 'react';
import Navbar from '@/components/_App/Navbar';
import PageBanner from '@/components/Common/PageBanner';
import CoursesList from '@/components/Courses/CoursesList';
import Footer from '@/components/_App/Footer';
import SearchForm from '@/components/_App/SearchForm';
import FilterDropdown from '@/components/Courses/FilterDropdown';
import { useRouter } from 'next/router';
import Pagination from '@etchteam/next-pagination';
import axios from 'axios';
import baseUrl from '@/utils/baseUrl';
import PageContent from '@/components/_App/PageContent';

export default function CoursesPage({ user }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState(0);
  const [coursesCount, setCoursesCount] = useState(0);
  const router = useRouter();

  const page = router.query.page ? router.query.page : '1';
  const size = router.query.size ? router.query.size : '8';
  const short = router.query.short ? router.query.short : '';
  const cat = router.query.cat ? router.query.cat : '';
  const search = router.query.search ? router.query.search : '';

  const fetchCourses = async () => {
    setLoading(true);

    const payload = {
      params: {
        page,
        limit: size,
        short: short,
        cat: cat,
        search: search
      }
    };

    const response = await axios.get(`${baseUrl}/api/all-courses`, payload);

    setCourses(response.data.courses);
    setPages(response.data.totalPages);
    setCoursesCount(response.data.coursesCount);
    setLoading(false);
  };

  useEffect(() => {
    fetchCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, size, short, cat, search]);

  return (
    <PageContent>
      <PageBanner pageTitle='Courses' homePageUrl='/' homePageText='Home' activePageText='Courses' />

      <div className='courses-area ptb-100'>
        <div className='container'>
          <div className='section-title wow animate__animated animate__fadeInUp delay-0-2s'>
            <span className='top-title'>Courses</span>
            <h2>Improve Your Skills With Our Courses</h2>
          </div>

          <div className='search-result'>
            <div className='row align-items-center'>
              <div className='col-md-12'>
                <ul>
                  <li>
                    <SearchForm formClass='src-form' btnClass='src-btn' />
                  </li>
                  <FilterDropdown />
                </ul>
              </div>
            </div>
          </div>

          {courses && <CoursesList courses={courses} user={user} />}
          {coursesCount > 9 && (
            <div className='col-lg-12 col-md-12'>
              <div className='pagination-area text-center'>
                <Pagination sizes={[1]} total={pages} />
              </div>
            </div>
          )}
        </div>
      </div>
    </PageContent>
  );
}
