import { Request, Response, Router } from "express";
import { DeckDto } from "@skill-test/data/dto/learn/DeckDto";
import {
  ASSOCIATION_ALIAS_DECK_TO_CARD,
  ASSOCIATION_ALIAS_DECK_TO_USER,
  DeckEntity,
} from "../dao/models/learn/DeckEntity";
import { mapDeckDtoToEntity, mapEntityToDtoDeck } from "../utils/converter";
import { errorHandler } from "../utils/error_handler";
import { UserEntity } from "../dao/models/UserEntity";
import { CardEntity } from "../dao/models/learn/CardEntity";
import deckService from "../services/deckService";

const decksRouter = Router();

decksRouter.get("/", (req: Request, res: Response) => {
  deckService
    .getAll()
    .then((dto) => {
      res.send(dto);
    })
    .catch((reason) => {
      errorHandler(reason, res);
    });
});

decksRouter.get("/:id", (req: Request, res: Response) => {
  var deckId = req.params.id;
  DeckEntity.findByPk(deckId, {
    include: [
      {
        model: UserEntity,
        as: ASSOCIATION_ALIAS_DECK_TO_USER,
      },
      {
        model: CardEntity,
        as: ASSOCIATION_ALIAS_DECK_TO_CARD,
      },
    ],
  })
    .then((deck) => {
      if (!deck) throw new Error(`Deck ${deckId} not found`);

      const dto = mapEntityToDtoDeck(deck);
      // console.log(deck, dto);
      res.send(dto);
    })
    .catch((reason) => {
      errorHandler(reason, res);
    });
});

decksRouter.post("/", (req: Request, res: Response) => {
  const dto: DeckDto = req.body;
  DeckEntity.create(mapDeckDtoToEntity(dto, req.user.id))
    .then((deck) => {
      res.json(mapEntityToDtoDeck(deck));
    })
    .catch((reason) => {
      errorHandler(reason, res);
    });
});

export default decksRouter;
