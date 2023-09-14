import { GraphQLQuery } from '@aws-amplify/api';
import { API, graphqlOperation } from 'aws-amplify';

import { ListCoursesQuery } from '@/src/API';
import { listCourses } from '@/src/graphql/queries';

const getCourseBySlug = async (slug: string | null) => {
  let courseInfo = null;

  try {
    const { data } = await API.graphql<GraphQLQuery<ListCoursesQuery>>(
      graphqlOperation(listCourses, {
        filter: {
          slug: {
            eq: slug
          }
        }
      })
    );

    courseInfo = data.listCourses?.items[0];
  } catch (e) {
    console.log(e);
  }

  return courseInfo;
};

export default getCourseBySlug;
