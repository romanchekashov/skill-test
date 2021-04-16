import {DataTypes, Model, Sequelize} from "sequelize";
import {getBooleanAttribute, getIntPrimaryKey} from "../../database";

export const TABLE_NAME_TEST_ITEM_ANSWERS = "test_item_answers";

export class TestItemAnswerEntity extends Model {
    id!: number;
    testItemId!: number;
    name!: string;
    correct!: boolean;
}

export const TestAnswerEntityInit = (sequelize: Sequelize): void => {
    TestItemAnswerEntity.init(
        {
            id: getIntPrimaryKey(),
            name: {
                type: new DataTypes.STRING(1024),
                allowNull: false,
            },
            correct: getBooleanAttribute()
        },
        {
            tableName: TABLE_NAME_TEST_ITEM_ANSWERS,
            timestamps: false,
            sequelize, // passing the `sequelize` instance is required
        }
    );
};
