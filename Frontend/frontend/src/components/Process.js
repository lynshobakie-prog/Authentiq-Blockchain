import React from 'react';
import { ArrowRight, ShieldCheck, Lock, Zap } from 'lucide-react';

const Process = ({ onNext }) => {
  const steps = [
    {
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop",
      icon: <ShieldCheck size={24} className="text-blue-600" />,
      title: "Secure Your Identity",
      desc: "We turn your hard work into a unique digital fingerprint. It's a DNA-proof for your certificate that no one can copy.",
      side: "right"
    },
    {
      image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2832&auto=format&fit=crop",
      icon: <Lock size={24} className="text-emerald-600" />,
      title: "Freeze in Time",
      desc: "Your records are locked into a global blockchain vault. They are permanent, safe, and impossible to change.",
      side: "left"
    },
    {
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2940&auto=format&fit=crop",
      icon: <Zap size={24} className="text-purple-600" />,
      title: "Instant Trust",
      desc: "Share your success with the world. Employers can verify your skills in one click with zero paperwork.",
      side: "right"
    }
  ];

  return (
    <section className="relative min-h-screen py-32 px-6 bg-[#f0f4f8] overflow-hidden">
      
      {/* 🌐 التقنية الخلفية اللي حبيناها */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#3b82f6 0.5px, transparent 0.5px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header الجريء */}
        <div className="text-center mb-32">
          <span className="text-blue-600 font-black tracking-[0.3em] text-[10px] uppercase block mb-4">How It Works</span>
          <h2 className="text-6xl md:text-8xl font-[900] text-[#1a1f2e] uppercase tracking-tighter italic">
            Pure <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600 not-italic">Protocol.</span>
          </h2>
        </div>

        {/* Steps - الـ Zig-Zag اللي حبيناه */}
        <div className="space-y-40 relative">
          {/* الخط الواصل بين الصور */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-blue-100 -translate-x-1/2 hidden md:block" />

          {steps.map((step, index) => (
            <div key={index} className={`flex flex-col md:flex-row items-center gap-16 md:gap-24 ${step.side === 'left' ? 'md:flex-row-reverse' : ''}`}>
              
              {/* النص - صار أوضح بكتير */}
              <div className="flex-1 text-center md:text-left space-y-6">
                <div className="flex items-center justify-center md:justify-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-lg flex items-center justify-center border border-blue-50">
                    {step.icon}
                  </div>
                  <span className="text-blue-600 font-black text-xs tracking-widest uppercase italic">Phase 0{index + 1}</span>
                </div>
                
                <h3 className="text-4xl md:text-5xl font-black text-[#1a1f2e] uppercase italic leading-[0.9] tracking-tighter">
                  {step.title}
                </h3>
                
                <p className="text-slate-500 text-sm font-bold uppercase leading-relaxed tracking-wide max-w-sm mx-auto md:mx-0">
                  {step.desc}
                </p>
              </div>

              {/* الصورة - ببرواز مائل وحركة */}
              <div className="flex-1 flex justify-center">
                <div className="relative group w-full max-w-md">
                  <div className="absolute inset-0 bg-blue-600 rounded-[3rem] rotate-3 opacity-10 group-hover:rotate-6 transition-transform duration-500" />
                  
                  <div className="relative aspect-square md:aspect-[4/3] overflow-hidden rounded-[3rem] border-4 border-white shadow-2xl transition-all duration-500 group-hover:-translate-y-4">
                    <img 
                      src={step.image} 
                      alt={step.title} 
                      className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1f2e]/60 to-transparent" />
                  </div>
                  
                  {/* Label تقني */}
                  <div className="absolute -bottom-4 right-4 bg-white px-6 py-3 rounded-2xl shadow-xl border border-blue-50 z-20">
                     <span className="text-[10px] font-black text-blue-600 tracking-tighter uppercase italic">Verified_Node_0{index + 1}</span>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* زر الانتقال النهائي */}
        <div className="mt-40 text-center">
          <button onClick={onNext} className="group relative inline-flex items-center gap-6 bg-[#1a1f2e] text-white px-14 py-6 rounded-full font-black uppercase text-[12px] tracking-[0.2em] overflow-hidden transition-all shadow-2xl">
            <span className="relative z-10 italic flex items-center gap-3">
              See the vision <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Process;