//@ts-nocheck
import { UserByEmailQuery } from '@/src/API';
import { userByEmail } from '@/src/graphql/queries';
import { GraphQLQuery } from '@aws-amplify/api';
import { API, graphqlOperation } from 'aws-amplify';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      await userSignin(req, res);
      break;
    default:
      res.status(405).json({
        message: `Method ${req.method} not allowed`
      });
  }
}

const userSignin = async (req: any, res: any) => {
  const { email, cognitoUser } = req.body;

  const signInUserSession = cognitoUser?.signInUserSession;
  const userPayload = signInUserSession?.idToken?.payload;
  const cognitoGroups: [string] = (userPayload && userPayload['cognito:groups']) || ['User'];

  try {
    // Get user info from DynamoDB
    const { data } = await API.graphql<GraphQLQuery<UserByEmailQuery>>(graphqlOperation(userByEmail, { email }));

    console.log('data', data);
    if (data) {
      const user = data.userByEmail.items[0];

      const isid_user_token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '7d'
      });

      res.status(200).json({
        message: 'Login Successful!',
        isid_user_token,
        user
      });
    } else {
      res.status(404).json({ message: 'User account does not exist' });
    }
  } catch (e) {
    res.status(400).json({
      error_code: 'user_login_error',
      message: e.message
    });
  }
};
