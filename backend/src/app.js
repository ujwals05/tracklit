import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config({
  path: "./.env",
});
const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser())

app.get("/", (req, res) => {
  res.send("Hello");
});



export default app;
