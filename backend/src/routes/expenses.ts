import express from "express";
import { getExpenses, postaddExpense, createOrders, postPaymentCaptured } from "../controllers/expenses";

const router = express.Router();


router.get("/", getExpenses);
router.post("/orders", createOrders);
router.post("/add-expense", postaddExpense);
router.post("/payment-captured", postPaymentCaptured);

export default router;
