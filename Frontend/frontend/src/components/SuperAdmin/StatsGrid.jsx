import React from 'react';
import KPICard from './KPICard';
import { FileText, Users, Globe, AlertCircle } from 'lucide-react';

const StatsGrid = ({ totalCerts, pendingCount, activeNodes, alerts }) => {
    const stats = [
        { icon: <FileText size={24} />, label: "Issued Certificates", value: totalCerts, color: "bg-blue-50 text-blue-600" },
        { icon: <Users size={24} />, label: "Pending Requests", value: pendingCount, color: "bg-amber-50 text-amber-600" },
        { icon: <Globe size={24} />, label: "Active Nodes", value: activeNodes, color: "bg-indigo-50 text-indigo-600" },
        { icon: <AlertCircle size={24} />, label: "System Alerts", value: alerts, color: "bg-rose-50 text-rose-600" }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s, i) => <KPICard key={i} {...s} />)}
        </div>
    );
};

export default StatsGrid;