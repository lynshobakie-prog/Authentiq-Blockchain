import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, ShieldCheck, Database } from 'lucide-react';

const ProcessTimeline = () => {
  const steps = [
    {
      icon: <Cpu size={32} />,
      title: "Data Submission",
      desc: "User enters the unique certificate hash into our secure gateway for initial structure validation."
    },
    {
      icon: <Database size={32} />,
      title: "Database Sync",
      desc: "System cross-references the hash with decentralized storage nodes to locate the original record."
    },
    {
      icon: <ShieldCheck size={32} />,
      title: "Final Verification",
      desc: "Digital signatures are verified, and a real-time authenticity report is generated for the user."
    }
  ];

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <div className="relative min-h-screen pt-32 pb-20 px-6 bg-[#04060a] overflow-hidden text-white font-sans">
      
      {/* 🎬 فيديو الكوكب الرقمي (المسار المعدل والأنمن) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover opacity-35" // زدت التعتيم شوي عشان التوهج يبرز أكتر
        >
          {/* ✅ التعديل هنا لضمان قراءة الملف من الـ public */}
          <source src={process.env.PUBLIC_URL + '/process-bg.mp4'} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        <div className="absolute inset-0 bg-[#04060a]/60" /> {/* طبقة دمج أقوى */}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        
        {/* عنوان الصفحة مع موشن ظهور */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-32 text-center"
        >
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter italic">
            How it <span className="text-blue-500 drop-shadow-[0_0_20px_#2563eb]">Works</span>
          </h2>
          <div className="h-1.5 w-24 bg-blue-600 mx-auto mt-6 rounded-full shadow-[0_0_15px_#2563eb]" />
        </motion.div>

        <div className="relative">
          
          {/* الخط المركزي النيوني المتحرك */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-[1.5px] h-full bg-blue-500/10 hidden md:block overflow-hidden">
            <motion.div 
              className="w-full bg-gradient-to-b from-transparent via-blue-500 to-transparent h-40"
              animate={{ y: ['-100%', '400%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
          </div>

          <div className="space-y-40">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                variants={itemVariants}
                className={`flex flex-col md:flex-row items-center justify-between w-full ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
              >
                
                {/* كرت المحتوى - شفاف وأفخم */}
                <div className="w-full md:w-[45%] group">
                  <div 
                    className={`p-10 bg-white/[0.03] border border-white/10 backdrop-blur-3xl transition-all duration-700 hover:border-blue-500/40 hover:bg-white/[0.06] shadow-xl
                    ${index % 2 === 0 ? 'md:text-right text-center' : 'md:text-left text-center'}`}
                    style={{ clipPath: 'polygon(0 0, 92% 0, 100% 12%, 100% 100%, 8% 100%, 0 88%)' }}
                  >
                    <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight italic mb-6">
                      {step.title}
                    </h3>
                    <p className="text-[14px] md:text-15px text-white/70 leading-relaxed font-normal tracking-wide drop-shadow-[0_2px_5px_rgba(0,0,0,0.5)]">
                      {step.desc}
                    </p>
                  </div>
                </div>

                {/* الدائرة المركزية (Point) */}
                <div className="relative z-10 my-12 md:my-0 flex items-center justify-center">
                  <motion.div 
                    whileHover={{ scale: 1.2, rotate: 180 }}
                    className="w-20 h-20 rounded-full bg-[#0a0c12] border-2 border-blue-500/50 flex items-center justify-center text-blue-400 shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-500"
                  >
                    {step.icon}
                  </motion.div>
                </div>

                <div className="hidden md:block w-[45%]" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessTimeline;