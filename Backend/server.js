const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Certificate = require('./models/Certificate');
const User = require('./models/User'); 
const bcrypt = require('bcryptjs');
const app = express();
app.use(express.json());
app.use(cors());

const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
//  الميدلوير الخاص بالحماية
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // جلب التوكن من "Bearer TOKEN"
    console.log("الـ Token اللي وصل للسيرفر:", token); // أضيفي هاد السطر

    if (!token) return res.status(401).json({ message: "دخول غير مصرح به: التوكن مفقود" });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "التوكن غير صالح أو انتهت صلاحيته" });
        req.user = user; // إضافة بيانات المستخدم للطلب
        next(); // السماح بالمرور للمسار التالي
    });
};

// --- [1. Auth Routes] ---

// 📝 مسار التسجيل (Signup)
app.post('/api/auth/register', async (req, res) => {
    try {
        const { fullName, email, password, role, adminType } = req.body;
        
        const newUser = new User({
            fullName,
            email: email.toLowerCase().trim(),
            password, 
            role: role || 'user', // القيمة الافتراضية مستخدم عادي
            status: (role === 'admin') ? 'pending' : 'approved', // الأدمن ينتظر موافقة، اليوزر يوافق عليه فوراً
            adminType: adminType
        });

        await newUser.save();

        res.status(201).json({ 
            message: "User registered successfully!", 
            user: { 
                id: newUser._id, 
                fullName: newUser.fullName, 
                email: newUser.email, 
                role: newUser.role,
                status: newUser.status
            } 
        });
    } catch (error) {
        console.error("❌ Signup Error:", error.message);
        res.status(500).json({ error: error.message });
    }
});

//  مسار تسجيل الدخول (Login) 
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password, adminType } = req.body;
        
        const user = await User.findOne({ email: email.toLowerCase().trim() });

        if (!user) {
            return res.status(401).json({ message: "الإيميل أو كلمة المرور غير صحيحة" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.status(401).json({ message: "الإيميل أو كلمة المرور غير صحيحة" });
        }

        // فحص حالة الحساب للأدمن
        if (user.role === 'admin') {
            if (user.status === 'pending') {
                return res.status(403).json({ message: "حسابك قيد المراجعة حالياً." });
            }
            if (user.status === 'deactivated') {
                return res.status(403).json({ message: "عذراً، هذا الحساب معطل حالياً." });
            }
        }

        // التحقق من البوابة (adminType)
        if (user.role !== 'superadmin' && adminType) {
            const storedType = user.adminType?.toLowerCase().trim();
            const incomingType = adminType.toLowerCase().trim();
            if (storedType !== incomingType) {
                return res.status(403).json({ message: `هذا الحساب مسجل كـ ${user.adminType}` });
            }
        }

        // ---  إنشاء التوكن 
        const token = jwt.sign(
            { 
                id: user._id, 
                role: user.role 
            }, 
            JWT_SECRET, 
            { expiresIn: '24h' } // التوكن متاح لمدة يوم كامل
        );

        // إرجاع التوكن مع بيانات المستخدم
        res.status(200).json({ 
            message: "Login successful!",
            token: token, // ⬅️ إرسال التوكن للـ Frontend لتخزينه
            user: { 
                id: user._id, 
                fullName: user.fullName, 
                email: user.email, 
                role: user.role, 
                status: user.status, 
                adminType: user.adminType 
            } 
        });
    } catch (error) {
        console.error("❌ Login Error:", error.message);
        res.status(500).json({ error: error.message });
    }
});

// 🔄  تحديث كلمة المرور  (يعمل للأدمن والسوبر أدمن)
app.put('/api/admin/update-password', authenticateToken, async (req, res) => {
    try {
        const { email, newPassword } = req.body;

        // 1. التحقق من وجود البيانات
        if (!email || !newPassword) {
            return res.status(400).json({ message: "البيانات ناقصة" });
        }

        // 2. تشفير كلمة المرور الجديدة
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // 3. تحديث قاعدة البيانات بناءً على الإيميل
        const user = await User.findOneAndUpdate(
            { email: email.toLowerCase().trim() },
            { password: hashedPassword },
            { new: true }
        );

        // 4. التأكد من وجود المستخدم
        if (!user) {
            return res.status(404).json({ message: "لم يتم العثور على المستخدم" });
        }

        res.status(200).json({ message: "تم تحديث كلمة المرور بنجاح ✅" });
    } catch (error) {
        console.error("❌ Update Error:", error.message);
        res.status(500).json({ error: "حدث خطأ في الخادم" });
    }
});


// --- [2. Certificate Routes] ---

// إصدار شهادة جديدة
app.post('/issue', authenticateToken, async (req, res) => {
    try {
        const vCode = `AQ-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
        
        const certData = {
            studentName: req.body.studentName,
            studentId: req.body.studentId,
            university: req.body.university, 
            major: req.body.major,
            verificationCode: vCode,
            certificateId: req.body.certificateId || `CERT-${Date.now()}`,
            category: req.body.category || "Academic",
            issueDate: new Date(),
            blockchainHash: `0x${Math.random().toString(16).slice(2)}`,
            status: "Verified"
        };

        const newCert = new Certificate(certData);
        await newCert.save();

        res.status(201).json({ message: "Success", verificationCode: vCode });
    } catch (e) { 
        console.error("Issue Error:", e.message);
        res.status(400).json({ error: e.message }); 
    }
});

// جلب كل الشهادات
app.get('/api/superadmin/certificates', async (req, res) => { 
    try {
        const certs = await Certificate.find().sort({ createdAt: -1 });
        res.status(200).json(certs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// توثيق الشهادة (Verify)
app.get('/verify', async (req, res) => {
    try {
        const { code } = req.query;
        const certificate = await Certificate.findOne({ 
            verificationCode: { $regex: new RegExp(`^${code}$`, 'i') } 
        });

        if (!certificate) {
            return res.status(404).json({ message: "Certificate not found" });
        }

        res.json(certificate);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/', (req, res) => res.send('Authentiq API is running... 🚀'));

// راوتات السوبر أدمن
    app.get('/api/superadmin/pending-requests', authenticateToken, async (req, res) => {
    if (req.user.role !== 'superadmin') return res.status(403).json({ message: "غير مسموح" });
    try {
        const pendingUsers = await User.find({ role: 'admin', status: 'pending' });
        res.status(200).json(pendingUsers);
    } catch (error) { res.status(500).json({ error: error.message }); }
});

    app.put('/api/superadmin/approve/:id', authenticateToken, async (req, res) => {
    if (req.user.role !== 'superadmin') return res.status(403).json({ message: "غير مسموح" });
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { status: 'approved' }, { new: true });
        res.status(200).json({ message: "تم التفعيل بنجاح ✅", user: updatedUser });
    } catch (error) { res.status(500).json({ error: error.message }); }
});

    app.delete('/api/superadmin/reject/:id', async (req, res) => {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: "تم رفض وحذف الطلب بنجاح ✅" });
        } catch (error) { res.status(500).json({ error: error.message }); }
    });

    app.get('/api/superadmin/approved-institutions', async (req, res) => {
        try {
            const approvedUsers = await User.find({ role: 'admin', status: 'approved' });
            res.status(200).json(approvedUsers);
        } catch (error) { res.status(500).json({ error: error.message }); }
    });


// --- [3. Database & Server Initiation] ---

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
.then(() => {
    console.log("✅ Connected to MongoDB successfully!");
    app.listen(PORT, () => {
        console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
}).catch(err => console.error("❌ MongoDB Connection Error:", err));