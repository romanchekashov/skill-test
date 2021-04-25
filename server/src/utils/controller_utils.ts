import { Response } from "express";
import { errorHandler } from "./error_handler";

export const sendRes = (promise: Promise<any>, res: Response) => {
  promise
    .then((dto) => {
      res.send(dto);
    })
    .catch((reason) => {
      errorHandler(reason, res);
    });
};
