import { DataTypes, Model, Sequelize } from "sequelize";
import { getIntPrimaryKey } from "../database";

export class UserEntity extends Model {
  id!: number;
  username!: string;
  password!: string;
  created!: Date;
  updated!: Date;
}

export const UserEntityInit = (sequelize: Sequelize): void => {
  UserEntity.init(
    {
      id: getIntPrimaryKey(),
      username: {
        type: new DataTypes.STRING(255),
        unique: true,
        allowNull: false,
      },
      password: {
        type: new DataTypes.STRING(255),
        allowNull: false,
      },
      // created: {
      //   type: new DataTypes.DATE(),
      //   allowNull: false,
      //   get() {
      //     const val = this.getDataValue("created");
      //     console.log("+++++++++++++get", val, val.getTimezoneOffset());
      //     return val;
      //   },
      //   set(val: Date) {
      //     console.log("-------------set", val, val.getTimezoneOffset());
      //     this.setDataValue(
      //       "created",
      //       new Date(
      //         val.getTime() - (val.getTimezoneOffset() / 60) * 3600 * 1000
      //       )
      //     );
      //   },
      // },
      // updated: {
      //   type: new DataTypes.DATE(),
      //   allowNull: false,
      // },
    },
    {
      tableName: "users",
      timestamps: true,
      createdAt: "created",
      updatedAt: "updated",
      sequelize, // passing the `sequelize` instance is required
    }
  );
};
