/* eslint-disable no-unused-vars */
import React from 'react';
import { ArrowRight, GraduationCap, Award } from 'lucide-react';

const Categories = ({ onSelect }) => {
  const cats = [
    {
      id: 'university',
      title: 'University Degree',
      desc: 'Verify official academic records and graduation status.',
      icon: GraduationCap,
      color: 'blue'
    },
    {
      id: 'course',
      title: 'Course Certificate',
      desc: 'Verify professional training and skill-based certifications.',
      icon: Award,
      color: 'emerald'
    }
  ];

  return (
    <section id="categories" className="py-24 px-6 bg-[#0a0a0a] min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="text-blue-500 font-black tracking-[.3em] text-[10px] uppercase block mb-4">Verification Center</span>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
            Choose your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Category.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cats.map((cat) => (
            <button 
              key={cat.id}
              onClick={() => onSelect(cat.id)} 
              className="group relative p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all duration-500 text-left overflow-hidden"
            >
              <cat.icon className="absolute -right-8 -bottom-8 w-48 h-48 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity" />
              
              <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/10 group-hover:border-${cat.color}-500/50 transition-colors`}>
                <cat.icon className={`text-white group-hover:text-${cat.color}-400 transition-colors`} size={28} />
              </div>

              <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-tighter">{cat.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-xs">{cat.desc}</p>
              
              <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                Open Form <ArrowRight size={16} />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
