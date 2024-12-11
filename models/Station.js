const mongoose = require('mongoose');

const StationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  data: {
    mapData: {
      vertices: [{
        id: String,
        objectName: String,
        cx: Number,
        cy: Number,
        visible: Boolean
      }],
      edges: [{
        id: String,
        from: String,
        to: String
      }]
    },
    floorplan: String
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

// Create index for faster searching
StationSchema.index({ name: 'text' });

module.exports = mongoose.model('Station', StationSchema);