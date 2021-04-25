import base64 from "base-64";
import { Request, Response, Router } from "express";
import {
  authenticateCurrentUserIfTokenExists,
  login,
  logOutCurrentUser,
} from "../auth";
import { UserEntity } from "../dao/models/UserEntity";
import deckService from "../services/deckService";
import { sendRes } from "../utils/controller_utils";
import { md5 } from "../utils/utils";

const openRouter = Router();

openRouter.post("/login", login);
openRouter.get("/logout", logOutCurrentUser, (req: Request, res: Response) =>
  res.redirect("/")
);

openRouter.post("/users", (req: Request, res: Response) => {
  const user = req.body;

  UserEntity.create({
    username: user.username,
    password: md5(base64.decode(user.password)),
  })
    .then(({ id, username }: UserEntity) => {
      // finds all entries in the users table
      res.json({ id, username }); // sends users back to the page
    })
    .catch((reason) => {
      console.error(reason);
      res.status(400).json({
        message: reason.errors[0].message,
      });
    });
});

openRouter.get(
  "/current-user",
  authenticateCurrentUserIfTokenExists,
  async (req: Request, res: Response) => {
    const user = await UserEntity.findByPk(req.user.id);
    if (user) {
      res.send({
        id: user.id,
        username: user.username,
      });
    }
    return res.status(404).json({ message: "User not found" });
  }
);

openRouter.get("/", (req: Request, res: Response) => {
  res.send("Public for Skill-test!");
});

openRouter.get("/decks", (req: Request, res: Response) => {
  sendRes(deckService.getAll(), res);
});

export default openRouter;
