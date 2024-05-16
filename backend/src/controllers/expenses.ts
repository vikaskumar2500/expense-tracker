
import { Expenses } from "../models/expenses";
import { Request, Response } from "express";
import * as jwt from 'jsonwebtoken';
import { Users } from "../models/users";

export const postaddExpense = async (req: Request, res: Response) => {
  try {
    const { amount, description, category, token } = req.body;

    const user: any
      = jwt.verify(token, process.env.SECRET_KEY) as typeof Users;

    if (!user) throw new Error("Something went wrong, please login again!")
    // console.log("userId", user.id)
    await Expenses.create({ amount, description, category, userId: user.id });
    return res.status(200).json({ message: "Expenses created!" });
  } catch (e: any) {
    return res.status(500).json({ message: e.message })
  }
};
