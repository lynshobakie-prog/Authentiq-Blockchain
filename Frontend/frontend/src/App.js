/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Categories from './components/Categories'; 
import AdminDashboard from './components/AdminDashboard';
import Process from './components/Process';
import Vision from './components/Vision';
import VerifyForm from './components/VerifyForm';
import AuthModal from './components/AuthModal'; 
import BackgroundMotion from './components/BackgroundMotion';
import PathCard from './components/PathCard';
import Home from './components/Home';
import SuperAdminDashboard from './components/SuperAdminDashboard';
import UserDashboard from './components/UserDashboard';
import { Toaster, toast } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { 
  GraduationCap, Award, LogOut, AlertCircle 
} from 'lucide-react';

// مكون حماية المسارات
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    if (loading) return <div className="h-screen flex items-center justify-center bg-[#06080d] text-white">Loading...</div>;
    return isAuthenticated ? children : <Navigate to="/" />;
};

function AppContent() {
  const { login, logout, isAuthenticated: authContextLoggedIn } = useAuth();
  const [authMode, setAuthMode] = useState('login'); 
  const [view, setView] = useState('home'); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userRole, setUserRole] = useState(null); 
  const [adminType, setAdminType] = useState(null);
  const [user, setUser] = useState(null);
  
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const cabinetStyle = { fontFamily: "'Plus Jakarta Sans', sans-serif" };

  useEffect(() => {
    const forceScroll = () => {
      window.scrollTo(0, 0);
      document.body.scrollTop = 0; 
      document.documentElement.scrollTop = 0; 
    };

    forceScroll();
    const timer = setTimeout(forceScroll, 50);
    return () => clearTimeout(timer);
  }, [view]);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('token');
    if (savedUser && savedToken) {
      const userData = JSON.parse(savedUser);
      setUser(userData); 
      setIsLoggedIn(true);
      setUserRole(userData.role);
      setAdminType(userData.adminType);
      
      if (userData.role === 'superadmin') {
        setView('super-admin-dashboard');
      } else if (userData.role === 'admin') {
        setView('admin-dashboard');
      } else {
        setView('user-dashboard');
      }
    }
  }, []);

  const handleProtectedNavigation = (targetView = 'verify-main') => {
    if (isLoggedIn) {
      setView(targetView);
    } else {
      setUserRole('user');
      setAdminType(null);
      setAuthMode('login');
      setIsModalOpen(true);
    }
  };

  const openLogoutModal = () => setShowLogoutModal(true);

  const confirmLogout = () => {
    logout(); // استدعاء دالة الخروج من الـ Context
    setIsLoggedIn(false);
    setUserRole(null);
    setAdminType(null);
    setUser(null);
    setView('home'); 
    setShowLogoutModal(false);

    toast.success('Logged out successfully', {
      icon: '👋',
      style: {
        borderRadius: '12px',
        background: '#1e293b',
        color: '#fff',
      },
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#06080d] text-white selection:bg-blue-500/30 relative overflow-x-hidden" style={cabinetStyle}>
      
      <Toaster 
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '14px', 
            padding: '8px 16px', 
            color: '#fff',
            borderRadius: '12px',
            maxWidth: '300px', 
            background: 'rgba(30, 41, 59, 0.9)', 
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          },
          success: {
            iconTheme: { primary: '#10b981', secondary: '#fff' },
          },
          error: {
            iconTheme: { primary: '#ef4444', secondary: '#fff' },
          }
        }}
      />

      {view === 'admin-dashboard' ? (
        <AdminDashboard onLogout={openLogoutModal} />
      ) : view === 'super-admin-dashboard' ? (
        <SuperAdminDashboard onLogout={openLogoutModal} />
      ) : view === 'user-dashboard' ? ( 
        <UserDashboard key={view} user={user} onLogout={openLogoutModal} setView={setView} />
      ) : (
        <>
          {view !== 'process' && view !== 'vision' && <BackgroundMotion />}

          <div className="relative z-10 flex flex-col min-h-screen w-full">
            <Navbar 
              onSignInClick={() => { setIsModalOpen(true); setUserRole('user'); setAuthMode('login'); }} 
              onCategoriesClick={() => handleProtectedNavigation('verify-main')} 
              onUniversityClick={() => handleProtectedNavigation('verify-university')}
              onCourseClick={() => handleProtectedNavigation('verify-course')}
              onJoinUsClick={() => setView('choose-institution-type')} 
              onHomeClick={() => setView('home')}
              onProcessClick={() => setView('process')}
              onVisionClick={() => setView('vision')}
              onLogoutClick={openLogoutModal}
              isLoggedIn={isLoggedIn}
              onDashboardClick={() => {
                if (userRole === 'superadmin') setView('super-admin-dashboard');
                else if (userRole === 'admin') setView('admin-dashboard');
                else setView('user-dashboard'); 
              }}
            />
            
            <main key={view} className={`relative z-10 flex-grow w-full ${view === 'process' || view === 'vision' ? 'max-w-none' : ''}`}>
              {view === 'home' && (
                <Home onStart={() => handleProtectedNavigation('verify-main')} onProcess={() => setView('process')} />
              )}

              {view === 'choose-institution-type' && (
                <section className="min-h-screen flex items-center justify-center px-6 animate-in fade-in zoom-in duration-500">
                  <div className="max-w-4xl w-full text-center">
                    <h2 className="text-5xl md:text-7xl font-[900] text-white uppercase tracking-tighter mb-16">
                      Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Path.</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                      <PathCard icon={<GraduationCap className="text-blue-400" size={28} />} title="University / College" desc="Issue academic transcripts directly to the blockchain." onClick={() => { setAdminType('university'); setUserRole('admin'); setAuthMode('signup'); setIsModalOpen(true); }} />
                      <PathCard icon={<Award className="text-emerald-400" size={28} />} title="Training Center" desc="Verify professional skills and course completion certificates." onClick={() => { setAdminType('institution'); setUserRole('admin'); setAuthMode('signup'); setIsModalOpen(true); }} />
                    </div>
                  </div>
                </section>
              )}

              {view === 'verify-main' && <Categories onSelect={(id) => setView(id === 'university' ? 'verify-university' : 'verify-course')} />}
              {view === 'verify-university' && <VerifyForm title="University Degree Verification" type="university" onBack={() => setView('verify-main')} />}
              {view === 'verify-course' && <VerifyForm title="Professional Certificate Verification" type="course" onBack={() => setView('verify-main')} />}
              {view === 'process' && <div className="w-full"><Process onNext={() => setView('vision')} /></div>}
              {view === 'vision' && <div className="w-full"><Vision /></div>}
            </main>
            
            <Footer />
          </div>
        </>
      )}

      {showLogoutModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl max-w-sm w-full text-center border border-white/20 animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center text-red-500 mx-auto mb-6 shadow-inner">
              <LogOut size={40} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">Logging Out?</h3>
            <p className="text-slate-500 text-sm mb-8 leading-relaxed">Are you sure you want to end your session?</p>
            <div className="flex gap-4">
              <button onClick={() => setShowLogoutModal(false)} className="flex-1 py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-all active:scale-95">Cancel</button>
              <button onClick={confirmLogout} className="flex-1 py-4 bg-red-500 text-white font-bold rounded-2xl shadow-lg shadow-red-200 hover:bg-red-600 transition-all active:scale-95">Yes, Logout</button>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <AuthModal 
          authMode={authMode} 
          setAuthMode={setAuthMode} 
          userRole={userRole} 
          adminType={adminType} 
          onClose={() => setIsModalOpen(false)} 
          onSuccess={(userData, token) => { 
            login(userData, token); // استخدام دالة الـ login من الـ Context
            setIsLoggedIn(true);
            setUser(userData);
            setUserRole(userData.role);
            setAdminType(userData.adminType);
            setIsModalOpen(false);

            if (userData.role === 'superadmin') setView('super-admin-dashboard'); 
            else if (userData.role === 'admin') setView('admin-dashboard');
            else setView('user-dashboard'); 

            toast.success(`Welcome back, ${userData.fullName || 'User'}!`);
          }} 
        />
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;