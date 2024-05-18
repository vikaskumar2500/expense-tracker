import Sequelize from "sequelize";
import { sequelize } from "../db";

export const Users = sequelize.define("users", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  },
  name: { type: Sequelize.STRING, allowNull: false },
  email: { type: Sequelize.STRING, allowNull: false, unique: true },
  password: { type: Sequelize.TEXT, allowNull: false },
  isPremium: { type: Sequelize.BOOLEAN, defaultValue: false },
});

