import { PropsWithChildren } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import AdminSideNav from '@/components/Admin/AdminSideNav';
import Button from '@mui/material/Button';

interface IAdminLayout {
  user?: any;
  title?: string;
  button?: any;
}

const AdminLayout = (props: PropsWithChildren<IAdminLayout>) => {
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
