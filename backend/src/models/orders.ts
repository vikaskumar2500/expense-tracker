import Sequelize from "sequelize";
import { sequelize } from "../db";

export const Orders = sequelize.define("orders", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  paymentId: Sequelize.STRING,
  orderId: { type: Sequelize.STRING, allowNull: false },
  status: { type: Sequelize.STRING, allowNull: false },
})