import React from 'react';
import { Users, X } from 'lucide-react';

const EntityRow = ({ name, type, onApprove, onReject }) => (
    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-all border border-transparent hover:border-slate-200 group">
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-blue-600 shadow-sm font-bold text-xs">
                {name && name !== "Unknown" ? name.charAt(0).toUpperCase() : '?'}
            </div>
            <div>
                <p className="font-bold text-slate-800">{name || "Unknown"}</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">{type}</p>
            </div>
        </div>
        <div className="flex gap-2"> 
            <button 
        onClick={onApprove}
        className="px-4 py-1.5 bg-white text-blue-600 border border-slate-200 rounded-lg text-xs font-bold hover:bg-blue-600 hover:text-white transition-all shadow-sm"
    >
        Approve
            </button>

    {/* زر الرفض */}
    <button 
        onClick={onReject}
        className="p-1.5 bg-white text-rose-500 border border-slate-200 rounded-lg hover:bg-rose-500 hover:text-white transition-all shadow-sm"
        title="Reject"
    >
        <X size={16} />
    </button>
        </div>
    </div>
);

const ApprovalQueue = ({ institutions, onApprove, onReject }) => {
    return (
        <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm text-left">
            <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Users size={18} className="text-blue-600"/> Approval Queue
            </h3>
            <div className="space-y-4 text-sm max-h-[300px] overflow-y-auto pr-2">
                {institutions.length > 0 ? (
                    institutions.map((inst) => (
                        <EntityRow 
                            key={inst._id} 
                            name={inst.universityName || inst.name || inst.institutionName} 
                            type={inst.type || "Institution"} 
                            onApprove={() => onApprove(inst._id)}
                            onReject={() => onReject(inst._id)}
                        />
                    ))
                ) : (
                    <div className="text-center py-10">
                        <p className="text-slate-400 italic text-[10px] font-bold tracking-widest uppercase">No pending requests</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ApprovalQueue;
