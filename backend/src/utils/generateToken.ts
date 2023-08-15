import { NextFunction, Request, Response } from "express";
import { User } from "../model/userModel";
import jwt from "jsonwebtoken";

export const generateToken = (user: User) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.jwt_secret || "somethingsecret",
    { expiresIn: "7d" }
    // { expiresIn: "3s" }
  );
};

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    const dekode = jwt.verify(
      token,
      process.env.jwt_secret || "somethingsecret"
    );
    req.body.user = dekode as {
      _id: string;
      name: string;
      email: string;
      isAdmin: boolean;
      token: string;
    };
    next();
  } else {
    res.status(401).send({ message: "No Token" });
  }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.body.user && req.body.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: "Token Admin Invalid" });
  }
};
