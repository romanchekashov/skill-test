import { CardDto } from "@skill-test/data/dto/learn/CardDto";
import { DeckDto } from "@skill-test/data/dto/learn/DeckDto";
import { Card } from "../dao/models/learn/CardEntity";
import { Deck } from "../dao/models/learn/DeckEntity";

export const mapDeckDtoToEntity = (
  { name, previewImg }: DeckDto,
  author_id: number
): Deck => ({
  name,
  preview_img: previewImg,
  author_id,
});

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
