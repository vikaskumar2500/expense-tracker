import express from "express";
import { postaddExpense } from "../controllers/expenses";

const router = express.Router();

router.post("/add-expense", postaddExpense);

export default router;
