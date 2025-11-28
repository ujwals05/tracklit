import { Router } from "express";
import passport from "../utils/passport.js";
// import { successResponse, errorResponse } from "../utils/responseHandler.js";
import { User } from "../models/users.model.js";
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

authRoute.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

authRoute.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "http://localhost:7001/login",
  }),
  async (req, res) => {
    try {
      const user = req.user; // this is now a real mongoose document!

      if (!user) {
        return res.redirect("http://localhost:7001/login?error=no_user");
      }

      // ❌ remove await (they are not async)
      const accessToken = user.generateAccessToken();
      const refreshToken = user.generateRefreshToken();

      // Save refresh token into DB
      user.refreshToken = refreshToken;
      await user.save({ validateBeforeSave: false });

      const cookieOptions = {
        httpOnly: true,
        secure: false, // localhost only
        sameSite: "lax",
      };

      res.cookie("accessToken", accessToken, cookieOptions);
      res.cookie("refreshToken", refreshToken, cookieOptions);

      return res.redirect("http://localhost:7001/");
    } catch (err) {
      console.error("Google OAuth Error:", err);
      return res.redirect("http://localhost:7001/login?error=server_error");
    }
  }
);



authRoute.route("/signup").post(signup);
authRoute.route("/signin").post(signin);
authRoute.route("/logout").post(verifyJWT, logout);
authRoute
  .route("/current-user")
  .post(verifyJWT, currentUser)
  .get(verifyJWT, currentUser);
authRoute
  .route("/update-profile-pic")
  .put(verifyJWT, upload.single("profilePic"), updateProfilePic);

export default authRoute;
