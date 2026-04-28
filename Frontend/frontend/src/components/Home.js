import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, CheckCircle2, Search } from 'lucide-react';

const FeatureCard = ({ icon, title, desc }) => (
  <motion.div 
    whileHover={{ y: -8, scale: 1.01 }}
    className="relative p-6 transition-all duration-500 group"
  >
    {/* توهج أزرق */}
    <div className="absolute inset-0 bg-blue-600/10 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

    {/*الكرت*/}
    <div 
      className="relative z-10 p-8 h-full overflow-hidden transition-all duration-500 border border-white/5 shadow-2xl"
      style={{ 
        backgroundImage: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #1d4ed8 100%)',
        clipPath: 'polygon(0 0, 95% 0, 100% 15%, 100% 100%, 5% 100%, 0 85%)',
      }}
    >
      <div className="absolute inset-0 bg-[#06080d]/30 backdrop-blur-md group-hover:bg-transparent transition-all duration-500" />
      <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/5 to-transparent rotate-45 translate-y-full group-hover:translate-y-[-100%] transition-transform duration-1000 z-10" />

      {/* المحتوى */}
      <div className="relative z-20 flex flex-col h-full">
        <div className="mb-6 inline-flex items-center justify-center w-14 h-14 bg-white/5 border border-white/10 rounded-xl group-hover:bg-blue-500/20 group-hover:border-blue-400/50 transition-all duration-500">
          {React.cloneElement(icon, { size: 26, className: "text-blue-100 group-hover:text-white transition-colors" })}
        </div>
        
        <h3 className="text-2xl font-black text-white uppercase mb-4 tracking-tighter italic shadow-sm leading-none">
          {title}
        </h3>
        
        <p className="text-[14px] text-white/60 leading-relaxed font-medium group-hover:text-white/90 transition-colors">
          {desc}
        </p>
      </div>

      <div className="absolute bottom-3 right-5 text-[9px] font-mono text-white/20 uppercase tracking-[0.3em] font-bold">
        Secure AuthQ
      </div>
    </div>
  </motion.div>
);

const Home = ({ onStart, onProcess }) => {
  return (
    <div className="animate-in fade-in duration-1000">
      <section id="home" className="relative min-h-screen flex items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[70%] bg-blue-500/10 blur-[140px] pointer-events-none z-0 animate-pulse" />
        
        <div className="mx-auto max-w-4xl z-10 relative">
          <h1 className="text-6xl md:text-8xl font-[1000] tracking-tighter text-white mb-8 uppercase leading-tight">
            Verify with <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent italic">Confidence.</span>
          </h1>

          <div className="flex items-center justify-center gap-4 mb-12 mt-10">
            <div className="h-[1px] w-8 md:w-16 bg-gradient-to-r from-transparent to-white/10" />
            <p className="text-[10px] md:text-xs font-black tracking-[0.4em] uppercase text-white/80">
              Your achievements, <span className="font-bold text-white/95">secured</span> by the <span className="text-white italic">AUTHENTI</span><span className="not-italic text-cyan-400">Q</span> Protocol
            </p>
            <div className="h-[1px] w-8 md:w-16 bg-gradient-to-l from-transparent to-white/10" />
          </div>

          <div className="mt-12">
            <button 
              onClick={onStart} 
              className="group relative bg-white text-black px-10 py-4 rounded-full font-black text-sm uppercase transition-all hover:scale-105 border border-white/20 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
            >
              Get Started Now
              <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" size={18} />
            </button>
          </div>
        </div>
      </section>

      <section className="relative py-40 bg-gradient-to-b from-transparent to-[#080a0f]/50"> 
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-[1000] tracking-tighter text-white mb-4 uppercase italic">
              Everything is <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Connected.</span>
            </h2>
            <p className="text-white/40 text-sm uppercase tracking-[0.2em]">Proof you can <span className="font-bold text-white/80">trust</span>.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            <FeatureCard icon={<ShieldCheck />} title="Institutional Security" desc="Blockchain-grade protection for all academic records." />
            <FeatureCard icon={<CheckCircle2 />} title="Smart Credentials" desc="Dynamic certificates that are instantly verifiable worldwide." />
            <FeatureCard icon={<Search />} title="One-Click Verify" desc="No more paperwork. Just a simple digital fingerprint scan." />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
