import { slugify } from '@/utils/auth';
import Level from 'database/models/level';

export default async function handler(req, res) {
  if (!('authorization' in req.headers)) {
    return res.status(401).json({ message: 'No autorization token' });
  }
  switch (req.method) {
    case 'GET':
      await levelById(req, res);
      break;
    case 'POST':
      await createLevel(req, res);
      break;
    case 'PUT':
      await updateLevel(req, res);
      break;
    default:
      res.status(405).json({
        message: `Method ${req.method} not allowed`
      });
  }
}

const levelById = async (req, res) => {
  const { catId } = req.query;
  // console.log("####", catId);
  try {
    const level = await Level.findOne({
      where: { id: catId }
    });

    res.status(200).json({ level });
  } catch (e) {
    res.status(400).json({
      error_code: 'get_level_by_id',
      message: e.message
    });
  }
};

const createLevel = async (req, res) => {
  const { level } = req.body;

  try {
    let slug = slugify(level);
    const levelExist = await Level.findOne({
      where: { slug: slug }
    });

    if (levelExist) {
      slug = `${slug}-${Math.floor(Math.random() * (999 - 100 + 1) + 100)}`;
    }

    const newcat = await Level.create({
      name: level,
      slug: slug
    });

    res.status(200).json({
      message: 'New level added',
      level: newcat
    });
  } catch (e) {
    res.status(400).json({
      error_code: 'create_level',
      message: e.message
    });
  }
};

const updateLevel = async (req, res) => {
  try {
    const { level, catId } = req.body;

    let slug = slugify(level);
    const levelExist = await Level.findOne({
      where: { slug: slug }
    });

    if (levelExist) {
      slug = `${slug}-${Math.floor(Math.random() * (999 - 100 + 1) + 100)}`;
    }

    await Level.update(
      {
        name: level,
        slug: slug
      },
      {
        where: { id: catId }
      }
    );

    res.status(200).json({
      message: 'Level updated.'
    });
  } catch (e) {
    res.status(400).json({
      error_code: 'update_level',
      message: e.message
    });
  }
};
