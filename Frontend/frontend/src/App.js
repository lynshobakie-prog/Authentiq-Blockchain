/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Categories from './components/Categories'; 
import AdminDashboard from './components/AdminDashboard';
import Process from './components/Process';
import Vision from './components/Vision';
import { ShieldCheck, Search, ArrowRight, CheckCircle2, X, Lock, Mail, GraduationCap, Award } from 'lucide-react';

function App() {
  const [authMode, setAuthMode] = useState('login'); 
  const [view, setView] = useState('home'); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userRole, setUserRole] = useState(null); 
  const [adminType, setAdminType] = useState(null);

  // تحديث المنطق ليدعم الوجهات المختلفة (University / Course / Main)
  const handleProtectedNavigation = (targetView = 'verify-main') => {
    setUserRole('user');
    setAdminType(null);
    if (isLoggedIn) {
      setView(targetView);
    } else {
      setAuthMode('login');
      setIsModalOpen(true);
      // ملاحظة: هنا يمكن إضافة logic لتخزين الوجهة المطلوبة بعد تسجيل الدخول
    }
  };

  const handleJoinUs = () => {
    setView('choose-institution-type');
  };

  // الستايل الموحد للخط
  const cabinetStyle = { fontFamily: "'Cabinet Grotesk', sans-serif" };

  return (
    <>
      <div className="min-h-screen bg-[#06080d] text-white selection:bg-blue-500/30 relative overflow-hidden" style={cabinetStyle}>
        
        {/* 🛡️ طبقة الموشن الحيوي (Blockchain Dynamic Motion) */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          
          {/* 1. جزيئات الضوء العائمة (Floating Orbs) - تتحرك بشكل انسيابي عشوائي */}
          <div className="absolute inset-0">
            <div className="absolute top-[10%] left-[10%] w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] animate-blob" />
            <div className="absolute top-[40%] right-[10%] w-80 h-80 bg-emerald-600/15 rounded-full blur-[120px] animate-blob" style={{ animationDelay: '4s' }} />
            <div className="absolute -bottom-[10%] left-[30%] w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[150px] animate-blob" style={{ animationDelay: '8s' }} />
          </div>

          {/* 2. تدفق الشبكة الرقمية (Moving Data Grid) - الخطوط تتحرك لتعطي إيحاء التكنولوجيا */}
          <div className="absolute inset-0 opacity-[0.07]"
            style={{ 
              backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
              backgroundSize: '45px 45px',
              maskImage: 'radial-gradient(circle at center, black, transparent 90%)',
              WebkitMaskImage: 'radial-gradient(circle at center, black, transparent 90%)'
            }}>
            <div className="absolute inset-0 animate-grid-flow" 
                 style={{ backgroundImage: 'inherit', backgroundSize: 'inherit' }} />
          </div>

          {/* 3. تأثير "الضجيج الرقمي" الناعم ليعطي ملمس التكنولوجيا */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.15]" />
        </div>

        {/* --- المحتوى الرئيسي (z-10 ليبقى فوق الحركة) --- */}
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
            {/* 1. الصفحة الرئيسية */}
            {/* 1. الصفحة الرئيسية */}
{view === 'home' && (
  <div className="animate-in fade-in duration-700">
    
    {/* أ. قسم الـ Hero */}
    <section id="home" className="relative isolate px-6 pt-14 lg:px-8 min-h-screen flex items-center justify-center text-center">
      <div className="mx-auto max-w-3xl z-10">
        <h1 className="text-6xl md:text-8xl font-[900] tracking-tighter text-white mb-8 uppercase">
          Verify with <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent italic">Confidence.</span>
        </h1>
        <p className="mt-8 text-lg md:text-xl font-bold text-gray-400 max-w-2xl mx-auto leading-relaxed tracking-tight">
          Authentiq provides a tamper-proof blockchain ecosystem for academic credentials. No more fakes, only facts.
        </p>
        <div className="mt-12">
          <button 
            onClick={() => handleProtectedNavigation('verify-main')}
            className="group relative bg-white text-black px-10 py-4 rounded-full font-[900] text-sm uppercase hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-2xl"
          >
            Get Started Now
            <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" size={18} />
          </button>
        </div>
      </div>
    </section>

    {/* ب. قسم الـ About (الآن هو الأول) */}
    <section id="about" className="relative isolate px-6 py-40 overflow-hidden text-center">
      <h2 className="text-5xl md:text-7xl font-[900] tracking-tighter text-white mb-6 uppercase">
        Everything is <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent italic font-serif text-6xl md:text-8xl leading-tight">Connected.</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mt-24 mx-auto max-w-7xl">
        <div className="group relative p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 backdrop-blur-xl hover:bg-white/[0.05] hover:-translate-y-2 transition-all duration-500">
          <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-8 border border-blue-500/20 group-hover:scale-110 transition-transform"><ShieldCheck className="text-blue-500" size={28} /></div>
          <h3 className="text-2xl font-[900] mb-4 text-white uppercase">Institutional Security</h3>
          <p className="text-gray-500 text-[12px] font-bold uppercase leading-relaxed">Digitize diplomas with zero risk of forgery. Blockchain backbone ensures permanent truth.</p>
        </div>
        <div className="group relative p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 backdrop-blur-xl hover:bg-white/[0.05] hover:-translate-y-2 transition-all duration-500">
          <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-8 border border-emerald-500/20 group-hover:scale-110 transition-transform"><CheckCircle2 className="text-emerald-500" size={28} /></div>
          <h3 className="text-2xl font-[900] mb-4 text-white uppercase">Smart Credentials</h3>
          <p className="text-gray-500 text-[12px] font-bold uppercase leading-relaxed">Achievements stored in a decentralized personal vault. Portable and permanent.</p>
        </div>
        <div className="group relative p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 backdrop-blur-xl hover:bg-white/[0.05] hover:-translate-y-2 transition-all duration-500">
          <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-8 border border-purple-500/20 group-hover:scale-110 transition-transform"><Search className="text-purple-500" size={28} /></div>
          <h3 className="text-2xl font-[900] mb-4 text-white uppercase">One-Click Verify</h3>
          <p className="text-gray-500 text-[12px] font-bold uppercase leading-relaxed">Verify authenticity in milliseconds. No more manual background checks.</p>
        </div>
      </div>
    </section>

    {/* ج. قسم اللوجوهات (خاتمة الصفحة الرئيسية) */}
    <div className="pb-40 pt-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-20" />
        <h2 className="text-center text-[10px] font-black uppercase tracking-[0.5em] text-gray-500 mb-16 italic">
          Powering the Future of Academic Integrity
        </h2>
        <div className="mx-auto grid max-w-lg grid-cols-4 items-center gap-x-12 gap-y-12 sm:max-w-xl sm:grid-cols-6 lg:mx-0 lg:max-w-none lg:grid-cols-5 opacity-20 grayscale hover:opacity-60 transition-all duration-1000">
          <img alt="Partner" src="https://tailwindcss.com/plus-assets/img/logos/158x48/transistor-logo-gray-900.svg" className="col-span-2 max-h-8 w-full object-contain lg:col-span-1 invert" />
          <img alt="Partner" src="https://tailwindcss.com/plus-assets/img/logos/158x48/reform-logo-gray-900.svg" className="col-span-2 max-h-8 w-full object-contain lg:col-span-1 invert" />
          <img alt="Partner" src="https://tailwindcss.com/plus-assets/img/logos/158x48/tuple-logo-gray-900.svg" className="col-span-2 max-h-8 w-full object-contain lg:col-span-1 invert" />
          <img alt="Partner" src="https://tailwindcss.com/plus-assets/img/logos/158x48/savvycal-logo-gray-900.svg" className="col-span-2 max-h-8 w-full object-contain lg:col-span-1 invert" />
          <img alt="Partner" src="https://tailwindcss.com/plus-assets/img/logos/158x48/statamic-logo-gray-900.svg" className="col-span-2 max-h-8 w-full object-contain lg:col-span-1 invert" />
        </div>
      </div>
    </div>
  </div>
)}

            {/* --- 2. صفحة Join Us --- */}
            {view === 'choose-institution-type' && (
              <section className="min-h-screen flex items-center justify-center px-6 animate-in fade-in zoom-in duration-500">
                <div className="max-w-4xl w-full">
                  <div className="text-center mb-16">
                    <span className="text-blue-500 font-[900] tracking-[.3em] text-[10px] uppercase block mb-4">Partner Portal</span>
                    <h2 className="text-5xl md:text-7xl font-[900] text-white uppercase tracking-tighter">Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Path.</span></h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <button onClick={() => { setAdminType('university'); setUserRole('admin'); setAuthMode('signup'); setIsModalOpen(true); }}
                      className="group relative p-12 rounded-[3rem] bg-white/[0.02] border border-white/5 hover:border-blue-500/40 transition-all text-left overflow-hidden">
                      <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-8 border border-blue-500/20"><GraduationCap className="text-blue-400" size={28} /></div>
                      <h3 className="text-2xl font-[900] text-white mb-4 uppercase">University / College</h3>
                      <p className="text-gray-500 text-[12px] font-bold uppercase mb-6 leading-relaxed">Issue academic transcripts directly to the blockchain.</p>
                      <div className="flex items-center gap-2 text-white font-[900] text-xs uppercase">Register <ArrowRight size={16} /></div>
                    </button>
                    <button onClick={() => { setAdminType('center'); setUserRole('admin'); setAuthMode('signup'); setIsModalOpen(true); }}
                      className="group relative p-12 rounded-[3rem] bg-white/[0.02] border border-white/5 hover:border-emerald-500/40 transition-all text-left overflow-hidden">
                      <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-8 border border-emerald-500/20"><Award className="text-emerald-400" size={28} /></div>
                      <h3 className="text-2xl font-[900] text-white mb-4 uppercase">Training Center</h3>
                      <p className="text-gray-500 text-[12px] font-bold uppercase mb-6 leading-relaxed">Verify professional skills and course completion certificates.</p>
                      <div className="flex items-center gap-2 text-white font-[900] text-xs uppercase">Register <ArrowRight size={16} /></div>
                    </button>
                  </div>

                </div>
              </section>
            )}

            {/* --- 3. صفحات الـ Verify --- */}
            {view === 'verify-main' && (
              <div className="animate-in slide-in-from-bottom-10 duration-700">
                <Categories onSelectUniversity={() => setView('verify-university')} onSelectCourse={() => setView('verify-course')} />
              </div>
            )}
            {view === 'verify-university' && ( <div className="min-h-screen pt-32 text-center text-4xl font-[900] uppercase text-gray-700">University Verify Form</div> )}
            {view === 'verify-course' && ( <div className="min-h-screen pt-32 text-center text-4xl font-[900] uppercase text-gray-700">Course Verify Form</div> )}

            {view === 'admin-dashboard' && (
              <div className="animate-in fade-in duration-700">
                <AdminDashboard />
              </div>
            )}

            {/* --- 3. صفحات الـ Verify --- */}
{view === 'verify-main' && (
  <div className="animate-in slide-in-from-bottom-10 duration-700">
    <Categories onSelectUniversity={() => setView('verify-university')} onSelectCourse={() => setView('verify-course')} />
  </div>
)}

{/* --- 4. صفحة الـ Process --- */}
{view === 'process' && (
  <div className="animate-in fade-in slide-in-from-bottom-5 duration-1000">
    {/* مررنا onNext عشان الزر اللي داخل المكون يشتغل وينقلك للرؤية */}
    <Process onNext={() => setView('vision')} />
  </div>
)}

{/* --- 5. صفحة الـ Vision --- */}
{view === 'vision' && (
  <div className="animate-in fade-in duration-1000">
    <Vision />
    {/* زر اختياري للرجوع أو البدء بالتوثيق */}
    <div className="text-center pb-20">
       <button 
         onClick={() => setView('verify-main')} 
         className="px-8 py-3 border border-blue-500/30 text-blue-400 font-black uppercase text-[10px] tracking-[0.3em] hover:bg-blue-500 hover:text-white transition-all"
       >
         Start Verification Now
       </button>
    </div>
  </div>
)}
          </main>
          
          <Footer />
        </div>
      </div>

      {/* --- 4. المودال الموحد --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-lg" onClick={() => setIsModalOpen(false)} />
          <div className={`relative w-full max-w-md border rounded-[2.5rem] p-10 shadow-2xl transition-all duration-500 bg-[#111216] border-white/10`}>
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors">
              <X size={24} />
            </button>
            <div className="text-center mb-8">
              <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${userRole === 'admin' ? 'text-blue-500' : 'text-emerald-500'}`}>
                {userRole === 'admin' ? (adminType === 'university' ? 'Academic Institution' : 'Training Center') : 'Verifier Gateway'}
              </span>
              <h3 className="text-4xl font-[900] tracking-tighter text-white mt-2 uppercase">
                {authMode === 'login' ? 'Welcome Back' : 'Join Us'}
              </h3>
            </div>
            <div className="flex gap-4 mb-8 bg-white/5 p-1.5 rounded-2xl border border-white/5">
              <button onClick={() => setAuthMode('login')} className={`flex-1 py-3 rounded-xl font-bold text-xs uppercase transition-all ${authMode === 'login' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}>Login</button>
              <button onClick={() => setAuthMode('signup')} className={`flex-1 py-3 rounded-xl font-bold text-xs uppercase transition-all ${authMode === 'signup' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}>Sign Up</button>
            </div>
            <form className="space-y-5" onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const email = formData.get('email');
                const password = formData.get('password');
                const fullName = formData.get('fullName');
                if (!email || !password) { alert("Please fill in all fields"); return; }
                if (userRole === 'admin') { setIsLoggedIn(true); setView('admin-dashboard'); } 
                else { setIsLoggedIn(true); setView('verify-main'); }
                setIsModalOpen(false);
              }}>
              {authMode === 'signup' && (
                <input name="fullName" type="text" placeholder={userRole === 'admin' ? (adminType === 'university' ? "University Name" : "Training Center Name") : "Full Name"} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white outline-none focus:border-blue-500/50 transition-all font-medium text-[15px]" required />
              )}
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input name="email" type="email" placeholder="Email Address" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white outline-none focus:border-blue-500/50 transition-all font-medium text-[15px]" required />
              </div>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input name="password" type="password" placeholder="Password" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white outline-none focus:border-blue-500/50 transition-all font-medium text-[15px]" required />
              </div>
              <button type="submit" className={`w-full text-white font-black py-5 rounded-2xl uppercase tracking-[0.15em] text-[12px] transition-all mt-4 shadow-xl ${userRole === 'admin' ? 'bg-blue-600 hover:bg-blue-500 shadow-blue-900/20' : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-900/20'}`}>
                {authMode === 'login' ? 'Enter Dashboard' : 'Create Account'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default App;