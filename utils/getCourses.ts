import { GraphQLQuery } from '@aws-amplify/api';
import { API, graphqlOperation } from 'aws-amplify';

import { ListCoursesQuery } from '@/src/API';
import { listCourses } from '@/src/graphql/queries';

const getCourses = async (limit: number, nextToken: string | null) => {
  let allCourses = null;

  try {
    const { data } = await API.graphql<GraphQLQuery<ListCoursesQuery>>(graphqlOperation(listCourses, { limit, nextToken }));

    allCourses = data.listCourses;
  } catch (e) {
    console.log(e);
  }

  return allCourses;
};

export default getCourses;
