const express = require('express');
const router = express.Router();
const Station = require('../models/Station');

// Search station by name
router.get('/search/:name', async (req, res) => {
  try {
    const searchName = req.params.name.toLowerCase().trim();
    
    // Search for the station
    const station = await Station.findOne({
      name: { $regex: new RegExp(`^${searchName}$`, 'i') }
    });
    
    if (!station) {
      return res.status(404).json({
        success: false,
        message: 'Station not found'
      });
    }

    res.json({
      success: true,
      data: station
    });
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: err.message
    });
  }
});

// Add new station data
router.post('/', async (req, res) => {
  try {
    const { name, data } = req.body;
    
    // Check if station exists
    let station = await Station.findOne({ 
      name: { $regex: new RegExp(`^${name}$`, 'i') }
    });
    
    if (station) {
      // Update existing station
      station.data = data;
      station.lastUpdated = Date.now();
      await station.save();
    } else {
      // Create new station
      station = await Station.create({
        name: name.toLowerCase(),
        data,
        lastUpdated: Date.now()
      });
    }

    res.status(201).json({
      success: true,
      data: station
    });
  } catch (err) {
    console.error('Creation error:', err);
    res.status(400).json({
      success: false,
      message: 'Invalid data',
      error: err.message
    });
  }
});

module.exports = router;