import React from 'react';
import FeatureCard from './FeatureCard';

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

const Features = () => {
  return (
    <div className='our-features-area bg-color-f1efee pt-100 pb-70'>
      <div className='container'>
        <div className='section-title'>
          <span className='top-title'>What is Expected?</span>
          <h2>SmartKid will help create future scientists. Step up now and let your kid grow into future with fun games.</h2>
        </div>

        <div className='row justify-content-center'>
          {features.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </div>

      <img src='/images/features/features-banner.svg' alt='Features Banner' />
      <img src='/images/features/feature-shape-1.svg' className='shape shape-1' alt='feature' />
    </div>
  );
};

export default Features;
