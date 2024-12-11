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

    res.json(station);
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: err.message
    });
  }
});

// Update amenity visibility
router.put('/:name/amenities', async (req, res) => {
  try {
    const { name } = req.params;
    const { vertexId, visible } = req.body;

    if (!vertexId || typeof visible !== 'boolean') {
      return res.status(400).json({
        success: false,
        message: 'Please provide vertexId and visibility status'
      });
    }

    // Find and update the station using atomic operation
    const result = await Station.findOneAndUpdate(
      {
        name: { $regex: new RegExp(`^${name}$`, 'i') },
        'data.mapData.vertices.id': vertexId
      },
      {
        $set: {
          'data.mapData.vertices.$.visible': visible,
          lastUpdated: new Date()
        }
      },
      {
        new: true, // Return the updated document
        runValidators: true // Run schema validators
      }
    );

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Station or vertex not found'
      });
    }

    // Find the updated vertex
    const updatedVertex = result.data.mapData.vertices.find(v => v.id === vertexId);

    res.json({
      success: true,
      message: `Amenity visibility updated to ${visible}`,
      vertex: updatedVertex
    });

  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: err.message
    });
  }
});

module.exports = router;