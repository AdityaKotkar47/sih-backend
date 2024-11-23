const mongoose = require('mongoose');

const StationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  data: {
    mapData: Object,  // Store map-related data
    metadata: Object, // Store any additional metadata
    // Add other specific fields you need
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

// Create index for faster searching
StationSchema.index({ name: 'text' });

module.exports = mongoose.model('Station', StationSchema);