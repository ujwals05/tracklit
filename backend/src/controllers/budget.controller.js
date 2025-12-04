import { Budget } from "../models/budget.model.js";
import { Income } from "../models/income.model.js";

export const addBudget = async (req, res) => {
  try {
    const userId = req.user?._id;
    const { amount, month, year, category } = req.body;

    if (!amount || !month || !year || !category) {
      return res.status(400).json({
        success: false,
        message: "All fields (amount, month, year, category) are required",
      });
    }

    const incomeExists = await Income.exists({ userId });
    if (!incomeExists) {
      return res.status(400).json({
        success: false,
        message: "You must add an income before adding expenses",
      });
    }

    const budget = await Budget.create({
      userId,
      amount,
      month,
      year,
      category,
    });

    return res.status(201).json({
      success: true,
      message: "Budget added successfully",
      data: budget,
    });
  } catch (error) {
    console.error("Error adding budget:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getBudget = async (req, res) => {
  try {
    const budgets = await Budget.find({ userId: req.user?._id });

    return res.status(200).json({
      success: true,
      count: budgets.length,
      data: budgets,
    });
  } catch (error) {
    console.error("Error fetching budgets:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getBudgetById = async (req, res) => {
  try {
    const { id } = req.params;
    const budget = await Budget.findById(id);

    if (!budget) {
      return res.status(404).json({
        success: false,
        message: "Budget not found",
      });
    }

    if (budget.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    return res.status(200).json({
      success: true,
      data: budget,
    });
  } catch (error) {
    console.error("Error fetching budget:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const deleteBudget = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || id.length !== 24) {
      return res.status(400).json({
        success: false,
        message: "Invalid budget ID format",
      });
    }

    const budget = await Budget.findById(id);

    if (!budget) {
      return res.status(404).json({
        success: false,
        message: "Budget not found",
      });
    }

    if (budget.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    await Budget.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Budget deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting budget:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateBudget = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || id.length !== 24) {
      return res.status(400).json({
        success: false,
        message: "Invalid budget ID format",
      });
    }

    const { amount, category, month, year } = req.body;

    if (!amount && !category && !month && !year) {
      return res.status(400).json({
        success: false,
        message: "No valid fields provided to update",
      });
    }

    const budget = await Budget.findById(id);

    if (!budget) {
      return res.status(404).json({
        success: false,
        message: "Budget not found",
      });
    }

    if (budget.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    const updatedBudget = await Budget.findByIdAndUpdate(
      id,
      { amount, category, month, year },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      message: "Budget updated successfully",
      data: updatedBudget,
    });
  } catch (error) {
    console.error("Error updating budget:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const monthlyBudget = async (req, res) => {
  try {
    const userId = req.user._id;
    const { month, year } = req.query;

    if (!month || !year) {
      return res.status(400).json({
        success: false,
        message: "Month and year are required",
      });
    }

    const budgets = await Budget.find({
      userId,
      month: Number(month),
      year: Number(year),
    });

    return res.status(200).json({
      success: true,
      count: budgets.length,
      data: budgets,
    });
  } catch (error) {
    console.error("Error fetching monthly budget:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const monthlyTotalBudget = async (req, res) => {
  try {
    const userId = req.user._id;
    const { month, year } = req.query;

    if (!month || !year) {
      return res.status(400).json({
        success: false,
        message: "Month and year are required",
      });
    }

    const total = await Budget.aggregate([
      {
        $match: {
          userId,
          month: Number(month),
          year: Number(year),
        },
      },
      {
        $group: {
          _id: null,
          totalBudget: { $sum: "$amount" },
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      totalBudget: total[0]?.totalBudget || 0,
    });
  } catch (error) {
    console.error("Error fetching monthly total budget:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
