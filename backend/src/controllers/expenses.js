const { Expenses } = require("../models/expenses");

exports.postaddExpense = async (req, res) => {
  try {
    const { amount, description, category } = req.body;
    await Expenses.create({ amount, description, category});
    return res.status(200).json({ success: true });
  } catch (e) {
    console.log(e.message);
  }
};
