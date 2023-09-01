import { GraphQLQuery } from '@aws-amplify/api';
import { API, graphqlOperation } from 'aws-amplify';

import { ListSubscriptionTiersQuery } from '@/src/API';
import { listSubscriptionTiers } from '@/src/graphql/queries';

const getTiers = async (limit: number) => {
  let allTiers = [];

  try {
    const { data } = await API.graphql<GraphQLQuery<ListSubscriptionTiersQuery>>(graphqlOperation(listSubscriptionTiers, { limit }));

    allTiers = data.listSubscriptionTiers.items;
  } catch (e) {
    console.log(e);
  }

  return allTiers;
};

export default getTiers;
