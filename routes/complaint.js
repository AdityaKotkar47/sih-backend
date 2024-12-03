const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');
const auth = require('../middleware/auth');

// Create a new complaint
router.post('/create', auth, async (req, res) => {
    try {
        const {referenceNo, type, description } = req.body;
        
        const complaint = new Complaint({
            referenceNo,
            type,
            description
        });

        await complaint.save();

        res.status(201).json({
            success: true,
            data: complaint
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});

// Get complaint by reference number
router.get('/reference/:referenceNo', async (req, res) => {
    try {
        const complaint = await Complaint.findOne({ referenceNo: req.params.referenceNo });
        
        if (!complaint) {
            return res.status(404).json({
                success: false,
                error: 'Complaint not found'
            });
        }

        res.json({
            success: true,
            data: complaint
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});

// Get complaints with filters
router.get('/filter', auth, async (req, res) => {
    try {
        const { type, resolved } = req.query;
        const query = {};

        if (type) query.type = type;
        if (resolved !== undefined) query.resolved = resolved === 'true';

        const complaints = await Complaint.find(query).sort({ createdAt: -1 });

        res.json({
            success: true,
            data: complaints
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router; 