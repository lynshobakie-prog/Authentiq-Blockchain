import React from 'react';
import { Search, RefreshCw, Bell } from 'lucide-react';

const NotificationItem = ({ type, text, time, onClick }) => (
    <div 
        onClick={onClick}
        className="p-3 rounded-xl hover:bg-slate-50 cursor-pointer transition-all border border-transparent hover:border-slate-100 group"
    >
        <div className="flex gap-3">
            <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${type === 'error' ? 'bg-rose-500' : 'bg-blue-500'}`} />
            <div>
                <p className="text-xs text-slate-700 font-medium group-hover:text-blue-600 transition-colors">{text}</p>
                <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-tighter">{time}</p>
            </div>
        </div>
    </div>
);

const TopHeader = ({ 
    searchQuery, 
    setSearchQuery, 
    fetchData, 
    loading, 
    showNotifications, 
    setShowNotifications, 
    pendingInstitutions, 
    totalCerts, 
    setActiveTab 
}) => {
    return (
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-10">
            {/* 1. البحث */}
            <div className="relative w-96 group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                <input 
                    type="text" 
                    placeholder="Search for Universities, Institutions..." 
                    className="w-full pl-10 pr-4 py-2 bg-slate-100 rounded-xl border-none text-sm focus:ring-2 focus:ring-blue-500/20 transition-all outline-none" 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)} 
                />
            </div>

            {/* 2. الأزرار الجانبية */}
            <div className="flex items-center gap-6">
                {/* زر التحديث */}
                <button onClick={fetchData} className={`p-2.5 text-slate-400 hover:text-blue-600 transition-all ${loading ? 'animate-spin' : ''}`}>
                    <RefreshCw size={20} />
                </button>

                {/* زر الإشعارات */}
                <div className="relative">
                    <button onClick={() => setShowNotifications(!showNotifications)} className="p-2.5 bg-slate-100 text-slate-600 rounded-xl relative hover:bg-slate-200 transition-all">
                        <Bell size={20} />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
                    </button>

                    {showNotifications && (
                        <div className="absolute right-0 mt-4 w-80 bg-white shadow-2xl rounded-2xl border border-slate-200 p-4 z-50">
                            <h4 className="font-bold text-sm mb-4">Live Notifications</h4>
                            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                                {pendingInstitutions.length > 0 ? (
                                    pendingInstitutions.map((inst) => (
                                        <NotificationItem 
                                            key={inst._id}
                                            type="error" 
                                            text={`New request: ${inst.universityName || inst.name}`} 
                                            time="Pending Approval" 
                                            onClick={() => {
                                                setActiveTab('pending'); 
                                                setShowNotifications(false);
                                            }}
                                        />
                                    ))
                                ) : (
                                    <div className="py-4 text-center">
                                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">
                                            No new notifications
                                        </p>
                                    </div>
                                )}
                                <hr className="border-slate-100 my-2" />
                                <NotificationItem 
                                    type="issue" 
                                    text={`System Sync: ${totalCerts} Total Certificates`} 
                                    time="Just Now" 
                                    onClick={() => {
                                        setActiveTab('certificate');
                                        setShowNotifications(false);
                                    }}
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* معلومات السوبر أدمن */}
                <div className="flex items-center gap-3 border-l pl-6 border-slate-200">
                    <div className="text-right">
                        <p className="text-xs font-bold text-slate-900 uppercase">Super Admin</p>
                        <p className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">{loading ? 'Syncing...' : 'System Live'}</p>
                    </div>
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 font-bold uppercase">SA</div>
                </div>
            </div>
        </header>
    );
};

export default TopHeader;