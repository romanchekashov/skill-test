import { CardDto } from "@skill-test/data/dto/learn/CardDto";
import { get, post } from "./apiUtils";

const baseUrl = process.env.API_URL + "/api/cards";

const getCards = (): Promise<CardDto[]> => get<CardDto[]>(baseUrl);

const createCard = (card: CardDto): Promise<CardDto> =>
  post<CardDto>(baseUrl, card);

export default {
  getCards,
  createCard,
};
