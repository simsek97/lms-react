import Sequelize from 'sequelize';
import { Course, User, Enrolment, Category } from 'database/models';
import { listCategories, listCourses, listLevels } from '@/src/graphql/queries';
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
    const options = {
      headers: {
        'x-api-key': GRAPHQL_API_KEY,
        'Content-Type': 'application/json'
      }
    };

    const coursesBody = { query: listCourses, variables: { limit: 12 } };
    const coursesRes = await axios.post(GRAPHQL_ENDPOINT, coursesBody, options);

    const categoriesBody = { query: listCategories, variables: { limit: 20 } };
    const categoriesRes = await axios.post(GRAPHQL_ENDPOINT, categoriesBody, options);

    const levelsBody = { query: listLevels, variables: { limit: 20 } };
    const levelsRes = await axios.post(GRAPHQL_ENDPOINT, levelsBody, options);

    res.status(200).json({
      levels: levelsRes.data.data.listLevels.items,
      levelsToken: levelsRes.data.data.listLevels.nextToken,
      categories: categoriesRes.data.data.listCategories.items,
      categoriesToken: categoriesRes.data.data.listCategories.nextToken,
      courses: coursesRes.data.data.listCourses.items,
      coursesToken: coursesRes.data.data.listCourses.nextToken
    });
  } catch (e) {
    res.status(400).json({
      error_code: 'get_my_courses',
      message: e.message
    });
  }
};
