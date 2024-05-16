import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import { sequelize } from "./db";
import { Users } from "./models/users";
import { Expenses } from "./models/expenses";
import dotenv from "dotenv";
import expenseRouter from "./routes/expenses";
import usersRouter from "./routes/users";


dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/user", usersRouter);
app.use("/expenses", expenseRouter);

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


sequelize
  .sync().then(() => {
    app.listen(3000, () => {
      console.log("Server is running at port of 3000");
    });
  })
  .catch((e) => {
    console.log(e);
  });
