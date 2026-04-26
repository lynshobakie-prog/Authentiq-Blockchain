import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { 
  LayoutDashboard, FilePlus, FileText, Search, Bell, 
  ShieldCheck, Cpu, CheckCircle, X, Printer, LogOut, 
  ChevronRight, Trash2, AlertCircle, ShieldAlert
} from 'lucide-react';
import { XAxis, Tooltip, ResponsiveContainer, AreaChart, Area, YAxis, CartesianGrid } from 'recharts';

const AdminDashboard = ({ onLogout }) => {
    // --- States ---
    const [activeTab, setActiveTab] = useState('Dashboard');
    const [adminData, setAdminData] = useState({ name: 'Loading...', role: 'Institutional Admin' });
    const [certificates, setCertificates] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [notifications, setNotifications] = useState([]); 
    const [showNotifications, setShowNotifications] = useState(false);
    const [selectedCert, setSelectedCert] = useState(null); 
    const [formData, setFormData] = useState({ studentName: '', studentId: '', major: '' });
    const [isIssuing, setIsIssuing] = useState(false);
    const [showSuccessToast, setShowSuccessToast] = useState(false);

    const fetchData = useCallback(async () => {
        try {
            // 1. جلب الشهادات من السيرفر
            const response = await axios.get('http://localhost:5000/all-certificates'); 
            setCertificates(response.data);

            // --- (التعديل الأول: القراءة من user بدل adminUser لجعل الاسم ديناميكي) ---
            const savedUser = localStorage.getItem('user');
            if (savedUser) {
                const parsedUser = JSON.parse(savedUser);
                setAdminData({
                    name: parsedUser.fullName, 
                    role: parsedUser.adminType === 'university' ? 'Academic Institution' : 'Training Center'
                });
            }

        } catch (error) {
            setCertificates([
                { id: 1, studentName: "Lin Majed", studentId: "202220512", university: "Jadara", major: "Software Engineering", verificationCode: "AQ-8821", blockchainHash: "0x71c92b...a82177f", verifications: 14, date: '2026-01' },
                { id: 2, studentName: "Sami Ahmad", studentId: "202110992", university: "Jadara", major: "Data Science", verificationCode: "AQ-9902", blockchainHash: "0x82d11c...b221", verifications: 8, date: '2026-02' }
            ]);
            
            const savedUser = localStorage.getItem('user');
            if (savedUser) {
                const parsedUser = JSON.parse(savedUser);
                setAdminData({
                    name: parsedUser.fullName,
                    role: parsedUser.adminType === 'university' ? 'Academic Institution' : 'Training Center'
                });
            }
        }
    }, []);

    const addNotification = useCallback((message, type) => {
        const newNotif = { id: Date.now(), text: message, time: "Just now", type: type };
        setNotifications(prev => [newNotif, ...prev]);
    }, []);

    useEffect(() => {
        fetchData();
        addNotification("System Secure: Connection to Blockchain nodes established.", "info");
    }, [fetchData, addNotification]);

    const handleIssueCertificate = async (e) => {
    e.preventDefault();
    setIsIssuing(true);

    try {
        const savedUser = JSON.parse(localStorage.getItem('user'));
        
        const response = await axios.post('http://localhost:5000/issue', {
            studentName: formData.studentName,
            studentId: formData.studentId,
            university: savedUser.fullName,
            major: formData.major
        });

        if (response.status === 201) {
            addNotification(`Success: Ledger Entry created for ${formData.studentName}`, 'success');
            setShowSuccessToast(true);
            setTimeout(() => setShowSuccessToast(false), 3000);
            fetchData(); 
            setFormData({ studentName: '', studentId: '', major: '' });
            setActiveTab('Manage Records');
        }
    } catch (error) { 
        console.error("Issue Error:", error);
        addNotification("Critical Error: Node synchronization failed.", "error");
    } finally { 
        setIsIssuing(false); 
    }
};

    const handleDelete = async (id, name) => {
        if (window.confirm(`Are you sure you want to revoke the certificate for ${name}?`)) {
            try {
                await axios.delete(`http://localhost:5000/certificate/${id}`);
                addNotification(`Security Alert: Certificate for ${name} has been revoked.`, 'warning');
                setCertificates(certificates.filter(c => (c._id || c.id) !== id));
            } catch (error) {
                addNotification("Error: Could not revoke certificate from server.", "error");
            }
        }
    };

    const filteredCertificates = certificates.filter(cert => 
        cert.studentName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cert.studentId?.includes(searchQuery)
    );

    const chartData = [
        { name: 'Jan', issues: certificates.filter(c => c.date === '2026-01' || !c.date).length * 2 },
        { name: 'Feb', issues: certificates.length + 2 },
        { name: 'Mar', issues: certificates.length + 5 },
        { name: 'Apr', issues: certificates.length }
    ];

    return (
        <div className="flex h-screen bg-[#f8fafc] text-slate-800 overflow-hidden font-sans">
            {/* Sidebar */}
            <aside className="w-72 bg-[#0f172a] flex flex-col z-20 shadow-2xl">
                <div className="p-8 text-left">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20"><ShieldCheck className="text-white" size={22} /></div>
                        <span className="text-2xl font-bold tracking-tight text-white italic">Authenti<span className="text-blue-400 not-italic">q</span></span>
                    </div>
                </div>
                <nav className="flex-1 px-4 space-y-1">
                    <NavItem icon={<LayoutDashboard size={20}/>} label="Dashboard" active={activeTab === 'Dashboard'} onClick={() => setActiveTab('Dashboard')} />
                    <NavItem icon={<FilePlus size={20}/>} label="Issue Certificate" active={activeTab === 'Issue Certificate'} onClick={() => setActiveTab('Issue Certificate')} />
                    <NavItem icon={<FileText size={20}/>} label="Records Ledger" active={activeTab === 'Manage Records'} onClick={() => setActiveTab('Manage Records')} />
                </nav>
                <div className="p-6 border-t border-white/5 bg-black/10">
    <button 
        onClick={onLogout} 
        className="flex items-center justify-center gap-2 w-full py-4 bg-red-500/10 hover:bg-red-500 hover:text-white text-red-400 border border-red-500/20 rounded-xl text-xs font-bold transition-all uppercase tracking-widest"
    >
        <LogOut size={16} /> Logout 
    </button>
</div>
            </aside>

            {/* Content Area */}
            <div className="flex-1 flex flex-col relative overflow-hidden">
                <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-10 z-30">
                    <div className="text-left">
                        <h1 className="text-xl font-bold text-slate-900">Welcome, <span className="text-blue-600">{adminData.name.split(' ')[0]}</span></h1>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{adminData.role}</p>
                    </div>
                    <div className="flex items-center gap-6">
                        {showSuccessToast && <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 animate-fade-in"><CheckCircle size={12}/> Ledger Updated</span>}
                        <div className="relative">
                            <button onClick={() => setShowNotifications(!showNotifications)} className="p-2.5 bg-slate-100 rounded-xl text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition-all">
                                <Bell size={20} />
                                {notifications.length > 0 && <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-white animate-bounce"></span>}
                            </button>
                            {showNotifications && (
                                <div className="absolute right-0 mt-4 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                                    <div className="p-4 border-b border-slate-100 bg-slate-50 text-left flex justify-between items-center">
                                        <div className="flex items-center gap-2 text-slate-700"><AlertCircle size={14}/> <span className="text-xs font-bold uppercase tracking-widest">System Alerts</span></div>
                                        <button onClick={() => setNotifications([])} className="text-[10px] text-blue-600 font-bold hover:underline">Clear All</button>
                                    </div>
                                    <div className="max-h-64 overflow-y-auto">
                                        {notifications.length > 0 ? notifications.map(n => (
                                            <div key={n.id} className="p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors text-left">
                                                <p className={`text-[13px] ${n.type === 'warning' ? 'text-red-600 font-bold' : 'text-slate-600'}`}>{n.text}</p>
                                                <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold">{n.time}</p>
                                            </div>
                                        )) : <div className="p-8 text-center text-slate-400 text-xs italic">No new alerts</div>}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-10">
                    <div className="max-w-6xl mx-auto">
                        {activeTab === 'Dashboard' && (
                            <div className="space-y-8 animate-in fade-in duration-500">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <StatCard title="Total Issued" value={certificates.length} change="Live Status" color="text-blue-600" />
                                    <StatCard title="Verification Hits" value={certificates.reduce((acc, c) => acc + (c.verifications || 0), 0)} change="Global Traffic" color="text-indigo-600" />
                                    <StatCard title="Security Audit" value="Secure" change="0 Flagged Logs" color="text-emerald-600" icon={<ShieldAlert size={14} className="text-emerald-600"/>} />
                                </div>

                                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-left">
                                    <div className="flex justify-between items-center mb-10">
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-900 leading-none">Credential Issuance Trend</h3>
                                            <p className="text-sm text-slate-400 mt-2">Monthly activity tracked on the blockchain</p>
                                        </div>
                                        <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl border border-slate-100 text-slate-600">
                                            <Cpu size={18} className="text-blue-500"/>
                                            <span className="text-xs font-bold font-mono tracking-tighter">AES-256 Enabled</span>
                                        </div>
                                    </div>
                                    <div className="h-64">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={chartData}>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} dy={10} />
                                                <YAxis hide />
                                                <Tooltip cursor={{stroke: '#2563eb', strokeWidth: 2}} contentStyle={{backgroundColor: '#fff', border: 'none', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                                                <Area type="monotone" dataKey="issues" stroke="#2563eb" strokeWidth={4} fillOpacity={1} fill="url(#colorIssues)" />
                                                <defs>
                                                    <linearGradient id="colorIssues" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                                    </linearGradient>
                                                </defs>
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'Issue Certificate' && (
                            <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-slate-200 p-12 shadow-sm text-left animate-in zoom-in-95">
                                <div className="mb-10 text-center">
                                    <div className="inline-block p-4 bg-blue-50 rounded-2xl text-blue-600 mb-6"><FilePlus size={32} /></div>
                                    <h2 className="text-2xl font-bold text-slate-900">Issue New Credential</h2>
                                    <p className="text-sm text-slate-400 mt-2">Authenticated Institution Ledger Protocol</p>
                                </div>
                                <form onSubmit={handleIssueCertificate} className="space-y-6">
                                    <ModernInput label="Full Name of Recipient" placeholder="e.g. Lin Majed" value={formData.studentName} onChange={(v) => setFormData({ ...formData, studentName: v })} />
                                    <div className="grid grid-cols-2 gap-6">
                                        <ModernInput label="Institutional ID" placeholder="2022XXXX" value={formData.studentId} onChange={(v) => setFormData({ ...formData, studentId: v })} />
                                        <ModernInput label="Specialization" placeholder="e.g. Software Eng." value={formData.major} onChange={(v) => setFormData({ ...formData, major: v })} />
                                    </div>
                                    <button disabled={isIssuing} className={`w-full py-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all ${isIssuing ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20 active:scale-[0.98]'}`}>
                                        {isIssuing ? 'Processing Ledger...' : 'Validate & Publish'}
                                    </button>
                                </form>
                            </div>
                        )}

                        {activeTab === 'Manage Records' && (
                            <div className="space-y-6">
                                <div className="flex justify-between items-center px-2">
                                    <div className="relative w-96 text-left group">
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                                        <input type="text" placeholder="Search by name or student ID..." className="w-full pl-12 pr-6 py-3.5 bg-white border border-slate-200 rounded-xl text-sm focus:border-blue-500 outline-none text-slate-700 transition-all shadow-sm" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                                    </div>
                                    <div className="px-4 py-2 bg-blue-50 border border-blue-100 rounded-xl text-[11px] font-bold text-blue-600 uppercase tracking-widest flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-blue-500"></div> Records: {filteredCertificates.length}
                                    </div>
                                </div>
                                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm text-left">
                                    <table className="w-full text-left">
                                        <thead className="bg-slate-50 text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                                            <tr>
                                                <th className="px-8 py-5">Credential Holder</th>
                                                <th className="px-8 py-5">Field of Study</th>
                                                <th className="px-8 py-5 text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {filteredCertificates.map((cert) => (
                                                <tr key={cert._id || cert.id} className="group hover:bg-slate-50/80 transition-colors">
                                                  <td className="px-8 py-5">
                                                    <div className="text-sm font-bold text-slate-800">{cert.studentName}</div>
                                                       <div className="text-[11px] text-slate-400 font-medium mt-0.5">ID: {cert.studentId}</div>
                                                  </td>
                                                  <td className="px-8 py-5 text-sm text-slate-600 font-medium">{cert.major}</td>
                                                  <td className="px-8 py-5 text-right flex items-center justify-end gap-2">
                                                       <button onClick={() => setSelectedCert(cert)} className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                                                         <ChevronRight size={18} />
                                                       </button>
                                                       <button onClick={() => handleDelete(cert._id || cert.id, cert.studentName)} className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                                                           <Trash2 size={18} />
                                                       </button>
                                                  </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>

            {/* Modal - Certificate View */}
            {selectedCert && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white w-full max-w-lg rounded-[2rem] border border-slate-200 p-10 text-left relative overflow-hidden shadow-2xl">
                        <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-6">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Record Metadata</h3>
                            <button onClick={() => setSelectedCert(null)} className="p-2 text-slate-400 hover:text-slate-900 transition-colors bg-slate-50 rounded-lg"><X size={20}/></button>
                        </div>
                        <div className="space-y-6 mb-10">
                            <div>
                                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1 italic">Official Holder</p>
                                <p className="text-2xl font-bold text-slate-900 tracking-tight leading-none">{selectedCert.studentName}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-8 py-6 border-y border-slate-100">
                                <div><p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Assigned ID</p><p className="text-[13px] font-bold text-slate-700">{selectedCert.studentId}</p></div>
                                <div><p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Hits</p><p className="text-[13px] font-bold text-blue-600">{selectedCert.verifications || 0} Scans</p></div>
                            </div>
                            <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 font-mono text-[10px] text-slate-500 break-all leading-relaxed">
                                <div className="text-slate-400 mb-2 font-bold uppercase flex items-center gap-2 tracking-widest">Digital Fingerprint:</div>
                                {selectedCert.blockchainHash}
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <button onClick={() => window.print()} className="flex-1 py-4 bg-slate-900 text-white font-bold rounded-xl text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-lg"><Printer size={16} /> Print Record</button>
                            <button className="flex-1 py-4 bg-white text-blue-600 border border-blue-200 font-bold rounded-xl text-xs uppercase tracking-widest hover:bg-blue-50 transition-all">Verify Node</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// --- Sub-Components ---
const NavItem = ({ icon, label, active, onClick }) => (
    <button onClick={onClick} className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl text-sm font-bold transition-all duration-300 ${active ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}>
        {icon} <span className="tracking-tight text-[11px] uppercase font-bold">{label}</span>
    </button>
);

const StatCard = ({ title, value, change, color, icon }) => (
    <div className="bg-white p-7 rounded-[1.5rem] border border-slate-200 shadow-sm text-left relative overflow-hidden group transition-all hover:shadow-md">
        <div className="flex justify-between items-start mb-4">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">{title}</p>
            {icon}
        </div>
        <div className="flex items-baseline justify-between">
            <h4 className={`text-3xl font-bold tracking-tight ${color}`}>{value}</h4>
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-slate-50 text-slate-500 border border-slate-100 uppercase italic leading-none">{change}</span>
        </div>
    </div>
);

const ModernInput = ({ label, placeholder, value, onChange }) => (
    <div className="space-y-2 text-left">
        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">{label}</label>
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full bg-white border border-slate-200 rounded-xl py-3.5 px-5 text-[13px] text-slate-700 outline-none focus:border-blue-500 transition-all font-medium" required />
    </div>
);

export default AdminDashboard;