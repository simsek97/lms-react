import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import baseUrl from '@/utils/baseUrl';
import axios from 'axios';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Image from 'next/image';

const FeatureCard = ({ feature }) => {
  const router = useRouter();
  const { title, image, explanation } = feature;

  return (
    <div className='col-lg-3 col-sm-6'>
      <div className='single-features'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt={title} />
        {/* <h3>{title}</h3> */}
        <p>{explanation}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
