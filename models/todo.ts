import { DataTypes, Sequelize, Model } from "sequelize";
import { Todo } from "@/types/models";

export default function todo(
  sequelize: Sequelize,
  dataTypes: typeof DataTypes
) {
  return sequelize.define<Model<Todo, Omit<Todo, "id">>, Todo>(
    "todo",
    {
      id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      content: {
        type: dataTypes.TEXT,
        allowNull: false,
      },
      year: {
        type: dataTypes.INTEGER,
        allowNull: false,
      },
      month: {
        type: dataTypes.INTEGER,
        allowNull: false,
      },
      date: {
        type: dataTypes.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: dataTypes.INTEGER,
        references: {
          model: "user",
          key: "id",
        },
        allowNull: false,
      },
      checked: {
        type: dataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      tableName: "todo",
      freezeTableName: true,
      timestamps: false,
    }
  );
}
