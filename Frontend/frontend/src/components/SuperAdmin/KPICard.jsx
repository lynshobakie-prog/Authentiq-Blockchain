import React from 'react';

const KPICard = ({ icon, label, value, trend, color }) => {
    return (
        <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-md transition-all group text-left">
            <div className="flex items-center gap-5">
                <div className={`w-14 h-14 ${color || 'bg-blue-50 text-blue-600'} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    {icon}
                </div>
                <div>
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">{label}</p>
                    <div className="flex items-baseline gap-2">
                        <h3 className="text-2xl font-black text-slate-900">{value}</h3>
                        {trend && <span className="text-[10px] font-bold text-emerald-500">{trend}</span>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KPICard;