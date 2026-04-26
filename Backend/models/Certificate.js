const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({

    studentName: { type: String, required: true },
    studentId: { type: String, required: true },
    university: { type: String, required: true },
    major: { type: String, required: true },
    verificationCode: { type: String, unique: true },
    certificateId: { type: String, default: () => `CERT-${Math.random().toString(36).substring(2, 9).toUpperCase()}` },
    issueDate: { type: Date, default: Date.now },
    category: { type: String, default: 'Academic' }, 
    blockchainHash: String,
    status: { type: String, default: 'Verified' }
}, { timestamps: true });

module.exports = mongoose.model('Certificate', certificateSchema);