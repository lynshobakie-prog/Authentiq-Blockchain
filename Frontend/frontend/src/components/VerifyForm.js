import React, { useState } from 'react';
import { FileText, ArrowLeft, ShieldCheck, Cpu } from 'lucide-react';

const VerifyForm = ({ title, type, onBack }) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState(null);

  const handleVerify = (e) => {
    e.preventDefault();
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setResult('success'); 
    }, 3000);
  };

  return (
    <div className="relative min-h-screen pt-20 pb-20 px-6 flex flex-col items-center justify-center overflow-hidden bg-[#06080d]">
      
      {/* 🌌 الخلفية المعتمدة */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] right-[10%] w-80 h-80 bg-emerald-600/15 rounded-full blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.07]"
          style={{ 
            backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
            backgroundSize: '45px 45px',
            maskImage: 'radial-gradient(circle at center, black, transparent 90%)',
          }}>
        </div>
      </div>

      {/* ⬅️ زر الرجوع */}
      <button 
        onClick={onBack} 
        className="relative z-20 mb-10 group flex items-center gap-3 py-3 px-8 rounded-full bg-white/[0.05] border border-white/10 hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-300 shadow-lg"
      >
        <ArrowLeft size={18} className="text-blue-400 group-hover:-translate-x-1 transition-transform" />
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">Back to Portal</span>
      </button>

      {/* 🛠️ الكرت المشطوف */}
      <div className="relative z-10 w-full max-w-xl">
        <div 
          className="relative bg-[#0a0c12]/90 backdrop-blur-3xl p-10 md:p-14 overflow-hidden shadow-2xl"
          style={{ clipPath: 'polygon(0 0, 92% 0, 100% 8%, 100% 100%, 8% 100%, 0 92%)' }}
        >
          {/* الإطار النيون */}
          <div 
            className="absolute pointer-events-none"
            style={{ 
              top: '8px', left: '8px', right: '8px', bottom: '8px',
              border: '1.5px solid #3b82f6',
              clipPath: 'polygon(0 0, 92% 0, 100% 8%, 100% 100%, 8% 100%, 0 92%)',
              opacity: 0.8
            }}
          />

          <div className="relative z-10 font-sans">
            
            {result ? (
              /* --- حالة النجاح --- */
              <div className="text-center py-6 animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 border border-blue-500/30 bg-blue-500/10 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                  <ShieldCheck className="text-blue-400" size={40} />
                </div>
                <h3 className="text-2xl font-bold text-white uppercase mb-8 tracking-tight italic">Confirmed</h3>
                <button onClick={() => setResult(null)} className="py-4 px-10 rounded-full text-xs font-bold text-blue-400 border border-blue-500/30 bg-blue-500/5 uppercase tracking-widest transition-all hover:bg-blue-500/10 hover:text-white">
                  New Search
                </button>
              </div>

            ) : isVerifying ? (
              /* --- ⚙️ حالة الـ Process (جملة واحدة فقط) --- */
              <div className="flex flex-col items-center justify-center py-12 space-y-12 animate-in fade-in duration-300">
                
                {/* الأيقونة المركزية */}
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-2xl animate-pulse" />
                  <div className="relative p-6 rounded-full border border-blue-500/20 bg-[#0a0c12]">
                    <div className="animate-spin" style={{ animationDuration: '4s' }}>
                      <Cpu className="text-blue-400" size={52} />
                    </div>
                  </div>
                </div>

                {/* ✅ التعديل الجديد: جملة واحدة بسيطة */}
                <div className="flex flex-col items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_#3b82f6]" />
                    <p className="text-[11px] font-bold tracking-[0.4em] text-blue-400 uppercase font-mono italic">
                      SYSTEM_VERIFYING...
                    </p>
                  </div>
                  <p className="text-[9px] text-white/20 tracking-[0.2em] uppercase font-mono">
                    Please hold for authentication
                  </p>
                </div>

                {/* شريط التحميل النحيف */}
                <div className="w-full max-w-xs h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full animate-[progress_3s_linear_infinite] shadow-[0_0_10px_#3b82f6]" />
                </div>
              </div>

            ) : (
              /* --- حالة الفورم الأساسي --- */
              <form onSubmit={handleVerify} className="space-y-10 animate-in fade-in duration-500">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-tight italic">
                    {title}
                  </h2>
                </div>

                <div className="space-y-4">
                  <label className="text-xs font-bold tracking-widest text-gray-500 block ml-1 uppercase">Identifier</label>
                  <div className="relative group">
                    <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500/40 group-focus-within:text-blue-400 transition-colors" size={20} />
                    <input 
                      type="text" 
                      placeholder="Enter ID / Hash..." 
                      className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-5 pl-12 pr-4 text-white outline-none focus:border-blue-500/50 transition-all text-base"
                      required
                    />
                  </div>
                </div>

                <button className="relative w-full py-5 rounded-2xl font-black uppercase tracking-[0.25em] text-xs bg-white text-black hover:bg-gray-100 shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95 transition-all">
                  Execute Verification
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes progress {
          0% { width: 0%; opacity: 0.5; }
          100% { width: 100%; opacity: 0.5; }
        }
      `}} />
    </div>
  );
};

export default VerifyForm;