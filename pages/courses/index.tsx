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
import { ICourse } from '@/data/course';
import getCourses from '@/utils/getCourses';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

export default function CoursesPage({ user }) {
  const [courses, setCourses] = React.useState<ICourse[]>([]);
  const [pageToken, setPageToken] = React.useState();
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [page, setPage] = React.useState(0);

  const pageSize = 10;

  const fetchCourses = async (limit: number, nextToken: string) => {
    setLoading(true);

    try {
      setLoading(true);
      const dbCourses = await getCourses(limit, nextToken);

      setPageToken(dbCourses.nextToken);

      setCourses([...courses, ...dbCourses.items]);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchCourses(pageSize, pageToken);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <PageContent pageTitle='Courses'>
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

          {pageToken && (
            <div className='col-lg-12 '>
              <p className='text-center'>
                <Button
                  startIcon={isLoading && <CircularProgress size={14} color='inherit' />}
                  variant='contained'
                  onClick={() => setPage(page + 1)}>
                  Show More
                </Button>
              </p>
            </div>
          )}
        </div>
      </div>
    </PageContent>
  );
}
