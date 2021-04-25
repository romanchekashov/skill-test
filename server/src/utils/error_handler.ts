import { Response } from "express";
import { isString } from "./utils";

export const errorHandler = (reason: any, res: Response) => {
  console.error(reason);
  res.status(400).json({
    message: Array.isArray(reason.errors)
      ? reason.errors[0].message
      : isString(reason)
      ? reason
      : reason.message,
  });
};
