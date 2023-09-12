import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CoursesList from '@/components/Courses/CoursesList';
import FilterDropdown from '@/components/Courses/FilterDropdown';
import PageContent from '@/components/_App/PageContent';
import SearchForm from '@/components/_App/SearchForm';
import { ICourse } from '@/data/course';
import { updateCoursesAction } from '@/store/actions/courseActions';
import { IReduxStore } from '@/store/index';
import getCourses from '@/utils/getCourses';

export default function CoursesPage() {
  const [courses, setCourses] = React.useState<ICourse[]>([]);
  const [levelId, setLevelId] = React.useState<string>();
  const [categoryId, setCategoryId] = React.useState<string>();
  const [sortCourse, setSortCourse] = React.useState<string>();
  const [pageToken, setPageToken] = React.useState();
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [page, setPage] = React.useState(0);

  const dispatch = useDispatch();

  const user = useSelector((store: IReduxStore) => store.user.profile);
  const storeCourses = useSelector((store: IReduxStore) => store.course.courses);

  const pageSize = 8;

  const fetchCourses = async (limit: number, nextToken: string) => {
    setLoading(true);

    try {
      setLoading(true);
      const dbCourses = await getCourses(limit, nextToken);

      setPageToken(dbCourses.nextToken);

      const updatedCourses = [...courses, ...dbCourses.items];
      setCourses(updatedCourses);

      dispatch(updateCoursesAction(updatedCourses));
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (levelId || categoryId || sortCourse) {
      setCourses(
        storeCourses
          .filter((course: ICourse) => (levelId ? course.levelID === levelId : course))
          .filter((course: ICourse) => (categoryId ? course.catID === categoryId : course))
          .sort((a: ICourse, b: ICourse) =>
            sortCourse.toLowerCase() === 'asc'
              ? a.latestPrice - b.latestPrice
              : sortCourse.toLowerCase() === 'desc'
              ? b.latestPrice - a.latestPrice
              : 0
          )
      );
    } else {
      setCourses(storeCourses);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [levelId, categoryId, sortCourse]);

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
                  <FilterDropdown
                    level={{ selectedLevel: levelId, handleLevelChange: setLevelId }}
                    category={{ selectedCategory: categoryId, handleCategoryChange: setCategoryId }}
                    courseSort={{ selectedSort: sortCourse, handleSortChange: setSortCourse }}
                  />
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
