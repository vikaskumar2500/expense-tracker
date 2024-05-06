import axios from "axios";
import { Expenses } from "../models/expenses";
import { Request, Response } from "express";

export const postaddExpense = async (req:Request, res:Response) => {
  try {
    console.log("headers",req.headers.authorization);
    console.log(axios.defaults.headers.common["Authorization"]);
    const { amount, description, category } = req.body;
    await Expenses.create({ amount, description, category});
    return res.status(200).json({ success: true });
  } catch (e:any) {
    console.log(e.message);
  }
};
