/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { PlusCircle, List } from 'lucide-react'; // حذفنا الأيقونات غير المستخدمة هنا

const AdminDashboard = () => {
  // تركنا studentData لأننا سنحتاجها في الخطوة القادمة لربط قاعدة البيانات
  const [studentData, setStudentData] = useState({ name: '', id: '', major: '', year: '' });

  return (
    <div className="min-h-screen pt-28 pb-12 px-6 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tighter uppercase">University Dashboard</h1>
            <p className="text-gray-500 mt-2 font-medium">Manage and issue official academic credentials.</p>
          </div>
          <div className="bg-blue-500/10 border border-blue-500/20 px-6 py-3 rounded-2xl">
            <span className="text-blue-400 font-bold text-sm">Admin: Yale University</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form لإصدار شهادة جديدة */}
          <div className="lg:col-span-1 bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-8">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
              <PlusCircle size={20} className="text-blue-500" /> Issue New Degree
            </h3>
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="Student Full Name" 
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-blue-500/50 text-white"
              />
              <input 
                type="text" 
                placeholder="Student ID" 
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-blue-500/50 text-white"
              />
              <input 
                type="text" 
                placeholder="Major / Specialization" 
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-blue-500/50 text-white"
              />
              <button className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-500 transition-all mt-4 uppercase text-xs tracking-widest">
                Issue to Blockchain
              </button>
            </div>
          </div>

          {/* سجل الشهادات المصدرة */}
          <div className="lg:col-span-2 bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-8">
             <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
              <List size={20} className="text-emerald-500" /> Recently Issued
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-500 text-xs uppercase tracking-wider border-b border-white/5">
                    <th className="pb-4 font-black">Student</th>
                    <th className="pb-4 font-black">Major</th>
                    <th className="pb-4 font-black">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-gray-400">
                  <tr className="border-b border-white/5 group">
                    <td className="py-4 text-white font-medium">Lina Ahmad</td>
                    <td className="py-4">Computer Science</td>
                    <td className="py-4">
                      <span className="text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest">SECURED</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;