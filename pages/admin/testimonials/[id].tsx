import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import React from 'react';
import toast from 'react-hot-toast';

import AdminLayout from '@/components/Admin/AdminLayout';
import Button from '@/utils/Button';
import baseUrl from '@/utils/baseUrl';

const INIT_TESTIMONIAL = {
  image_url: '',
  name: '',
  designation: '',
  description: ''
};

const TestimonialDetails = ({ user }) => {
  const router = useRouter();
  const { lms_react_users_token } = parseCookies();
  const [testimonial, setTestimonial] = React.useState(INIT_TESTIMONIAL);
  const [loading, setLoading] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);
  const [imagePreview, setImagePreview] = React.useState('');
  const { id } = router.query;

  React.useEffect(() => {
    const isTestimonial = Object.values(testimonial).every((el) => Boolean(el));
    isTestimonial ? setDisabled(false) : setDisabled(true);
  }, [testimonial]);

  React.useEffect(() => {
    const fetchCat = async () => {
      try {
        const url = `${baseUrl}/api/testimonials/create`;
        const payload = {
          params: { testId: id },
          headers: { Authorization: lms_react_users_token }
        };
        const response = await axios.get(url, payload);
        // console.log(response.data.testimonial);
        setTestimonial(response.data.testimonial);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'image_url') {
      const image_url = files[0].size / 1024 / 1024;
      if (image_url > 2) {
        toast.error('The photo size greater than 2 MB. Make sure less than 2 MB.', {
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
        e.target.value = null;
        return;
      }
      setTestimonial((prevState) => ({
        ...prevState,
        image_url: files[0]
      }));
      setImagePreview(window.URL.createObjectURL(files[0]));
    } else {
      setTestimonial((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleImageUpload = async () => {
    const data = new FormData();
    data.append('file', testimonial.image_url);
    data.append('upload_preset', process.env.UPLOAD_PRESETS);
    data.append('cloud_name', process.env.CLOUD_NAME);
    let response;
    if (testimonial.image_url) {
      response = await axios.post(process.env.CLOUDINARY_URL, data);
    }
    const imageUrl = response.data.url;

    return imageUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let photo;
      if (testimonial.image_url) {
        photo = await handleImageUpload();

        photo = photo.replace(/^http:\/\//i, 'https://');
      }

      const url = `${baseUrl}/api/testimonials/create`;
      const { name, designation, description } = testimonial;
      const payload = {
        testId: id,
        image_url: photo,
        name,
        designation,
        description
      };

      const response = await axios.put(url, payload, {
        headers: { Authorization: lms_react_users_token }
      });
      setLoading(false);

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
      router.push('/admin/testimonials');
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
    <AdminLayout title='Testimonial Details' user={user}>
      <div className='main-content-box'>
        {/* Nav */}
        <ul className='nav-style1'>
          <li>
            <Link href='/admin/testimonials/'>
              <a>Testimonials</a>
            </Link>
          </li>
          <li>
            <Link href='/admin/testimonials/create/'>
              <a>Create</a>
            </Link>
          </li>
          <li>
            <Link href={`/admin/testimonials/${id}/`}>
              <a className='active'>Update</a>
            </Link>
          </li>
        </ul>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className='row'>
            <div className='col-md-12'>
              <div className='form-group'>
                <label className='form-label fw-semibold'>Image</label>
                <input
                  type='file'
                  className='form-control file-control'
                  id='clientImage'
                  name='image_url'
                  onChange={handleChange}
                  required={true}
                />
                <div className='form-text'>Upload image size 300x300!</div>

                <div className='mt-2'>
                  {imagePreview ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={imagePreview} alt='image' className='img-thumbnail w-100px me-2' />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src='/images/admin/admin-1.jpg' alt='image' className='img-thumbnail w-100px me-2' />
                  )}
                </div>
              </div>
            </div>

            <div className='col-md-12'>
              <div className='form-group'>
                <label className='form-label fw-semibold'>Name</label>
                <input type='text' className='form-control' name='name' value={testimonial.name} onChange={handleChange} />
              </div>
            </div>

            <div className='col-md-12'>
              <div className='form-group'>
                <label className='form-label fw-semibold'>Designation</label>
                <input
                  type='text'
                  className='form-control'
                  name='designation'
                  value={testimonial.designation}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className='col-md-12'>
              <div className='form-group'>
                <label className='form-label fw-semibold'>Text</label>
                <textarea
                  className='form-control'
                  name='description'
                  value={testimonial.description}
                  onChange={handleChange}
                  rows={6}
                />
              </div>
            </div>

            <div className='col-12'>
              <Button loading={loading} disabled={disabled} btnText='Update' btnClass='default-btn' />
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default TestimonialDetails;
