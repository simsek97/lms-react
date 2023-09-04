import axios from 'axios';
import Link from 'next/link';
import { parseCookies } from 'nookies';
import React from 'react';
import toast from 'react-hot-toast';

import AdminLayout from '@/components/Admin/AdminLayout';
import TestimonialRow from '@/components/Admin/TestimonialRow';
import GeneralLoader from '@/utils/GeneralLoader';
import baseUrl from '@/utils/baseUrl';

const Testimonials = ({ user }) => {
  const { lms_react_users_token } = parseCookies();
  const [testimonials, setTestimonials] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const fetchData = async () => {
    setLoading(true);

    try {
      const payload = {
        headers: { Authorization: lms_react_users_token }
      };
      const response = await axios.get(`${baseUrl}/api/testimonials`, payload);
      setTestimonials(response.data.testimonials);
      setLoading(false);
    } catch (err) {
      let {
        response: {
          data: { message }
        }
      } = err;
      toast.error(message, {
        style: {
          border: '1px solid #ff0033',
          padding: '16px',
          color: '#ff0033'
        },
        iconTheme: {
          primary: '#ff0033',
          secondary: '#FFFAEE'
        }
      });
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (testId) => {
    try {
      const payload = {
        headers: { Authorization: lms_react_users_token },
        params: { testId }
      };
      const response = await axios.delete(`${baseUrl}/api/testimonials/create`, payload);
      toast.success(response.data.message, {
        style: {
          border: '1px solid #4BB543',
          padding: '16px',
          color: '#4BB543'
        },
        iconTheme: {
          primary: '#4BB543',
          secondary: '#FFFAEE'
        }
      });
      fetchData();
    } catch (err) {
      let {
        response: {
          data: { message }
        }
      } = err;
      toast.error(message, {
        style: {
          border: '1px solid #ff0033',
          padding: '16px',
          color: '#ff0033'
        },
        iconTheme: {
          primary: '#ff0033',
          secondary: '#FFFAEE'
        }
      });
    } finally {
      fetchData();
    }
  };

  return (
    <AdminLayout title='Testimonials' user={user}>
      <div className='main-content-box'>
        {/* Nav */}
        <ul className='nav-style1'>
          <li>
            <Link href='/admin/testimonials/'>
              <a className='active'>Testimonials</a>
            </Link>
          </li>
          <li>
            <Link href='/admin/testimonials/create/'>
              <a>Create</a>
            </Link>
          </li>
        </ul>

        {loading ? (
          <GeneralLoader />
        ) : (
          <div className='table-responsive'>
            <table className='table table-hover align-middle fs-14'>
              <thead>
                <tr>
                  <th scope='col'>Image</th>
                  <th scope='col'>Name</th>
                  <th scope='col'>Designation</th>
                  <th scope='col'>Text</th>
                  <th scope='col'>Action</th>
                </tr>
              </thead>
              <tbody>
                {testimonials.length > 0 ? (
                  testimonials.map((test) => <TestimonialRow {...test} key={test.id} onDelete={() => handleDelete(test.id)} />)
                ) : (
                  <tr>
                    <td colSpan={6} className='text-center py-3'>
                      Empty!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Testimonials;
