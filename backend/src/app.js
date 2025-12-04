import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import passport from "./utils/passport.js";
import cors from "cors";

dotenv.config({
  path: "./.env",
});
const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:7001",
      "http://localhost:7002",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(passport.initialize());

import authRoute from "./routers/auth.route.js";
import expenseRoute from "./routers/expense.route.js";
import incomeRoute from "./routers/income.route.js";
import budgetRoute from "./routers/budget.route.js";
import analyticRouter from "./routers/analytics.route.js";
app.use("/api/auth", authRoute);
app.use("/api/expense", expenseRoute);
app.use("/api/income", incomeRoute);
app.use("/api/budget", budgetRoute);
app.use("/api/analytics", analyticRouter);

app.get("/", (_, res) => {
  res.send("APP IS RUNNING SUCCESSFULLY");
});

export default app;
