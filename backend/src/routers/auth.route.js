import { Router } from "express";
import passport from "../utils/passport.js";
import { successResponse, errorResponse } from "../utils/responseHandler.js";
import {
  signin,
  signup,
  logout,
  currentUser,
  updateProfilePic,
} from "../controllers/auth.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

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

authRoute.route("/signup").post(signup);
authRoute.route("/signin").post(signin);
authRoute.route("/logout").post(verifyJWT, logout);
authRoute.route("/current-user").post(verifyJWT, currentUser);
authRoute
  .route("/update-profile-pic")
  .put(verifyJWT, upload.single("profilePic"), updateProfilePic);

export default authRoute;
