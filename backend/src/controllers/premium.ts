import { Request, Response } from "express";
import { decodeToken } from "../utils/decode-token";
import { Expenses } from "../models/expenses";
import { Sequelize } from "sequelize";
import { Users } from "../models/users";

export const getShowLeaderboard = async (req: Request, res: Response) => {
  try {

    const token = req.headers["authorization"];
    const user = decodeToken(token);
    console.log("user", user);
    if (!user)
      return res.status(403).json({ message: "UnAuthorized user" });

    const totalExpenses = await Expenses.findAll({
      attributes: [
        'userId',
        [Sequelize.fn('SUM', Sequelize.col('amount')), 'totalAmount'],
      ],

      include: {
        model: Users,
        attributes: ['name']
      },
      group: 'userId',
      order: [[Sequelize.literal('totalAmount'), 'DESC']],
    });
    return res.status(200).json(totalExpenses);
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}