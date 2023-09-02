import React from 'react';

import RegisterForm from '@/components/BecomeAInstructor/RegisterForm';
import PageContent from '@/components/_App/PageContent';

const BecomeInstructor = ({ user }) => {
  return (
    <PageContent pageTitle='Become an Instructor'>
      <RegisterForm user={user} />
    </PageContent>
  );
};

export default BecomeInstructor;
