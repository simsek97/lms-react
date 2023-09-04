import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import React from 'react';
import toast from 'react-hot-toast';

import AdminLayout from '@/components/Admin/AdminLayout';
import Button from '@/utils/Button';
import baseUrl from '@/utils/baseUrl';

const CreateCoupon = ({ user }) => {
  const router = useRouter();
  const { elarniv_users_token } = parseCookies();
  const [coupon, setCoupon] = React.useState({ coupon: '', discount: 0.1 });
  const [loading, setLoading] = React.useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // setCoupon({ coupon: e.target.value.toUpperCase() });
    setCoupon((prevState) => ({
      ...prevState,
      [name]: value.toUpperCase()
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const url = `${baseUrl}/api/coupons/new`;
      const payload = {
        headers: { Authorization: elarniv_users_token }
      };
      const payloadData = { ...coupon };
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
      router.push('/admin/coupons');
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
    <AdminLayout title='Create Coupon' user={user}>
      <div className='main-content-box'>
        {/* Nav */}
        <ul className='nav-style1'>
          <li>
            <Link href='/admin/coupons/'>
              <a>Coupons</a>
            </Link>
          </li>
          <li>
            <Link href='/admin/coupons/create/'>
              <a className='active'>Create</a>
            </Link>
          </li>
          <li>
            <Link href='/admin/coupons/modal-in-site-loading/'>
              <a>Site Modal</a>
            </Link>
          </li>
        </ul>

        <form onSubmit={handleSubmit}>
          <div className='row'>
            <div className='col-md-6'>
              <div className='form-group'>
                <label className='form-label fw-semibold'>Coupon Code</label>
                <input
                  type='text'
                  className='form-control'
                  name='coupon'
                  value={coupon.coupon}
                  onChange={handleChange}
                  placeholder='eg: BLACK22'
                />
              </div>
            </div>

            <div className='col-md-6'>
              <div className='form-group'>
                <label className='form-label fw-semibold'>Discount (ex: 9.9)</label>
                <input
                  type='number'
                  className='form-control'
                  name='discount'
                  value={coupon.discount}
                  onChange={handleChange}
                  placeholder='eg: 9.9'
                />
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

export default CreateCoupon;
