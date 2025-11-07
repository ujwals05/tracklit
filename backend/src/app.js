import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import passport from "./utils/passport.js";

dotenv.config({
  path: "./.env",
});
const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(passport.initialize());

import authRoute from "./routers/auth.route.js";
app.use("/api/auth", authRoute);

app.get("/", (_, res) => {
  res.send("APP IS RUNNING SUCCESSFULLY");
});

export default app;
