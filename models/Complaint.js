const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    referenceNo: {
        type: Number,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    resolved: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


complaintSchema.index({ referenceNo: 1 });
complaintSchema.index({ type: 1 });
complaintSchema.index({ resolved: 1 });

const Complaint = mongoose.model('Complaint', complaintSchema);

module.exports = Complaint; 