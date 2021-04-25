import { DeckEntity } from "../dao/models/learn/DeckEntity";

const isDeckBelongToUser = (
  deckId: number,
  authorId: number
): Promise<void> => {
  return DeckEntity.findByPk(deckId).then((deck) => {
    if (!deck) throw new Error(`Deck ${deckId} not found`);
    if (authorId !== deck.author_id)
      throw new Error(`Deck ${deckId} is not yours`);
  });
};

export default isDeckBelongToUser;
