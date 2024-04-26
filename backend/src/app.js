const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const cors = require("cors");
const { sequelize } = require("./db");
const { Users } = require("./models/users");
const { Expenses } = require("./models/expenses");
const dotenv = require("dotenv");
const expenseRouter = require("./routes/expenses");
const usersRouter = require("./routes/users");

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cookieSession({
    name: "session",
    keys: [process.env.SECRET_KEY1, process.env.SECRET_KEY2],
    maxAge: 24 * 60 * 60 * 1000,
    path: "*",
  })
);

app.use("/user", usersRouter);
app.use("/expenses", expenseRouter);

app.use("/", (req, res) => {
  res.send(`
    <body>
      <div>Home</div>
    </body>
  `);
});

Expenses.belongsTo(Users, {
  constraints: true,
  onDelete: "CASCADE",
});
Users.hasMany(Expenses);

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
