import { UserEntity } from "./dao/models/UserEntity";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import crypto from "crypto";
import base64 from "base-64";
import { isProd, md5 } from "./utils/utils";

const cookie_jwt_access_token = "jwt_access_token";
const cookie_xsrf_token = "xsrf_token";

// https://stackoverflow.com/questions/21978658/invalidating-json-web-tokens
const userLogoutTokenMap = new Map();

export const login = async (req: Request, res: Response) => {
  const username = base64.decode(req.body.username);
  const password = base64.decode(req.body.password);

  let foundUser = await UserEntity.findOne({
    where: { username },
  });

  if (foundUser) {
    const md5password = md5(password);
    if (foundUser.password === md5password) {
      const token = jwt.sign(
        {
          id: foundUser.id,
          username: foundUser.username,
        },
        process.env.TOKEN_SECRET || ""
      );

      res.cookie(cookie_jwt_access_token, token, {
        httpOnly: isProd(),
        maxAge: 3600 * 24 * 365 * 1000, // year in sec
      });
      res.cookie(cookie_xsrf_token, crypto.randomBytes(32).toString("hex"));

      userLogoutTokenMap.delete(foundUser.id);

      return res.status(200).json({
        id: foundUser.id,
        username: foundUser.username,
      });
    }
  }

  return res.status(404).json({ message: "User not found" });
};

const getToken = (req: Request): string | undefined => {
  if (isProd()) return req.cookies?.jwt_access_token;
  // Gather the jwt access token from the request header
  const authHeader = req.headers["authorization"];
  return authHeader && authHeader.split(" ")[1];
};

const isCsrfSave = (req: Request): boolean => {
  if (isProd()) {
    const csrfHeader = req.headers["x-xsrf-token"];
    const csrfCookie = req.cookies?.xsrf_token;
    return csrfCookie === csrfHeader;
  }
  return true;
};

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Gather the jwt access token from the request header

  if (!isCsrfSave(req)) return res.sendStatus(403);

  const token = getToken(req);
  if (!token) return res.sendStatus(401); // if there isn't any token

  jwt.verify(token, process.env.TOKEN_SECRET || "", (err: any, user: any) => {
    console.log(err);
    if (err) return res.sendStatus(403);

    if (userLogoutTokenMap.get(user.id) === token) return res.sendStatus(403);

    req.user = user;
    next(); // pass the execution off to whatever request the client intended
  });
};

export const authenticateCurrentUserIfTokenExists = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Gather the jwt access token from the request header
  const token = getToken(req);
  if (!token) return res.sendStatus(401); // if there isn't any token

  jwt.verify(token, process.env.TOKEN_SECRET || "", (err: any, user: any) => {
    console.log(err);
    if (err) return res.sendStatus(403);

    res.cookie(cookie_xsrf_token, crypto.randomBytes(32).toString("hex"));

    req.user = user;
    next(); // pass the execution off to whatever request the client intended
  });
};

export const logOutCurrentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.clearCookie(cookie_jwt_access_token);
  res.clearCookie(cookie_xsrf_token);

  const token = getToken(req);
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET || "", (err: any, user: any) => {
      if (user) userLogoutTokenMap.set(user.id, token);

      next();
    });
  } else {
    next();
  }
};
