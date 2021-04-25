import { Request, Response, Router } from "express";
import deckService from "../services/deckService";
import { errorHandler } from "../utils/error_handler";

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
  deckService
    .getById(parseInt(req.params.id))
    .then((dto) => {
      res.send(dto);
    })
    .catch((reason) => {
      errorHandler(reason, res);
    });
});

decksRouter.post("/", (req: Request, res: Response) => {
  deckService
    .create(req.body, req.user.id)
    .then((dto) => {
      res.send(dto);
    })
    .catch((reason) => {
      errorHandler(reason, res);
    });
});

export default decksRouter;
