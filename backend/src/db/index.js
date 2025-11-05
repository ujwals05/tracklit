import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async () => {
  try {
    const res = await mongoose.connect(`${process.env.MONGO_DB}/${DB_NAME}`);
    console.log("Database connected to :", res.connection.name);
  } catch (error) {
    console.log("Error while connecting to database", error);
    process.exit(1);
  }
};

export default connectDB;
