const express = require("express");
const { postaddExpense } = require("../controllers/expenses");

const router = express.Router();

router.post("/add-expense", postaddExpense);

module.exports = router;
