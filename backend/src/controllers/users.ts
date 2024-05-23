import bcrypt from "bcrypt";
import { Users } from "../models/users";
import type { Request, Response } from "express";
import * as jwt from 'jsonwebtoken';
import { sendEmailViaSMTP } from "../utils/send-email";
import { sequelize } from "../db";

export const postSignin = async (
  req: Request,
  res: Response,
) => {
  try {
    const { email, password } = req.body;
    const userRes = await Users.findOne<any>({ where: { email } });
    if (!userRes) {
      throw new Error("Failed to Login");
    }
    const hashedPassword = userRes.password;
    const typedPassword = password;
    const isMatched = await bcrypt.compare(typedPassword, hashedPassword);
    if (!isMatched)
      return res.status(403).json({ message: "Password does not match!" });
    const authToken = jwt.sign({ id: userRes.id, email: userRes.email, name: userRes.name }, process.env.SECRET_KEY!, { algorithm: "HS256" });
    return res.status(200).json({ token: authToken });
  } catch (e: any) {
    return res.status(500).json({ message: e.message });
  }
};


export const postSignup = async (req: Request, res: Response) => {
  const { password, email, name } = req.body;
  const hashedPassword = await bcrypt.hash(password, +process.env.AUTH_SALT!);
  try {
    const respose = await Users.create({
      name,
      email,
      password: hashedPassword,
    });
    return res.status(200).json(respose);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};

export const postSendSMTPEmail = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  try {

    const user = await Users.findOne({ where: { email } });
    if (!user) throw new Error("User does not exist");

    const smtpRes = await sendEmailViaSMTP(email, otp);

    console.log("smtpRes", smtpRes);
    if (smtpRes.status !== 200) throw new Error(smtpRes.error);

    return res.status(200).json({ message: "Email send successful" });

  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}

export const postForgotPassword = async (req: Request, res: Response) => {
  const t = await sequelize.transaction();
  try {
    const { newPassword, email } = req.body;

    console.log(newPassword, " ", email);

    const hashedPassword = await bcrypt.hash(newPassword, +process.env.AUTH_SALT!);
    const userRes = await Users.update({ password: hashedPassword }, { where: { email } });

    console.log("userRes", newPassword, userRes);
    await t.commit();
    return res.status(200).json({ user: userRes, message: "password has been successfully updated" });
  } catch (e) {
    await t.rollback();
    return res.status(500).json({ message: e.message });
  }
}


