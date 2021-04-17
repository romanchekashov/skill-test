import { Request, Response, Router } from "express";
import { TestEntity } from "../dao/models/test/TestEntity";
import { TestDto } from "@skill-test/data/dto/test/TestDto";

const testsRouter = Router();

/* GET users listing. */
testsRouter.get("/", (req: Request, res: Response) => {
  TestEntity.findAll().then((tests) => {
    // finds all entries in the users table
    res.send(tests); // sends users back to the page
  });
});

testsRouter.post("/", (req: Request, res: Response) => {
  const dto: TestDto = req.body;

  TestEntity.create({}).then((test) => {
    // finds all entries in the users table
    res.json(test); // sends users back to the page
  });
});

export default testsRouter;
