import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();
import { UserModel } from "../models/Users.js";

router.post("/register", async (req, res) => {
  const { username, email, password  } = req.body;
  const user = await UserModel.findOne({ username, email });
  if (user) {
    return res.status(400).json({ message: "Usuario já existe!" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new UserModel({ username, email, password: hashedPassword });
  await newUser.save();
  res.json({ message: "Usuario cadastrado com sucesso!" });
});

router.post("/login", async (req, res) => {
  const { username, password, email } = req.body;

  const user = await UserModel.findOne({ username, email });

  if (!user) {
    return res
      .status(400)
      .json({ message: "Usuario ou senha estão incorretos!" });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res
      .status(400)
      .json({ message: "Usuario ou senha estão incorretos!" });
  }
  const token = jwt.sign({ id: user._id }, "secret");
  res.json({ token, userID: user._id });
});

export { router as userRouter };

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    jwt.verify(authHeader, "secret", (err) => {
      if (err) {
        return res.sendStatus(403);
      }
      next();
    });
  } else {
    res.sendStatus(401);
  }
};