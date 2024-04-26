const bcrypt = require("bcrypt");
const { Users } = require("../models/users");

exports.postSignin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userRes = await Users.findOne({ where: { email } });

    if (!userRes) {
      throw new Error("Failed to Login");
    }

    const hashedPassword = userRes.password;
    const typedPassword = password;
    const isMatched = await bcrypt.compare(typedPassword, hashedPassword);
    if (!isMatched)
      return res.status(403).json({ message: "Password does not match!" });
    req.user = userRes;
    return res.end();
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};
