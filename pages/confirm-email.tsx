import Grid from '@mui/material/Grid';

import ConfirmEmailForm from '@/components/Authentication/ConfirmEmailForm';
import PageContent from '@/components/_App/PageContent';

const ConfirmEmailPage = () => {
  return (
    <PageContent pageTitle='Confirm Email'>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} sx={{ mx: 'auto' }}>
          <ConfirmEmailForm />
        </Grid>
      </Grid>
    </PageContent>
  );
};

export default ConfirmEmailPage;
