import { Income } from "../models/income.model.js";

export const addIncome = async (req, res) => {
  try {
    const { source, amount, category, date } = req.body;
    const userId = req.user?._id;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User not found or unauthorized",
      });
    }

    if (!source || !amount || !category || !date) {
      return res.status(400).json({
        success: false,
        message: "All fields (source, amount, category, date) are required",
      });
    }

    // Create income entry
    const income = await Income.create({
      userId,
      source,
      category,
      amount,
      date,
    });

    return res.status(201).json({
      success: true,
      message: "Income added successfully",
      data: income,
    });
  } catch (error) {
    console.error("Internal server error:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getIncome = async (req, res) => {
  try {
    if (!req.user?._id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User not found",
      });
    }

    const income = await Income.find({ userId: req.user._id }).sort({
      date: -1,
    });

    if (income.length === 0) {
      return res.status(200).json({
        success: false,
        message: "No income records found for this user",
      });
    }

    return res.status(200).json({
      success: true,
      data: income,
    });
  } catch (error) {
    console.error("Internal server error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error: " + error.message,
    });
  }
};

export const getIncomeById = async (req, res) => {
  try {
    const income = await Income.findById(req.params.id);
    if (!income)
      return res.status(400).json({
        success: false,
        message: "Unable to fetch the current Income",
      });

    if (income.length === 0) {
      return res.status(200).json({
        success: false,
        message: "No income records found for this user",
      });
    }

    return res.status(200).json(income);
  } catch (error) {
    console.log("Internal server error", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateIncome = async (req, res) => {
  try {
    const income = await Income.findById(req.params.id);
    if (!income) {
      return res.status(404).json({
        success: false,
        message: "Income record not found",
      });
    }

    if (income.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: You cannot edit this income entry",
      });
    }

    const incomeUpdate = await Income.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Income updated successfully",
      data: incomeUpdate,
    });
  } catch (error) {
    console.error("Internal Server Error:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteIncome = async (req, res) => {
  try {
    const income = await Income.findById(req.params.id);
    if (!income) {
      return res.status(404).json({
        success: false,
        message: "Income not found",
      });
    }

    if (income.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: You cannot delete this income",
      });
    }

    await Income.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Income deleted successfully",
    });
  } catch (error) {
    console.error("Internal server error:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const monthlyIncome = async (req, res) => {
  try {
    let { month, year } = req.query;

    month = parseInt(month);
    year = parseInt(year);

    if (!month || !year || month < 1 || month > 12) {
      return res.status(400).json({
        success: false,
        message: "Invalid month or year",
      });
    }

    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 0);

    const incomes = await Income.find({
      userId: req.user._id,
      date: { $gte: start, $lte: end },
    }).sort({ date: -1 });

    if (incomes.length === 0) {
      return res.status(200).json({
        success: false,
        message: "No income records found for this user",
      });
    }

    return res.status(200).json(incomes);
  } catch (error) {
    console.error("Internal server error:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const monthlyTotalIncome = async (req, res) => {
  try {
    let { month, year } = req.query;

    month = parseInt(month);
    year = parseInt(year);

    if (!month || !year || month < 1 || month > 12) {
      return res.status(400).json({
        success: false,
        message: "Invalid month or year",
      });
    }

    // Correct date range
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 0, 23, 59, 59, 999);

    const incomes = await Income.find({
      userId: req.user._id,
      date: { $gte: start, $lte: end },
    }).sort({ date: -1 });

    if (incomes.length === 0) {
      return res.status(200).json({
        success: false,
        message: "No income records found for this user",
      });
    }

    // Calculate total income for the month
    const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);

    return res.status(200).json({
      success: true,
      month,
      year,
      totalIncome,
      count: incomes.length,
      data: incomes,
    });
  } catch (error) {
    console.error("Internal server error:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
