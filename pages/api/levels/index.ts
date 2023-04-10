import Level from 'database/models/level';

export default async function handler(req, res) {
  if (!('authorization' in req.headers)) {
    return res.status(401).json({ message: 'No autorization token' });
  }
  switch (req.method) {
    case 'GET':
      await handleGet(req, res);
      break;
    case 'DELETE':
      await handleDelete(req, res);
      break;
    default:
      res.status(405).json({
        message: `Method ${req.method} not allowed`
      });
  }
}

const handleGet = async (req, res) => {
  try {
    const levels = await Level.findAll({
      order: [['created_at', 'DESC']],
      limit: 20
    });

    res.status(200).json({ levels });
  } catch (e) {
    res.status(400).json({
      error_code: 'get_levels',
      message: e.message
    });
  }
};

const handleDelete = async (req, res) => {
  const { catId } = req.query;
  // console.log(catId);
  try {
    const cat = await Level.findOne({
      where: { id: catId }
    });

    cat.destroy();

    res.status(200).json({ message: 'Level deleted successfully.' });
  } catch (e) {
    res.status(400).json({
      error_code: 'get_levels',
      message: e.message
    });
  }
};
