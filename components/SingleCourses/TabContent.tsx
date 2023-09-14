import React, { useState } from 'react';
import CourseOverview from '../Learning/CourseOverview';
import Requirements from '../Course/Requirements';
import WhoIsThisCourseFor from '../Course/WhoIsThisCourseFor';
import CourseVideo from '../Course/CourseVideo';

const TabContent = ({ overview, slug, requirements, isClass, whoIsThisCourseFor }) => {
  const [tab, setTab] = useState('overview');
  return (
    <>
      <ul className='course-tab nav nav-tabs'>
        <li className='nav-item'>
          <button className={`nav-link ${tab == 'overview' ? 'active' : ''}`} onClick={() => setTab('overview')}>
            Overview
          </button>
        </li>
        <li className='nav-item'>
          <button className={`nav-link ${tab == 'requirements' ? 'active' : ''}`} onClick={() => setTab('requirements')}>
            Requirements
          </button>
        </li>
        <li className='nav-item'>
          <button className={`nav-link ${tab == 'witcf' ? 'active' : ''}`} onClick={() => setTab('witcf')}>
            Who Is This Course For
          </button>
        </li>
      </ul>

      <div className='tab-content'>
        {tab === 'overview' && <CourseOverview overview={overview} />}
        {tab === 'requirements' && <Requirements requirements={requirements} />}
        {tab === 'witcf' && <WhoIsThisCourseFor whoIsThisCourseFor={whoIsThisCourseFor} />}
      </div>
    </>
  );
};

export default TabContent;
