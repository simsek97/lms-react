import Box from '@mui/material/Box';
import Link from 'next/link';

const UserNavbar = ({ active }) => {
  return (
    <Box sx={{ mt: 3 }}>
      <ul className='nav-style1'>
        <li>
          <Link href='/profile/userinfo'>
            <a className={active === '/profile/userinfo' ? 'active' : ''}>Profile</a>
          </Link>
        </li>
        <li>
          <Link href='/profile/subscription'>
            <a className={active === '/profile/subscription' ? 'active' : ''}>Subscription</a>
          </Link>
        </li>
        <li>
          <Link href='/profile/photo'>
            <a className={active === '/profile/photo' ? 'active' : ''}>Profile Photo</a>
          </Link>
        </li>
      </ul>
    </Box>
  );
};

export default UserNavbar;
