import Box from '@mui/material/Box';

import AdminLayout from '@/components/Admin/AdminLayout';

const Index = () => {
  return (
    <AdminLayout title='Dashboard'>
      <Box sx={{ mt: 3 }}>Welcome to Admin Portal!</Box>
    </AdminLayout>
  );
};

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  // const res = await fetch(`/api/dashboard`);
  // const { users, earningsTotal } = await res.json();

  // Pass data to the page via props
  return {
    props: {
      // users,
      // earningsTotal
    }
  };
}

export default Index;
