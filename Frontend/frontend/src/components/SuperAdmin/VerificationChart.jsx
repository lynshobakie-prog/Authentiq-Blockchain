import React from 'react';
import { Activity } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, CartesianGrid, Tooltip } from 'recharts';

const VerificationChart = ({ data }) => {
    if (!data || data.length === 0) {
        return (
            <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm h-[400px] flex flex-col items-center justify-center">
                <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">Loading Chart Data...</p>
            </div>
        );
    }

    return (
        <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm text-left h-full">
            <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2 text-left">
                <Activity size={18} className="text-blue-600"/> Verification Traffic
            </h3>
            
            <div className="h-64 w-full min-h-[250px]">
                <ResponsiveContainer width="100%" height={350}> 
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                                <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis 
                            dataKey="name" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{fontSize: 12, fill: '#94a3b8'}} 
                        />
                        <Tooltip 
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        />
                        <Area 
                            type="monotone" 
                            dataKey="val" 
                            stroke="#2563eb" 
                            strokeWidth={3} 
                            fillOpacity={1} 
                            fill="url(#colorVal)" 
                            animationDuration={1500}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default VerificationChart;