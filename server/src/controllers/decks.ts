import { Request, Response, Router } from "express";
import deckService from "../services/deckService";
import { sendRes } from "../utils/controller_utils";

const decksRouter = Router();

decksRouter.get("/", (req: Request, res: Response) => {
  sendRes(deckService.getAll(), res);
});

decksRouter.get("/:id", (req: Request, res: Response) => {
  sendRes(deckService.getById(parseInt(req.params.id)), res);
});

decksRouter.post("/", (req: Request, res: Response) => {
  sendRes(deckService.createOrUpdate(req.body, req.user.id), res);
});

export default decksRouter;
