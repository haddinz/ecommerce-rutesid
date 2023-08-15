import cors from "cors";
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { productRoutes } from "./routes/productRoutes";
import { seedRouter } from "./routes/seed";
import { userRoutes } from "./routes/userRoutes";
import { orderRoutes } from "./routes/orderRoutes";
import { keyRoutes } from "./routes/keyRoutes";
import dotenv from "dotenv";
// import path from "path";

dotenv.config();

const mongoodb_uri =
  process.env.mongoodb_uri || "mongoodb://localhost/react-vite-ts";
mongoose.set("strictQuery", true);
mongoose
  .connect(mongoodb_uri)
  .then(() => {
    console.log("Connected To MongooDB");
  })
  .catch(() => {
    console.log("Error MongooDB");
  });

const app = express();

app.use(
  cors({
    credentials: true,
    origin: ["https://rutesid-ecommerce.netlify.app/", "http://localhost:3000"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req: Request, res: Response, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*" );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader(
    'Access-Control-Allow-Headers',
    'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
  }
  next();
});

app.get("/favicon.ico", (req: Request, res: Response) => {
  res.status(204).end();
});
app.get("/api", (req: Request, res: Response) => {
  res.send(
    "Welcome to my API ecommerce react-ts server to deploy update 4.1 Delete All Headers"
  );
});
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/seed", seedRouter);
app.use("/api/keys", keyRoutes);

// active this function if backend and frontend in same hosting
// app.use(express.static(path.join(__dirname, "../../frontend/dist")));
// app.get("*", (req: Request, res: Response) =>
//   {
//     return res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
//   }
// );

const PORT: number = parseInt((process.env.PORT || "4000") as string, 10);
app.listen(PORT, () => {
  console.log(`server running at localhost ${PORT}`);
});

export default app;
