import { Router } from 'express';
import jwt from 'jsonwebtoken';
import passport from '../config/passport.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false }));
router.get('/google/callback', passport.authenticate('google', { session: false, failureRedirect: `${process.env.CLIENT_URL}/?auth=failed` }), (req, res) => {
  const token = jwt.sign({ id: req.user._id, email: req.user.email, name: req.user.name, avatar: req.user.avatar }, process.env.JWT_SECRET, { expiresIn: '7d' });
  // GitHub Pages is static hosting and does not provide SPA route fallbacks.
  // Returning to the app root lets React read the token on both local and
  // project-page deployments.
  res.redirect(`${process.env.CLIENT_URL}/?token=${token}`);
});
router.get('/me', requireAuth, (req, res) => res.json({ user: req.user }));
export default router;
