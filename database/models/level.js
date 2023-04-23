import { Model, DataTypes } from 'sequelize';
import connection from '../connection';

const initLevel = (sequelize, Types) => {
  class Level extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Level.init(
    {
      id: {
        type: Types.UUID,
        defaultValue: Types.UUIDV4,
        primaryKey: true
      },
      name: DataTypes.STRING,
      slug: {
        type: DataTypes.STRING,
        unique: true
      }
    },
    {
      sequelize,
      modelName: 'Level',
      tableName: 'levels',
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );

  return Level;
};

export default initLevel(connection, DataTypes);
