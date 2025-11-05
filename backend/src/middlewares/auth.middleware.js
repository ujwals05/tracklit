import jwt from "jsonwebtoken";
import { User } from "../models/users.model.js";
import { errorResponse } from "../utils/responseHandler.js";

const verifyJWT = async (req, res, next) => {
  try {
    const token =
      req.cookies.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return errorResponse(res, "No credentials", null, 404);
    }

    const decodeToken =  jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );
    const user = await User.findById(decodeToken?.id).select(
      "-password -refreshToken"
    );

    if (!user) return errorResponse(res, "Invalid credentials", null, 404);

    req.user = user;

    next();
  } catch (error) {
    console.log("Error in middleware", error);
    return errorResponse(res, "Error in the server", error, 400);
  }
};

export default verifyJWT;
