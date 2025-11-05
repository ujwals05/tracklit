import { Router } from "express";
import passport from "../utils/passport.js";
import { successResponse, errorResponse } from "../utils/responseHandler.js";

const authRoute = Router();

authRoute
  .route("/google")
  .get(passport.authenticate("google", { scope: ["profile", "email"] }));

authRoute.route("/google/callback").get(
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  (req, res) => {
    try {
      return successResponse(res, "Google Login Successful", req.user);
    } catch (err) {
      return errorResponse(res, "Google Login Failed", err.message);
    }
  }
);

export default authRoute;
