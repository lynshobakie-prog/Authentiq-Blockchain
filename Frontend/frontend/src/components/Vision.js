import React from 'react';
import { Target, Globe, Zap } from 'lucide-react';

const Vision = () => {
  const milestones = [
    { year: "2026", goal: "Academic Genesis", detail: "Digitizing 100% of regional university transcripts on-chain.", icon: <Target className="text-blue-400" /> },
    { year: "2027", goal: "Global Bridge", detail: "Cross-border verification protocol for international students.", icon: <Globe className="text-emerald-400" /> },
    { year: "2028", goal: "Self-Sovereign Identity", detail: "One ID for all professional and academic achievements.", icon: <Zap className="text-purple-400" /> }
  ];

  return (
    <section className="py-24 px-6 min-h-screen flex flex-col justify-center bg-gradient-to-b from-transparent to-blue-900/5">
      <div className="max-w-5xl mx-auto w-full">
        <div className="text-center mb-24">
          <span className="text-emerald-500 font-black tracking-[0.3em] text-[10px] uppercase">The Roadmap</span>
          <h2 className="text-5xl md:text-7xl font-[900] text-white uppercase tracking-tighter mt-4">
            Our <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">Vision.</span>
          </h2>
        </div>

        <div className="space-y-12 relative">
          {/* الخط الرأسي للرؤية */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2 hidden md:block" />

          {milestones.map((item, index) => (
            <div key={index} className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
              <div className="flex-1 w-full text-center md:text-right">
                {index % 2 === 0 && (
                  <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-blue-500/20 transition-all backdrop-blur-md">
                    <h4 className="text-blue-400 font-black mb-2 tracking-widest">{item.year}</h4>
                    <h3 className="text-xl font-black text-white mb-2 uppercase italic">{item.goal}</h3>
                    <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest leading-relaxed">{item.detail}</p>
                  </div>
                )}
              </div>

              <div className="relative z-10 w-16 h-16 bg-[#06080d] border border-white/10 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.1)]">
                {item.icon}
              </div>

              <div className="flex-1 w-full text-center md:text-left">
                {index % 2 !== 0 && (
                  <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/20 transition-all backdrop-blur-md">
                    <h4 className="text-emerald-400 font-black mb-2 tracking-widest">{item.year}</h4>
                    <h3 className="text-xl font-black text-white mb-2 uppercase italic">{item.goal}</h3>
                    <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest leading-relaxed">{item.detail}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Vision;