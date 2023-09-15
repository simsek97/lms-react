import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import StickyBox from 'react-sticky-box';

import CourseAsset from '@/components/Learning/CourseAsset';
import CourseDiscussion from '@/components/Learning/CourseDiscussion';
import CourseFeedback from '@/components/Learning/CourseFeedback';
import CourseLearn from '@/components/Learning/CourseLearn';
import CourseOverview from '@/components/Learning/CourseOverview';
import CourseRating from '@/components/Learning/CourseRating';
import ProgressManager from '@/components/Learning/ProgressManager';
import PageContent from '@/components/_App/PageContent';
import { ICourse } from '@/data/course';
import { IReduxStore } from '@/store/index';

interface ILearningTab {
  id: string;
  title: string;
}

const learningTabs: ILearningTab[] = [
  {
    id: 'overview',
    title: 'Overview'
  },
  { id: 'assets', title: 'Assets' },
  { id: 'learn', title: 'Learn' }
];

const Index = ({ user }) => {
  const [activeTab, setActiveTab] = React.useState<string>('overview');
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
                  {learningTabs.map((tab: ILearningTab) => (
                    <li key={tab.id}>
                      <Link href={`/learning/course/${slug}`}>
                        <a
                          onClick={(e) => {
                            e.preventDefault();
                            setActiveTab(tab.id);
                          }}
                          className={activeTab === tab.id ? 'active' : ''}>
                          {tab.title}
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>

                {(course && activeTab == 'asset' && <CourseAsset {...course} />) ||
                  (activeTab === 'discussion' && <CourseDiscussion />) ||
                  (activeTab === 'rating' && <CourseRating />) ||
                  (activeTab === 'feedback' && <CourseFeedback />) ||
                  (activeTab === 'learn' && <CourseLearn />) || <CourseOverview {...course} />}
              </div>
            </div>

            <div className='col-lg-3 col-md-4'>
              <StickyBox offsetTop={20} offsetBottom={20}>
                <div className='video-sidebar'>
                  <ProgressManager user={user} course={course} />
                  <Divider />
                  <div className='course-video-list mt-3'>
                    <h4 className='title mb-3'>{course?.title || ''}</h4>
                    <Chip sx={{ mr: 1, mt: 1 }} label={course?.level?.name || ''} color='primary' />
                    <Chip sx={{ mr: 1, mt: 1 }} label={course?.category?.name || ''} color='success' />
                    <Chip sx={{ mr: 1, mt: 1 }} label={course?.duration || ''} color='warning' />
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
