import {DataTypes, Model, Sequelize} from "sequelize";
import {getIntPrimaryKey} from "../database";

export const TABLE_NAME_CATEGORIES = "categories";

export class CategoryEntity extends Model {
    id!: number;
    name!: string;
}

export const CategoryEntityInit = (sequelize: Sequelize): void => {
    CategoryEntity.init(
        {
            id: getIntPrimaryKey(),
            name: {
                type: new DataTypes.STRING(128),
                unique: true,
                allowNull: false,
            }
        },
        {
            tableName: TABLE_NAME_CATEGORIES,
            timestamps: false,
            sequelize, // passing the `sequelize` instance is required
        }
    );
};
