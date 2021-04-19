import { DataTypes, Model, Sequelize } from "sequelize";
import { UserEntity } from "../UserEntity";
import { getIntPrimaryKey } from "../../database";
import { CardEntity, TABLE_NAME_CARDS } from "./CardEntity";

export const TABLE_NAME_DECKS = "decks";

export interface Deck {
  id?: number;
  author_id: number;
  name: string;
  preview_img?: string;
}

export class DeckEntity extends Model implements Deck {
  id!: number;
  author_id!: number;
  name!: string;
  preview_img?: string;
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
    as: TABLE_NAME_CARDS, // this determines the name in `associations`!
  });
  // TestItemEntity.belongsTo(TestEntity);

  UserEntity.hasMany(DeckEntity, {
    sourceKey: "id",
    foreignKey: "author_id",
    as: TABLE_NAME_DECKS, // this determines the name in `associations`!
  });
  // TestEntity.belongsTo(UserEntity);
};
