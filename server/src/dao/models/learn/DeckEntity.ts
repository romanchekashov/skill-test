import { DataTypes, Model, Sequelize } from "sequelize";
import { User, UserEntity } from "../UserEntity";
import { getIntPrimaryKey } from "../../database";
import { Card, CardEntity, TABLE_NAME_CARDS } from "./CardEntity";

export const TABLE_NAME_DECKS = "decks";

export const ASSOCIATION_ALIAS_DECK_TO_CARD = "cards";
export const ASSOCIATION_ALIAS_USER_TO_DECK = "decks";
export const ASSOCIATION_ALIAS_DECK_TO_USER = "author";
export interface Deck {
  id?: number;
  author_id: number;
  name: string;
  preview_img?: string;
  cards?: Card[];
  author: User;
}

export class DeckEntity extends Model implements Deck {
  id!: number;
  author_id!: number;
  name!: string;
  preview_img?: string;
  author!: User;
}

export const DeckEntityInit = (sequelize: Sequelize): void => {
  DeckEntity.init(
    {
      id: getIntPrimaryKey(),
      name: {
        type: new DataTypes.STRING(256),
        allowNull: false,
      },
      preview_img: {
        type: new DataTypes.STRING(1024),
        allowNull: true,
      },
    },
    {
      tableName: TABLE_NAME_DECKS,
      timestamps: false,
      sequelize, // passing the `sequelize` instance is required
    }
  );

  // Here we associate which actually populates out pre-declared `association` static and other methods.
  DeckEntity.hasMany(CardEntity, {
    sourceKey: "id",
    foreignKey: "deck_id",
    as: ASSOCIATION_ALIAS_DECK_TO_CARD, // this determines the name in `associations`!
  });
  CardEntity.belongsTo(DeckEntity, { foreignKey: "deck_id", targetKey: "id" });

  UserEntity.hasMany(DeckEntity, {
    sourceKey: "id",
    foreignKey: "author_id",
    as: ASSOCIATION_ALIAS_USER_TO_DECK, // this determines the name in `associations`!
  });
  DeckEntity.belongsTo(UserEntity, {
    foreignKey: "author_id",
    targetKey: "id",
    as: ASSOCIATION_ALIAS_DECK_TO_USER,
  });
};
