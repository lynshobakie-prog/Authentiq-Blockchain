import React, { useRef , useEffect } from 'react'; 
import { motion, useScroll, useTransform } from 'framer-motion';
import processVideo from '../assets/videos/process-bg.mp4 (1).mp4'; 
import { FileUp, ShieldCheck, Database, Cpu, ArrowRight } from 'lucide-react';

const Process = ({ onNext }) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => console.log(error));
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.4, 0.7, 1],
    ["#06080d", "#0a1324", "#08101d", "#06080d"]
  );

  const steps = [
    { id: "01", title: "Data Submission", description: "Secure upload of credentials through an encrypted gateway for initial validation.", icon: <FileUp size={24} className="text-cyan-400" /> },
    { id: "02", title: "Hashing Protocol", description: "Generation of a unique SHA-512 digital fingerprint, ensuring immutability.", icon: <Cpu size={24} className="text-emerald-400" /> },
    { id: "03", title: "Blockchain Synchronization", description: "Committing the cryptographic hash to the decentralized ledger.", icon: <Database size={24} className="text-cyan-400" /> },
    { id: "04", title: "Immutable Certificate", description: "Issuance of a blockchain-backed certificate, instantly verifiable.", icon: <ShieldCheck size={24} className="text-emerald-400" /> }
  ];

  return (
    <motion.div 
      ref={containerRef}
      style={{ backgroundColor }}
      className="relative min-h-screen text-white overflow-hidden w-full"
    >
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#06080d]">
        <div className="absolute inset-0 z-0"> 
          <video 
            ref={videoRef}
            autoPlay loop muted playsInline 
            className="w-full h-full object-cover opacity-60"
            style={{ 
                position: 'absolute',
                top: 0, left: 0, width: '100%', height: '100%',
                objectFit: 'cover',
                transform: 'scale(1.1)',
                maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)', 
            }}>
            <source src={processVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-transparent to-[#06080d]" />
        </div>

        <div className="relative z-20 text-center px-4 mt-16"> 
          <div className="flex flex-col items-center">
            
            {/* How it works */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1 }}
               className="flex items-center gap-x-5 mb-6"  
            >
                <div className="h-[1px] w-12 md:w-20 bg-white/10" />
                <motion.span 
                  initial={{ opacity: 0, letterSpacing: "0.2em" }}
                  animate={{ opacity: 1, letterSpacing: "0.6em" }} 
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="text-white/70 text-base md:text-2xl font-light uppercase tracking-[0.6em]"
                >
                  How it works
                </motion.span>
                <div className="h-[1px] w-12 md:w-20 bg-white/10" />
            </motion.div>

            {/* العنوان الرئيسي AUTHENTIQ  */}
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 1, ease: "easeOut" }}
               className="flex flex-col items-center justify-center mt-2"
            >
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter flex items-baseline">
                    <span className="italic text-white">AUTHENTI</span>
                    <span className="not-italic text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-emerald-500 ml-1">Q</span>
                </h1>
                
                {/* Proof you can trust */}
                <div className="flex items-center gap-4 mt-6">
                    <div className="h-[1px] w-6 md:w-12 bg-gradient-to-r from-transparent to-white/20" />
                    <motion.span 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="text-lg md:text-2xl font-light tracking-[0.15em] uppercase text-white/60"
                    >
                        Proof you can <span className="font-bold text-white/80">trust</span>
                    </motion.span>
                    <div className="h-[1px] w-6 md:w-12 bg-gradient-to-l from-transparent to-white/20" />
                </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="relative z-10 py-32 px-4 w-full max-w-[100vw]">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[5%] -left-[10%] w-[1000px] h-[1000px] bg-emerald-600/10 rounded-full blur-[180px]" />
          <div className="absolute bottom-[10%] -right-[10%] w-[1200px] h-[1200px] bg-cyan-600/10 rounded-full blur-[200px]" />
        </div>

        <div className="relative w-full">
          <div className="absolute left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-emerald-500/30 via-cyan-500/20 to-transparent hidden md:block" />

          <div className="space-y-44 relative w-full">
            {steps.map((step, index) => (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100, rotate: index % 2 === 0 ? -5 : 5 }} 
                whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ type: "spring", stiffness: 100, damping: 12 }}
                className={`flex flex-col md:flex-row items-center justify-center w-full ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className={`w-full md:flex-1 flex ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                  <div className="w-full max-w-[420px] group perspective-1000 md:mx-12 lg:mx-20">
                    <motion.div 
                      whileHover={{ scale: 1.05, rotateY: index % 2 === 0 ? 5 : -5, y: -10 }} 
                      className={`p-8 relative transition-all duration-500 overflow-hidden
                                  bg-[#0d111a]/80 backdrop-blur-xl border border-white/10 shadow-2xl
                                  group-hover:border-cyan-500/50
                                  ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} text-center`}
                      style={{ clipPath: 'polygon(0 0, 95% 0, 100% 15%, 100% 100%, 5% 100%, 0 85%)' }}
                    >
                      <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/5 to-transparent rotate-45 translate-y-full group-hover:translate-y-[-100%] transition-transform duration-1000" />
                      <div className={`flex items-center gap-4 mb-5 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                        <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-xl group-hover:bg-cyan-500 group-hover:text-black transition-all">
                          {step.icon}
                        </div>
                        <span className="text-4xl font-black text-white/5 italic">{step.id}</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-black text-white uppercase italic tracking-tight mb-3 group-hover:text-cyan-400 transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-xs md:text-sm text-white/60 leading-relaxed font-light group-hover:text-white/90 transition-colors">
                        {step.description}
                      </p>
                    </motion.div>
                  </div>
                </div>

                <div className="relative z-10 my-10 md:my-0 flex-shrink-0">
                  <div className="w-5 h-5 rounded-full bg-emerald-500 shadow-[0_0_30px_#10b981]" />
                </div>

                <div className="hidden md:flex md:flex-1" />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-48 text-center pb-20">
           <button onClick={onNext} className="group px-12 py-4 bg-white text-black font-black uppercase text-[10px] tracking-[0.3em] rounded-full transition-all hover:scale-110 active:scale-95 shadow-xl hover:bg-cyan-500 hover:text-white">
             Proceed to Vision <ArrowRight className="inline ml-2 group-hover:translate-x-1 transition-transform" size={16} />
           </button>
        </div>
      </section>
    </motion.div>
  );
};

export default Process;
