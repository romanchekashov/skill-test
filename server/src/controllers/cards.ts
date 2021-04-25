import { CardDto } from "@skill-test/data/dto/learn/CardDto";
import { Request, Response, Router } from "express";
import cardService from "../services/cardService";
import { sendRes } from "../utils/controller_utils";
import { errorHandler } from "../utils/error_handler";
import { parseIntIfExists } from "../utils/utils";
import isDeckBelongToUser from "../validators/isDeckBelongToUser";

const cardsRouter = Router();

cardsRouter.get("/", (req: Request, res: Response) => {
  const { deckId } = req.query;
  sendRes(cardService.getAll({ deck_id: parseIntIfExists(deckId) }), res);
});

cardsRouter.get("/:id", (req: Request, res: Response) => {
  sendRes(cardService.getById(parseInt(req.params.id)), res);
});

cardsRouter.post("/", (req: Request, res: Response) => {
  const dto: CardDto = req.body;
  if (dto.translations.length > 0) {
    sendRes(
      isDeckBelongToUser(dto.deckId, req.user.id).then(() =>
        cardService.createOrUpdate(dto)
      ),
      res
    );
  } else {
    errorHandler("Card should have at least one translation", res);
  }
});

export default cardsRouter;
