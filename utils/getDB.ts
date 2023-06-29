import {
  FindOptions,
  CreationAttributes,
  ModelStatic,
  Model,
} from "sequelize";

export async function getFromDB<T extends {}>(
  model: ModelStatic<Model<T, Omit<T, any>>>,
  condition: FindOptions<T>
) {
  return (await model?.findOne(condition))?.toJSON<T>();
}

export async function getAllFromDB<T extends {}>(
  model: ModelStatic<Model<T, Omit<T, any>>>,
  condition: FindOptions<T>
) {
  return (await model?.findAll(condition)).map((m) => m?.toJSON<T>());
}

export async function createFromDB<T extends {}>(
  model: ModelStatic<Model<T, Omit<T, any>>>,
  data: CreationAttributes<Model<T, Omit<T, any>>>
) {
  return (await model?.create(data))?.toJSON<T>();
}
