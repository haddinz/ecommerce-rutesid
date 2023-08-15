import express, { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { User, UserModel } from "../model/userModel";
import bcrypt from "bcryptjs";
import { generateToken, isAdmin, isAuth } from "../utils/generateToken";

export const userRoutes = express.Router();

userRoutes.post(
  "/signin",
  asyncHandler(async (req: Request, res: Response) => {
    const user = await UserModel.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          password: user.password,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).json({ message: "Invalid Password or Email " });
  })
);

userRoutes.post(
  "/register",
  asyncHandler(async (req: Request, res: Response) => {
    const user = await UserModel.create({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    } as User);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      token: generateToken(user),
    });
  })
);

userRoutes.put(
  "/profile",
  isAuth,
  asyncHandler(async (req: Request, res: Response) => {
    const profile = await UserModel.findOne({ email: req.body.email });
    if (profile) {
      profile.name = req.body.name;
      profile.email = req.body.email;
      profile.password = req.body.password
        ? bcrypt.hashSync(req.body.password)
        : profile.password;

      const updateProfile = await profile.save();
      // res.send({
      //   profile: updateProfile,
      //   message: "Update Profile Successfully",
      // });
      res.json({
        _id: updateProfile._id,
        name: updateProfile.name,
        email: updateProfile.email,
        password: updateProfile.password,
        isAdmin: updateProfile.isAdmin,
        token: generateToken(updateProfile),
      });
    } else {
      res.status(401).json({ message: "Username Not Found" });
    }
  })
);

userRoutes.get(
  "/admin/user",
  isAuth,
  isAdmin,
  asyncHandler(async (req: Request, res: Response) => {
    const searchQuery = (req.query.query || "") as string;

    const queryFilter =
      searchQuery && searchQuery !== "all"
        ? {
            $or: [
              { name: { $regex: searchQuery, $options: "i" } },
              { email: { $regex: searchQuery, $options: "i" } },
            ],
          }
        : {};

    const countUsers = await UserModel.countDocuments({
      ...queryFilter,
    });

    const users = await UserModel.find({
      ...queryFilter,
    });

    res.send({
      countUsers,
      users,
    });
  })
);

userRoutes.put(
  "/admin/profile/:id",
  isAuth,
  isAdmin,
  asyncHandler(async (req: Request, res: Response) => {
    const user = await UserModel.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isAdmin = Boolean(req.body.isAdmin);
      const updateuser = await user.save();
      res.send({users: updateuser});
    } else {
      res.status(401).json({ message: "Username Not Found" });
    }
  })
);

userRoutes.get(
  "/admin/user/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const userID = await UserModel.findById(req.params.id);
    if (userID) {
      res.send(userID);
    } else {
      res.status(404).json({ message: "User ID Not Found" });
    }
  })
);
