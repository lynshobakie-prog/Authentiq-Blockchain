/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Categories from './components/Categories'; 
import AdminDashboard from './components/AdminDashboard';
import Process from './components/Process';
import Vision from './components/Vision';
import { 
  ShieldCheck, Search, ArrowRight, CheckCircle2, 
  X, Lock, Mail, GraduationCap, Award 
} from 'lucide-react';

/* -------------------------------------------------------------------------- */
/* 1. Background Animation Component (فصلت الخلفية لتخفيف زحمة الـ App)        */
/* -------------------------------------------------------------------------- */
const BackgroundMotion = () => (
  <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
    <div className="absolute inset-0">
      <div className="absolute top-[10%] left-[10%] w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] animate-blob" />
      <div className="absolute top-[40%] right-[10%] w-80 h-80 bg-emerald-600/15 rounded-full blur-[120px] animate-blob" style={{ animationDelay: '4s' }} />
      <div className="absolute -bottom-[10%] left-[30%] w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[150px] animate-blob" style={{ animationDelay: '8s' }} />
    </div>
    <div className="absolute inset-0 opacity-[0.07]"
      style={{ 
        backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
        backgroundSize: '45px 45px',
        maskImage: 'radial-gradient(circle at center, black, transparent 90%)',
        WebkitMaskImage: 'radial-gradient(circle at center, black, transparent 90%)'
      }}>
      <div className="absolute inset-0 animate-grid-flow" style={{ backgroundImage: 'inherit', backgroundSize: 'inherit' }} />
    </div>
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.15]" />
  </div>
);

/* -------------------------------------------------------------------------- */
/* 2. Main App Component                                                      */
/* -------------------------------------------------------------------------- */
function App() {
  const [authMode, setAuthMode] = useState('login'); 
  const [view, setView] = useState('home'); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userRole, setUserRole] = useState(null); 
  const [adminType, setAdminType] = useState(null);

  const cabinetStyle = { fontFamily: "'Cabinet Grotesk', sans-serif" };

  const handleProtectedNavigation = (targetView = 'verify-main') => {
    setUserRole('user');
    setAdminType(null);
    if (isLoggedIn) {
      setView(targetView);
    } else {
      setAuthMode('login');
      setIsModalOpen(true);

    }
  };

  const handleJoinUs = () => setView('choose-institution-type');

  return (
    <div className="min-h-screen bg-[#06080d] text-white selection:bg-blue-500/30 relative overflow-hidden" style={cabinetStyle}>
      
      <BackgroundMotion />

      <div className="relative z-10">
        <Navbar 
          onSignInClick={() => { setIsModalOpen(true); setUserRole('user'); setAuthMode('login'); }} 
          onCategoriesClick={() => handleProtectedNavigation('verify-main')} 
          onUniversityClick={() => handleProtectedNavigation('verify-university')}
          onCourseClick={() => handleProtectedNavigation('verify-course')}
          onJoinUsClick={handleJoinUs} 
          onHomeClick={() => setView('home')}
          onProcessClick={() => setView('process')}
          onVisionClick={() => setView('vision')}
        />
        
        <main className="relative z-10">
          
          {/* --- Home View --- */}
          {view === 'home' && (
            <div className="animate-in fade-in duration-700">
              {/* Hero Section */}
              <section id="home" className="relative isolate px-6 pt-32 pb-32 min-h-screen flex items-center justify-center text-center bg-transparent">
  
  {/* 🌌 التوهجات الخلفية التقنية (أزرق وزمردي فقط - Pure Tech) */}
  {/* 1. التوهج المركزي خلف العنوان (أزرق قوي - تم تعديل الحجم والشفافية ليكون أوضح) */}
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[70%] bg-blue-500/15 blur-[140px] pointer-events-none z-0 animate-pulse duration-[4000ms]" />
  
  {/* 2. توهج زمردي (Emerald) في الزاوية العلوية اليسرى */}
  <div className="absolute -top-24 -left-24 w-[50%] h-[50%] bg-emerald-500/15 blur-[120px] pointer-events-none z-0" />
  
  {/* 💡 3. التوهج الجسري (Bridge Glow) - تم تغييره للأزرق بدلاً من النهدي */}
  <div className="absolute -bottom-48 left-1/2 -translate-x-1/2 w-full h-96 bg-gradient-to-t from-transparent via-blue-600/10 to-transparent blur-[140px] pointer-events-none z-0" />

  <div className="mx-auto max-w-4xl z-10 relative">
    <div className="animate-in fade-in slide-in-from-bottom-6 duration-1000 ease-out">
      
      {/* العنوان: تم إزالة drop-shadow تماماً ليكون صافياً ونظيفاً */}
      <h1 className="text-6xl md:text-8xl font-[900] tracking-tighter text-white mb-8 uppercase leading-tight">
        Verify with <br />
        <span className="bg-gradient-to-r from-blue-400 via-emerald-300 to-emerald-400 bg-clip-text text-transparent italic">
          Confidence.
        </span>
      </h1>

      <p 
        style={cabinetStyle} 
        className="mt-10 text-[10px] md:text-xs font-black text-white/80 max-w-none mx-auto tracking-[0.4em] uppercase"
      >
        Your achievements, locked in time. Secured by the Authentiq Protocol.
      </p>

      <div className="mt-12">
        <button 
          onClick={() => handleProtectedNavigation('verify-main')}
          className="group relative bg-white text-black px-10 py-4 rounded-full font-[900] text-sm uppercase transition-all duration-300 shadow-[0_0_40px_rgba(59,130,246,0.3)] hover:scale-105 border border-white/20 overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-2">
            Get Started Now
            <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" size={18} />
          </span>
          {/* تأثير توهج إضافي خلف الزر عند الـ Hover (أزرق) */}
          <div className="absolute inset-0 rounded-full bg-blue-400 blur-xl opacity-0 group-hover:opacity-30 transition-opacity" />
        </button>
      </div>
    </div>
  </div>
</section>

              {/* About Section */}
              <section id="about" className="relative isolate px-6 py-40 overflow-hidden text-center bg-transparent -mt-20"> 
  {/* 💡 لاحظي الـ -mt-20 (Margin Top Negative) لدمج القسمين ببعض */}

  {/* 🌌 توهج علوي "جسر" يربط الهيرو بالـ About */}
  <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-full h-80 bg-gradient-to-b from-transparent via-blue-600/5 to-transparent blur-[120px] pointer-events-none z-0" />
  {/* المحتوى فوق التوهجات */}
  <div className="relative z-10 animate-in fade-in slide-in-from-bottom-10 duration-1000">
    <h2 style={cabinetStyle} className="text-5xl md:text-7xl font-[1000] tracking-[-0.04em] text-white mb-6 uppercase leading-tight">
      Everything is <br />
      <span className="bg-gradient-to-r from-blue-400 via-emerald-300 to-emerald-400 bg-clip-text text-transparent italic tracking-tighter">
        Connected.
      </span>
    </h2>
    <p style={cabinetStyle} className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-500 mb-20">
      The Infrastructure of Trust
    </p>
  </div>

  {/* شبكة البطاقات */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mt-10 mx-auto max-w-7xl px-4 relative z-10">
    
    {/* بطاقة 1: Institutional Security */}
    <div className="group relative p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/[0.05] backdrop-blur-3xl hover:bg-white/[0.04] hover:border-blue-500/50 transition-all duration-700 overflow-hidden shadow-[0_0_60px_-15px_rgba(59,130,246,0.1)]">
      {/* توهج خلفي ثابت وأقوى للبطاقة */}
      <div className="absolute inset-0 bg-blue-600/10 blur-[60px] pointer-events-none z-0" />
      {/* توهج الـ Hover القوي */}
      <div className="absolute -inset-px bg-gradient-to-br from-blue-500/40 via-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />
      
      <div className="relative z-20">
        <div className="w-14 h-14 bg-blue-500/15 rounded-2xl flex items-center justify-center mb-10 border border-blue-500/30 group-hover:scale-110 group-hover:bg-blue-500/25 transition-all duration-500">
          <ShieldCheck className="text-blue-400" size={28} />
        </div>
        <h3 style={cabinetStyle} className="text-2xl font-[900] mb-4 text-white uppercase tracking-tight">Institutional Security</h3>
        <p style={cabinetStyle} className="text-gray-400 text-[12px] font-medium uppercase leading-relaxed tracking-wider opacity-90">
          Digitize diplomas with zero risk of forgery. Blockchain backbone ensures permanent truth.
        </p>
      </div>
    </div>

    {/* بطاقة 2: Smart Credentials */}
    <div className="group relative p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/[0.05] backdrop-blur-3xl hover:bg-white/[0.04] hover:border-emerald-500/50 transition-all duration-700 overflow-hidden shadow-[0_0_60px_-15px_rgba(16,185,129,0.1)]">
      {/* توهج خلفي ثابت وأقوى */}
      <div className="absolute inset-0 bg-emerald-600/10 blur-[60px] pointer-events-none z-0" />
      {/* توهج الـ Hover القوي */}
      <div className="absolute -inset-px bg-gradient-to-br from-emerald-500/40 via-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />
      
      <div className="relative z-20">
        <div className="w-14 h-14 bg-emerald-500/15 rounded-2xl flex items-center justify-center mb-10 border border-emerald-500/30 group-hover:scale-110 group-hover:bg-emerald-500/25 transition-all duration-500">
          <CheckCircle2 className="text-emerald-400" size={28} />
        </div>
        <h3 style={cabinetStyle} className="text-2xl font-[900] mb-4 text-white uppercase tracking-tight">Smart Credentials</h3>
        <p style={cabinetStyle} className="text-gray-400 text-[12px] font-medium uppercase leading-relaxed tracking-wider opacity-90">
          Achievements stored in a decentralized personal vault. Portable and permanent.
        </p>
      </div>
    </div>

    {/* بطاقة 3: One-Click Verify */}
    <div className="group relative p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/[0.05] backdrop-blur-3xl hover:bg-white/[0.04] hover:border-purple-500/50 transition-all duration-700 overflow-hidden shadow-[0_0_60px_-15px_rgba(168,85,247,0.1)]">
      {/* توهج خلفي ثابت وأقوى */}
      <div className="absolute inset-0 bg-purple-600/10 blur-[60px] pointer-events-none z-0" />
      {/* توهج الـ Hover القوي */}
      <div className="absolute -inset-px bg-gradient-to-br from-purple-500/40 via-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />
      
      <div className="relative z-20">
        <div className="w-14 h-14 bg-purple-500/15 rounded-2xl flex items-center justify-center mb-10 border border-purple-500/30 group-hover:scale-110 group-hover:bg-purple-500/25 transition-all duration-500">
          <Search className="text-purple-400" size={28} />
        </div>
        <h3 style={cabinetStyle} className="text-xl font-[900] mb-4 text-white uppercase tracking-tight">One-Click Verify</h3>
        <p style={cabinetStyle} className="text-gray-400 text-[12px] font-medium uppercase leading-relaxed tracking-wider opacity-90">
          Verify authenticity in milliseconds. No more manual background checks.
        </p>
      </div>
    </div>

  </div>
</section>

              {/* Partners Section */}
              <div className="pb-40 pt-10">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                  <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-20" />
                  <h2 className="text-center text-[10px] font-black uppercase tracking-[0.5em] text-gray-500 mb-16 italic">Powering the Future of Academic Integrity</h2>
                  <div className="mx-auto grid max-w-lg grid-cols-4 items-center gap-x-12 gap-y-12 sm:max-w-xl sm:grid-cols-6 lg:mx-0 lg:max-w-none lg:grid-cols-5 opacity-20 grayscale hover:opacity-60 transition-all duration-1000">
                    <img alt="Partner" src="https://tailwindcss.com/plus-assets/img/logos/158x48/transistor-logo-gray-900.svg" className="max-h-8 w-full object-contain invert" />
                    <img alt="Partner" src="https://tailwindcss.com/plus-assets/img/logos/158x48/reform-logo-gray-900.svg" className="max-h-8 w-full object-contain invert" />
                    <img alt="Partner" src="https://tailwindcss.com/plus-assets/img/logos/158x48/tuple-logo-gray-900.svg" className="max-h-8 w-full object-contain invert" />
                    <img alt="Partner" src="https://tailwindcss.com/plus-assets/img/logos/158x48/savvycal-logo-gray-900.svg" className="max-h-8 w-full object-contain invert" />
                    <img alt="Partner" src="https://tailwindcss.com/plus-assets/img/logos/158x48/statamic-logo-gray-900.svg" className="max-h-8 w-full object-contain invert" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* --- Join Us View --- */}
          {view === 'choose-institution-type' && (
            <section className="min-h-screen flex items-center justify-center px-6 animate-in fade-in zoom-in duration-500">
              <div className="max-w-4xl w-full">
                <div className="text-center mb-16">
                  <span className="text-blue-500 font-[900] tracking-[.3em] text-[10px] uppercase block mb-4">Partner Portal</span>
                  <h2 className="text-5xl md:text-7xl font-[900] text-white uppercase tracking-tighter">Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Path.</span></h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <PathCard icon={<GraduationCap className="text-blue-400" size={28} />} title="University / College" desc="Issue academic transcripts directly to the blockchain." onClick={() => { setAdminType('university'); setUserRole('admin'); setAuthMode('signup'); setIsModalOpen(true); }} />
                  <PathCard icon={<Award className="text-emerald-400" size={28} />} title="Training Center" desc="Verify professional skills and course completion certificates." onClick={() => { setAdminType('center'); setUserRole('admin'); setAuthMode('signup'); setIsModalOpen(true); }} />
                </div>
              </div>
            </section>
          )}

          {/* --- Verification Views --- */}
          {view === 'verify-main' && (
            <div className="animate-in slide-in-from-bottom-10 duration-700">
              <Categories onSelectUniversity={() => setView('verify-university')} onSelectCourse={() => setView('verify-course')} />
            </div>
          )}
          {view === 'verify-university' && <PlaceholderView title="University Verify Form" />}
          {view === 'verify-course' && <PlaceholderView title="Course Verify Form" />}
          
          {/* --- Admin Dashboard --- */}
          {view === 'admin-dashboard' && (
            <div className="animate-in fade-in duration-700">
              <AdminDashboard />
            </div>
          )}

          {/* --- Process View --- */}
          {view === 'process' && (
            <div className="animate-in fade-in slide-in-from-bottom-5 duration-1000">
              <Process onNext={() => setView('vision')} />
            </div>
          )}

          {/* --- Vision View --- */}
          {view === 'vision' && (
            <div className="animate-in fade-in duration-1000">
              <Vision />
              <div className="text-center pb-20">
                <button onClick={() => setView('verify-main')} className="px-8 py-3 border border-blue-500/30 text-blue-400 font-black uppercase text-[10px] tracking-[0.3em] hover:bg-blue-500 hover:text-white transition-all">
                  Start Verification Now
                </button>
              </div>
            </div>
          )}
        </main>
        
        <Footer />
      </div>

      {/* --- Auth Modal --- */}
      {isModalOpen && (
        <AuthModal 
          authMode={authMode} 
          setAuthMode={setAuthMode} 
          userRole={userRole} 
          adminType={adminType} 
          onClose={() => setIsModalOpen(false)} 
          onSuccess={() => {
            setIsLoggedIn(true);
            setView(userRole === 'admin' ? 'admin-dashboard' : 'verify-main');
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. Helper Sub-Components (لتقليل كود الـ App الرئيسي)                      */
/* -------------------------------------------------------------------------- */

const FeatureCard = ({ icon, title, desc, color }) => (
  <div className="group relative p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 backdrop-blur-xl hover:bg-white/[0.05] hover:-translate-y-2 transition-all duration-500">
    <div className={`w-14 h-14 bg-${color}-500/10 rounded-2xl flex items-center justify-center mb-8 border border-${color}-500/20 group-hover:scale-110 transition-transform`}>{icon}</div>
    <h3 className="text-2xl font-[900] mb-4 text-white uppercase">{title}</h3>
    <p className="text-gray-500 text-[12px] font-bold uppercase leading-relaxed">{desc}</p>
  </div>
);

const PathCard = ({ icon, title, desc, onClick }) => (
  <button onClick={onClick} className="group relative p-12 rounded-[3rem] bg-white/[0.02] border border-white/5 hover:border-blue-500/40 transition-all text-left overflow-hidden">
    <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-8 border border-blue-500/20">{icon}</div>
    <h3 className="text-2xl font-[900] text-white mb-4 uppercase">{title}</h3>
    <p className="text-gray-500 text-[12px] font-bold uppercase mb-6 leading-relaxed">{desc}</p>
    <div className="flex items-center gap-2 text-white font-[900] text-xs uppercase">Register <ArrowRight size={16} /></div>
  </button>
);

const PlaceholderView = ({ title }) => (
  <div className="min-h-screen pt-32 text-center text-4xl font-[900] uppercase text-gray-700">{title}</div>
);

const AuthModal = ({ authMode, setAuthMode, userRole, adminType, onClose, onSuccess }) => (
  <div className="fixed inset-0 z-[999] flex items-center justify-center p-6">
    <div className="absolute inset-0 bg-black/70 backdrop-blur-lg" onClick={onClose} />
    <div className="relative w-full max-w-md border rounded-[2.5rem] p-10 shadow-2xl transition-all duration-500 bg-[#111216] border-white/10">
      <button onClick={onClose} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"><X size={24} /></button>
      <div className="text-center mb-8">
        <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${userRole === 'admin' ? 'text-blue-500' : 'text-emerald-500'}`}>
          {userRole === 'admin' ? (adminType === 'university' ? 'Academic Institution' : 'Training Center') : 'Verifier Gateway'}
        </span>
        <h3 className="text-4xl font-[900] tracking-tighter text-white mt-2 uppercase">{authMode === 'login' ? 'Welcome Back' : 'Join Us'}</h3>
      </div>
      <div className="flex gap-4 mb-8 bg-white/5 p-1.5 rounded-2xl border border-white/5">
        <button onClick={() => setAuthMode('login')} className={`flex-1 py-3 rounded-xl font-bold text-xs uppercase transition-all ${authMode === 'login' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}>Login</button>
        <button onClick={() => setAuthMode('signup')} className={`flex-1 py-3 rounded-xl font-bold text-xs uppercase transition-all ${authMode === 'signup' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}>Sign Up</button>
      </div>
      <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); onSuccess(); }}>
        {authMode === 'signup' && (
          <input name="fullName" type="text" placeholder={userRole === 'admin' ? (adminType === 'university' ? "University Name" : "Training Center Name") : "Full Name"} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white outline-none focus:border-blue-500/50 transition-all font-medium text-[15px]" required />
        )}
        <div className="relative"><Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" size={18} /><input name="email" type="email" placeholder="Email Address" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white outline-none focus:border-blue-500/50 transition-all font-medium text-[15px]" required /></div>
        <div className="relative"><Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" size={18} /><input name="password" type="password" placeholder="Password" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white outline-none focus:border-blue-500/50 transition-all font-medium text-[15px]" required /></div>
        <button type="submit" className={`w-full text-white font-black py-5 rounded-2xl uppercase tracking-[0.15em] text-[12px] transition-all mt-4 shadow-xl ${userRole === 'admin' ? 'bg-blue-600 hover:bg-blue-500 shadow-blue-900/20' : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-900/20'}`}>
          {authMode === 'login' ? 'Enter Dashboard' : 'Create Account'}
        </button>
      </form>
    </div>
  </div>
);

export default App;