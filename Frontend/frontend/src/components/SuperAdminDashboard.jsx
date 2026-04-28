import React, { useState, useEffect, useCallback } from 'react';
import { 
    getPendingRequests, 
    approveInstitution, 
    getAllCertificates, 
    rejectInstitution,
    getApprovedInstitutions 
} from '../services/api';
import StatsGrid from './SuperAdmin/StatsGrid';
import Sidebar from './SuperAdmin/Sidebar';
import VerificationChart from './SuperAdmin/VerificationChart';
import ApprovalQueue from './SuperAdmin/ApprovalQueue';
import TopHeader from './SuperAdmin/TopHeader';
import InstitutionsTable from './SuperAdmin/InstitutionsTable';
import SettingsTab from './SuperAdmin/SettingsTab';
import UniversitiesTable from './SuperAdmin/UniversitiesTable';

const SuperAdminDashboard = ({ onLogout }) => {
    const [allCertificates, setAllCertificates] = useState([]);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [showNotifications, setShowNotifications] = useState(false);
    const [pendingInstitutions, setPendingInstitutions] = useState([]);
    const [approvedUniversities, setApprovedUniversities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState(""); 
    const [autoLogoutTime, setAutoLogoutTime] = useState(60); 

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const [pendingRes, certsRes, approvedRes] = await Promise.all([
                getPendingRequests().catch(() => ({ data: [] })),
                getAllCertificates().catch(() => ({ data: [] })),
                getApprovedInstitutions().catch(() => ({ data: [] })) 
            ]);

            setPendingInstitutions(pendingRes.data?.data || pendingRes.data || []);
            setAllCertificates(certsRes.data?.data || certsRes.data || []);
            setApprovedUniversities(approvedRes.data?.data || approvedRes.data || []);
        } catch (error) {
            console.error("❌ Fetch Error:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleApprove = async (id) => {
        try {
            await approveInstitution(id);
            fetchData(); 
        } catch (error) {
            alert("Approval failed!");
        }
    };

    const handleReject = async (id) => {
    if (window.confirm("Are you sure you want to reject this institution?")) {
        try {
            await rejectInstitution(id);
            fetchData(); // تحديث البيانات لحذف المؤسسة من القائمة فوراً
        } catch (error) {
            console.error("Rejection failed:", error);
            alert("Failed to reject the institution.");
        }
    }
};

    const handleStatusUpdate = async (id, currentStatus) => {
    const newStatus = currentStatus === 'deactivated' ? 'approved' : 'deactivated';
    const actionText = newStatus === 'deactivated' ? 'تعطيل' : 'إعادة تفعيل';

    if (!window.confirm(`هل أنت متأكد من ${actionText} هذا الحساب؟`)) return;

    try {
        const response = await fetch(`http://localhost:5000/api/superadmin/update-status/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ newStatus })
        });

        if (response.ok) {
            // تحديث الواجهة 
            setApprovedUniversities(prev => 
                prev.map(user => user._id === id ? { ...user, status: newStatus } : user)
            );
        } else {
            alert("فشل في تحديث الحالة");
        }
    } catch (error) {
        console.error("Status update error:", error);
        alert("حدث خطأ أثناء الاتصال بالسيرفر");
    }
};

    const chartData = [
        { name: 'Sat', val: pendingInstitutions.length * 2 }, 
        { name: 'Sun', val: pendingInstitutions.length + 5 },
        { name: 'Mon', val: allCertificates.length > 0 ? allCertificates.length : 600 },
        { name: 'Tue', val: 800 },
        { name: 'Wed', val: 500 },
        { name: 'Thu', val: 900 },
        { name: 'Fri', val: 700 },
    ];

    return (
        <div className="flex h-screen bg-[#F8FAFC] font-general antialiased text-left overflow-hidden">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={onLogout} />

            <div className="flex-1 flex flex-col overflow-hidden">
                <TopHeader 
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    fetchData={fetchData}
                    loading={loading}
                    showNotifications={showNotifications}
                    setShowNotifications={setShowNotifications}
                    pendingInstitutions={pendingInstitutions}
                    totalCerts={allCertificates?.length || 0}
                    setActiveTab={setActiveTab}
                />

                <main className="flex-1 overflow-y-auto p-10 bg-[#F8FAFC]">
                    <div className="max-w-7xl mx-auto space-y-8">

                        {activeTab === 'dashboard' && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
                                <StatsGrid 
                                    totalCerts={allCertificates?.length || 0} 
                                    pendingCount={pendingInstitutions?.length || 0} 
                                    activeNodes={12} 
                                    alerts={pendingInstitutions.length > 5 ? 1 : 0} 
                                />
                                
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {/* تمرير chartData للتشارت */}
                                    <VerificationChart data={chartData} />
                                    
                                    <ApprovalQueue 
                                        institutions={pendingInstitutions.slice(0, 3)} 
                                        onApprove={handleApprove} 
                                        onReject={handleReject}
                                    />
                                </div>
                            </div>
                        )}

                        {activeTab === 'pending' && (
                            <ApprovalQueue institutions={pendingInstitutions} onApprove={handleApprove} onReject={handleReject} />
                        )}

                        {activeTab === 'companies' && (
                           <InstitutionsTable 
                           institutions={approvedUniversities.filter(user => user.adminType === 'institution')} 
                           searchQuery={searchQuery} 
                           onStatusChange={handleStatusUpdate}
                           />
                        )}

                        {activeTab === 'universities' && (
                             <UniversitiesTable 
                             universities={approvedUniversities.filter(user => user.adminType === 'university')} 
                             searchQuery={searchQuery}
                             onStatusChange={handleStatusUpdate}
                             />
                        )}

                        {activeTab === 'settings' && (
                            <SettingsTab autoLogoutTime={autoLogoutTime} setAutoLogoutTime={setAutoLogoutTime} />
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default SuperAdminDashboard;
