import React, { useState } from 'react';
import axios from 'axios';
import { FileText, ArrowLeft, ShieldCheck, Cpu } from 'lucide-react';

const VerifyForm = ({ title, onBack }) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState(null);
  const [identifier, setIdentifier] = useState(''); 
  const [certData, setCertData] = useState(null);  
  const [error, setError] = useState(null);       

  const handleVerify = async (e) => {
  e.preventDefault();
  setIsVerifying(true);
  setResult(null);
  setError(null);

  try {
    const response = await axios.get(`http://localhost:5000/verify`, {
      params: { code: identifier.trim() } 
    });

    if (response.data) {
      setCertData(response.data);
      setResult('success');
    }
  } catch (err) {
    // إذا السيرفر رد بـ 404 (Certificate not found)،  
    // إذا السيرفر طافي،  "Server Connection Error"
    const message = err.response?.data?.message || "Connection to secure node failed. Try again.";
    setError(message);
  } finally {
    setIsVerifying(false);
  }
};

  return (
    <div className="relative min-h-screen pt-32 pb-20 px-6 flex flex-col items-center justify-start overflow-hidden bg-[#06080d]">
      {/* 🌌 Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] right-[10%] w-80 h-80 bg-emerald-600/15 rounded-full blur-[120px]" />
      </div>

      {/* ⬅️ Back Button */}
      <button onClick={onBack} className="relative z-20 mb-10 group flex items-center gap-3 py-3 px-8 rounded-full bg-white/[0.05] border border-white/10 hover:border-blue-500/50 transition-all shadow-lg">
        <ArrowLeft size={18} className="text-blue-400 group-hover:-translate-x-1 transition-transform" />
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">Back to Portal</span>
      </button>

      {/* 🛠️ Main Card Container */}
      <div className="relative z-10 w-full max-w-xl">
        <div className="relative bg-[#0a0c12]/90 backdrop-blur-3xl p-10 md:p-14 overflow-hidden shadow-2xl" style={{ clipPath: 'polygon(0 0, 92% 0, 100% 8%, 100% 100%, 8% 100%, 0 92%)' }}>
          
          <div className="relative z-10 font-sans">
            
            {result === 'success' && certData ? (
              /* --- ✅ SUCCESS STATE --- */
              <div className="text-center py-6 animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border border-blue-500/30 bg-blue-500/10 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                  <ShieldCheck className="text-blue-400" size={40} />
                </div>
                
                <h3 className="text-2xl font-bold text-white uppercase mb-6 tracking-tight italic">Verified Authentic</h3>
                
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10 text-left mb-8 space-y-4">
                  <p className="text-[10px] text-blue-400 font-mono uppercase tracking-[0.3em]">Official Secure Record</p>
                  
                  <div>
                    <p className="text-gray-500 text-[9px] uppercase tracking-widest mb-1">Full Name</p>
                    <h4 className="text-xl font-bold text-white">{certData.studentName}</h4>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-500 text-[9px] uppercase tracking-widest mb-1">Institution</p>
                      <p className="text-sm text-white font-semibold">{certData.university}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-[9px] uppercase tracking-widest mb-1">Major</p>
                      <p className="text-sm text-white font-semibold">{certData.major}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                    <span className="bg-emerald-500/10 text-emerald-400 text-[9px] px-2 py-1 rounded border border-emerald-500/20 uppercase font-bold">
                      Status: Valid
                    </span>
                    <p className="text-[9px] text-gray-600 font-mono uppercase italic">Ref: {certData.verificationCode}</p>
                  </div>
                </div>

                <button onClick={() => {setResult(null); setCertData(null); setIdentifier('');}} className="py-4 px-10 rounded-full text-xs font-bold text-blue-400 border border-blue-500/30 bg-blue-500/5 uppercase tracking-widest hover:bg-blue-500/10 transition-all">
                  Check Another Code
                </button>
              </div>

            ) : isVerifying ? (
              /* --- ⚙️ PROCESSING STATE --- */
              <div className="flex flex-col items-center justify-center py-12 space-y-12">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-2xl animate-pulse" />
                  <div className="relative p-6 rounded-full border border-blue-500/20 bg-[#0a0c12]">
                    <div className="animate-spin" style={{ animationDuration: '4s' }}>
                      <Cpu className="text-blue-400" size={52} />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <p className="text-[11px] font-bold tracking-[0.4em] text-blue-400 uppercase font-mono italic animate-pulse">VERIFYING_CREDENTIALS...</p>
                  <p className="text-[9px] text-white/20 tracking-[0.2em] uppercase font-mono">Scanning Secure Database</p>
                </div>
              </div>

            ) : (
              /* --- 📝 SEARCH FORM STATE --- */
              <form onSubmit={handleVerify} className="space-y-10">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-tight italic">
                    {title}
                  </h2>
                  {error && (
                    <p className="mt-4 text-red-400 text-[10px] font-mono bg-red-400/10 py-2 rounded-lg border border-red-400/20 uppercase tracking-widest animate-shake">
                      {error}
                    </p>
                  )}
                </div>

                <div className="space-y-4">
                  <label className="text-xs font-bold tracking-widest text-gray-500 block ml-1 uppercase text-left">Security Verification Code</label>
                  <div className="relative group">
                    <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500/40 group-focus-within:text-blue-400" size={20} />
                    <input 
                      type="text" 
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder="e.g. AQ-XXXX" 
                      className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-5 pl-12 pr-4 text-white outline-none focus:border-blue-500/50 transition-all font-mono"
                      required
                    />
                  </div>
                </div>

                <button className="relative w-full py-5 rounded-2xl font-black uppercase tracking-[0.25em] text-xs bg-white text-black hover:bg-gray-100 transition-all shadow-xl active:scale-95">
                  Confirm Authenticity
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyForm;