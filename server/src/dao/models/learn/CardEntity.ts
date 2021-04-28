import { Model, Sequelize } from "sequelize";
import { getIntPrimaryKey } from "../../database";
import { CardTranslation } from "./CardTranslationEntity";

export const TABLE_NAME_CARDS = "cards";

export interface Card {
  id?: number;
  deck_id: number;
  translations?: CardTranslation[];
}

export class CardEntity extends Model implements Card {
  id!: number;
  deck_id!: number;
  translations?: CardTranslation[];
}

export const CardEntityInit = (sequelize: Sequelize): void => {
  CardEntity.init(
    {
      id: getIntPrimaryKey(),
    },
    {
      tableName: TABLE_NAME_CARDS,
      timestamps: false,
      sequelize, // passing the `sequelize` instance is required
    }
  );
};
