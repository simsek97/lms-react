import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

export const LevelForm = ({ values, touched, errors, handleChange }) => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            autoFocus
            fullWidth
            name='name'
            label='Name'
            value={values?.name || ''}
            onChange={handleChange}
            error={Boolean((touched?.name && errors?.name) || false)}
            helperText={(Boolean(touched?.name && errors?.name) && errors?.name) || ''}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            name='slug'
            label='Slug'
            value={values?.slug || ''}
            onChange={handleChange}
            error={Boolean((touched?.slug && errors?.slug) || false)}
            helperText={(Boolean(touched?.slug && errors?.slug) && errors?.slug) || ''}
          />
        </Grid>
      </Grid>
    </>
  );
};
