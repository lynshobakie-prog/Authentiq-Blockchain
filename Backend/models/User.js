const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { 
        type: String, 
        enum: ['admin', 'superadmin', 'user'], 
        default: 'admin' 
    }, 
    status: { 
        type: String, 
        enum: ['pending', 'approved', 'deactivated'], 
        default: 'pending' 
    },
    adminType: { type: String, default: null }, // 'university' or 'training_center'
    createdAt: { type: Date, default: Date.now }
});

//  تشفير الباسوورد تلقائياً قبل الحفظ
UserSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    
    try {
        // 2. توليد السولت وتشفير الباسورد
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        
    } catch (error) {
        throw error;
    }
});

// دالة لمقارنة الباسورد ( في Login)
UserSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);