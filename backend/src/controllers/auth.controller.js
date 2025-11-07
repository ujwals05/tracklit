import { User } from "../models/users.model.js";

import cloudinary from "../utils/cloudinary.js";

export const signup = async (req, res) => {
  try {
    const { username, fullName, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      // return errorResponse(res, "User already exists with this email");
      return res
        .status(400)
        .json({ success: false, message: "User already exist" });

    const user = await User.create({ username, fullName, email, password });

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    const { password: _, refreshToken: __, ...safeUser } = user.toObject();

    // return successResponse(
    //   res,
    //   "Signup successful",
    //   {
    //     user: safeUser,
    //     accessToken,
    //     refreshToken,
    //   },
    //   201
    // );

    const options = {
      httoOnly: true,
      secured: true,
    };

    return res
      .status(201)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({ success: true, message: "Successfully logged in", data });
  } catch (err) {
    // return errorResponse(res, "Signup failed", err.message);
    return res.status(400).json({ success: false, message: err.message });
  }
};

export const signin = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email)
      return res.status(400).json({
        success: false,
        message: "Username and email fields are required",
      });

    const user = await User.findOne({
      $or: [{ username }, { email }],
    }).select("+password");
    if (!user)
      // return errorResponse(res, "Invalid email or password", null, 401);
      return res
        .status(401)
        .json({ success: false, message: "User not found" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      // return errorResponse(res, "Invalid email or password", null, 401);
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    const { password: _, refreshToken: __, ...safeUser } = user.toObject();

    const options = {
      httoOnly: true,
      secured: true,
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