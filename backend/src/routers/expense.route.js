import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import {
  addExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
  getMonthlySummary,
  getMonthlyExpenses,
} from "../controllers/expense.controller.js";

const expenseRoute = Router();

expenseRoute.route("/add").post(verifyJWT, addExpense);
expenseRoute.route("/my-expenses").get(verifyJWT, getAllExpenses);
expenseRoute.route("/:id").get(verifyJWT, getExpenseById);
expenseRoute.route("/update/:id").put(verifyJWT, updateExpense);
expenseRoute.route("/delete/:id").delete(verifyJWT, deleteExpense);
expenseRoute.route("/summary/monthly").get(verifyJWT, getMonthlySummary);
expenseRoute.route("/montly/expense").get(verifyJWT, getMonthlyExpenses);

export default expenseRoute;
