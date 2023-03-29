import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import CourseSkeletonLoader from '@/utils/CourseSkeletonLoader';
import baseUrl from '@/utils/baseUrl';
import CourseCard from './FeatureCard';

interface IFeature {
  id: number;
  title: string;
  image: string;
  explanation: string;
}

const features: IFeature[] = [
  {
    id: 1,
    title: 'Attention Development',
    image: '/images/features/attention-development.svg',
    explanation: 'Focus and Concentration, Finding the Missing Piece…'
  },
  {
    id: 2,
    title: 'Digital Intelligence',
    image: '/images/features/digital-intelligence.svg',
    explanation: 'Coding, Numerical Equations, Picture Relations…'
  },
  {
    id: 3,
    title: 'Perception Development',
    image: '/images/features/perception-development.svg',
    explanation: 'Picture Relationships, Vital Relationships, Building Interest…'
  },
  {
    id: 4,
    title: 'Memory Enhancement',
    image: '/images/features/memory-enhancement.svg',
    explanation: 'Short Term Memory, Long Term Memory, Visual Memory…'
  },
  {
    id: 5,
    title: 'Reasoning',
    image: '/images/features/reasoning.svg',
    explanation: 'Visual Layout, Letter-Number Encodings, Shape Patterns…'
  },
  {
    id: 6,
    title: 'Verbal Intelligence',
    image: '/images/features/verbal-intelligence.svg',
    explanation: 'Synonyms, Antonyms, Storytelling…'
  },
  {
    id: 7,
    title: 'Resphebe',
    image: '/images/features/resphebe.svg',
    explanation: 'Picture Relations, Relationship Between Picture and Text…'
  },
  {
    id: 8,
    title: 'Rhythmic Intelligence',
    image: '/images/features/rhythmic-intelligence.svg',
    explanation: 'Sound and Vibration, Sequential Sounds…'
  }
];

const FeaturesList = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='row justify-content-center'>
      {loading ? (
        <CourseSkeletonLoader />
      ) : (
        <>{features.length > 0 ? features.map((feature) => <CourseCard key={feature.id} feature={feature} />) : <h3>Empty</h3>}</>
      )}
    </div>
  );
};

export default FeaturesList;
