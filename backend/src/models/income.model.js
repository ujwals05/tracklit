import mongoose from "mongoose";
import { User } from "./users.model.js"; 
const incomeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    source: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      min: [0, "Amount cannot be negative"],
    },
    category: {
      type: String,
      enum: ["Salary", "Business", "Investment", "Gift", "Refund", "Other"],
      default: "Other",
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const Income = mongoose.model("Income", incomeSchema);
