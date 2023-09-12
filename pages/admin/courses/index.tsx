import { GraphQLQuery } from '@aws-amplify/api';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PhotoIcon from '@mui/icons-material/Photo';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { API, graphqlOperation } from 'aws-amplify';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import toast from 'react-hot-toast';

import AdminLayout from '@/components/Admin/AdminLayout';
import { CoursePhoto } from '@/components/Course/CoursePhoto';
import { ICourse } from '@/data/course';
import { DeleteCourseMutation, ListCoursesQuery } from '@/src/API';
import { deleteCourse } from '@/src/graphql/mutations';
import { listCourses } from '@/src/graphql/queries';
import { getS3File } from '@/utils/getS3File';
import { toastErrorStyle, toastSuccessStyle } from '@/utils/toast';
import Tooltip from '@mui/material/Tooltip';

const Courses = ({ user }) => {
  const router = useRouter();
  const [courses, setCourses] = React.useState<ICourse[]>([]);
  const [showPhoto, setShowPhoto] = React.useState<ICourse>();
  const [pageToken, setPageToken] = React.useState(null);
  const [page, setPage] = React.useState(0);
  const [isLoading, setLoading] = React.useState(true);

  const pageSize = 10;

  const columns: GridColDef[] = [
    {
      flex: 0.1,
      width: 40,
      field: 'image',
      headerName: 'Photo',
      renderCell: (params) => {
        return (
          <div className='mt-3'>
            {params.row?.image?.url ? (
              <Image src={params.row.image.url} alt='image' className='img-thumbnail' width={40} height={40} />
            ) : (
              <Image src='/images/courses/course-9.jpg' alt='image' className='img-thumbnail' width={40} height={40} />
            )}
          </div>
        );
      }
    },
    {
      flex: 0.3,
      minWidth: 200,
      field: 'title',
      headerName: 'Title'
    },
    {
      flex: 0.4,
      minWidth: 150,
      field: 'slug',
      headerName: 'Slug'
    },
    {
      flex: 0.1,
      minWidth: 150,
      field: 'level',
      headerName: 'Grade',
      renderCell: (params) => params.row.level.name
    },
    {
      flex: 0.1,
      minWidth: 150,
      field: 'category',
      headerName: 'Category',
      renderCell: (params) => params.row.category.name
    },
    {
      flex: 0.2,
      minWidth: 60,
      field: 'actions',
      headerName: 'Actions',
      renderCell: (params) => {
        return (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Tooltip title='Add Photo'>
              <IconButton size='small' color='info' onClick={() => setShowPhoto(params.row)}>
                <PhotoIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title='Update'>
              <IconButton size='small' color='primary' onClick={() => router.push(`/admin/courses/${params.row.id}`)}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title='Delete'>
              <IconButton size='small' color='secondary' onClick={() => confirmDelete(params.row)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        );
      }
    }
  ];

  const confirmDelete = (course: ICourse) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: `Are you sure to delete ${course.title}?`,
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleDelete(course)
        },
        {
          label: 'No'
        }
      ]
    });
  };

  const handleDelete = async (course) => {
    try {
      setLoading(true);

      await API.graphql<GraphQLQuery<DeleteCourseMutation>>({
        query: deleteCourse,
        variables: {
          input: { id: course.id }
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
      });

      const updatedCourses = courses.filter((cat) => cat.id != course.id);
      setCourses(updatedCourses);
      toast.error('The record has been successfully deleted.', toastSuccessStyle);
    } catch (e) {
      console.log(e);
      toast.error(e.message, toastErrorStyle);
    } finally {
      setLoading(false);
    }
  };

  const fetchCourses = async (limit: number, nextToken: string) => {
    setLoading(true);

    try {
      setLoading(true);
      const { data } = await API.graphql<GraphQLQuery<ListCoursesQuery>>(graphqlOperation(listCourses, { limit, nextToken }));

      setPageToken(data.listCourses.nextToken);

      const updatedCourses = [...courses, ...data.listCourses.items];
      setCourses(updatedCourses.sort((a, b) => Number(a.id) - Number(b.id)) as ICourse[]);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchCourses(pageSize, pageToken);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  React.useEffect(() => {
    const getImages = async () => {
      courses.forEach(async (course: ICourse) => {
        if (course?.image?.key) {
          const imageUrl = await getS3File(course?.image?.key);
          course.image.url = imageUrl;
        }
      });

      setCourses(courses);
    };

    getImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AdminLayout
      title='Courses'
      user={user}
      button={
        <Button startIcon={<AddIcon />} onClick={() => router.push('/admin/courses/add')}>
          Add Course
        </Button>
      }>
      <DataGrid autoHeight loading={courses.length === 0} rows={courses} columns={columns} hideFooter={true} />
      <Box sx={{ textAlign: 'center', p: 1, gap: 1 }}>
        {pageToken && (
          <Button
            startIcon={isLoading && <CircularProgress size={14} color='inherit' />}
            variant='contained'
            onClick={() => setPage(page + 1)}>
            Show More
          </Button>
        )}
      </Box>

      {showPhoto && <CoursePhoto course={showPhoto} setCourse={setShowPhoto} courses={courses} setCourses={setCourses} />}
    </AdminLayout>
  );
};

export default Courses;
