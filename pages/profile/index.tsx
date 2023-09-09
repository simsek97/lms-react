import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/profile/userinfo', undefined, { shallow: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

// This gets called on every request
export async function getServerSideProps() {
  // const { data } = await API.graphql<GraphQLQuery<UpdateUserMutation>>(graphqlOperation(updateUser, { id }));
  return { props: {} };
}

export default Index;
