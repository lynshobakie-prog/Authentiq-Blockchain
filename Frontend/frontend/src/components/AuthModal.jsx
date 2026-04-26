import React, { useState } from 'react';
import { X, Mail, Lock, User, ShieldCheck } from 'lucide-react';
import { registerUser, loginUser } from '../services/api';
import { useAuth } from '../context/AuthContext';

const AuthModal = ({ authMode, setAuthMode, userRole, adminType, onClose, onSuccess }) => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // التحقق من الباسورد في حالة التسجيل فقط
    if (authMode === 'signup') {
      if (formData.password !== confirmPassword) {
        alert("كلمات المرور غير متطابقة!");
        return;
      }
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(formData.password)) {
        alert("Password must be at least 8 characters, include uppercase, lowercase, number and a special character.");
        return;
      }
    }

    try {
      let response;
      if (authMode === 'login') {
        // --- تسجيل الدخول ---
        response = await loginUser({
          email: formData.email,
          password: formData.password,
          adminType: adminType 
        });

        console.log("ماذا أرسل السيرفر فعلياً؟", response.data); 
        
        const token = response.data.token;
        const user = response.data.user;

        if (token) {
          login(user, token); // تخزين البيانات في الـ Context
          onSuccess(user);
          onClose();
        } else {
          alert("السيرفر لم يرسل التوكن! تأكدي من ملف server.js");
        }

      } else {
        // --- إنشاء حساب جديد ---
        response = await registerUser({
          ...formData,
          role: userRole, 
          adminType: adminType
        });
        
        alert("Account created successfully! Please log in.");
        setAuthMode('login'); // تحويل المستخدم لشاشة الدخول
      }
    } catch (error) {
      alert(error.response?.data?.message || "Authentication failed!");
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-lg" onClick={onClose} />
      
      <div className="relative w-full max-w-md border rounded-[2.5rem] p-10 shadow-2xl transition-all duration-500 bg-[#111216] border-white/10">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors">
          <X size={24} />
        </button>
        
        <div className="text-center mb-8">
          <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${userRole === 'admin' ? 'text-blue-500' : 'text-emerald-500'}`}>
            {userRole === 'admin' ? (adminType === 'university' ? 'Academic Institution' : 'Training Center') : 'Verifier Gateway'}
          </span>
          <h3 className="text-4xl font-[900] tracking-tighter text-white mt-2 uppercase">
            {authMode === 'login' ? 'Welcome Back' : 'Join Us'}
          </h3>
        </div>

        <div className="flex gap-4 mb-8 bg-white/5 p-1.5 rounded-2xl border border-white/5">
          <button 
            type="button"
            onClick={() => setAuthMode('login')} 
            className={`flex-1 py-3 rounded-xl font-bold text-xs uppercase transition-all ${authMode === 'login' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
          >
            Login
          </button>
          <button 
            type="button"
            onClick={() => setAuthMode('signup')} 
            className={`flex-1 py-3 rounded-xl font-bold text-xs uppercase transition-all ${authMode === 'signup' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
          >
            Sign Up
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {authMode === 'signup' && (
            <div className="relative">
              <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                name="fullName" 
                type="text" 
                value={formData.fullName} 
                onChange={handleChange} 
                placeholder={userRole === 'admin' ? (adminType === 'university' ? "University Name" : "Training Center Name") : "Full Name"} 
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white outline-none focus:border-blue-500/50 transition-all font-medium text-[15px]" 
                required 
              />
            </div>
          )}
          
          <div className="relative">
            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              name="email" 
              type="email" 
              value={formData.email} 
              onChange={handleChange} 
              placeholder="Email Address" 
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white outline-none focus:border-blue-500/50 transition-all font-medium text-[15px]" 
              required 
            />
          </div>

          <div className={`flex ${authMode === 'signup' ? 'gap-3' : 'flex-col'}`}>
            <div className="relative flex-1">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input 
                name="password" 
                type="password" 
                value={formData.password} 
                onChange={handleChange} 
                placeholder="Password" 
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-blue-500/50 transition-all font-medium text-[14px]" 
                required 
              />
            </div>

            {authMode === 'signup' && (
              <div className="relative flex-1">
                <ShieldCheck className={`absolute left-5 top-1/2 -translate-y-1/2 ${formData.password && formData.password === confirmPassword ? 'text-emerald-500' : 'text-gray-500'}`} size={16} />
                <input 
                  type="password" 
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                  placeholder="Confirm" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-emerald-500/50 transition-all font-medium text-[14px]" 
                  required 
                />
              </div>
            )}
          </div>

          <button 
            type="submit" 
            className={`w-full text-white font-black py-5 rounded-2xl uppercase tracking-[0.15em] text-[12px] transition-all mt-4 shadow-xl ${userRole === 'admin' ? 'bg-blue-600 hover:bg-blue-500 shadow-blue-900/20' : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-900/20'}`}
          >
            {authMode === 'login' ? 'Enter Dashboard' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;