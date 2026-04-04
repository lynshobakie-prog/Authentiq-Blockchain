const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
    // النوع: (University أو Course)
    category: { 
        type: String, 
        required: true 
        
    },
    studentName: { type: String, required: true },
    issueDate: { type: Date, required: true },
    certificateId: { type: String, unique: true, required: true },

    // بيانات الجامعة (اختياري حسب الـ category)
    universityName: { type: String },
    major: { type: String },
    studentId: { type: String }, 

    // بيانات الكورس (اختياري حسب الـ category)
    courseTitle: { type: String },
    providerName: { type: String }, 
    duration: { type: String },

    // --- 🛡️ حقول البلوكشين والأمان (إضافات ضرورية للمناقشة) ---
    blockchainHash: { 
        type: String, 
        unique: true, 
        sparse: true // يسمح بوجود قيم null لغير الموثقين بعد
    },
    status: { 
        type: String, 
        default: "Authentic" // القيمة الافتراضية للشهادات الموثقة
    },
    transactionId: { 
        type: String 
    }

}, { timestamps: true });

module.exports = mongoose.model('Certificate', certificateSchema);