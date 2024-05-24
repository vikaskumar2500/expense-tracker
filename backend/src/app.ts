import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import { sequelize } from "./db";
import dotenv from "dotenv";
import expenseRouter from "./routes/expenses";
import usersRouter from "./routes/users";
import premiumRouter from "./routes/premium";
import passwordRouter from './routes/password';
import { Users } from "./models/users";
import { Expenses } from "./models/expenses";
import { Orders } from "./models/orders";
import { ForgotPasswords } from "./models/forgot-password";
import path from "path";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname + "/views"));

app.use("/user", usersRouter);
app.use("/expenses", expenseRouter);
app.use("/premium", premiumRouter);
app.use("/password", passwordRouter);

app.use("/", (req, res) => {
  res.send(`
    <body>
      <div>Home</div>
    </body>
  `);
});

Users.hasMany(Expenses);
Expenses.belongsTo(Users, {
  constraints: true,
  onDelete: "CASCADE",
});

Users.hasOne(Orders, { onDelete: "CASCADE", constraints: true });
Orders.belongsTo(Users);

Users.hasMany(ForgotPasswords, { onDelete: "CASCADE", constraints: true });
ForgotPasswords.belongsTo(Users, { constraints: true, onDelete: "CASCADE" });


sequelize
  .sync()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running at port of 3000");
    });
  })
  .catch((e) => {
    console.log(e);
  });
