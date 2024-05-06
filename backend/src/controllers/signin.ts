import bcrypt from "bcrypt";
import { Users } from "../models/users";
import { NextFunction, Request, Response } from "express";

export const postSignin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const userRes = await Users.findOne<any>({ where: { email } });

    console.log("headers", req.headers.authorization);
    // axios.defaults.headers.common["Authorization"] = "Vikas";
    // console.log("header",req); 
    console.log("userRes",userRes)
    if (!userRes) {
      throw new Error("Failed to Login");
    }
    const hashedPassword = userRes.password;
    const typedPassword = password;
    const isMatched = await bcrypt.compare(typedPassword, hashedPassword);
    if (!isMatched)
      return res.status(403).json({ message: "Password does not match!" });
    // req.user = userRes;
    return res.end();
  } catch (e: any) {
    return res.status(500).json({ message: e.message });
  }
};
