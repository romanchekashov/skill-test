import { CardDto } from "@skill-test/data/dto/learn/CardDto";
import { Request, Response, Router } from "express";
import cardService from "../services/cardService";
import { sendRes } from "../utils/controller_utils";
import { parseIntIfExists } from "../utils/utils";
import isDeckBelongToUser from "../validators/isDeckBelongToUser";

const cardsRouter = Router();

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
