const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const User = require('../models/User');

// @route    GET api/users/me
// @desc     Get current user profile
// @access   Private
router.get('/me', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json({
            success: true,
            user
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
});

// @route    PUT api/users/me
// @desc     Update user profile
// @access   Private
router.put('/me', authMiddleware, async (req, res) => {
    try {
        const { username } = req.body;
        const user = await User.findById(req.user.id);

        if (username) user.username = username;

        await user.save();

        res.json({
            success: true,
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
});

module.exports = router;