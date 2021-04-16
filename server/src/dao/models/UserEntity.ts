import {DataTypes, Model, Sequelize} from "sequelize";
import {getIntPrimaryKey} from "../database";

export class UserEntity extends Model {
    id!: number;
    username!: string;
    password!: string;
}

export const UserEntityInit = (sequelize: Sequelize): void => {
    UserEntity.init(
        {
            id: getIntPrimaryKey(),
            username: {
                type: new DataTypes.STRING(128),
                unique: true,
                allowNull: false,
            },
            password: {
                type: new DataTypes.STRING(128),
                allowNull: false,
            },
        },
        {
            tableName: "users",
            timestamps: false,
            sequelize, // passing the `sequelize` instance is required
        }
    );
};
