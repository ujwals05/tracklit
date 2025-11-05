import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../models/user.model.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists
        let user = await User.findOne({ googleId: profile.id });

        // If not, create a new user
        if (!user) {
          user = await User.create({
            fullName: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
            profilePic: profile.photos[0]?.value || "",
          });
        }

        // Generate JWT tokens using your schema methods
        const jwtAccessToken = await user.accessToken();
        const jwtRefreshToken = await user.refreshToken();

        // Prepare user object with tokens
        const userWithTokens = {
          _id: user._id,
          fullName: user.fullName,
          email: user.email,
          profilePic: user.profilePic,
          accessToken: jwtAccessToken,
          refreshToken: jwtRefreshToken,
        };

        return done(null, userWithTokens);
      } catch (err) {
        console.error("Google Auth Error:", err);
        return done(err, null);
      }
    }
  )
);

// For JWT-only, these are not required but kept harmless
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

export default passport;
