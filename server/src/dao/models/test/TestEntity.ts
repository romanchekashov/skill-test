import {DataTypes, Model, Sequelize} from "sequelize";
import {TABLE_NAME_TEST_ITEMS, TestItemEntity} from "./TestItemEntity";
import {UserEntity} from "../UserEntity";
import {getIntPrimaryKey} from "../../database";

export const TABLE_NAME_TESTS = "tests";

export class TestEntity extends Model {
    id!: number;
    authorId!: number;
    name!: string;
    previewImg?: string;
    // categories: CategoryEntity[] = [];
    // questions: TestItemEntity[] = [];
}

export const TestEntityInit = (sequelize: Sequelize): void => {
    TestEntity.init(
        {
            id: getIntPrimaryKey(),
            name: {
                type: new DataTypes.STRING(256),
                unique: true,
                allowNull: false,
            },
            previewImg: {
                type: new DataTypes.STRING(1024),
                unique: true,
                allowNull: false,
            },
        },
        {
            tableName: TABLE_NAME_TESTS,
            timestamps: false,
            sequelize, // passing the `sequelize` instance is required
        }
    );

// Here we associate which actually populates out pre-declared `association` static and other methods.
    TestEntity.hasMany(TestItemEntity, {
        sourceKey: "id",
        foreignKey: "testId",
        as: TABLE_NAME_TEST_ITEMS, // this determines the name in `associations`!
    });
    // TestItemEntity.belongsTo(TestEntity);

    UserEntity.hasMany(TestEntity, {
        sourceKey: "id",
        foreignKey: "authorId",
        as: TABLE_NAME_TESTS, // this determines the name in `associations`!
    });
    // TestEntity.belongsTo(UserEntity);
};
