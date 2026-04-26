import React from 'react';
import { 
  ShieldCheck, 
  LayoutDashboard, 
  Building2, 
  Globe, 
  Users, 
  Settings, 
  LogOut 
} from 'lucide-react';

// مكون فرعي للعناصر داخل القائمة
const SideItem = ({ icon, label, active, onClick }) => (
    <button 
        onClick={onClick}
        className={`flex items-center gap-3 w-full p-3 rounded-xl transition-all duration-200 ${
            active 
            ? 'bg-blue-600 text-white shadow-lg' 
            : 'text-slate-400 hover:bg-slate-800 hover:text-white'
        }`}
    >
        {icon}
        <span className="text-sm font-semibold">{label}</span>
    </button>
);

const Sidebar = ({ activeTab, setActiveTab, onLogout }) => {
    return (
        <aside className="w-72 bg-[#0F172A] flex flex-col shadow-2xl h-screen sticky top-0">
            <div className="p-8 mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                        <ShieldCheck size={24} />
                    </div>
                    <span className="text-xl font-bold text-white tracking-tight uppercase">Authentiq</span>
                </div>
            </div>

            <nav className="flex-1 px-4 space-y-1">
                <SideItem 
                    icon={<LayoutDashboard size={19}/>} 
                    label="Dashboard" 
                    active={activeTab === 'dashboard'} 
                    onClick={() => setActiveTab('dashboard')} 
                />
                <SideItem 
                    icon={<Building2 size={19}/>} 
                    label="Universities" 
                    active={activeTab === 'universities'} 
                    onClick={() => setActiveTab('universities')} 
                />
                <SideItem 
                    icon={<Globe size={19}/>} 
                    label="Companies & Institutions" 
                    active={activeTab === 'companies'} 
                    onClick={() => setActiveTab('companies')} 
                />
                <SideItem 
                    icon={<Users size={19}/>} 
                    label="Pending Requests" 
                    active={activeTab === 'pending'} 
                    onClick={() => setActiveTab('pending')} 
                />
                <SideItem 
                    icon={<Settings size={19}/>} 
                    label="Settings" 
                    active={activeTab === 'settings'} 
                    onClick={() => setActiveTab('settings')} 
                />
            </nav>

            <div className="p-6 border-t border-slate-800">
                <button 
                    onClick={onLogout}
                    className="flex items-center gap-3 w-full p-3 text-slate-400 hover:text-rose-500 transition-colors text-sm font-semibold"
                >
                    <LogOut size={18} /> Logout
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;