import React, { useState } from 'react';
import Navbar from '@/components/_App/Navbar';
import Footer from '@/components/_App/Footer';
import AdminSideNav from '@/components/_App/AdminSideNav';
import Link from 'next/link';
import axios from 'axios';
import baseUrl from '@/utils/baseUrl';
import toast from 'react-hot-toast';
import { parseCookies } from 'nookies';
import { useRouter } from 'next/router';
import Button from '@/utils/Button';

const Create = ({ user }) => {
  const router = useRouter();
  const { lms_react_users_token } = parseCookies();
  const [level, setLevel] = useState({ level: '' });
  const [loading, setLoading] = React.useState(false);

  const handleChange = (e) => {
    setLevel({ level: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const url = `${baseUrl}/api/levels/create`;
      const payload = {
        headers: { Authorization: lms_react_users_token }
      };
      const payloadData = { ...level };
      const response = await axios.post(url, payloadData, payload);
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
      router.push('/admin/levels');
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

  return (
    <>
      <Navbar user={user} />

      <div className='main-content'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-lg-3 col-md-4'>
              <AdminSideNav user={user} />
            </div>

            <div className='col-lg-9 col-md-8'>
              <div className='main-content-box'>
                {/* Nav */}
                <ul className='nav-style1'>
                  <li>
                    <Link href='/admin/levels/'>
                      <a>Levels</a>
                    </Link>
                  </li>
                  <li>
                    <Link href='/admin/levels/create/'>
                      <a className='active'>Create</a>
                    </Link>
                  </li>
                </ul>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                  <div className='row'>
                    <div className='col-md-12'>
                      <div className='form-group'>
                        <label className='form-label fw-semibold'>Levels</label>
                        <input
                          type='text'
                          className='form-control'
                          name='level'
                          value={level.level}
                          onChange={handleChange}
                          required={true}
                        />
                      </div>
                    </div>

                    <div className='col-12'>
                      <Button disabled={false} loading={loading} btnText='Save' btnClass='default-btn' />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Create;