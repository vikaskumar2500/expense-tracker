const Sequelize = require("sequelize");
const { sequelize } = require("../db");

exports.Users = sequelize.define("users", {
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
});
