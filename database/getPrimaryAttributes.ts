import { ModelAttributeColumnOptions, ModelStatic } from 'sequelize';

/**
 * Returns the list of attributes that are part of the model's primary key.
 */
export function getPrimaryKeyAttributes(model: ModelStatic<any>): ModelAttributeColumnOptions[] {
  const attributes: ModelAttributeColumnOptions[] = [];

  for (const attribute of Object.values(model.rawAttributes)) {
    if (attribute.primaryKey) {
      attributes.push(attribute);
    }
  }

  return attributes;
}
