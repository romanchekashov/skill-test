import {DataTypes, Model, Sequelize} from "sequelize";
import {TABLE_NAME_TEST_ITEM_ANSWERS, TestItemAnswerEntity} from "./TestItemAnswerEntity";
import {getBooleanAttribute, getIntPrimaryKey} from "../../database";

export const TABLE_NAME_TEST_ITEMS = "test_items";

export class TestItemEntity extends Model {
    id!: number
    testId!: number
    question!: string
    // possibleAnswers: TestItemAnswerEntity[] = []
    // answers: string[] = []
    multiChoice?: boolean = false
    info?: string
}

export const TestItemEntityInit = (sequelize: Sequelize): void => {
    TestItemEntity.init(
        {
            id: getIntPrimaryKey(),
            question: {
                type: new DataTypes.STRING(1024),
                unique: true,
                allowNull: false,
            },
            multiChoice: getBooleanAttribute(),
            info: {
                type: new DataTypes.TEXT,
                allowNull: true,
            },
        },
        {
            tableName: TABLE_NAME_TEST_ITEMS,
            timestamps: false,
            sequelize, // passing the `sequelize` instance is required
        }
    );

// Here we associate which actually populates out pre-declared `association` static and other methods.
    TestItemEntity.hasMany(TestItemAnswerEntity, {
        sourceKey: "id",
        foreignKey: "testItemId",
        as: TABLE_NAME_TEST_ITEM_ANSWERS, // this determines the name in `associations`!
    });
    // TestItemAnswerEntity.belongsTo(TestItemEntity);
};