import { DataTypes, Model, Sequelize } from "sequelize";
import { getIntPrimaryKey } from "../../database";
import { CardTranslation } from "./CardTranslationEntity";

export const TABLE_NAME_CARDS = "cards";

export interface Card {
  id?: number;
  deck_id: number;
  question: string;
  answer: string;
  explanation?: string;
  translations?: CardTranslation[];
}

export class CardEntity extends Model implements Card {
  id!: number;
  deck_id!: number;
  question!: string;
  answer!: string;
  explanation!: string;
}

export const CardEntityInit = (sequelize: Sequelize): void => {
  CardEntity.init(
    {
      id: getIntPrimaryKey(),
      question: {
        type: new DataTypes.STRING(256),
        allowNull: false,
      },
      answer: {
        type: new DataTypes.STRING(512),
        allowNull: false,
      },
      explanation: {
        type: new DataTypes.TEXT(),
        allowNull: true,
      },
    },
    {
      tableName: TABLE_NAME_CARDS,
      timestamps: false,
      sequelize, // passing the `sequelize` instance is required
    }
  );
};
