import React from 'react';
import Link from 'next/link';
import CoursesList from '@/components/Courses/CoursesList';
import Banner from '@/components/Index/Banner';
import Navbar from '@/components/_App/Navbar';
import Categories from '@/components/Index/Categories';
import Transform from '@/components/Index/Transform';
import Features from '@/components/Features/Features';
import Testimonials from '@/components/Index/Testimonials';
import Partners from '@/components/Index/Partners';
import Teaching from '@/components/Index/Teaching';
import Business from '@/components/Index/Business';
import Footer from '@/components/_App/Footer';
import baseUrl from '@/utils/baseUrl';
import { motion } from 'framer-motion';

const Index = ({ courses, categories, user }) => {
  const variants = {
    visible: {
      opacity: 1,
      scale: 1,
      transition: { delay: 0.2, type: 'spring', duration: 1 }
    },
    hidden: { opacity: 0, scale: 0 }
  };
  return (
    <>
      <Navbar user={user} />
      <Banner user={user} />
      <Features />

      <div className='feature-dcourses-area bg-color-f6fafb pt-100 pb-70'>
        <div className='container'>
          <div className='title-btn d-flex justify-content-between align-items-center'>
            <motion.div className='section-title left-title' initial='hidden' whileInView='visible' variants={variants}>
              <span className='top-title'>Featured Courses</span>
              <h2>Find Yours From The Featured</h2>
            </motion.div>
            <Link href='/courses'>
              <a className='default-btn'>View All</a>
            </Link>
          </div>
          <CoursesList courses={courses} user={user} />
        </div>

        {/* <img src='/images/courses-shape.png' className='courses-shape' alt='Image' /> */}
      </div>

      <Categories categories={categories} />
      <Transform />
      <Testimonials />
      {/* <Partners /> */}
      {/* <Teaching /> */}
      <Business />
      <Footer />
    </>
  );
};

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`${baseUrl}/api/home-courses`);
  const { courses, categories } = await res.json();

  // Pass data to the page via props
  return { props: { courses, categories } };
}

export default Index;
