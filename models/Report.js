const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    coordinates: {
        latitude: {
            type: Number,
            required: true
        },
        longitude: {
            type: Number,
            required: true
        }
    },
    type: {
        type: String,
        required: true,
        enum: ['congestion', 'amenity_missing', 'amenity_unavailable']
    },
    description: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Report = mongoose.model('Report', reportSchema);
module.exports = Report; 