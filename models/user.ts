import { DataTypes, Sequelize, Model } from "sequelize";
import { User } from "@/types/models";

export default function User(
  sequelize: Sequelize,
  dataTypes: typeof DataTypes
) {
  return sequelize.define<Model<User, Omit<User, "id" | "refresh">>, User>(
    "user",
    {
      id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      username: {
        type: dataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      password: {
        type: dataTypes.STRING(255),
        allowNull: false,
      },
      refresh: {
        type: dataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      tableName: "user",
      freezeTableName: true,
      timestamps: false,
    }
  );
}
