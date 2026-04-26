/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { ShieldCheck, ChevronDown, Menu, X, LogIn, LogOut, LayoutDashboard } from 'lucide-react';

const Navbar = ({ 
  isLoggedIn,         
  onDashboardClick,   
  onLogoutClick,     
  onHomeClick, 
  onCategoriesClick, 
  onJoinUsClick, 
  onSignInClick, 
  onProcessClick, 
  onVisionClick 
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cabinetStyle = { fontFamily: "'Cabinet Grotesk', sans-serif" };

  return (
    <nav className="fixed top-0 w-full bg-[#0f1115]/90 backdrop-blur-md border-b border-white/5 z-[100]" style={cabinetStyle}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* 1. اللوجو */}
        <div onClick={onHomeClick} className="flex items-center gap-2 cursor-pointer group">
          <div className="bg-blue-600 p-1.5 rounded-lg group-hover:rotate-3 transition-transform duration-300">
            <ShieldCheck className="text-white" size={20} />
          </div>
          <span className="text-2xl font-[900] text-white uppercase tracking-tighter italic">
            Authentiq
          </span>
        </div>

        {/* 2. الروابط المركزية */}
        <div className="hidden md:flex items-center gap-8 text-[14px] font-[900] text-gray-400 uppercase">
          <button onClick={onHomeClick} className="hover:text-white transition-all duration-300 relative group text-gray-400">
            HOME
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </button>
          
          <div 
            className="relative group py-5"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button onClick={onCategoriesClick} className="flex items-center gap-0.5 hover:text-white transition-all duration-300 outline-none">
              VERIFY <ChevronDown size={14} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute top-[80%] left-0 w-44 bg-[#111] border border-white/10 rounded-lg shadow-2xl p-1 animate-in fade-in zoom-in-95">
                <button onClick={onCategoriesClick} className="w-full text-left px-4 py-2 hover:bg-white/5 rounded text-[11px] text-gray-400 hover:text-blue-400 font-[900] uppercase">UNIVERSITY</button>
                <button onClick={onCategoriesClick} className="w-full text-left px-4 py-2 hover:bg-white/5 rounded text-[11px] text-gray-400 hover:text-emerald-400 font-[900] uppercase">COURSES</button>
              </div>
            )}
          </div>

          <button onClick={onProcessClick} className="hover:text-white transition-all duration-300 relative group text-gray-400">
            PROCESS
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </button>

          <button onClick={onJoinUsClick} className="text-blue-500 hover:text-blue-400 transition-all duration-300 font-[900]">
            JOIN US
          </button>

          <button onClick={onVisionClick} className="hover:text-white transition-all duration-300 relative group uppercase">
            VISION
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </button>
        </div>

        {/* 3. منطقة أزرار الأكشن (Sign In أو Dashboard) */}
        <div className="hidden md:flex items-center gap-3">
          {isLoggedIn ? (
            <>
              {/* زر الداشبورد */}
              <button 
                onClick={onDashboardClick} 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-full font-[900] text-[12px] uppercase flex items-center gap-2 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all active:scale-95 shadow-lg"
              >
                <LayoutDashboard size={14} />
                DASHBOARD
              </button>
              
              {/* زر تسجيل الخروج  */}
              <button 
                onClick={onLogoutClick}
                className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                title="Sign Out"
              >
                <LogOut size={18} />
              </button>
            </>
          ) : (
            <button 
              onClick={onSignInClick} 
              className="bg-white text-black px-6 py-2 rounded-full font-[900] text-[12px] uppercase flex items-center gap-2 hover:bg-blue-600 hover:text-white transition-all active:scale-95 shadow-lg shadow-white/5"
            >
              <LogIn size={14} />
              SIGN IN
            </button>
          )}
        </div>

        {/* زر الموبايل */}
        <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;