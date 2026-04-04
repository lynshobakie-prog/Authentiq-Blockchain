import React, { useEffect } from 'react';
// تأكدي من استيراد Globe و ShieldCheck و Cpu، وشيل الأيقونات القديمة
import { ShieldCheck, Globe, Cpu } from 'lucide-react';
// استيراد مكتبة AOS والـ CSS الخاص بها
import AOS from 'aos';
import 'aos/dist/aos.css';

const VisionPage = () => {
  // تفعيل مكتبة الـ AOS عند تحميل الصفحة
  useEffect(() => {
    AOS.init({
      duration: 1000, // مدة الأنميشن (ثانية واحدة)
      once: true,     // الأنميشن يشتغل مرة واحدة بس لما ننزل
    });
  }, []);

  return (
    <div className="relative min-h-screen bg-[#06080d] overflow-hidden text-white font-sans">
      
      {/* 🌌 سكشن الـ Hero (المعتمد) */}
      <div className="relative h-[80vh] md:h-screen w-full flex items-center justify-center overflow-hidden border-b border-blue-950/30">
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-60">
            <source src="/4745ed0eec38a43cea86f373a08d179e.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#06080d]/40 via-transparent to-[#06080d]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter italic leading-none mb-6">
            Global <span className="text-blue-500 text-glow">Vision</span>
          </h1>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg md:text-2xl text-white/90 leading-relaxed font-bold italic tracking-tight drop-shadow-lg">
              "We aren't just verifying documents; we are securing the integrity of human achievements across the digital horizon."
            </p>
          </div>
        </div>
      </div>

      {/* 🚀 القسم السفلي الجديد: "الاستراتيجية المرئية" (The Visual Strategy) */}
      <div className="relative z-10 py-32 px-6">
        
        {/* عنوان السكشن بستايل احترافي (مش ضخم) */}
        <div className="max-w-7xl mx-auto mb-28 text-center" data-aos="fade-up">
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter italic mb-4">
            The Vision <span className="text-blue-500">Framework</span>
          </h2>
          <div className="h-1 w-20 bg-blue-600 mx-auto rounded-full" />
        </div>

        {/* شبكة المعلومات المطورة (3 أعمدة، كل عمود فيه صورة، عنوان، وشرح) */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          
          {[
            { 
              icon: <ShieldCheck className="text-blue-400" size={32} />, 
              title: "Unbreachable Integrity", 
              desc: "Every document becomes an unalterable cryptographic reality, protected by advanced hashing algorithms.",
              // ✅ صورة توضيحية للأمان (الكرت الإلكتروني المقفل)
              img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop" 
            },
            { 
              icon: <Globe className="text-emerald-400" size={32} />, 
              title: "Borderless Trust Network", 
              desc: "Eliminating the need for middleman. We architect a decentralized world where verification is peer-to-peer, global, and instant.",
              // ✅ صورة توضيحية للشبكة العالمية (كوكب رقمي)
              img: "https://images.unsplash.com/photo-1581091215367-9b6c00b3035a?q=80&w=600&auto=format&fit=crop" 
            },
            { 
              icon: <Cpu className="text-blue-500" size={32} />, 
              title: "Instant Verification Engine", 
              desc: "Reducing process time from weeks to seconds. Our core engine provides a fraud-proof digital handshake with intelligent Neural Technology.",
              // ✅ صورة توضيحية للمعالجة (الذكاء الاصطناعي/الكمبيوتر)
              img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=600&auto=format&fit=crop" 
            }
          ].map((pillar, index) => (
            // ✅ هنا نضيف الأنميشنaos على كل كرت
            <div 
              key={index} 
              className="p-10 border border-white/5 hover:border-blue-500/20 hover:bg-blue-600/5 transition-all duration-500 overflow-hidden"
              style={{ clipPath: 'polygon(0 0, 92% 0, 100% 12%, 100% 100%, 8% 100%, 0 88%)' }}
              // أنميشن السلايد لأعلى (Fade-in Up)
              data-aos="fade-up" 
              // تأخير بسيط لكل كرت عشان يظهروا واحد ورا التاني
              data-aos-delay={index * 150} 
            >
              
              {/* ✅ الصورة التوضيحية (بمقاس محدد وجميل) */}
              <div className="mb-8 w-full h-48 overflow-hidden rounded-xl border border-white/5">
                <img 
                    src={pillar.img} 
                    alt={pillar.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    // إذا الصورة مش واضحة تقدري تزيدي الـ filter لـ grayscale(1)
                />
              </div>

              {/* الأيقونة الصغيرة فوق العنوان */}
              <div className="mb-4">{pillar.icon}</div>

              {/* العنوان (حجم معقول وفخم) */}
              <h3 className="text-2xl font-bold text-white uppercase italic mb-3 tracking-tight">{pillar.title}</h3>

              {/* الشرح (نص واحد فرعي، بخط صغير وواضح) */}
              <p className="text-sm text-white/50 leading-relaxed font-medium">{pillar.desc}</p>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default VisionPage;