import Sequelize from "sequelize";
import { sequelize } from "../db";

export const Expenses = sequelize.define("expenses", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  },
  amount: { type: Sequelize.INTEGER, allowNull: false },
  description: { type: Sequelize.TEXT, allowNull: false },
  category: { type: Sequelize.STRING, allowNull: false },
});
