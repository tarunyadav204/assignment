// models/Application.js
const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    initiatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    details: String,
    resume: String,
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    currentReviewer: { type: Number, default: 1 },
    remarks: [{ reviewerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, comment: String }],
});

module.exports = mongoose.model('Application', applicationSchema);
