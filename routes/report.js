const express = require('express');
const router = express.Router();
const Report = require('../models/Report');

// Create a new report
router.post('/', async (req, res) => {
    try {
        const { coordinates, type, description } = req.body;
        
        // Validate required fields
        if (!coordinates || !coordinates.latitude || !coordinates.longitude || !type) {
            return res.status(400).json({ message: 'Coordinates and type are required fields' });
        }

        // Validate type enum
        const validTypes = ['congestion', 'amenity_missing', 'amenity_unavailable'];
        if (!validTypes.includes(type)) {
            return res.status(400).json({ message: 'Invalid report type' });
        }

        const report = new Report({
            coordinates: {
                latitude: coordinates.latitude,
                longitude: coordinates.longitude
            },
            type,
            description
        });

        await report.save();
        res.status(201).json(report);
    } catch (error) {
        console.error('Error creating report:', error);
        res.status(500).json({ message: 'Error creating report' });
    }
});

// Get all reports
router.get('/', async (req, res) => {
    try {
        const reports = await Report.find().sort({ createdAt: -1 });
        res.json(reports);
    } catch (error) {
        console.error('Error fetching reports:', error);
        res.status(500).json({ message: 'Error fetching reports' });
    }
});

module.exports = router; 