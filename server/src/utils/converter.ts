import { CardDto } from "@skill-test/data/dto/learn/CardDto";
import { CardTranslationDto } from "@skill-test/data/dto/learn/CardTranslationDto";
import { DeckDto } from "@skill-test/data/dto/learn/DeckDto";
import { Card } from "../dao/models/learn/CardEntity";
import { CardTranslation } from "../dao/models/learn/CardTranslationEntity";
import { Deck } from "../dao/models/learn/DeckEntity";

// --------------------------------- Decks
export const mapDeckDtoToEntity = (
  { name, previewImg }: DeckDto,
  author_id: number
): Deck => ({
  name,
  preview_img: previewImg,
  author_id,
  author: {
    id: author_id,
    username: "",
  },
});

export const mapEntityToDtoDeck = ({
  id,
  name,
  preview_img,
  cards,
  author,
}: Deck): DeckDto => ({
  id,
  name,
  previewImg: preview_img,
  author: author && {
    id: author.id,
    username: author.username,
  },
  categories: [],
  cards: cards?.map(mapEntityToDtoCard) || [],
});

// --------------------------------- Cards
export const mapCardDtoToEntity = ({
  deckId,
  translations,
}: CardDto): Card => ({
  deck_id: deckId,
  translations: translations.map(mapCardTranslationDtoToEntity),
});

export const mapEntityToDtoCard = ({
  id,
  deck_id,
  translations,
}: Card): CardDto => ({
  id,
  question: "",
  answer: "",
  explanation: "",
  deckId: deck_id,
  translations: translations?.map(mapEntityToDtoCardTranslation) || [],
});

// --------------------------------- Cards
export const mapCardTranslationDtoToEntity = (
  dto: CardTranslationDto,
  card_id: number
): CardTranslation => ({ ...dto, card_id });

export const mapEntityToDtoCardTranslation = ({
  card_id,
  lang,
  default_lang,
  question,
  answer,
  explanation,
}: CardTranslation): CardTranslationDto => ({
  card_id,
  lang,
  default_lang,
  question,
  answer,
  explanation,
});
