import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Award, ShieldCheck, Download, Mail, LogOut, Calendar, ExternalLink, Hash, Loader2 } from 'lucide-react';

const UserDashboard = ({ user: propsUser, onLogout, setView }) => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const user = propsUser || JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    console.log("User data present:", user);

    const fetchCertificates = async () => {
      if (!user || !user.email) {
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
      }

      try {
        const response = await axios.get(`http://localhost:5000/user-certificates`, {
          params: { email: user.email }
        });
        setCertificates(response.data);
      } catch (error) {
        console.error("Fetch Error:", error);
        setCertificates([]); 
      } finally {
        setLoading(false); 
      }
    };

    fetchCertificates();
  }, [user]);

  const handleDownload = (url, fileName) => {
    window.open(url, '_blank');
  };

  return (
    <div className="w-full min-h-screen bg-[#f4f7fa] font-sans text-slate-900">
      
      {/* 1. Header */}
      <div className="relative w-full bg-[#0f172a] border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 opacity-40 bg-gradient-to-br from-blue-600 via-[#0f172a] to-emerald-500 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-8 pt-32 pb-24 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter italic uppercase leading-none drop-shadow-2xl">
                 {user?.fullName || 'Authenticated User'} 
              </h1>
              <p className="text-emerald-400 mt-5 font-mono uppercase tracking-[0.4em] text-[10px] md:text-xs bg-emerald-500/10 border border-emerald-500/20 w-fit px-4 py-1.5 rounded-full">
                Software Engineering Dashboard
              </p>
            </div>
            <button onClick={onLogout} className="flex items-center gap-2 px-6 py-2.5 bg-white/10 hover:bg-red-500/80 text-white rounded-xl border border-white/10 backdrop-blur-md transition-all text-[11px] font-black uppercase tracking-widest group shadow-xl active:scale-95">
              <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" /> Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 -mt-10 pb-20 relative z-20 space-y-10">
        
        {/* Info Bar */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl border border-blue-100"><Mail size={20} /></div>
           <div className="flex flex-col">
               <span className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">
                    Verified Email
                </span>
             <p className="text-slate-900 font-bold text-sm truncate max-w-[200px]">
                {user?.email || "Email not found"}
             </p>
            </div>
          </div>
          <div className="flex items-center gap-4 border-y md:border-y-0 md:border-x border-slate-100 py-4 md:py-0 md:px-8">
             <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100"><Hash size={20} /></div>
            <div className="text-left">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Total Certificates</p>
              <p className="text-slate-900 font-bold text-sm">{certificates.length} Verified Documents</p>
            </div>
          </div>
          <div className="flex items-center gap-4 md:pl-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100"><Calendar size={20} /></div>
            <div className="text-left">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Account Status</p>
              <p className="text-slate-900 font-bold text-sm">Active Member</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-8 space-y-6 text-left">
            <div className="flex items-center gap-3 px-2">
              <div className="h-6 w-1 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Verified Certificates</h2>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
                <Loader2 className="animate-spin text-blue-500 mb-4" size={40} />
                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Loading Secure Records...</p>
              </div>
            ) : certificates.length > 0 ? (
              <div className="grid gap-4">
                {certificates.map((cert) => (
                  <div key={cert._id || cert.id} className="group bg-white border border-slate-100 p-6 rounded-2xl hover:border-emerald-400 hover:shadow-xl transition-all flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center border border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                        <ShieldCheck size={28} />
                      </div>
                      <div className="text-left">
                        <h4 className="font-bold text-slate-900 text-lg tracking-tight group-hover:text-emerald-700 transition-colors">{cert.studentName || cert.name}</h4>
                        <p className="text-slate-500 text-xs font-medium uppercase tracking-tighter">{cert.university || cert.school} • {cert.major || cert.date}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleDownload(cert.fileUrl, cert.name)}
                      className="p-3 bg-slate-50 text-slate-400 hover:bg-emerald-600 hover:text-white rounded-xl transition-all active:scale-95"
                    >
                      <Download size={20} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">No certificates found in your record.</p>
              </div>
            )}
          </div>

          <div className="lg:col-span-4 text-left">
            <div className="bg-[#1e293b] rounded-2xl p-8 text-white relative overflow-hidden shadow-2xl border border-white/5">
              <div className="relative z-10">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20">
                  <Award size={26} />
                </div>
                <h3 className="text-2xl font-black mb-2 uppercase tracking-tighter italic text-transparent bg-clip-text bg-gradient-to-r from-white to-emerald-400">
                  Verification Hub
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-8 font-medium">
                  Check and verify new documents from your university instantly via our blockchain network.
                </p>
                <button 
                  onClick={() => setView('verify-main')}
                  className="w-full py-4 bg-white text-[#0f172a] rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all flex items-center justify-center gap-2 group shadow-xl active:scale-95"
                >
                  Process New Document <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              <ShieldCheck size={140} className="absolute -bottom-10 -right-10 text-white/[0.03] rotate-12" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
