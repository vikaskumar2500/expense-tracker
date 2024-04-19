import mysql from "mysql2";

export const db = mysql.createPool({
  database: "expense",
  host: "localhost",
  port: 3306,
  password: "vikas",
  user: "root",
});
