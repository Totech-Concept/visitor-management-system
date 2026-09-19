import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Sidebar from '../components/Sidebar';
import AdminHeader from '../components/AdminHeader';
import { Plus, Users, LogIn, LogOut, ArrowRight, CalendarCheck } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Sector } from "recharts";




// const monthlyVisitorTrend = [
//     { month: "Jan", visitors: 45 },
//     { month: "Feb", visitors: 58 },
//     { month: "Mar", visitors: 68 },
//     { month: "Apr", visitors: 62 },
//     { month: "May", visitors: 88 },
//     { month: "Jun", visitors: 98 },
//     { month: "Jul", visitors: 82 },
//     { month: "Aug", visitors: 58 },
//     { month: "Sep", visitors: 0 },
//     { month: "Oct", visitors: 0 },
//     { month: "Nov", visitors: 0 },
//     { month: "Dec", visitors: 0 },
// ];

// const visitPurposes = [
//     { name: "Training Enrollment", value: 38, color: "#2563eb" },
//     { name: "Corporate Training", value: 24, color: "#9333ea" },
//     { name: "Partnership Meeting", value: 18, color: "#059669" },
//     { name: "Accreditation Visit", value: 12, color: "#f59e0b" },
//     { name: "Course Inquiry", value: 8, color: "#ef4444" },
// ];

// const recentVisitors = [
//     {
//         id: "VIS-001",
//         name: "Adaeze Okonkwo",
//         initials: "AO",
//         avatarBg: "bg-cyan-500",
//         company: "TechBridge Nigeria",
//         purpose: "Training Enrollment",
//         date: "2026-08-07",
//         time: "09:00 AM",
//         status: "Checked In",
//     },
//     {
//         id: "VIS-002",
//         name: "Emeka Nwosu",
//         initials: "EN",
//         avatarBg: "bg-orange-500",
//         company: "Digital Solutions Ltd",
//         purpose: "Partnership Meeting",
//         date: "2026-08-07",
//         time: "10:30 AM",
//         status: "Scheduled",
//     },
//     {
//         id: "VIS-003",
//         name: "Fatima Al-Hassan",
//         initials: "FA",
//         avatarBg: "bg-pink-500",
//         company: "Federal Ministry of Education",
//         purpose: "Accreditation Visit",
//         date: "2026-08-07",
//         time: "11:00 AM",
//         status: "Checked In",
//     },
//     {
//         id: "VIS-004",
//         name: "Chidi Ezenwachi",
//         initials: "CE",
//         avatarBg: "bg-purple-500",
//         company: "Zenith Tech Academy",
//         purpose: "Course Inquiry",
//         date: "2026-08-06",
//         time: "02:00 PM",
//         status: "Checked Out",
//     },
//     {
//         id: "VIS-005",
//         name: "Ngozi Amaechi",
//         initials: "NA",
//         avatarBg: "bg-blue-500",
//         company: "First Bank PLC",
//         purpose: "Corporate Training",
//         date: "2026-08-06",
//         time: "09:30 AM",
//         status: "Checked Out",
//     },
//     {
//         id: "VIS-006",
//         name: "Tunde Afolabi",
//         initials: "TA",
//         avatarBg: "bg-blue-800",
//         company: "Lagos State Government",
//         purpose: "Official Visit",
//         date: "2026-08-05",
//         time: "10:00 AM",
//         status: "Cancelled",
//     },
//     {
//         id: "VIS-007",
//         name: "Blessing Eze",
//         initials: "BE",
//         avatarBg: "bg-blue-600",
//         company: "Independent",
//         purpose: "Training Enrollment",
//         date: "2026-08-07",
//         time: "01:00 AM",
//         status: "Scheduled",
//     },
//     {
//         id: "VIS-008",
//         name: "Mohammed Yusuf",
//         initials: "MY",
//         avatarBg: "bg-teal-500",
//         company: "Dangote Group",
//         purpose: "Corporate Training",
//         date: "2026-08-08",
//         time: "09:00 AM",
//         status: "Scheduled",
//     },
// ];

const statusStyles = {
    "Checked In": "bg-emerald-50 text-emerald-700",
    Scheduled: "bg-blue-50 text-blue-700",
    "Checked Out": "bg-slate-100 text-slate-600",
    Cancelled: "bg-red-50 text-red-600",
};

function StatusBadge({ status }) {
    return (
        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[status]}`}>
            <span className='h-1.5 w-1.5 rounded-full bg-current' />
            {status}
        </span>
    );
}

const formatDateTime = (dataValue) => {
    const date = new Date(dataValue);

    return {
        date: date.toLocaleDateString("en-CA"),
        time: date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit"
        })
    };
};


export default function Dashboard() {
    const [dashboardData, setDashboardData] = useState({
    totalVisitors: 0,
    scheduled: 0,
    checkedIn: 0,
    checkedOut: 0,
    cancelled: 0,
    todayScheduled: 0,
    monthlyTrend: [],
    visitPurposes: [],
    recentVisitors: []
});

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const stats = [
    {label: "Total Visitors", value: dashboardData.totalVisitors, icon: Users, iconBg: "bg-blue-600"},
    {label: "Scheduled", value: dashboardData.scheduled, icon: CalendarCheck, iconBg: "bg-purple-600"},
    {label: "Checked In", value: dashboardData.checkedIn, icon: LogIn, iconBg: "bg-emerald-600"},
    {label: "Checked Out", value: dashboardData.checkedOut, icon: LogOut, iconBg: "bg-orange-600"},
];

    {loading && (
    <div className="mb-4 rounded-lg bg-blue-50 px-4 py-3 text-sm text-blue-700">
        Loading dashboard data...
    </div>
    )}

    {error && (
    <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
        {error}
    </div>
    )}


    const today = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    useEffect(() => {
        const fetchDashboardStats = async () => {
            try {
                setLoading(true);
                setError("");

                const token = localStorage.getItem("token");

                const response = await fetch("http://localhost:3000/dashboard/stats",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const data = await response.json();
                if(!response.ok) {
                    throw new Error(data.message || "Failed to fetch dashboard statistics");
                }

            const avatarColors = [
    "bg-cyan-500",
    "bg-orange-500",
    "bg-pink-500",
    "bg-purple-500",
    "bg-blue-500",
    "bg-blue-800",
    "bg-blue-600",
    "bg-teal-500"
];

const formattedRecentVisitors = data.recentVisitors.map(
    (visitor, index) => {
        const nameParts = visitor.full_name.trim().split(/\s+/);

        const initials =
            nameParts.length >= 2
                ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`
                : nameParts[0].slice(0, 2);

        return {
            ...visitor,
            initials: initials.toUpperCase(),
            avatarBg: avatarColors[index % avatarColors.length]
        };
    }
);

setDashboardData({
    ...data,
    recentVisitors: formattedRecentVisitors
});
        } catch (error) {
            console.error("Dashboard error:", error);
            setError(
                error.message || "Failed to load dashboard statistics"
            );
        } finally {
            setLoading(false);
        }
    };
    fetchDashboardStats();
}, []);

  return (
    <div className='flex min-h-screen bg-slate-50'>
        <Sidebar 
            active="dashboard"
            open={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
        />


        <div className='flex-1 min-w-0 flex-col'>
            {/* Topbar */}
            <AdminHeader title="Dashboard" onMenuClick={() => setSidebarOpen(true)} />

            <main className='p-4 sm:p-8 space-y-6 max-w-7xl mx-auto w-full'>
                {/* Greeting row */}
                <div className='flex flex-col gap-4 sm:flex-row sm:items-center justify-between'>
                    <div>
                        <p className='text-xs font-semibold uppercase tracking-wide text-slate-400'>{today}</p>
                        <p className='mt-1 text-slate-600'>
                           <span className='font-semibold text-blue-500'>
                                {dashboardData.todayScheduled}
                            </span>{" "} appointments scheduled today
                        </p>
                    </div>
                    <Link
                        to="/appointment" 
                        className='inline-flex w-fit items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-medium text-white shadow-sm shadow-blue-600/20 hover:bg-blue-700 sm:text-sm sm:self-auto'
                    >
                    <Plus className='h-4 w-4' />
                    Book Appointment
                    </Link>
                </div>

                {/* Stat Cards */}
                <div className='mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4'>
                    {stats.map(({label, value, delta, icon: Icon, iconBg}) => {
                        return (
                            <div 
                            key={label}
                            className='rounded-2xl border border-slate-100 bg-white px-5 shadow-sm py-3.5'
                            >
                                <div className='flex items-start justify-between'>
                                    <p className='text-sm font-semibold text-slate-400'>{label}</p>
                                    <span
                                        className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconBg}`}
                                    >
                                        <Icon className='h-5 w-5 text-white' strokeWidth={2} />
                                    </span>
                                </div>
                                <p className='text-2xl font-semibold text-slate-900 mt-2 sm:text-xl'>{value}</p>
                                {delta && (
                                    <p className='mt-1 text-sm font-medium text-emerald-600'>{delta}</p>
                                )}
                            </div>
                        )
                    })}
                </div>

                {/* Charts */}
                <div className='mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]'>
                    <div className='rounded-2xl border border-slate-100 bg-white p-6 shadow-sm'>
                        <h3 className='text-base font-bold text-slate-900'>
                            Monthly Visitor Trend
                        </h3>
                        <p className='text-xs text-slate-400 mt-0.5'>
                            Total visitors per month in 2026
                        </p>
                        <div className='mt-4 h-72'>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={dashboardData.monthlyTrend}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke='#e2e8f0'/>
                                    <XAxis
                                        dataKey="month"
                                        tickLine={false}
                                        axisLine={false}
                                        tick={{ fill: "#94a3b8", fontSize: 12 }}
                                    />
                                    <YAxis
                                        tickLine={false}
                                        axisLine={false}
                                        tick={{ fill: "#94a3b8", fontSize: 12 }}
                                    />
                                    <Tooltip
                                        cursor={{ fill: "#f1f5f9"}}
                                        contentStyle={{ borderRadius: 8, borderColor: "#e2e8f0" }}
                                    />
                                    <Bar dataKey="visitors" fill="#2563eb" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Visit purposes */}
                    <div className='rounded-2xl border border-slate-100 bg-white p-6 shadow-sm'>
                        <h3 className='text-base font-bold text-slate-900'>Visit Purposes</h3>
                        <p className='text-xs text-slate-400 mt-0.5'>Breakdown by purpose</p>
                        <div className='mt-4 h-48'>
                            <ResponsiveContainer width="80%" height="80%">
                                <PieChart>
                                    <Pie
                                       data={dashboardData.visitPurposes} 
                                       dataKey="value"
                                       nameKey="name"
                                       innerRadius="65%"
                                       outerRadius="100%"
                                       paddingAngle={2}
                                       shape={(props) => (
                                        <Sector
                                            {...props}
                                            fill={dashboardData.visitPurposes[props.index]?.color}
                                            stroke='none' 
                                        />
                                       )}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        <ul className='mt-2 space-y-2'>
                            {dashboardData.visitPurposes.map((purpose) => (
                                <li
                                    key={purpose.name}
                                    className='flex items-center justify-between text-sm'
                                >
                                    <span className='flex items-center gap-2 text-slate-600'>
                                        <span 
                                            className='h-2.5 w-2.5 rounded-full'
                                            style={{ backgroundColor: purpose.color }}
                                        />
                                        {purpose.name}                
                                    </span>
                                    <span className='font-semibold text-slate-900'>
                                        {purpose.value}%
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Recent visitors */}
                <div className='mt-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm'>
                    <div className='flex items-center justify-between'>
                        <h2 className='text-lg font-bold text-slate-900'>
                            Recent Visitors
                        </h2>
                        <Link to="/dashboard/visitors"
                        className='inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700'
                        >
                            View all
                            <ArrowRight className='h-4 w-4' />
                        </Link>
                    </div>

                    <div className='overflow-x-auto'>
                        <table className='w-full min-w-175 text-left'>
                            <thead>
                                <tr className='border-b border-slate-100 bg-slate-50/60 text-[11px] font-semibold uppercase tracking-wide text-slate-400'>
                                    <th className='py-3 pr-4'>Visitor</th>
                                    <th className='py-3 pr-4'>Company</th>
                                    <th className='py-3 pr-4'>Purpose</th>
                                    <th className='py-3 pr-4'>Date &amp; Time</th>
                                    <th className='py-3 pr-4'>Status</th>
                                </tr>
                            </thead>
                            <tbody className='divide-y divide-slate-100 text-sm'>
                                {dashboardData.recentVisitors.map((visitor) => (
                                    <tr
                                        key={visitor.id}
                                        className='border-b border-slate-50 last:border-0'
                                    >
                                        <td className='py-4 pr-4'>
                                            <div className='flex items-center gap-3'>
                                                <span 
                                                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white ${visitor.avatarBg}`}
                                                >
                                                    {visitor.initials}</span>
                                                <div className='leading-tight'>
                                                    <p className='font-bold text-slate-800 leading-snug'>{visitor.full_name}</p>
                                                    <p className='text-xs text-slate-400 font-medium'>{visitor.id}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='py-4 pr-4 text-slate-600 font-medium'>
                                            {visitor.company}
                                        </td>
                                        <td className='py-4 pr-4 text-slate-600 font-medium'>
                                            {visitor.purpose}
                                        </td>
                                        <td className='py-4 pr-4'>
                                            {(() => {
                                                const formatted = formatDateTime(visitor.created_at);
                                                return (
                                                    <>
                                                        <p className='text-slate-900'>{formatted.time}</p>
                                                        <p className='text-xs text-slate-400 font-medium'>{formatted.date}</p>
                                                    </>
                                                );
                                            })()}
                                        </td>
                                        <td className='py-4 pr-4'>
                                            <StatusBadge status={visitor.status} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    </div>
  );
}
