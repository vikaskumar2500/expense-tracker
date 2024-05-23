import express from 'express';
import {
  postForgotPassword,
  postSendSMTPEmail,
  postSignin,
  postSignup
} from '../controllers/users';

const router = express.Router();

router.post("/signin", postSignin);
router.post("/signup", postSignup);
router.post("/send-smtp-email-otp", postSendSMTPEmail);
router.post("/forgot-password", postForgotPassword);

export default router;
