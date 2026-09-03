import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Sidebar from '../components/Sidebar';
import { Bell, Plus, Users, CalendarDays, UserCheck, CircleX, ArrowRight, Menu } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Sector } from "recharts";


const stats = [
    {label: "Total Visitors", value: 12, delta: "+12% this week", icon: Users, iconBg: "bg-blue-600"},
    {label: "Schedule", value: 6, icon: CalendarDays, iconBg: "bg-purple-600"},
    {label: "Checked In", value: 2, icon: UserCheck, iconBg: "bg-emerald-500"},
    {label: "Checked Out", value: 3, icon: CircleX, iconBg: "bg-slate-400"},
];

const monthlyVisitorTrend = [
    { month: "Jan", visitors: 45 },
    { month: "Feb", visitors: 58 },
    { month: "Mar", visitors: 68 },
    { month: "Apr", visitors: 62 },
    { month: "May", visitors: 88 },
    { month: "Jun", visitors: 98 },
    { month: "Jul", visitors: 82 },
    { month: "Aug", visitors: 58 },
    { month: "Sep", visitors: 0 },
    { month: "Oct", visitors: 0 },
    { month: "Nov", visitors: 0 },
    { month: "Dec", visitors: 0 },
];

const visitPurposes = [
    { name: "Training Enrollment", value: 38, color: "#2563eb" },
    { name: "Corporate Training", value: 24, color: "#9333ea" },
    { name: "Partnership Meeting", value: 18, color: "#059669" },
    { name: "Accreditation Visit", value: 12, color: "#f59e0b" },
    { name: "Course Inquiry", value: 8, color: "#ef4444" },
];

const recentVisitors = [
    {
        id: "VIS-001",
        name: "Adaeze Okonkwo",
        initials: "AO",
        avatarBg: "bg-cyan-500",
        company: "TechBridge Nigeria",
        purpose: "Training Enrollment",
        date: "2026-08-07",
        time: "09:00 AM",
        status: "Checked In",
    },
    {
        id: "VIS-002",
        name: "Emeka Nwosu",
        initials: "EN",
        avatarBg: "bg-orange-500",
        company: "Digital Solutions Ltd",
        purpose: "Partnership Meeting",
        date: "2026-08-07",
        time: "10:30 AM",
        status: "Scheduled",
    },
    {
        id: "VIS-003",
        name: "Fatima Al-Hassan",
        initials: "FA",
        avatarBg: "bg-pink-500",
        company: "Federal Ministry of Education",
        purpose: "Accreditation Visit",
        date: "2026-08-07",
        time: "11:00 AM",
        status: "Checked In",
    },
    {
        id: "VIS-004",
        name: "Chidi Ezenwachi",
        initials: "CE",
        avatarBg: "bg-purple-500",
        company: "Zenith Tech Academy",
        purpose: "Course Inquiry",
        date: "2026-08-06",
        time: "02:00 PM",
        status: "Checked Out",
    },
    {
        id: "VIS-005",
        name: "Ngozi Amaechi",
        initials: "NA",
        avatarBg: "bg-blue-500",
        company: "First Bank PLC",
        purpose: "Corporate Training",
        date: "2026-08-06",
        time: "09:30 AM",
        status: "Checked Out",
    },
    {
        id: "VIS-006",
        name: "Tunde Afolabi",
        initials: "TA",
        avatarBg: "bg-blue-800",
        company: "Lagos State Government",
        purpose: "Official Visit",
        date: "2026-08-05",
        time: "10:00 AM",
        status: "Cancelled",
    },
    {
        id: "VIS-007",
        name: "Blessing Eze",
        initials: "BE",
        avatarBg: "bg-blue-600",
        company: "Independent",
        purpose: "Training Enrollment",
        date: "2026-08-07",
        time: "01:00 AM",
        status: "Scheduled",
    },
    {
        id: "VIS-008",
        name: "Mohammed Yusuf",
        initials: "MY",
        avatarBg: "bg-teal-500",
        company: "Dangote Group",
        purpose: "Corporate Training",
        date: "2026-08-08",
        time: "09:00 AM",
        status: "Scheduled",
    },
];

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
export default function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const today = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

  return (
    <div className='flex min-h-screen bg-slate-50'>
        <Sidebar 
            active="dashboard"
            open={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
        />


        <div className='flex-1 min-w-0 flex-col'>
            {/* Topbar */}
            <header className=' sticky top-0 z-30 flex items-center justify-between border-b border-slate-100 bg-white px-4 py-4 sm:px-8'>
                <div className='flex items-center gap-3'>
                    <button
                        type='button'
                        onClick={() => setSidebarOpen(true)}
                        aria-label='Open menu'
                        className='flex p-2 rounded-lg text-slate-600 lg:hidden'
                    >
                       <Menu className='h-5 w-5' /> 
                    </button>
                    <h2 className='text-lg font-bold text-slate-900'>Dashboard</h2>
                </div>
                <div className='flex items-center gap-1.5'>
                    <button
                        type='button'
                        aria-label='Notification'
                        className='relative p-2 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600'
                    >
                        <Bell className='h-5 w-5' />
                        <span className='w-1.5 h-1.5 absolute right-2 top-2 rounded-full bg-blue-600'/>
                    </button>
                    <Link 
                        to="/appointment"
                        className='inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-medium text-white shadow-sm shadow-blue-600/20 hover:bg-blue-700 sm:px-3 sm:text-sm'
                    >
                        <Plus className='h-4 w-4' />
                        <span className='hidden sm:inline'>Book Visit</span>
                    </Link>
                </div>
            </header>

            <main className='p-4 sm:p-8 space-y-6 max-w-7xl mx-auto w-full'>
                {/* Greeting row */}
                <div className='flex flex-col gap-4 sm:flex-row sm:items-center justify-between'>
                    <div>
                        <p className='text-xs font-semibold uppercase tracking-wide text-slate-400'>{today}</p>
                        <p className='mt-1 text-slate-600'>
                            <span className='font-semibold text-blue-500'>0</span>{" "}
                            visitors schedule today
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
                                <p className='text-3xl font-bold text-slate-900 mt-2'>{value}</p>
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
                                <BarChart data={monthlyVisitorTrend}>
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
                                       data={visitPurposes} 
                                       dataKey="value"
                                       nameKey="name"
                                       innerRadius="65%"
                                       outerRadius="100%"
                                       paddingAngle={2}
                                       shape={(props) => (
                                        <Sector
                                            {...props}
                                            fill={visitPurposes[props.index]?.color}
                                            stroke='none' 
                                        />
                                       )}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        <ul className='mt-2 space-y-2'>
                            {visitPurposes.map((purpose) => (
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
                                {recentVisitors.map((visitor) => (
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
                                                    <p className='font-bold text-slate-800 leading-snug'>{visitor.name}</p>
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
                                            <p className='text-slate-900'>{visitor.date}</p>
                                            <p className='text-xs text-slate-400 font-medium'>{visitor.time}</p>
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
