import React, { useEffect, useState } from 'react';
import { progress } from '@/utils/helper';
import baseUrl from '@/utils/baseUrl';
import axios from 'axios';
import { useRouter } from 'next/router';

const ProgressManager = ({ userId, courseId, videos_count, selectedVideo }) => {
  const [pro, setPro] = useState(0);
  const {
    query: { slug }
  } = useRouter();
  const router = useRouter();

  useEffect(() => {
    if (courseId) {
      const fetchProgrss = async () => {
        const payload = {
          params: { userId: userId, courseId: courseId }
        };
        const url = `${baseUrl}/api/learnings/progress`;
        const response = await axios.get(url, payload);
        setPro(response.data.courseProgress.length);
      };

      fetchProgrss();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId, selectedVideo]);
  return (
    <div className='mb-3'>
      <p className='mb-2'>
        Your progress{' '}
        <strong>
          {pro} of {videos_count} complete
        </strong>
        .{' '}
        {progress(pro, videos_count) == 100 ? (
          <span
            onClick={() => router.push(`/learning/certificate/${slug}`)}
            style={{
              textDecoration: 'underline',
              color: 'blue',
              fontWeight: '800',
              cursor: 'pointer'
            }}>
            Get certificate
          </span>
        ) : (
          <span
            style={{
              textDecoration: 'underline',
              color: 'blue',
              fontWeight: '800',
              cursor: 'pointer'
            }}>
            Get certificate after complete
          </span>
        )}
      </p>
      <div className='progress'>
        {/* @ts-ignore */}
        <div
          className='progress-bar bg-1cab94'
          role='progressbar'
          aria-label='Example with label'
          style={{
            width: `${progress(pro, videos_count)}%`
          }}
          // eslint-disable-next-line jsx-a11y/aria-proptypes
          aria-valuenow={`${progress(pro, videos_count)}`}
          aria-valuemin='0'
          aria-valuemax='100'>
          {progress(pro, videos_count)}%
        </div>
      </div>
    </div>
  );
};

export default ProgressManager;
