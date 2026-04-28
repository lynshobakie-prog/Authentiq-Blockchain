import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import visionVideo from '../assets/videos/vision-bg.mp4.mp4'; 
import { Eye, Target, ShieldCheck, Award, Zap, Globe } from 'lucide-react';

const Vision = () => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Autoplay blocked or video error:", error);
      });
    }
  }, []);

  const visions = [
    { 
      icon: <Target className="text-cyan-400" size={40} />, 
      title: "Our Mission", 
      description: "To build a modern gateway for academic and professional trust, making verification simple, fast, and impossible to forge." 
    },
    { 
      icon: <Eye className="text-emerald-400" size={40} />, 
      title: "Our Vision", 
      description: "A world where your digital identity is yours to keep, and your hard-earned success is always just one click away from being proven." 
    }
  ];

  return (
    <div ref={containerRef} className="relative w-full bg-[#06080d] text-white overflow-hidden">
      
      {/* Hero Section*/}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0"> 
          <video 
            ref={videoRef}  
            autoPlay loop muted playsInline 
            preload="auto" 
            className="w-full h-full object-cover"
            style={{ 
                transform: 'scale(1.05)', 
                filter: 'brightness(0.5) contrast(1.1)', 
                willChange: 'transform',
                maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)', 
            }}>
            <source src={visionVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#06080d]/40 via-transparent to-[#06080d]" />
        </div>
        
        <div className="relative z-20 text-center px-4"> 
          <motion.h1 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}  
            className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-tight drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]"
          >
            Defining <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-300 to-emerald-500">
                Digital Integrity
            </span>
          </motion.h1>
        </div>
      </section>

      {/* Content Section*/}
      <section className="relative z-10 py-32 px-6 max-w-6xl mx-auto flex flex-col items-center">
        
        {/* التوهجات */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/40 rounded-full blur-[140px] animate-pulse" />
          <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-emerald-500/40 rounded-full blur-[140px] animate-pulse" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }} 
          transition={{ duration: 0.8 }}
          className="text-center mb-32 max-w-4xl"
        >
          <h2 className="text-3xl md:text-4xl font-black uppercase italic mb-6 text-cyan-400">Empowering the Future</h2>
          <p className="text-xl md:text-2xl font-light text-white/80 leading-relaxed italic">
            "We believe that every achievement deserves a secure home and every skill should be instantly recognized, anywhere in the world."
          </p>
        </motion.div>

        {/* الكرتين الكبيرين */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-40 w-full relative z-10">
          {visions.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="p-12 bg-[#0d111a]/60 border border-white/10 backdrop-blur-3xl group shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              style={{ 
                //  شكل الشيفرة 
                clipPath: 'polygon(12% 0, 100% 0, 100% 88%, 88% 100%, 0 100%, 0 12%)' 
              }}
            >
              <div className="mb-8 p-4 bg-white/5 w-fit rounded-2xl group-hover:bg-cyan-500 group-hover:text-black transition-all duration-500 shadow-[0_0_30px_rgba(6,182,212,0.4)]">
                {item.icon}
              </div>
              <h3 className="text-3xl font-black uppercase italic mb-4 group-hover:text-cyan-400 tracking-tight transition-colors">{item.title}</h3>
              <p className="text-white/60 text-lg leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* 3. كروت القيم الصغيرة */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full relative z-10">
          {[
            { label: "Global Trust", icon: <ShieldCheck size={22} /> },
            { label: "Instant Verity", icon: <Zap size={22} /> },
            { label: "Security", icon: <Award size={22} /> },
            { label: "Worldwide", icon: <Globe size={22} /> }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="flex flex-col items-center p-6 bg-white/[0.04] border border-white/5 backdrop-blur-md rounded-3xl text-center group transition-colors hover:bg-white/[0.08]"
            >
              <div className="mb-4 text-cyan-400 group-hover:scale-110 transition-transform">{stat.icon}</div>
              <span className="text-[10px] uppercase font-black tracking-[0.2em] text-white/40 group-hover:text-white transition-colors">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Vision;
