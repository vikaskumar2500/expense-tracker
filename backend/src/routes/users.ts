const express = require("express");
const { postSignup } = require("../controllers/signup");
const { postSignin } = require("../controllers/signin");

const router = express.Router();

router.post("/signin", postSignin);
router.post("/signup", postSignup);

export default router;