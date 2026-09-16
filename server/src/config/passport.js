import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User.js';

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  // Use an explicit public URL in production. Render terminates HTTPS at its
  // proxy, so deriving this URL from the incoming request can produce http.
  callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:5000/api/auth/google/callback'
}, async (_accessToken, _refreshToken, profile, done) => {
  try {
    const user = await User.findOneAndUpdate(
      { googleId: profile.id },
      { googleId: profile.id, email: profile.emails?.[0]?.value, name: profile.displayName, avatar: profile.photos?.[0]?.value },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    done(null, user);
  } catch (error) { done(error); }
}));

export default passport;
