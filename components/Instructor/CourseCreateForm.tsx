import { Auth, Storage } from 'aws-amplify';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import Button from '@/utils/Button';
import baseUrl from '@/utils/baseUrl';
import { genId } from '@/utils/genId';

const CourseRteEditor = dynamic(() => import('@/utils/CourseRteEditor'), {
  loading: () => null,
  ssr: false
});

const INITIAL_VALUE = {
  title: process.env.NEXT_PUBLIC_COURSE_TITLE || '',
  short_desc: process.env.NEXT_PUBLIC_SHORT_DESC || '',
  latest_price: process.env.NEXT_PUBLIC_LATEST_PRICE || 0.0,
  before_price: process.env.NEXT_PUBLIC_BEFORE_PRICE || 0.0,
  lessons: '1',
  duration: '20 minutes',
  image: '',
  overview: process.env.NEXT_PUBLIC_OVERVIEW || '',
  requirements: process.env.NEXT_PUBLIC_REQUIREMENTS || '',
  what_you_will_learn: process.env.NEXT_PUBLIC_REQUIREMENTS || '',
  who_is_this_course_for: process.env.NEXT_PUBLIC_REQUIREMENTS || '',
  catId: process.env.NEXT_PUBLIC_CAT_ID || '',
  levelId: process.env.NEXT_PUBLIC_LEVEL_ID || '',
  access_time: 'Lifetime'
};

interface ICourseCreateForm {
  btnText?: string;
  is_class?: boolean;
}

const CourseCreateForm = ({ btnText, is_class }: ICourseCreateForm) => {
  const { lms_react_users_token } = parseCookies();
  const [course, setCourse] = useState(INITIAL_VALUE);
  const [disabled, setDisabled] = React.useState<boolean>(true);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [categories, setCategories] = useState([]);
  const [levels, setLevels] = useState([]);
  const [imagePreview, setImagePreview] = React.useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const isCourse = Object.values(course).every((el) => Boolean(el));
    isCourse ? setDisabled(false) : setDisabled(true);

    console.log(isCourse);
  }, [course]);

  // Get categories
  useEffect(() => {
    const fetchData = async () => {
      const payload = {
        headers: { Authorization: lms_react_users_token }
      };
      const response = await axios.get(`${baseUrl}/api/categories`, payload);
      setCategories(response.data.categories);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Get levels
  useEffect(() => {
    const fetchData = async () => {
      const payload = {
        headers: { Authorization: lms_react_users_token }
      };
      const response = await axios.get(`${baseUrl}/api/levels`, payload);
      setLevels(response.data.levels);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;

    if (name === 'image') {
      const image = files[0].size / 1024 / 1024;
      if (image > 2) {
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

      setCourse((prevState) => ({
        ...prevState,
        image: files[0]
      }));

      setImagePreview(window.URL.createObjectURL(files[0]));
    } else {
      setCourse((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleImageUpload = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      console.log(user);
      let imageUrl: string = '';
      const courseImage = course.image;
      const randomSuffix = genId();
      console.log('courseImage:', courseImage);
      console.log('courseImageType:', courseImage['type']);
      // response = await axios.post(process.env.CLOUDINARY_URL, data);
      const uploadedImage = await Storage.put(`${randomSuffix}_${courseImage['name']}`, courseImage, {
        contentType: courseImage['type']
      });
      console.log('uploadedImage:', uploadedImage);

      imageUrl = uploadedImage.key;

      return imageUrl;
    } catch (error) {
      console.log('Error uploading file: ', error);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    console.log(e);
    try {
      setLoading(true);
      let photo;

      if (course.image) {
        const uploadedPhoto = await handleImageUpload();

        if (!uploadedPhoto) {
          new Error('File could not be uploaded!');
        }

        photo = uploadedPhoto.replace(/^http:\/\//i, 'https://');
      }

      const {
        title,
        short_desc,
        overview,
        latest_price,
        before_price,
        lessons,
        duration,
        access_time,
        requirements,
        what_you_will_learn,
        who_is_this_course_for,
        levelId,
        catId
      } = course;

      const payloadData = {
        title,
        short_desc,
        overview,
        latest_price,
        before_price,
        lessons,
        duration,
        image: photo,
        access_time,
        requirements,
        what_you_will_learn,
        who_is_this_course_for,
        levelId,
        catId,
        is_class
      };

      const payloadHeader = {
        headers: { Authorization: lms_react_users_token }
      };

      const url = `${baseUrl}/api/courses/new`;
      const response = await axios.post(url, payloadData, payloadHeader);
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

      if (is_class) {
        router.push(`/instructor/courses`);
      } else {
        router.push(`/instructor/course/upload/${response.data.course.id}`);
      }
    } catch (err) {
      // console.log(err);
      const message = err?.response?.data?.message || err;

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

  console.log(course);

  return (
    <form onSubmit={handleSubmit}>
      <div className='row'>
        <div className='col-md-6'>
          <div className='form-group'>
            <label className='form-label fw-semibold'>Course Title</label>
            <input
              type='text'
              className='form-control'
              placeholder='Course Title'
              name='title'
              value={course.title}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className='col-md-6'>
          <div className='form-group'>
            <label className='form-label fw-semibold'>Lessons</label>
            <input
              type='number'
              className='form-control'
              placeholder='1'
              name='lessons'
              value={course.lessons}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className='col-md-6'>
          <div className='form-group'>
            <label className='form-label fw-semibold'>Latest Price</label>
            <input
              type='number'
              className='form-control'
              placeholder='29.99'
              aria-describedby='latest_price_help'
              name='latest_price'
              value={course.latest_price}
              onChange={handleChange}
            />
            <div id='latest_price_help' className='form-text'>
              The latest price will show as the course price.
            </div>
          </div>
        </div>

        <div className='col-md-6'>
          <div className='form-group'>
            <label className='form-label fw-semibold'>Regular Price</label>
            <input
              type='number'
              className='form-control'
              placeholder='49.99'
              aria-describedby='before_price_help'
              name='before_price'
              value={course.before_price}
              onChange={handleChange}
            />
            <div id='before_price_help' className='form-text'>
              Regular price will show like this <del>49.99</del>.
            </div>
          </div>
        </div>

        <div className='col-md-6'>
          <div className='form-group'>
            <label className='form-label fw-semibold'>Duration</label>
            <input
              type='text'
              className='form-control'
              placeholder='20 minutes'
              name='duration'
              value={course.duration}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* <div className='col-md-6'>
          <div className='form-group'>
            <label className='form-label fw-semibold'>Access Time</label>
            <select className='form-select' name='access_time' value={course.access_time} onChange={handleChange}>
              <option value=''>Select</option>
              <option value='Lifetime'>Lifetime</option>
              <option value='Three Months'>Three Months</option>
              <option value='Six Months'>Six Months</option>
              <option value='1 Year'>1 Year</option>
            </select>
          </div>
        </div> */}

        <div className='col-md-6'>
          <div className='form-group'>
            <label className='form-label fw-semibold'>Level</label>
            <select className='form-select' name='levelId' value={course.levelId} onChange={handleChange}>
              <option value=''>Select</option>
              {levels.length > 0 &&
                levels.map((level) => (
                  <option key={level.id} value={level.id}>
                    {level.name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className='col-md-6'>
          <div className='form-group'>
            <label className='form-label fw-semibold'>Course Image</label>
            <input type='file' className='form-control file-control' name='image' onChange={handleChange} required={true} />
            <div className='form-text'>Upload image size 750x500!</div>

            <div className='mt-2'>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imagePreview ? imagePreview : '/images/courses/course-1.jpg'}
                alt='image'
                className='img-thumbnail w-100px me-2'
              />
            </div>
          </div>
        </div>

        <div className='col-md-6'>
          <div className='form-group'>
            <label className='form-label fw-semibold'>Course Category</label>
            <select className='form-select' name='catId' value={course.catId} onChange={handleChange}>
              <option value=''>Select</option>
              {categories.length > 0 &&
                categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className='col-md-12'>
          <div className='form-group'>
            <label className='form-label fw-semibold'>Short Description</label>
            <textarea className='form-control' name='short_desc' value={course.short_desc} rows={4} onChange={handleChange} />
            <div className='form-text'>The description will highlight all available areas.</div>
          </div>
        </div>

        <div className='col-md-6'>
          <div className='form-group'>
            <label className='form-label fw-semibold'>Overview</label>
            <CourseRteEditor
              content={course.overview}
              onChange={(value: string) =>
                setCourse((prevState) => ({
                  ...prevState,
                  overview: value
                }))
              }
            />
          </div>
        </div>
        <div className='col-md-6'>
          <div className='form-group'>
            <label className='form-label fw-semibold'>Requirements</label>
            <CourseRteEditor
              content={course.requirements}
              onChange={(value: string) =>
                setCourse((prevState) => ({
                  ...prevState,
                  requirements: value
                }))
              }
            />
          </div>
        </div>
        <div className='col-md-6'>
          <div className='form-group'>
            <label className='form-label fw-semibold'>What You Will Learn</label>
            <CourseRteEditor
              content={course.what_you_will_learn}
              onChange={(value: string) =>
                setCourse((prevState) => ({
                  ...prevState,
                  what_you_will_learn: value
                }))
              }
            />
          </div>
        </div>
        <div className='col-md-6'>
          <div className='form-group'>
            <label className='form-label fw-semibold'>Who Is This Course For?</label>
            <CourseRteEditor
              content={course.who_is_this_course_for}
              onChange={(value: string) =>
                setCourse((prevState) => ({
                  ...prevState,
                  who_is_this_course_for: value
                }))
              }
            />
          </div>
        </div>

        <div className='col-12'>
          <Button loading={loading} disabled={disabled} btnText={btnText || 'Create Course'} btnClass='default-btn' />
        </div>
      </div>
    </form>
  );
};

export default CourseCreateForm;
