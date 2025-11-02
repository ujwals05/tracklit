import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDb = async () => {
  try {
    const res = await mongoose.connect(`${process.env.MONGODB}/${DB_NAME}`);
    console.log(res.connection.name);
  } catch (error) {
    console.log("Error while connecting to DataBase", error);
    process.exit(1);
  }
};

export default connectDb;
