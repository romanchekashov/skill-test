import { DeckEntity } from "../dao/models/learn/DeckEntity";
import { mapEntityToDtoDeck } from "../utils/converter";

const getAll = () =>
  DeckEntity.findAll().then((decks) => decks.map(mapEntityToDtoDeck));

export default {
  getAll,
};
