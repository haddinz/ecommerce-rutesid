import express, { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { ProductModel } from "../model/prodcutModel";

export const productRoutes = express.Router();

const PAGE_SIZE = 3;

productRoutes.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await ProductModel.find();
    res.json(products);
  })
);

productRoutes.get(
  "/categories",
  asyncHandler(async (req, res) => {
    const category = await ProductModel.find().distinct("category");
    res.json(category);
  })
);

productRoutes.get(
  "/search",
  asyncHandler(async function (req: Request, res: Response) {
    const page = Number(req.query.page) || 1;
    const category = (req.query.category || "") as string;
    const price = (req.query.price || "") as string;
    const searchQuery = (req.query.query || "") as string;
    const order = (req.query.order || "") as string;

    const rating = (req.query.rating || "") as string;

    const categoryFilter = category && category !== "all" ? { category } : {};
    const priceFilter =
      price && price !== "all"
        ? {
            price: {
              $gte: Number(price.split("-")[0]),
              $lte: Number(price.split("-")[1]),
            },
          }
        : {};
    const queryFilter =
      searchQuery && searchQuery !== "all"
        ? {
            $or: [
              { name: { $regex: searchQuery, $options: "i" } },
              { category: { $regex: searchQuery, $options: "i" } },
            ],
          }
        : {};
    const ratingFilter =
      rating && rating !== "all" ? { rating: { $gte: Number(rating) } } : {};

    const countProduct = await ProductModel.countDocuments({
      ...categoryFilter,
      ...priceFilter,
      ...queryFilter,
      ...ratingFilter,
    });

    const products = await ProductModel.find({
      ...categoryFilter,
      ...priceFilter,
      ...queryFilter,
      ...ratingFilter,
    })
      .sort(
        order === "lowest"
          ? { price: 1 }
          : order === "highest"
          ? { price: -1 }
          : order === "toprated"
          ? { rating: -1 }
          : { _id: -1 }
      )
      .skip(PAGE_SIZE * (page - 1))
      .limit(PAGE_SIZE);

    res.send({
      countProduct,
      products,
      page,
      pages: Math.ceil(countProduct / PAGE_SIZE),
    });
  })
);

productRoutes.get(
  "/:slug",
  asyncHandler(async (req, res) => {
    const productSlug = await ProductModel.findOne({ slug: req.params.slug });
    if (productSlug) {
      res.json(productSlug);
    } else {
      res.status(401).json({ message: "Product Not Found" });
    }
  })
);
