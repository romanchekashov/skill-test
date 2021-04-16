import {DataTypes, Model, Sequelize} from "sequelize";

import {CategoryEntity, TABLE_NAME_CATEGORIES} from "../CategoryEntity";
import {TABLE_NAME_TESTS, TestEntity} from "./TestEntity";

export const TABLE_NAME_TEST_CATEGORY = "test_category";

export class TestCategoryEntity extends Model {
    testId!: number;
    categoryId!: number;
}

export const TestCategoryEntityInit = (sequelize: Sequelize): void => {
    // TestCategoryEntity.init(
    //     {
    //         testId: {
    //             type: DataTypes.INTEGER,
    //             references: {
    //                 model: TestEntity, // 'Movies' would also work
    //                 key: 'id'
    //             }
    //         },
    //         categoryId: {
    //             type: DataTypes.INTEGER,
    //             references: {
    //                 model: CategoryEntity, // 'Actors' would also work
    //                 key: 'id'
    //             }
    //         }
    //     },
    //     {
    //         tableName: TABLE_NAME_TEST_CATEGORY,
    //         timestamps: false,
    //         sequelize, // passing the `sequelize` instance is required
    //     }
    // );

    TestEntity.belongsToMany(CategoryEntity, {
        through: TABLE_NAME_TEST_CATEGORY,
        foreignKey: "testId",
        as: TABLE_NAME_TESTS,
        timestamps: false
    });
    CategoryEntity.belongsToMany(TestEntity, {
        through: TABLE_NAME_TEST_CATEGORY,
        foreignKey: "categoryId",
        as: TABLE_NAME_CATEGORIES,
        timestamps: false
    });
};
