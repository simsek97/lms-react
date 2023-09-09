import React from 'react';
import Skeleton from 'react-loading-skeleton';

const CourseSkeletonLoader = () => {
  return (
    <>
      <div className='col-lg-3 col-sm-6'>
        <div className='single-courses-box'>
          <div className='courses-image'>
            <Skeleton height='200px' />
          </div>
          <div className='courses-content'>
            <Skeleton count={3} />
          </div>
        </div>
      </div>
      <div className='col-lg-3 col-sm-6'>
        <div className='single-courses-box'>
          <div className='courses-image'>
            <Skeleton height='200px' />
          </div>
          <div className='courses-content'>
            <Skeleton count={3} />
          </div>
        </div>
      </div>
      <div className='col-lg-3 col-sm-6'>
        <div className='single-courses-box'>
          <div className='courses-image'>
            <Skeleton height='200px' />
          </div>
          <div className='courses-content'>
            <Skeleton count={3} />
          </div>
        </div>
      </div>
      <div className='col-lg-3 col-sm-6'>
        <div className='single-courses-box'>
          <div className='courses-image'>
            <Skeleton height='200px' />
          </div>
          <div className='courses-content'>
            <Skeleton count={3} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseSkeletonLoader;
