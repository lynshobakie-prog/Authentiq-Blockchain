import React from 'react';
import { UserMinus, GraduationCap, Globe } from 'lucide-react';

const UniversityRow = ({ name, email, status, date, onDeactivate }) => (
    <tr className="hover:bg-slate-50 transition-colors">
        <td className="px-8 py-5">
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 border border-indigo-100">
                    <GraduationCap size={18} />
                </div>
                <span className="text-slate-900 font-bold">{name || "Unnamed University"}</span>
            </div>
        </td>
        <td className="px-8 py-5 text-slate-500 font-medium">{email}</td>
        <td className="px-8 py-5">
            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                status === 'deactivated' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'
            }`}>
                {status === 'deactivated' ? 'Deactivated' : 'Active'}
            </span>
        </td>
        <td className="px-8 py-5 text-slate-400 text-xs">{new Date(date).toLocaleDateString()}</td>
        <td className="px-8 py-5 text-center flex justify-center gap-2">
            
            <button 
                onClick={onDeactivate}
                className="p-2 text-slate-300 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-all group"
                title="Toggle Account Status"
            >
                <UserMinus size={18} className="group-hover:scale-110 transition-transform" />
            </button>
        </td>
    </tr>
);

// حل الخطأ: أضفنا onStatusChange هنا لتستقبل الدالة من الـ Dashboard
const UniversitiesTable = ({ universities, searchQuery, onStatusChange }) => {
    const filteredUniversities = (universities || []).filter((uni) => {
        const query = (searchQuery || "").toLowerCase();
        return uni.fullName?.toLowerCase().includes(query);
    });

    return (
        <div className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden animate-in fade-in shadow-sm">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white">
                <div>
                    <h3 className="font-black text-slate-800 uppercase text-sm tracking-tight">Registered Universities</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Manage academic partners</p>
                </div>
                <span className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-xs font-black border border-indigo-100">
                    TOTAL: {filteredUniversities.length}
                </span>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50/50 text-slate-400 font-bold uppercase text-[10px] tracking-[0.15em]">
                        <tr>
                            <th className="px-8 py-4">University Name</th>
                            <th className="px-8 py-4">Contact Email</th>
                            <th className="px-8 py-4">Status</th>
                            <th className="px-8 py-4">Joined Date</th>
                            <th className="px-8 py-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filteredUniversities.length > 0 ? (
                            filteredUniversities.map((uni) => (
                                <UniversityRow 
                                    key={uni._id}
                                    name={uni.fullName}
                                    email={uni.email}
                                    status={uni.status} 
                                    date={uni.createdAt} 
                                    // حل الخطأ: تمرير الدالة للـ Row
                                    onDeactivate={() => onStatusChange(uni._id, uni.status)}
                                />
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="px-8 py-20 text-center">
                                    <div className="flex flex-col items-center gap-2 opacity-40">
                                        <Globe size={40} className="text-slate-300" />
                                        <p className="text-slate-500 font-medium italic">
                                            {searchQuery ? `No universities found for "${searchQuery}"` : "No registered universities found."}
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UniversitiesTable;