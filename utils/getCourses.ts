import { GraphQLQuery } from '@aws-amplify/api';
import { API, graphqlOperation } from 'aws-amplify';

import { ListCoursesQuery } from '@/src/API';
import { listCourses } from '@/src/graphql/queries';

const getCourses = async (limit: number, nextToken: string | null, filter?: any) => {
  let allCourses = null;
  let defaultOptions = { limit, nextToken };

  const options = filter
    ? {
        ...defaultOptions,
        filter
      }
    : defaultOptions;

  try {
    const { data } = await API.graphql<GraphQLQuery<ListCoursesQuery>>(graphqlOperation(listCourses, options));

    allCourses = data.listCourses;
  } catch (e) {
    console.log(e);
  }

  return allCourses;
};

export default getCourses;
