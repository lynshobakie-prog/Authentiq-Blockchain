import React from 'react';

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

export default BackgroundMotion;