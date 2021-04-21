import { CardDto } from "@skill-test/data/dto/learn/CardDto";
import { DeckDto } from "@skill-test/data/dto/learn/DeckDto";
import { Card } from "../dao/models/learn/CardEntity";
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
  question,
  answer,
  explanation,
}: CardDto): Card => ({
  deck_id: deckId,
  question,
  answer,
  explanation,
});

export const mapEntityToDtoCard = ({
  id,
  question,
  answer,
  explanation,
  deck_id,
}: Card): CardDto => ({
  id,
  question,
  answer,
  explanation,
  deckId: deck_id,
});
