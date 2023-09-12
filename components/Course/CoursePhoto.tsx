import { GraphQLQuery } from '@aws-amplify/api';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { API } from 'aws-amplify';
import React from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

import { ICourse } from '@/data/course';
import { UpdateCourseMutation } from '@/src/API';
import { updateCourse } from '@/src/graphql/mutations';
import { updateCoursesAction } from '@/store/actions/courseActions';
import { IReduxStore } from '@/store/index';
import SubmitButton from '@/utils/SubmitButton';
import { getS3File } from '@/utils/getS3File';
import { putS3File } from '@/utils/putS3File';
import { toastErrorStyle, toastSuccessStyle } from '@/utils/toast';

const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

interface ICoursePhoto {
  courses: ICourse[];
  setCourses: any;
  course: ICourse;
  setCourse: any;
}

export const CoursePhoto = ({ courses, setCourses, course, setCourse }: ICoursePhoto) => {
  const [avatarFile, setAvatarFile] = React.useState<File>();
  const [photoPreview, setPhotoPreview] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    const profilePhotoSize = files[0].size / 1024 / 1024;
    if (profilePhotoSize > 2) {
      toast.error('The profile photo size greater than 2 MB. Make sure less than 2 MB.', toastErrorStyle);
      e.target.value = null;
      return;
    }

    setAvatarFile(files[0]);

    setPhotoPreview(window.URL.createObjectURL(files[0]));
  };

  const handleSave = async () => {
    if (!avatarFile) {
      return false;
    }

    setLoading(true);
    try {
      const upload = await putS3File(avatarFile['name'], avatarFile);

      // Get S3 signed url
      const uploadUrl = await getS3File(upload.key);

      // Update user on DynamoDB
      const { data } = await API.graphql<GraphQLQuery<UpdateCourseMutation>>({
        query: updateCourse,
        variables: {
          input: {
            id: course.id,
            image: {
              key: upload.key,
              url: uploadUrl
            }
          }
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
      });

      // Update the store
      const updatedCourses = courses.map((c: ICourse) => (c.id === course.id ? (data.updateCourse as ICourse) : c));
      setCourses(updatedCourses);

      setLoading(false);
      setCourse(null);
      toast.success('Course image has been successfully saved.', toastSuccessStyle);
    } catch (err) {
      console.log(err);
      toast.error('Course image could not be saved.', toastErrorStyle);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    const getCoursePhoto = async (filename: string) => {
      const photo = await getS3File(filename);

      return photo;
    };

    if (course?.image?.key) {
      getCoursePhoto(course.image?.key).then((data) => setPhotoPreview(data));
    }
  }, [course?.image]);

  return (
    <Dialog open={true} onClose={() => setCourse(null)} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
      <DialogTitle>Add/Update Photo: {course.title}</DialogTitle>

      <Divider />

      <DialogContent sx={{ width: 450 }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Button component='label' variant='contained' startIcon={<CloudUploadIcon />} href='#file-upload'>
              Upload a file
              <VisuallyHiddenInput type='file' onChange={handleChange} />
            </Button>
            <div className='form-text mt-2'>Upload image size 200x200 pixels!</div>
            <div className='mt-3'>
              {photoPreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={photoPreview} alt='image' className='img-thumbnail mw-200px' />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src='/images/courses/course-9.jpg' alt='image' className='img-thumbnail mw-200px' />
              )}
            </div>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ mb: 2 }}>
        <SubmitButton buttonType='button' disabled={isLoading} loading={isLoading} btnOnClick={handleSave} btnText='Save' />
        <Button onClick={() => setCourse(null)}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};
