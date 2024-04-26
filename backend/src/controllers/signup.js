const bcrypt = require("bcrypt");
const { Users } = require("../models/users");

exports.postSignup = async (req, res, next) => {
  const { password, email, name } = req.body;

  const hashedPassword = await bcrypt.hash(password, +process.env.AUTH_SALT);
  try {
    const respose = await Users.create({
      name,
      email,
      password: hashedPassword,
    });
    return res.status(200).json(respose);
  } catch (e) {
    console.log("message", e.message);
    res.status(500).json({ success: false, message: e.message });
  }
};
