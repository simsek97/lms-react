import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import baseUrl from '@/utils/baseUrl';
import axios from 'axios';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

const FeatureCard = ({ feature }) => {
  const router = useRouter();
  const { title, image, explanation } = feature;

  return (
    <div className='col-lg-3 col-md-6 text-center'>
      <div className='single-courses'>
        <div className='courses-main-img'>
          <img src={image} alt='Image' />
        </div>
        <div className='courses-content'>
          <div className='admin'>
            <p>{explanation}</p>
          </div>
        </div>

        {/* <div className='courses-hover-content'>
          <div className='sk'>
            <div>
              <h3>
                <Link href={`/course/${slug}`}>
                  <a>{title}</a>
                </Link>
              </h3>
              <p>{short_desc.slice(0, 108)}</p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default FeatureCard;
