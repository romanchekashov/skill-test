import { Request, Response, Router } from "express";
import { CardDto } from "@skill-test/data/dto/learn/CardDto";
import { CardEntity } from "../dao/models/learn/CardEntity";
import { DeckEntity } from "../dao/models/learn/DeckEntity";
import { mapCardDtoToEntity } from "../utils/converter";
import { errorHandler } from "../utils/error_handler";

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
  const deckId = req.query.deckId;
  let filter = {};
  if (deckId) {
    filter = {
      where: {
        deck_id: deckId,
      },
    };
  }

  CardEntity.findAll(filter).then((cards) => {
    // finds all entries in the users table
    res.send(cards); // sends users back to the page
  });
});

cardsRouter.post("/", (req: Request, res: Response) => {
  const dto: CardDto = req.body;
  isDeckBelongToUser(dto.deckId, req.user.id)
    .then(() => {
      return CardEntity.create(mapCardDtoToEntity(dto)).then((card) => {
        // finds all entries in the users table
        res.json(card); // sends users back to the page
      });
    })
    .catch((reason) => {
      errorHandler(reason, res);
    });
});

export default cardsRouter;
