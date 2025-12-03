import { Router } from "express";
import {
  addIncome,
  getIncome,
  getIncomeById,
  updateIncome,
  deleteIncome,
  monthlyIncome,
  monthlyTotalIncome
} from "../controllers/income.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const incomeRoute = Router();

incomeRoute.route("/").post(verifyJWT, addIncome);
incomeRoute.route("/").get(verifyJWT, getIncome);
incomeRoute.route("/monthly").get(verifyJWT, monthlyIncome);
incomeRoute.route("/monthly/income").get(verifyJWT, monthlyTotalIncome);
incomeRoute.route("/:id").get(verifyJWT, getIncomeById);
incomeRoute.route("/:id").put(verifyJWT, updateIncome);
incomeRoute.route("/:id").delete(verifyJWT, deleteIncome);

export default incomeRoute;
