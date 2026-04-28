import React, { useState } from 'react';
import { User, Lock, Bell, Save } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { updatePassword } from '../../services/api';

const SettingsTab = () => {
    const { user } = useAuth(); // اخذ بيانات المستخدم من الـ Context 
    const [isSaving, setIsSaving] = useState(false);
    
    const [securityData, setSecurityData] = useState({
        newPassword: '',
        confirmPassword: '',
        emailNotifications: true
    });

    const handleSecurityChange = (e) => {
        const { name, value } = e.target;
        setSecurityData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
    if (securityData.newPassword && securityData.newPassword !== securityData.confirmPassword) {
        toast.error("Passwords do not match!");
        return;
    }

    if (!securityData.newPassword) {
        toast.error("Please enter a new password first.");
        return;
    }

    setIsSaving(true);
    const loadingToast = toast.loading("Updating password...");

    try {
        const response = await updatePassword({
            newPassword: securityData.newPassword,
            email: user?.email
        });

        if (response.status === 200) {
            toast.success("Password updated successfully!", { id: loadingToast });
            setSecurityData({ ...securityData, newPassword: '', confirmPassword: '' });
        }
    } catch (error) {
        console.error("Error:", error);
        const errorMessage = error.response?.data?.message || "Failed to update password.";
        toast.error(errorMessage, { id: loadingToast });
    } finally {
        setIsSaving(false);
    }
};

    return (
        <div className="w-full max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700 text-left">
            
            {/* Header */}
            <div className="border-b border-slate-100 pb-6">
                <h2 className="text-2xl font-black text-slate-800 tracking-tight">System Settings</h2>
                <p className="text-[13px] text-slate-400 font-bold uppercase tracking-wider mt-1">Manage account and security</p>
            </div>

            <div className="space-y-6">
                
                {/* 1. Account Info (Read Only) */}
                <div className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-sm opacity-95">
                    <div className="flex items-center gap-2.5 mb-6 border-b border-slate-50 pb-4">
                        <User size={18} className="text-blue-500" />
                        <h3 className="font-bold text-[15px] text-slate-700">Account Information</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider italic">Full Name</label>
                            <input 
                                type="text" 
                                value={user?.fullName || 'User'} 
                                disabled 
                                className="w-full px-5 py-3.5 bg-slate-50 rounded-xl border border-slate-100 text-[15px] font-bold text-slate-400 cursor-not-allowed outline-none" 
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider italic">Registered Email</label>
                            <input 
                                type="email" 
                                value={user?.email || 'N/A'} 
                                disabled 
                                className="w-full px-5 py-3.5 bg-slate-50 rounded-xl border border-slate-100 text-[15px] font-bold text-slate-400 cursor-not-allowed outline-none" 
                            />
                        </div>
                    </div>
                </div>

                {/* 2. Security */}
                <div className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-sm">
                    <div className="flex items-center gap-2.5 mb-6 border-b border-slate-50 pb-4">
                        <Lock size={18} className="text-orange-500" />
                        <h3 className="font-bold text-[15px] text-slate-700">Update Password</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider">New Password</label>
                            <input 
                                name="newPassword"
                                type="password" 
                                value={securityData.newPassword}
                                onChange={handleSecurityChange}
                                placeholder="••••••••" 
                                className="w-full px-5 py-3.5 bg-slate-50 rounded-xl border border-slate-100 text-[15px] font-bold text-slate-700 outline-none focus:border-blue-400 focus:bg-white transition-all shadow-sm" 
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider">Confirm Password</label>
                            <input 
                                name="confirmPassword"
                                type="password" 
                                value={securityData.confirmPassword}
                                onChange={handleSecurityChange}
                                placeholder="••••••••" 
                                className="w-full px-5 py-3.5 bg-slate-50 rounded-xl border border-slate-100 text-[15px] font-bold text-slate-700 outline-none focus:border-blue-400 focus:bg-white transition-all shadow-sm" 
                            />
                        </div>
                    </div>
                </div>

                {/* 3. Notifications */}
                <div className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-sm">
                    <div className="flex items-center gap-2.5 mb-6 border-b border-slate-50 pb-4">
                        <Bell size={18} className="text-emerald-500" />
                        <h3 className="font-bold text-[15px] text-slate-700">Notification Preferences</h3>
                    </div>
                    
                    <div className="flex items-center justify-between px-1">
                        <div className="flex flex-col text-left">
                            <span className="text-[13px] font-black text-slate-700 uppercase tracking-tight">Email Alerts</span>
                            <span className="text-[11px] text-slate-400 font-medium">Receive system updates and registration alerts.</span>
                        </div>
                        
                        <div 
                            onClick={() => setSecurityData(p => ({...p, emailNotifications: !p.emailNotifications}))}
                            className={`w-11 h-6 rounded-full relative cursor-pointer transition-all duration-300 shadow-inner ${securityData.emailNotifications ? 'bg-emerald-500' : 'bg-slate-200'}`}
                        >
                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 shadow-sm ${securityData.emailNotifications ? 'right-1' : 'left-1'}`}></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end pt-2 pb-8">
                <button 
                    onClick={handleSave}
                    disabled={isSaving}
                    className="px-14 py-4 bg-slate-900 text-white rounded-2xl font-black text-[12px] shadow-xl hover:bg-blue-600 active:scale-95 transition-all uppercase tracking-widest flex items-center gap-2.5"
                >
                    <Save size={16} /> {isSaving ? "Saving..." : "Apply Changes"}
                </button>
            </div>
        </div>
    );
};

export default SettingsTab;
