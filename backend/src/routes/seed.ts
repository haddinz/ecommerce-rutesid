import express, { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { ProductModel } from "../model/prodcutModel";
import { UserModel } from "../model/userModel";
import { Products, Users } from "../utils/data";

export const seedRouter = express.Router();

seedRouter.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    await ProductModel.deleteMany({});
    const seedProduct = await ProductModel.insertMany(Products);

    await UserModel.deleteMany({});
    const seedUser = await UserModel.insertMany(Users);
    res.json({ seedProduct, seedUser });
  })
);
