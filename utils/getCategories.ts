import { GraphQLQuery } from '@aws-amplify/api';
import { API, graphqlOperation } from 'aws-amplify';

import { ListCategoriesQuery } from '@/src/API';
import { listCategories } from '@/src/graphql/queries';

const getCategories = async (limit: number, nextToken: string | null) => {
  let allCategories = null;

  try {
    const { data } = await API.graphql<GraphQLQuery<ListCategoriesQuery>>(graphqlOperation(listCategories, { limit, nextToken }));

    allCategories = data.listCategories;
  } catch (e) {
    console.log(e);
  }

  return allCategories;
};

export default getCategories;
