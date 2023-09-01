import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useState } from 'react';
import StickyBox from 'react-sticky-box';

const adminMenus = [
  {
    id: 1,
    title: 'Dashboard',
    url: '/admin/dashboard'
  },
  {
    id: 2,
    title: 'Users',
    url: '/admin/users'
  },
  {
    id: 3,
    title: 'Admins',
    url: '/admin/admins'
  },
  {
    id: 4,
    title: 'Subscription Tiers',
    url: '/admin/subscription-tiers'
  },
  {
    id: 5,
    title: 'Welcome Message',
    url: '/admin/welcome-message'
  },
  {
    id: 6,
    title: 'Banner Ads',
    url: '/admin/banner-ads'
  },
  {
    id: 7,
    title: 'FAQs',
    url: '/admin/faqs'
  }
];

const AdminSideNav = ({ user }) => {
  const router = useRouter();
  const currentRoute = router.pathname;
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  //@TODO Check users role
  // useEffect(() => {
  //   if (user.role != 'admin') {
  //     router.replace('/');
  //   }
  // }, [router, user]);

  const changeAdminMenu = (url: string) => {
    setShowSidebar(false);
    router.push(url);
  };

  return (
    <>
      {/* For mobile device */}
      <div className='text-end d-md-none'>
        <div className='sidebar-menu-button' onClick={() => setShowSidebar(true)}>
          Sidebar Menu
        </div>
      </div>

      <div className={`side-nav-wrapper ${showSidebar ? 'active' : ''}`}>
        <StickyBox className='sticky-box' offsetTop={50} offsetBottom={20}>
          {/* Close button */}
          <div className='close d-md-none' onClick={() => setShowSidebar(false)}>
            <i className='bx bx-x'></i>
          </div>

          {/* Nav */}
          <div className='side-nav' style={{ padding: '70px 10px 20px 10px' }}>
            <ul>
              {adminMenus.map((menu) => {
                return (
                  <motion.li
                    key={menu.id}
                    whileHover={{
                      scale: 1.05
                    }}
                    whileTap={{ scale: 0.9 }}
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 10
                    }}>
                    <a className={currentRoute === menu.url ? 'active' : ''} onClick={() => changeAdminMenu(menu.url)}>
                      <i className='bx bxs-square-rounded'></i> {menu.title}
                    </a>
                  </motion.li>
                );
              })}
            </ul>
          </div>
        </StickyBox>
      </div>
    </>
  );
};

export default AdminSideNav;
