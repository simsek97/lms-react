import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import React from 'react';
import toast from 'react-hot-toast';

import AdminLayout from '@/components/Admin/AdminLayout';
import Button from '@/utils/Button';
import baseUrl from '@/utils/baseUrl';

const CreateLevel = ({ user }) => {
  const router = useRouter();
  const { lms_react_users_token } = parseCookies();
  const [level, setLevel] = React.useState({ level: '' });
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
    <AdminLayout title='Create Level' user={user}>
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
                <input type='text' className='form-control' name='level' value={level.level} onChange={handleChange} required={true} />
              </div>
            </div>

            <div className='col-12'>
              <Button disabled={false} loading={loading} btnText='Save' btnClass='default-btn' />
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default CreateLevel;
