import { Router } from "express";
import {
  addBudget,
  getBudget,
  getBudgetById,
  updateBudget,
  deleteBudget,
} from "../controllers/budget.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const budgetRoute = Router();

budgetRoute.route("/").post(verifyJWT, addBudget);
budgetRoute.route("/").get(verifyJWT, getBudget);
budgetRoute.route("/:id").get(verifyJWT, getBudgetById);
budgetRoute.route("/:id").put(verifyJWT, updateBudget);
budgetRoute.route("/:id").delete(verifyJWT, deleteBudget);

export default budgetRoute;
