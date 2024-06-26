
import { Expenses } from "../models/expenses";
import { Request, Response } from "express";
import * as jwt from 'jsonwebtoken';
import { decodeToken } from '../utils/decode-token';
import Razorpay from "razorpay";
import { Orders } from "../models/orders";
import { Users } from "../models/users";
import { sequelize } from "../db";

export interface User {
  id: string;
  email: string;
  name: string;
  isPremium: boolean;
}

export const getExpenses = async (req: Request, res: Response) => {
  try {
    const user = decodeToken(req.headers["authorization"]) as User;
    if (!user) return res.status(403).json({ message: "UnAuthorized user" })

    const expenses = await Expenses.findAll({ where: { userId: user.id } });
    const userData: any = await Users.findOne({ where: { id: user.id } });

    return res.status(200).json({ expenses, isPremium: userData.isPremium });

  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}

export const postaddExpense = async (req: Request, res: Response) => {
  const t = await sequelize.transaction();
  try {
    const { amount, description, category, token } = req.body;
    const user
      = jwt.verify(token, process.env.SECRET_KEY) as User;

    if (!user) throw new Error("Something went wrong, please login again!")
    // console.log("userId", user.id)
    const updatedUser: any = await Users.findByPk(user.id);

    await Users.update({ total_expenses: updatedUser.total_expenses + Number(amount) }, { where: { id: user.id }, transaction: t });
    await Expenses.create({ amount, description, category, userId: user.id, }, { transaction: t });
    await t.commit();
    return res.status(200).json({ message: "Expenses created!" });

  } catch (e) {
    await t.rollback();
    return res.status(500).json({ message: e.message })
  }
};



export const createOrders = async (req: Request, res: Response) => {
  try {
    const token = req.body.token;
    const user = decodeToken(token) as User;
    if (!user) return res.status(403).json({ message: "UnAuthorized user" });

    const params = {
      key_id: process.env.KEY_ID,
      key_secret: process.env.KEY_SECRET,
    }
    console.log("params", params);
    const rzp = new Razorpay(params)

    const amount = 2500;

    rzp.orders.create({ amount, currency: "INR" }, async (e, orders) => {
      if (e) {
        return res.status(e.statusCode as number).json({ messsage: e.error.description });
      }
      console.log("orders", orders)
      await Orders.create({ paymentId: "", orderId: orders.id, status: "pending", userId: user.id });
      return res.status(200).json({ keyId: params.key_id, orderId: orders.id })
    })
  }
  catch (e) {
    console.log("message", e.message);
    return res.status(500).json({ message: e.message });
  }
}

export const postPaymentCaptured = async (req: Request, res: Response) => {
  const t = await sequelize.transaction();
  try {
    const token = req.body.token;
    const user = decodeToken(token);
    if (!user) throw new Error("UnAuthorized user");

    const updatedOrder = await Orders.update({
      paymentId: req.body.paymentId,
      status: "Successful",
    }, {
      where: {
        orderId: req.body.orderId,
        userId: user.id,
      }, transaction: t,
    });
    await Users.update({ isPremium: true }, { where: { id: user.id }, transaction: t });
    await t.commit();
    return res.status(200).json(updatedOrder);
  } catch (e) {
    console.log(e);
    await t.rollback();
    return res.status(500).json({ message: e.message });
  }
}

export const postPaymentFailed = async (req: Request, res: Response) => {
  try {
    const token = req.body.token;
    const user = decodeToken(token);
    if (!user) throw new Error("UnAuthorized user");

    await Orders.update({
      status: "Failed",
    }, {
      where: {
        orderId: req.body.orderId,
        userId: user.id,
      }
    });
    return res.status(200).json({ message: "Payment failed!" });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}

export const postDeleteExpense = async (req: Request, res: Response) => {
  const t = await sequelize.transaction();

  try {

    const token = req.body.token;
    const user = decodeToken(token);

    if (!user) throw new Error("UnAuthorized user");
    const { expenseId } = req.params;

    const expenseData: any = await Expenses.findByPk(expenseId);

    await Expenses.destroy({ where: { id: expenseId }, transaction: t });

    await Users.decrement("total_expenses", { by: expenseData.amount, transaction: t, where: { id: user.id } })

    await t.commit();
    return res.status(200).json({});
  } catch (e) {
    console.log(e);
    await t.rollback();
    return res.status(500).json({ message: e.message });
  }
}