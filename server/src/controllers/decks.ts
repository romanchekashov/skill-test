import { Request, Response, Router } from "express";
import { DeckDto } from "@skill-test/data/dto/learn/DeckDto";
import { DeckEntity } from "../dao/models/learn/DeckEntity";
import { mapDeckDtoToEntity, mapEntityToDtoDeck } from "../utils/converter";
import { errorHandler } from "../utils/error_handler";

const decksRouter = Router();

decksRouter.get("/", (req: Request, res: Response) => {
  DeckEntity.findAll().then((decks) => {
    const dtos = decks.map((deck) =>
      mapEntityToDtoDeck(deck, req.user.username)
    );
    // console.log(decks, req.user, dtos);
    res.send(dtos);
  });
});

decksRouter.post("/", (req: Request, res: Response) => {
  const dto: DeckDto = req.body;
  DeckEntity.create(mapDeckDtoToEntity(dto, req.user.id))
    .then((deck) => {
      // finds all entries in the users table
      res.json(mapEntityToDtoDeck(deck, req.user.username)); // sends users back to the page
    })
    .catch((reason) => {
      errorHandler(reason, res);
    });
});

export default decksRouter;
