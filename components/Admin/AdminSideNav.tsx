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
    title: 'Courses',
    url: '/admin/courses'
  },
  {
    id: 3,
    title: 'Users',
    url: '/admin/users'
  },
  {
    id: 4,
    title: 'Testimonials',
    url: '/admin/testimonials'
  },
  {
    id: 5,
    title: 'Levels',
    url: '/admin/levels'
  },
  {
    id: 6,
    title: 'Categories',
    url: '/admin/categories'
  },
  {
    id: 7,
    title: 'Subscription Tiers',
    url: '/admin/subscription-tiers'
  },
  {
    id: 8,
    title: 'Coupons',
    url: '/admin/coupons'
  },
  {
    id: 9,
    title: 'Welcome Message',
    url: '/admin/welcome-message'
  },
  {
    id: 10,
    title: 'Banner Ads',
    url: '/admin/banner-ads'
  },
  {
    id: 11,
    title: 'FAQs',
    url: '/admin/faqs'
  },
  {
    id: 12,
    title: 'Admins',
    url: '/admin/admins'
  }
];

const AdminSideNav = ({ user }) => {
  const router = useRouter();
  const currentRoute = router.pathname;
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

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
          <div className='side-nav'>
            <ul>
              {adminMenus?.map((menu) => {
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
