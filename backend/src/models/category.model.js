import mongoose from "mongoose";

const categoryRuleSchema = new mongoose.Schema({
  keyword: { type: String, required: true },
  category: { type: String, required: true },
});

export const CategoryRule = mongoose.model("CategoryRule", categoryRuleSchema);
