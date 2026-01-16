const express = require('express');
const router = express.Router();
const passport = require('passport');
const { register, login, getMe, updateProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const jwt = require('jsonwebtoken');

// Traditional Auth
router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);

// Google Auth
// 1. Redirect to Google
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// 2. Callback from Google
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  (req, res) => {
    // Generate JWT
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    // Redirect to Frontend with token
    const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    res.redirect(`${clientUrl}/oauth/callback?token=${token}`);
  }
);

module.exports = router;
