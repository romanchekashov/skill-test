import { CardDto } from "@skill-test/data/dto/learn/CardDto";
import { Request, Response, Router } from "express";
import { DeckEntity } from "../dao/models/learn/DeckEntity";
import cardService from "../services/cardService";
import { sendRes } from "../utils/controller_utils";
import { parseIntIfExists } from "../utils/utils";

const cardsRouter = Router();

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

cardsRouter.get("/", (req: Request, res: Response) => {
  const { deckId } = req.query;
  sendRes(cardService.getAll({ deck_id: parseIntIfExists(deckId) }), res);
});

cardsRouter.post("/", (req: Request, res: Response) => {
  const dto: CardDto = req.body;
  sendRes(
    isDeckBelongToUser(dto.deckId, req.user.id).then(() =>
      cardService.createOrUpdate(dto)
    ),
    res
  );
});

export default cardsRouter;
