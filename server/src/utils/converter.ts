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
});

export const mapEntityToDtoDeck = (
  { id, name, preview_img, author_id }: Deck,
  username: string
): DeckDto => ({
  id,
  name,
  previewImg: preview_img,
  author: {
    id: author_id,
    username,
  },
  categories: [],
  cards: [],
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
