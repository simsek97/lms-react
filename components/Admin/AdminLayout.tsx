import { PropsWithChildren } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';

import AdminSideNav from '@/components/Admin/AdminSideNav';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { IReduxStore } from '@/store/index';

interface IAdminLayout {
  user?: any;
  title?: string;
  button?: any;
}

const AdminLayout = (props: PropsWithChildren<IAdminLayout>) => {
  const router = useRouter();

  const storeUser = useSelector((store: IReduxStore) => store.user.profile);
  const user = props?.user || storeUser;

  React.useEffect(() => {
    if (user.role.toLowerCase() != 'admin') {
      router.replace('/');
    }
  }, [router, user]);

  return (
    <Box className='main-content'>
      <Box className='container-fluid'>
        <Box className='row'>
          <Box className='col-md-3'>
            <AdminSideNav user={props?.user} />
          </Box>

          <Box className='col-md-9'>
            <Box sx={{ pt: 2, pb: 1, display: 'flex' }}>
              <Typography variant='h4'>{props?.title}</Typography>
              <Box sx={{ flexGrow: 1 }} />
              {props?.button && props.button}
            </Box>
            <Box>{props?.children}</Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;
