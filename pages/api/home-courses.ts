import Sequelize from 'sequelize';
import { Course, User, Enrolment, Category } from 'database/models';
import { listCourses } from '@/src/graphql/queries';
import axios from 'axios';

const GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT;
const GRAPHQL_API_KEY = process.env.GRAPHQL_API_KEY;

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      await handleGetRequest(req, res);
      break;
    default:
      res.status(405).json({
        message: `Method ${req.method} not allowed`
      });
  }
}

const handleGetRequest = async (req, res) => {
  try {
    const body = { query: listCourses, variables: { limit: 10 } };
    const options = {
      headers: {
        'x-api-key': GRAPHQL_API_KEY,
        'Content-Type': 'application/json'
      }
    };

    const coursesRes = await axios.post(GRAPHQL_ENDPOINT, body, options);

    console.log(coursesRes.data.data.listCourses.items);
    console.log(coursesRes.data.data.listCourses.nextToken);
    res.status(200).json({
      courses: coursesRes.data.data.listCourses.items,
      coursesToken: coursesRes.data.data.listCourses.nextToken,
      categories: []
    });
  } catch (e) {
    res.status(400).json({
      error_code: 'get_my_courses',
      message: e.message
    });
  }
};
