import { Attributes, Model, ModelAttributeColumnOptions, ModelStatic } from 'sequelize';

export function getAttributeMetadata<M extends Model>(
  model: ModelStatic<M>,
  attributeName: keyof Attributes<M>
): ModelAttributeColumnOptions {
  //@ts-ignore
  const attribute = model.rawAttributes[attributeName];
  if (attribute == null) {
    //@ts-ignore
    throw new Error(`Attribute ${attributeName} does not exist on model ${model.name}`);
  }

  return attribute;
}
