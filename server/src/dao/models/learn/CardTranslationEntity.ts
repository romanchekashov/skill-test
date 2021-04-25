import { DataTypes, Model, Sequelize, Deferrable } from "sequelize";
import { CardEntity } from "./CardEntity";

export const TABLE_NAME_CARDS_TRANSLATIONS = "cards_translations";

export const ASSOCIATION_ALIAS_CARD_TO_CARD_TRANSLATIONS = "translations";

export interface CardTranslation {
  card_id: number;
  lang: string;
  default_lang: boolean;
  question: string;
  answer: string;
  explanation?: string;
}

export class CardTranslationEntity extends Model implements CardTranslation {
  card_id!: number;
  lang!: string;
  default_lang!: boolean;
  question!: string;
  answer!: string;
  explanation!: string;
}

export const CardTranslationEntityInit = (sequelize: Sequelize): void => {
  CardTranslationEntity.init(
    {
      card_id: {
        type: new DataTypes.BIGINT(),
        primaryKey: true,

        // references: {
        //   // This is a reference to another model
        //   model: CardEntity,

        //   // This is the column name of the referenced model
        //   key: "id",

        //   // This declares when to check the foreign key constraint. PostgreSQL only.
        //   // deferrable: Deferrable.INITIALLY_IMMEDIATE
        // },
      },
      lang: {
        type: new DataTypes.STRING(8),
        primaryKey: true,
      },
      default_lang: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
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
      tableName: TABLE_NAME_CARDS_TRANSLATIONS,
      timestamps: false,
      sequelize, // passing the `sequelize` instance is required
    }
  );

  // Here we associate which actually populates out pre-declared `association` static and other methods.
  CardEntity.hasMany(CardTranslationEntity, {
    sourceKey: "id",
    foreignKey: "card_id",
    as: ASSOCIATION_ALIAS_CARD_TO_CARD_TRANSLATIONS, // this determines the name in `associations`!
  });
  CardTranslationEntity.belongsTo(CardEntity, {
    foreignKey: "card_id",
    targetKey: "id",
  });
};
