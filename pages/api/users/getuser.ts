import { GetUserQuery } from '@/src/API';
import { getUser } from '@/src/graphql/queries';
import { GraphQLQuery } from '@aws-amplify/api';
import { API, graphqlOperation } from 'aws-amplify';
import jwt from 'jsonwebtoken';

export default async function handler(req: any, res: any) {
  if (!('authorization' in req.headers)) {
    res.status(401).json({ message: 'No autorization token' });
  } else {
    switch (req.method) {
      case 'GET':
        await userGetById(req, res);
        break;
      default:
        res.status(405).json({
          message: `Method ${req.method} not allowed`
        });
    }
  }
}

const userGetById = async (req: any, res: any) => {
  try {
    const { id } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);

    const { data } = await API.graphql<GraphQLQuery<GetUserQuery>>(graphqlOperation(getUser, { id }));

    if (data) {
      const user = data.getUser;

      res.status(200).json({ user });
    } else {
      res.status(400).json({
        error_code: 'get_user_by_id',
        message: 'User could not be updated!'
      });
    }
  } catch (e) {
    res.status(400).json({
      error_code: 'get_user_by_id',
      message: e.message
    });
  }
};
