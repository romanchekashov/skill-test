import { Language } from "@skill-test/data/dto/Language";
import { DataTypes, Model, Sequelize } from "sequelize";
import { CardEntity } from "./CardEntity";

export const TABLE_NAME_CARDS_TRANSLATIONS = "cards_translations";

export const ASSOCIATION_ALIAS_CARD_TO_CARD_TRANSLATIONS = "translations";

const LANGUAGES: string[] = Object.values(Language);

export interface CardTranslation {
  card_id: number;
  lang: Language;
  default_lang: boolean;
  question: string;
  answer: string;
  explanation?: string;
}

export class CardTranslationEntity extends Model implements CardTranslation {
  card_id!: number;
  lang!: Language;
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
      },
      lang: {
        type: new DataTypes.ENUM(...LANGUAGES),
        primaryKey: true,
        validate: {
          isIn: {
            msg: "Supported languages is: " + LANGUAGES.join(", "),
            args: [LANGUAGES],
          },
        },
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
      indexes: [
        {
          unique: true,
          fields: ["card_id", "lang"],
          name: "pk_card_id_lang",
        },
        {
          unique: true,
          fields: ["question", "card_id", "lang"],
          name: "uk_cards_question_card_id_lang",
        },
      ],
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
