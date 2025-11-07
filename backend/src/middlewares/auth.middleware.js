import jwt from "jsonwebtoken";
import { User } from "../models/users.model.js";
import { errorResponse } from "../utils/responseHandler.js";

const verifyJWT = async (req, res, next) => {
  try {
    const token =
      req.cookies.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      // return errorResponse(res, "No credentials", null, 404);
      return res
        .status(404)
        .json({ success: false, message: "No credentials" });
    }

    const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // console.log(decodeToken);
    const user = await User.findById(decodeToken?._id).select(
      "-password -refreshToken"
    );

    if (!user)
      // return errorResponse(res, "Invalid credentials", null, 404);
      return res
        .status(404)
        .json({ success: false, message: "Invalid credentials" });

    req.user = user;

    next();
  } catch (error) {
    console.log("Error in middleware", error);
    // return errorResponse(res, "Error in the server", error, 400);
    return res.status(400).json({ success: false, message: error.message });
  }
};

export default verifyJWT;
