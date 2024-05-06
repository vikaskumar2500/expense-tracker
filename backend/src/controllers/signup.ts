import {Request, Response, NextFunction} from 'express';
import bcrypt from "bcrypt";
import { Users } from "../models/users";

export const postSignup = async (req:Request, res:Response, next:NextFunction) => {
  const { password, email, name } = req.body;
  const hashedPassword = await bcrypt.hash(password, +process.env.AUTH_SALT!);
  try {
    const respose = await Users.create({
      name, 
      email,
      password: hashedPassword,
    });
    return res.status(200).json(respose);
  } catch (e:any) {
    console.log("message", e.message);
    res.status(500).json({ success: false, message: e.message });
  }
};
