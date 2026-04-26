import React from 'react';
import { ArrowRight } from 'lucide-react';

const PathCard = ({ icon, title, desc, onClick }) => (
  <button onClick={onClick} className="group relative p-12 rounded-[3rem] bg-white/[0.02] border border-white/5 hover:border-blue-500/40 transition-all text-left overflow-hidden">
    <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-8 border border-blue-500/20">{icon}</div>
    <h3 className="text-2xl font-[900] text-white mb-4 uppercase">{title}</h3>
    <p className="text-gray-500 text-[12px] font-bold uppercase mb-6 leading-relaxed">{desc}</p>
    <div className="flex items-center gap-2 text-white font-[900] text-xs uppercase">Register <ArrowRight size={16} /></div>
  </button>
);

export default PathCard;