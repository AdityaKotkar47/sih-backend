const express = require('express');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const { limiter, passwordResetLimiter } = require('../config/rateLimiter');
const { sendEmail } = require('../utils/emailService');
const { getResetPasswordTemplate } = require('../utils/emailTemplates');
const crypto = require('crypto');

// Validation middleware
const registerValidation = [
  body('username')
    .trim()
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 2 }).withMessage('Username must be at least 2 characters'),
  body('email')
    .trim()
    .isEmail().withMessage('Please include a valid email')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 }).withMessage('Password must be 6 or more characters')
    .matches(/\d/).withMessage('Password must contain a number')
];

const loginValidation = [
  body('email').trim().isEmail().withMessage('Please include a valid email'),
  body('password').notEmpty().withMessage('Password is required')
];

// Helper function to generate JWT
const generateToken = (userId) => {
  return jwt.sign(
    { user: { id: userId } },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

// Register endpoint
router.post('/register', registerValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false,
        errors: errors.array() 
      });
    }

    const { username, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ 
      $or: [
        { email: email.toLowerCase() },
        { username: username.trim() }
      ]
    });

    if (existingUser) {
      return res.status(400).json({ 
        success: false,
        message: 'User with this email or username already exists' 
      });
    }

    // Create new user
    const user = new User({ username, email, password });
    await user.save();

    // Generate token
    const token = generateToken(user.id);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });

  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ 
      success: false,
      message: 'Server error during registration' 
    });
  }
});

// Login endpoint
router.post('/login', loginValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false,
        errors: errors.array() 
      });
    }

    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid credentials' 
      });
    }

    // Verify password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid credentials' 
      });
    }

    // Generate token
    const token = generateToken(user.id);

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ 
      success: false,
      message: 'Server error during login' 
    });
  }
});

// Forgot Password
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'No user found with that email'
      });
    }

    // Generate reset token
    const resetToken = user.generateResetToken();
    await user.save();

    // Create reset URL pointing to backend reset password page
    const resetUrl = `${req.protocol}://${req.get('host')}/reset-password/${resetToken}`;
    
    // Send email
    const emailSent = await sendEmail(
      user.email,
      'Reset Your Pravaah Password',
      getResetPasswordTemplate(resetUrl)
    );

    if (!emailSent) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();

      return res.status(500).json({
        success: false,
        message: 'Email could not be sent'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Password reset email sent'
    });

  } catch (err) {
    console.error('Password reset error:', err);
    res.status(500).json({
      success: false,
      message: 'Server error during password reset request'
    });
  }
});

// Reset Password
router.post('/reset-password/:resetToken', passwordResetLimiter, [
  body('password')
    .isLength({ min: 6 }).withMessage('Password must be 6 or more characters')
    .matches(/\d/).withMessage('Password must contain a number')
], async (req, res) => {
  // Validate input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation errors',
      errors: errors.array()
    });
  }

  try {
    // Get hashed token
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(req.params.resetToken)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset token'
      });
    }

    // Set new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password reset successful. Please log in again.'
    });

  } catch (err) {
    console.error('Password reset error:', err);
    res.status(500).json({
      success: false,
      message: 'Server error during password reset'
    });
  }
});

// Reset Password Page
router.get('/reset-password/:resetToken', async (req, res) => {
  try {
    const { resetToken } = req.params;

    // Optionally, perform initial validation of the token here

    res.render('resetPassword', { resetToken });
  } catch (err) {
    console.error('Error rendering reset password page:', err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;