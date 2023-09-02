import { formatDate } from '@/utils/helper';
import axios from 'axios';
import Link from 'next/link';
import { parseCookies } from 'nookies';
import { useEffect, useState } from 'react';

import PageContent from '@/components/_App/PageContent';
import baseUrl from '@/utils/baseUrl';

function Purchases({ user }) {
  const { lms_react_users_token } = parseCookies();

  const [enrolments, setEnrolments] = useState([]);

  useEffect(() => {
    const fetchEnrol = async () => {
      const payload = { headers: { Authorization: lms_react_users_token } };
      const url = `${baseUrl}/api/learnings/my-purchases`;
      const response = await axios.get(url, payload);
      setEnrolments(response.data.enrolments);
    };

    fetchEnrol();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageContent pageTitle='My Purchases'>
      <div className='checkout-area ptb-100'>
        <div className='container'>
          <div className='row justify-content-center'>
            {enrolments.length > 0
              ? enrolments.map((enrol) => (
                  <div className='col-lg-9 col-md-12' key={enrol.id}>
                    <div className='shopping-cart'>
                      <div className='shopping-cart-list'>
                        <div className='row align-items-center'>
                          <div className='col-lg-3'>
                            <Link href={`/learning/course/${enrol.course.slug}`}>
                              <a className='d-block image'>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={enrol.course.image} alt='image' />
                              </a>
                            </Link>
                          </div>

                          <div className='col-lg-5'>
                            <div className='content'>
                              <h3>
                                <Link href={`/learning/course/${enrol.course.slug}`}>
                                  <a>{enrol.course.title}</a>
                                </Link>
                              </h3>

                              <p className='fs-14 mb-2'>
                                By {enrol.course.user.first_name} {enrol.course.user.last_name}
                              </p>

                              <ul className='list'>
                                <li>{enrol.course.duration}</li>
                                <li>{enrol.course.lessons}</li>
                                <li>{enrol.course.access_time}</li>
                              </ul>
                            </div>
                          </div>

                          <div className='col-lg-4 col-6'>
                            <div className='price text-end'>
                              <span className='fw-bolder fs-16'>${enrol.bought_price}</span>{' '}
                              <span className='fw-bolder fs-16 d-inline-block ms-4'>{formatDate(enrol.created_at)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : 'Empty'}
          </div>
        </div>
      </div>
    </PageContent>
  );
}

export default Purchases;
