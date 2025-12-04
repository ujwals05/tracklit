import { User } from "../models/users.model.js";

import cloudinary from "../utils/cloudinary.js";

export const signup = async (req, res) => {
  try {
    const { username, fullName, email, password } = req.body;

    // Check required fields
    if (!username || !fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // Create new user
    const user = await User.create({ username, fullName, email, password });

    // Generate tokens
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // Save refresh token to DB
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    // Remove sensitive data
    const { password: _, refreshToken: __, ...safeUser } = user.toObject();

    // Cookie options
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true only in prod
      sameSite: "strict",
      path: "/",
    };

    // Send response
    return res
      .status(201)
      .cookie("accessToken", accessToken, cookieOptions)
      .cookie("refreshToken", refreshToken, cookieOptions)
      .json({
        success: true,
        message: "Signup successful",
        data: safeUser,
      });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Signup failed",
      error: err.message,
    });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email)
      return res.status(400).json({
        success: false,
        message: "Username and email fields are required",
      });

    const user = await User.findOne({
      $or: [{ email }],
    }).select("+password");
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "User not found" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    const { password: _, refreshToken: __, ...safeUser } = user.toObject();

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(201)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        success: true,
        message: "Successfully logged in",
        data: safeUser,
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
    // return errorResponse(res, "Logout failed", err.message);
    return res.status(400).json({ success: true, message: err.message });
  }
};

export const currentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user?._id).select(
      "-password -refreshToken"
    );
    // return successResponse(res, "Current user fetched successfully", user, 200);

    return res
      .status(201)
      .json({ success: true, message: "Current user fetched", user });
  } catch (error) {
    console.log("Error while getting user", error);
    // return errorResponse(res, "No current user", null, 404);
    return res.status(404).json({ success: false, message: error.message });
  }
};

export const updateProfilePic = async (req, res) => {
  try {
    if (!req.file)
      return res
        .status(400)
        .json({ success: false, message: "Please upload an image" });

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload_stream(
      {
        folder: "user_profiles",
        resource_type: "image",
      },
      async (error, uploadResult) => {
        if (error)
          return res
            .status(500)
            .json({ success: false, message: "Upload failed", error });

        // Update user profilePic
        const updatedUser = await User.findByIdAndUpdate(
          req.user._id,
          { profilePic: uploadResult.secure_url },
          { new: true }
        ).select("-password -refreshToken");

        res.status(200).json({
          success: true,
          message: "Profile picture updated successfully",
          data: updatedUser,
        });
      }
    );

    result.end(req.file.buffer);
  } catch (error) {
    console.error("Error updating profile pic:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while updating profile picture",
      error: error.message,
    });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User doesnt exist",
      });
    }

    const deleteAccount = await User.findByIdAndDelete(userId);

    if (!deleteAccount) {
      return res.status(500).json({
        success: false,
        message: "Cannot delete the account",
      });
    }

    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    };
    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json({ success: true, message: "Successfully deleted user", data: {} });
  } catch (error) {
    console.log("Cannot delete the account ", error);
    // return errorResponse(res, "No current user", null, 404);
    return res.status(500).json({ success: false, message: error.message });
  }
};
