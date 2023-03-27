import React from 'react';

interface ICourseOverview {
  overview?: string;
}

const CourseOverview = ({ overview }: ICourseOverview) => {
  return (
    <div className='tab-pane fade show active'>
      <div className='course-contents'>
        <div dangerouslySetInnerHTML={{ __html: overview }}></div>
      </div>
    </div>
  );
};

export default CourseOverview;
