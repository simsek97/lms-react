import React from 'react';

const WhatYouWillLearn = ({ whatYouWillLearn }) => {
  return (
    <div className='this-course-content'>
      <h3>What you will learn In This Course</h3>
      <div dangerouslySetInnerHTML={{ __html: whatYouWillLearn }}></div>
    </div>
  );
};

export default WhatYouWillLearn;
