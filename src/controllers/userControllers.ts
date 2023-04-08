import userServices from "../services/userServices.js";
import { Request, Response, NextFunction } from "express";
import { CreateUserType, UserSignInType } from "@/protocols/user.js";

async function create(req: Request, res: Response, next: NextFunction) {
  const data = req.body;
  let userData: CreateUserType = data;
  try {
    await userServices.create(userData);
    return res.sendStatus(201);
  } catch (err) {
    next(err);
  }
}

async function signin(req: Request, res: Response, next: NextFunction) {
  const data = req.body;
  let userData: UserSignInType = data;
  try {
    const token = await userServices.signin(userData);
    return res.send({ token });
  } catch (err) {
    next(err);
  }
}

export default {
  create,
  signin,
};
