const { Sequelize } = require("sequelize");

exports.sequelize = new Sequelize("expense", "root", "vikas", {
  host: "localhost",
  dialect: "mysql",
});
// export const db = mysql.createPool({
//   database: "expense",
//   host: "localhost",
//   port: 3306,
//   password: "vikas",
//   user: "root",
// });
