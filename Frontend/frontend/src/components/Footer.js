/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Twitter, Linkedin, Mail, ShieldCheck } from 'lucide-react';

const Footer = () => {
  // ستايل الخط الموحد
  const cabinetStyle = { fontFamily: "'Cabinet Grotesk', sans-serif" };

  return (
    <footer className="relative mt-20 border-t border-white/5 bg-[#0f1115] py-16 overflow-hidden" style={cabinetStyle}>
      {/* خط الإضاءة العلوي الرقيق */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* العمود الأول: اللوجو المحدث */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-blue-600 p-1 rounded-md">
                <ShieldCheck className="text-white" size={20} />
              </div>
              <span className="text-xl font-[900] tracking-tighter text-white uppercase italic">
                AUTHENTIQ
              </span>
            </div>
            <p className="text-gray-500 text-[12px] font-[700] leading-relaxed uppercase">
              Securing the future of academic achievements through blockchain innovation.
            </p>
          </div>

          {/* العمود الثاني: روابط المنصة - Uppercase & Compact */}
          <div>
            <h4 className="text-white font-[900] mb-6 text-[13px] uppercase">Platform</h4>
            <ul className="space-y-4 text-gray-500 text-[12px] font-[700] uppercase">
              <li><a href="#" className="hover:text-blue-400 transition-colors tracking-tight">How it works</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors tracking-tight">Verification</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors tracking-tight">Institutions</a></li>
            </ul>
          </div>

          {/* العمود الثالث: الشركة */}
          <div>
            <h4 className="text-white font-[900] mb-6 text-[13px] uppercase">Company</h4>
            <ul className="space-y-4 text-gray-500 text-[12px] font-[700] uppercase">
              <li><a href="#" className="hover:text-blue-400 transition-colors tracking-tight">About Us</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors tracking-tight">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors tracking-tight">Terms of Service</a></li>
            </ul>
          </div>

          {/* العمود الرابع: التواصل الاجتماعي */}
          <div>
            <h4 className="text-white font-[900] mb-6 text-[13px] uppercase">Connect</h4>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300">
                <Twitter size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300">
                <Linkedin size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300">
                <Mail size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* الحقوق السفلية */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-[10px] font-[900] uppercase">
            © {new Date().getFullYear()} Authentiq Blockchain Ecosystem.
          </p>
          <div className="flex gap-8 text-gray-600 text-[10px] font-[900] uppercase">
            <a href="#" className="hover:text-white transition-colors">Status</a>
            <a href="#" className="hover:text-white transition-colors">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;