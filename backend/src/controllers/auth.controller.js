import { User } from "../models/users.model.js";
import { successResponse, errorResponse } from "../utils/responseHandler.js";

export const signup = async (req, res) => {
  try {
    const { username, fullName, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return errorResponse(res, "User already exists with this email");

    const user = await User.create({ username, fullName, email, password });

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    const { password: _, refreshToken: __, ...safeUser } = user.toObject();

    return successResponse(
      res,
      "Signup successful",
      {
        user: safeUser,
        accessToken,
        refreshToken,
      },
      201
    );
  } catch (err) {
    return errorResponse(res, "Signup failed", err.message);
  }
};

export const signin = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await User.findOne({
      $or: [{ username }, { email }],
    }).select("+password");
    if (!user)
      return errorResponse(res, "Invalid email or password", null, 401);

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return errorResponse(res, "Invalid email or password", null, 401);

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    const { password: _, refreshToken: __, ...safeUser } = user.toObject();

    return successResponse(res, "Signin successful", {
      user: safeUser,
      accessToken,
      refreshToken,
    });
  } catch (err) {
    return errorResponse(res, "Signin failed", err.message);
  }
};

export const logout = async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.user?._id,
      { $unset: { refreshToken: 1 } },
      { new: true }
    );

    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    };

    res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json({ success: true, message: "Logged out successfully" });
  } catch (err) {
    return errorResponse(res, "Logout failed", err.message);
  }
};

export const currentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user?._id).select(
      "-password -refreshToken"
    );
    return successResponse(res, "Current user fetched successfully", user, 200);
  } catch (error) {
    console.log("Error while getting user", error);
    return errorResponse(res, "No current user", null, 404);
  }
};
