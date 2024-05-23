import { Sequelize } from "sequelize"

export const sequelize = new Sequelize("expense", "root", "password", {
  host: "localhost",
  dialect: "mysql",
});
// export const db = mysql.createPool({
//   database: "expense",
//   host: "localhost",
//   port: 3306,
//   password: "password",
//   user: "root",
// });
