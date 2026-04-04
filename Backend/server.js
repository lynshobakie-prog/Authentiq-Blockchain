const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Certificate = require('./models/Certificate');

const app = express();
app.use(express.json());
app.use(cors());

// --- [Routes] ---

// إضافة شهادة جديدة (مع إضافة بصمة رقمية افتراضية)
app.post('/add-certificate', async (req, res) => {
    try {
        const certData = {
            ...req.body,
            // محاكاة لعملية البلوكشين: توليد Hash فريد للشهادة
            blockchainHash: `0x${Math.random().toString(16).slice(2)}...${Math.random().toString(16).slice(2)}`,
            status: "Verified on Blockchain"
        };
        const newCert = new Certificate(certData);
        await newCert.save();
        res.status(201).json({ message: "Certificate added successfully", data: newCert });
    } catch (e) { 
        res.status(400).json({ error: e.message }); 
    }
});

// نقطة التحقق (Verification Point)
app.get('/verify', async (req, res) => {
    try {
        const { type, id } = req.query;
        let query = {};

        if (type === 'University') {
            query = { 
                category: 'University', 
                $or: [{ certificateId: id }, { studentId: id }] 
            };
        } else {
            query = { category: 'Course', certificateId: id };
        }

        const result = await Certificate.findOne(query);
        
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: `No ${type} record found with this ID` });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/', (req, res) => res.send('Authentiq API is running... 🚀'));

// --- [Database & Server Initiation] ---

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI; // تأكدي من وجودها في ملف .env

// دالة إنشاء بيانات تجريبية (تستدعى فقط بعد نجاح الاتصال)
const seedTestData = async () => {
    try {
        const testID = "AUTH-2026"; 
        const check = await Certificate.findOne({ certificateId: testID });
        
        if (!check) {
            await Certificate.create({
                studentName: "Layan Shobaki", 
                university: "Authentiq Academy",
                certificateId: testID,
                major: "Software Engineering",
                issueDate: new Date(),
                category: "Course",
                blockchainHash: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F", // Fake Hash for demo
                status: "Verified"
            });
            console.log("📝 Seed: Test certificate created.");
        } else {
            console.log("📝 Seed: Test certificate already exists.");
        }
    } catch (err) {
        console.log("⚠️ Seed Error:", err.message);
    }
};

// الربط النهائي: الاتصال ثم تشغيل السيرفر ثم الـ Seeding
mongoose.connect(MONGO_URI)
    .then(async () => {
        console.log("✅ Connected to MongoDB successfully!");
        await seedTestData(); // الآن لن يحدث Timeout لأن الاتصال جاهز
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("❌ Critical: Failed to connect to MongoDB", err.message);
    });