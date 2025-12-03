import { Expense } from "../models/expense.model.js";
import { Income } from "../models/income.model.js";
import { Budget } from "../models/budget.model.js";
// import { CategoryRule } from "../models/category.model.js";
import mongoose from "mongoose";

export const addExpense = async (req, res) => {
  try {
    const { title, amount, category, date, note } = req.body;
    const userId = req.user._id;
    if (!title || !amount)
      return res
        .status(400)
        .json({ success: false, message: "Title and amount is required" });

    const incomeExists = await Income.exists({ userId });
    if (!incomeExists) {
      return res.status(400).json({
        success: false,
        message: "You must add an income before adding expenses",
      });
    }

    const budgetExists = await Budget.exists({ userId });
    if (!budgetExists) {
      return res.status(400).json({
        success: false,
        message: "You must set a budget before adding expenses",
      });
    }
    const expense = await Expense.create({
      userId,
      title,
      amount,
      category,
      date,
      note,
    });
    return res.status(201).json({
      success: true,
      message: "Expense added successfully",
      data: expense,
    });
  } catch (error) {
    console.log("Error while adding expense:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", data: error });
  }
};

export const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user?._id }).sort({
      date: -1,
    });

    return res.status(200).json({
      success: true,
      message: "All expense of the user fetched",
      data: expenses,
    });
  } catch (error) {
    console.log("Error in getting all expense", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", data: error });
  }
};

export const getExpenseById = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findOne({
      _id: id,
      userId: req.user._id,
    });
    if (!expense)
      return res
        .status(404)
        .json({ success: false, message: "Can't find expense" });
    return res
      .status(200)
      .json({ success: true, message: "Got the expense", data: expense });
  } catch (error) {
    console.log("Error while getting expense");
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", data: error });
  }
};

export const updateExpense = async (req, res) => {
  try {
    const { title, amount, category, date, note } = req.body;
    const { id } = req.params;
    const expense = await Expense.findOneAndUpdate(
      {
        userId: req.user?._id,
        _id: id,
      },
      { title, amount, category, date, note },
      { new: true }
    );
    if (!expense)
      return res
        .status(404)
        .json({ success: false, message: "Cannot update the expense" });
    return res.status(200).json({
      success: true,
      message: "Expense updated successfully",
      data: expense,
    });
  } catch (error) {
    console.log("Error while updating expense", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", data: error });
  }
};

export const deleteExpense = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Expense.findOneAndDelete({
      userId: req.user?._id,
      _id: id,
    });
    if (!deleted)
      return res
        .status(404)
        .json({ success: false, message: "Expense not found" });

    return res.status(200).json({
      success: true,
      message: "Expense deleted successfully",
    });
  } catch (error) {
    console.log("Error while deleting the expense", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", data: error });
  }
};

export const getMonthlySummary = async (req, res) => {
  try {
    const { year, month } = req.query;

    if (!year || !month) {
      return res.status(400).json({
        success: false,
        message: "Year and month are required (e.g. ?year=2025&month=11)",
      });
    }

    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 1);

    const summary = await Expense.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(req.user._id),
          date: { $gte: start, $lt: end },
        },
      },
      {
        $group: {
          _id: "$category",
          totalAmount: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { totalAmount: -1 },
      },
    ]);

    return res.status(200).json({
      success: true,
      message: "Monthly summary fetched successfully",
      data: summary,
    });
  } catch (error) {
    console.error("Error fetching monthly summary:", error.message);
    return res.status(500).json({
      success: false,
      message: "Error fetching monthly summary",
      error: error.message,
    });
  }
};

export const getMonthlyExpenses = async (req, res) => {
  try {
    const { month, year } = req.query;

    if (!year || !month) {
      return res.status(400).json({
        success: false,
        message: "Year and month are required (e.g. ?year=2025&month=11)",
      });
    }

    const monthIndex = parseInt(month) - 1;
    const start = new Date(year, monthIndex, 1);
    const end = new Date(year, monthIndex + 1, 0, 23, 59, 59, 999);

    const expenses = await Expense.find({
      userId: req.user._id,
      date: { $gte: start, $lte: end },
    });

    return res.status(200).json({
      success: true,
      data: expenses,
    });
  } catch (error) {
    console.log("Error while getting monthly expenses:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};
