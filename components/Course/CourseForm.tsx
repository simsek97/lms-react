import { GraphQLQuery } from '@aws-amplify/api';
import { ICategory } from '@/data/category';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { API, graphqlOperation } from 'aws-amplify';
import React from 'react';
import { ListCategoriesQuery, ListLevelsQuery } from '@/src/API';
import { listCategories, listLevels } from '@/src/graphql/queries';
import { ILevel } from '@/data/level';

export const CourseForm = ({ values, touched, errors, handleChange }) => {
  const [categories, setCategories] = React.useState<ICategory[]>([]);
  const [levels, setLevels] = React.useState<ILevel[]>([]);

  const fetchCategories = async (limit: number) => {
    try {
      const { data } = await API.graphql<GraphQLQuery<ListCategoriesQuery>>(graphqlOperation(listCategories, { limit }));

      const updatedCategories = [...categories, ...data.listCategories.items];
      setCategories(updatedCategories.sort((a, b) => Number(a.id) - Number(b.id)) as ICategory[]);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchLevels = async (limit: number) => {
    try {
      const { data } = await API.graphql<GraphQLQuery<ListLevelsQuery>>(graphqlOperation(listLevels, { limit }));

      const updatedLevels = [...levels, ...data.listLevels.items];
      setLevels(updatedLevels.sort((a, b) => Number(a.id) - Number(b.id)) as ILevel[]);
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    fetchCategories(30);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    fetchLevels(30);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            autoFocus
            fullWidth
            name='title'
            label='Title'
            value={values?.title || ''}
            onChange={handleChange}
            error={Boolean((touched?.title && errors?.title) || false)}
            helperText={(Boolean(touched?.title && errors?.title) && errors?.title) || ''}
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

        <Grid item xs={12}>
          <TextField
            fullWidth
            name='shortDesc'
            label='Short Description'
            value={values?.shortDesc || ''}
            onChange={handleChange}
            error={Boolean((touched?.shortDesc && errors?.shortDesc) || false)}
            helperText={(Boolean(touched?.shortDesc && errors?.shortDesc) && errors?.shortDesc) || ''}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            name='overview'
            label='Overview'
            value={values?.overview || ''}
            onChange={handleChange}
            error={Boolean((touched?.overview && errors?.overview) || false)}
            helperText={(Boolean(touched?.overview && errors?.overview) && errors?.overview) || ''}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            name='latestPrice'
            label='Sales Price'
            value={values?.latestPrice || ''}
            onChange={handleChange}
            error={Boolean((touched?.latestPrice && errors?.latestPrice) || false)}
            helperText={(Boolean(touched?.latestPrice && errors?.latestPrice) && errors?.latestPrice) || ''}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            name='beforePrice'
            label='Originial Price'
            value={values?.beforePrice || ''}
            onChange={handleChange}
            error={Boolean((touched?.beforePrice && errors?.beforePrice) || false)}
            helperText={(Boolean(touched?.beforePrice && errors?.beforePrice) && errors?.beforePrice) || ''}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            name='lessons'
            label='Lessons'
            value={values?.lessons || ''}
            onChange={handleChange}
            error={Boolean((touched?.lessons && errors?.lessons) || false)}
            helperText={(Boolean(touched?.lessons && errors?.lessons) && errors?.lessons) || ''}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            name='duration'
            label='Length'
            value={values?.duration || ''}
            onChange={handleChange}
            error={Boolean((touched?.duration && errors?.duration) || false)}
            helperText={(Boolean(touched?.duration && errors?.duration) && errors?.duration) || ''}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            select
            name='catID'
            label='Category'
            value={values?.catID || ''}
            onChange={handleChange}
            error={Boolean((touched?.catID && errors?.catID) || false)}
            helperText={(Boolean(touched?.catID && errors?.catID) && errors?.catID) || ''}>
            {categories.map((category: ICategory) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            select
            name='levelID'
            label='Level'
            value={values?.levelID || ''}
            onChange={handleChange}
            error={Boolean((touched?.levelID && errors?.levelID) || false)}
            helperText={(Boolean(touched?.levelID && errors?.levelID) && errors?.levelID) || ''}>
            {levels.map((level: ILevel) => (
              <MenuItem key={level.id} value={level.id}>
                {level.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </>
  );
};
