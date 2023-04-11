import {
  Model,
  DataTypes,
  Optional,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ModelStatic,
  ModelAttributeColumnOptions
} from 'sequelize';
import { getAttributeMetadata } from './getAttributeMetadata';
import connection from '../connection';

const initCategory = (sequelize: any, Types: typeof DataTypes) => {
  class Category extends Model<InferAttributes<Category>, InferCreationAttributes<Category>> {
    declare id: CreationOptional<string>;
    declare name: string;
    declare slug: string;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    declare static associatations: {
      // define association here
    };
  }

  Category.init(
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
      modelName: 'Category',
      tableName: 'categories',
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );

  return Category;
};

export interface ICategory {
  id?: string;
  name: string;
  slug: string;
}

export default initCategory(connection, DataTypes);
