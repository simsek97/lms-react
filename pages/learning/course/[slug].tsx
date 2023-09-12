import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import StickyBox from 'react-sticky-box';

import CourseAsset from '@/components/Learning/CourseAsset';
import CourseDiscussion from '@/components/Learning/CourseDiscussion';
import CourseFeedback from '@/components/Learning/CourseFeedback';
import CourseOverview from '@/components/Learning/CourseOverview';
import CourseRating from '@/components/Learning/CourseRating';
import Player from '@/components/Learning/Player';
import ProgressManager from '@/components/Learning/ProgressManager';
import VideoList from '@/components/Learning/VideoList';
import Footer from '@/components/_App/Footer';
import Navbar from '@/components/_App/Navbar';
import baseUrl from '@/utils/baseUrl';
import PageContent from '@/components/_App/PageContent';
import { useSelector } from 'react-redux';
import { IReduxStore } from '@/store/index';
import { ICourse } from '@/data/course';

const Index = ({ user }) => {
  const [active, setActive] = React.useState('');
  const [tab, setTab] = React.useState('overview');
  const {
    query: { slug }
  } = useRouter();

  const courses = useSelector((store: IReduxStore) => store.course.courses);
  const course = courses.find((c: ICourse) => c.slug === slug);

  return (
    <PageContent pageTitle='My Learning' activePageText={course.title} parentPageText='Courses' parentPageUrl='/courses'>
      <div className='mt-5 pb-5 video-area'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-lg-9 col-md-8'>
              <div className='video-content'>
                {/* {selectedVideo && <Player videoSrc={selectedVideo} />} */}

                <br />
                <ul className='nav-style1'>
                  <li>
                    <Link href={`/learning/course/${slug}`}>
                      <a
                        onClick={(e) => {
                          e.preventDefault();
                          setTab('overview');
                        }}
                        className={tab == 'overview' ? 'active' : ''}>
                        Overview
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href={`/learning/course/${slug}`}>
                      <a
                        onClick={(e) => {
                          e.preventDefault();
                          setTab('asset');
                        }}
                        className={tab == 'asset' ? 'active' : ''}>
                        Assets
                      </a>
                    </Link>
                  </li>
                  {/* <li>
                    <Link href={`/learning/course/${slug}`}>
                      <a
                        onClick={(e) => {
                          e.preventDefault();
                          setTab('discussion');
                        }}
                        className={tab == 'discussion' ? 'active' : ''}>
                        Discussion
                      </a>
                    </Link>
                  </li> */}
                  {/* <li>
                    <Link href={`/learning/course/${slug}`}>
                      <a
                        onClick={(e) => {
                          e.preventDefault();
                          setTab('rating');
                        }}
                        className={tab == 'rating' ? 'active' : ''}>
                        Leave a rating
                      </a>
                    </Link>
                  </li> */}
                  {/* <li>
                    <Link href={`/learning/course/${slug}`}>
                      <a
                        onClick={(e) => {
                          e.preventDefault();
                          setTab('feedback');
                        }}
                        className={tab == 'feedback' ? 'active' : ''}>
                        Leave a feedback
                      </a>
                    </Link>
                  </li> */}
                </ul>

                {(course && tab == 'asset' && <CourseAsset {...course} />) ||
                  (tab == 'discussion' && <CourseDiscussion />) ||
                  (tab == 'rating' && <CourseRating />) ||
                  (tab == 'feedback' && <CourseFeedback />) || <CourseOverview {...course} />}
              </div>
            </div>

            <div className='col-lg-3 col-md-4'>
              <StickyBox offsetTop={20} offsetBottom={20}>
                <div className='video-sidebar'>
                  <ProgressManager user={user} course={course} />
                  <div className='course-video-list'>
                    <h4 className='title mb-3'>{course && course.title}</h4>
                    {/* <ul>
                      {videos.length > 0 &&
                        videos.map((video) => (
                          <VideoList key={video.id} {...video} onPlay={() => selectVideo(video.id)} activeClass={active} />
                        ))}
                    </ul> */}
                  </div>
                </div>
              </StickyBox>
            </div>
          </div>
        </div>
      </div>
    </PageContent>
  );
};

export default Index;
