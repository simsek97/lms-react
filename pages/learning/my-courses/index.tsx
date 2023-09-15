import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CourseCard from '@/components/Courses/CourseCard';
import PageContent from '@/components/_App/PageContent';
import { ICourse } from '@/data/course';
import { ILevel } from '@/data/level';
import { resetMyCoursesAction, updateMyCoursesAction } from '@/store/actions/courseActions';
import { IReduxStore } from '@/store/index';
import CourseSkeletonLoader from '@/utils/CourseSkeletonLoader';
import getCourses from '@/utils/getCourses';
import { getS3File } from '@/utils/getS3File';
import CoursesList from '@/components/Courses/CoursesList';

const Index = () => {
  const [isLoading, setLoading] = React.useState(true);
  const [pageToken, setPageToken] = React.useState();
  const [page, setPage] = React.useState(0);

  const dispatch = useDispatch();

  const pageSize = 8;
  const user = useSelector((store: IReduxStore) => store.user.profile);
  const myCourses = useSelector((store: IReduxStore) => store.course.myCourses);
  const levels = useSelector((store: IReduxStore) => store.course.levels);

  const userLevel = levels.find((level: ILevel) => level.slug === user?.subscription.tier);

  const handleImageError = React.useMemo(
    () => async (courses: ICourse[], course: ICourse) => {
      if (course?.image?.key) {
        const imageUrl = await getS3File(course.image.key);

        const updatedCourses = courses.map((c: ICourse) => {
          if (c.id === course.id) {
            c.image.url = imageUrl;
          }
          return c;
        });

        dispatch(updateMyCoursesAction(updatedCourses));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const fetchCourses = async (limit: number, nextToken: string, filter: any) => {
    setLoading(true);

    try {
      setLoading(true);
      const dbCourses = await getCourses(limit, nextToken, filter);

      const updatedCourses = pageToken ? [...myCourses, ...dbCourses.items] : [...dbCourses.items];
      // const updatedCourses = [...dbCourses.items];
      dispatch(updateMyCoursesAction(updatedCourses));
      setPageToken(dbCourses.nextToken);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchCourses(pageSize, pageToken, { levelID: { eq: userLevel.id } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <PageContent pageTitle='My Learning'>
      <div className='ptb-100'>
        <div className='container'>
          <div className='row'>
            {myCourses?.length === 0 ? (
              <CourseSkeletonLoader />
            ) : (
              <CoursesList courseType='myCourses' isLoading={isLoading} courses={myCourses} user={user} />
            )}
          </div>

          <div className='row'>
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
      </div>
    </PageContent>
  );
};

export default Index;
