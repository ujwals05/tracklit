import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../models/users.model.js";

import dotenv from "dotenv";
dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Find user
        let user = await User.findOne({ googleId: profile.id });

        // Create if not exists
        if (!user) {
          user = await User.create({
            fullName: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
            profilePic: profile.photos[0]?.value || "",
          });
        }

        // RETURN REAL MONGOOSE USER DOCUMENT
        return done(null, user);
      } catch (err) {
        console.error("Google Auth Error:", err);
        return done(err, null);
      }
    }
  )
);

// Keep these simple
passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

export default passport;
