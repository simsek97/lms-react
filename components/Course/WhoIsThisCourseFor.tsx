import React from 'react';

const WhoIsThisCourseFor = ({ whoIsThisCourseFor }) => {
  return (
    <div>
      <div className='curriculum-content'>
        <div dangerouslySetInnerHTML={{ __html: whoIsThisCourseFor }}></div>
      </div>
    </div>
  );
};

export default WhoIsThisCourseFor;
