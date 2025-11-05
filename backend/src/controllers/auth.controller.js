import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import { successResponse, errorResponse } from "../utils/responseHandler.js";

// Signup controller
export const signup = async (req, res) => {
  try {
    const { username, fullName, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return errorResponse(res, "User already exists with this email");

    // Create new user
    const user = await User.create({ username, fullName, email, password });

    // Generate tokens
    const accessToken = await user.accessToken();
    const refreshToken = await user.refreshToken();

    return successResponse(
      res,
      "Signup successful",
      { user, accessToken, refreshToken },
      201
    );
  } catch (err) {
    return errorResponse(res, "Signup failed", err.message);
  }
};

// Signin controller
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email }).select("+password");
    if (!user)
      return errorResponse(res, "Invalid email or password", null, 401);

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return errorResponse(res, "Invalid email or password", null, 401);

    // Generate tokens
    const accessToken = await user.accessToken();
    const refreshToken = await user.refreshToken();

    return successResponse(res, "Signin successful", {
      user,
      accessToken,
      refreshToken,
    });
  } catch (err) {
    return errorResponse(res, "Signin failed", err.message);
  }
};

// Logout controller (for JWT, usually frontend just deletes tokens)
export const logout = async (req, res) => {
  try {
    // If you store refresh tokens in DB, remove it here
    return successResponse(res, "Logout successful");
  } catch (err) {
    return errorResponse(res, "Logout failed", err.message);
  }
};
