import { GraphQLQuery } from '@aws-amplify/api';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { DataGrid } from '@mui/x-data-grid';
import { API, graphqlOperation } from 'aws-amplify';
import { useRouter } from 'next/router';
import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import toast from 'react-hot-toast';

import AdminLayout from '@/components/Admin/AdminLayout';
import { ICourse } from '@/data/course';
import { DeleteCourseMutation, ListCoursesQuery } from '@/src/API';
import { deleteCourse } from '@/src/graphql/mutations';
import { listCourses } from '@/src/graphql/queries';
import { toastErrorStyle, toastSuccessStyle } from '@/utils/toast';

const Courses = ({ user }) => {
  const router = useRouter();
  const [courses, setCourses] = React.useState<ICourse[]>([]);
  const [pageToken, setPageToken] = React.useState(null);
  const [page, setPage] = React.useState(0);
  const [isLoading, setLoading] = React.useState(true);

  const pageSize = 10;

  const columns = [
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
      flex: 0.2,
      minWidth: 60,
      field: 'actions',
      headerName: 'Actions',
      renderCell: (params) => {
        return (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button size='small' color='primary' variant='text' onClick={() => router.push(`/admin/courses/${params.row.id}`)}>
              Update
            </Button>
            <Button size='small' color='secondary' variant='text' onClick={() => confirmDelete(params.row)}>
              Remove
            </Button>
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

  const fetchCourses = async (limit: number) => {
    setLoading(true);

    try {
      setLoading(true);
      const { data } = await API.graphql<GraphQLQuery<ListCoursesQuery>>(graphqlOperation(listCourses, { limit }));

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
    fetchCourses(pageSize);
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
    </AdminLayout>
  );
};

export default Courses;
