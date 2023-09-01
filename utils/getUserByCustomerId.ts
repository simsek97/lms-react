import { GraphQLQuery } from '@aws-amplify/api';
import { API, graphqlOperation } from 'aws-amplify';

import { UserByCustomerIdQuery } from '@/src/API';
import { userByCustomerId } from '@/src/graphql/queries';

const getUserByCustomerId = async (stripeCustomerId: string) => {
  let user = null;

  try {
    const { data } = await API.graphql<GraphQLQuery<UserByCustomerIdQuery>>(graphqlOperation(userByCustomerId, { stripeCustomerId }));

    user = data.userByCustomerId?.items?.length > 0 ? data.userByCustomerId?.items[0] : null;
  } catch (e) {
    console.log(e);
  }

  return user;
};

export default getUserByCustomerId;
