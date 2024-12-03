const express = require('express');
const router = express.Router();
const Itinerary = require('../models/Itinerary');

// Search itineraries by location
router.get('/search/:location', async (req, res) => {
  try {
    const searchLocation = req.params.location.toLowerCase().trim();

    // Search for the itinerary
    const itinerary = await Itinerary.findOne({
      location: { $regex: new RegExp(`^${searchLocation}$`, 'i') }
    });

    if (!itinerary) {
      return res.status(404).json({
        success: false,
        message: 'Itinerary not found'
      });
    }

    res.json({
      success: true,
      data: itinerary
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

// Add new itinerary
router.post('/', async (req, res) => {
  try {
    const { location, hotels, tourist_spots, restaurants, market_places } = req.body;

    // Check if itinerary exists
    let itinerary = await Itinerary.findOne({ 
      location: { $regex: new RegExp(`^${location}$`, 'i') }
    });

    if (itinerary) {
      // Update existing itinerary
      itinerary.hotels = hotels || itinerary.hotels;
      itinerary.tourist_spots = tourist_spots || itinerary.tourist_spots;
      itinerary.restaurants = restaurants || itinerary.restaurants;
      itinerary.market_places = market_places || itinerary.market_places;
      itinerary.lastUpdated = Date.now();
      await itinerary.save();
    } else {
      // Create new itinerary
      itinerary = await Itinerary.create({
        location: location.toLowerCase(),
        hotels,
        tourist_spots,
        restaurants,
        market_places,
        lastUpdated: Date.now()
      });
    }

    res.status(201).json({
      success: true,
      data: itinerary
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