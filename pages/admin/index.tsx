import { useRouter } from 'next/router';
import React from 'react';

const Index = () => {
  const router = useRouter();

  React.useEffect(() => {
    if (router.pathname === '/admin') {
      router.push('/admin/dashboard/', undefined, { shallow: true });
    }
  }, [router]);

  return null;
};

// This gets called on every request
export async function getServerSideProps() {
  return { props: {} };
}

export default Index;
