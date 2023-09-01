import fetch, { Request } from 'node-fetch';

import { updateUser } from '@/src/graphql/mutations';

const GRAPHQL_ENDPOINT = process?.env?.GRAPHQL_ENDPOINT;
const GRAPHQL_API_KEY = process?.env?.GRAPHQL_API_KEY;

const updateUserById = async (userUpdateInput: any) => {
  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': GRAPHQL_API_KEY
      },
      body: JSON.stringify({
        query: updateUser,
        variables: {
          input: userUpdateInput
        },
        authMode: 'API_KEY'
      })
    };

    const request = new Request(GRAPHQL_ENDPOINT, options);

    const body = await fetch(request).then((data) => data.json());

    return body;
  } catch (e) {
    console.log(e);
  }
};

export default updateUserById;
