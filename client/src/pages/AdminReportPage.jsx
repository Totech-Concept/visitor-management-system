import React, { useState } from 'react';
import { Download, TrendingUp, Users, Clock, CircleX, ArrowUp, ArrowDown, ArrowRight } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Sector } from 'recharts';
import Sidebar from '../components/Sidebar';
import AdminHeader from '../components/AdminHeader';

const stats = [
    {
        label: "Total This Month",
        value: "52",
        delta: "+8% vs last month",
        deltaColor: "text-emerald-600",
        icon: TrendingUp,
    },
    {
        label: "Avg Daily Visitors",
        value: "7.4",
        delta: "+2% vs last month",
        deltaColor: "text-emerald-600",
        icon: Users,
    },
    {
        label: "Peak Hour",
        value: "10-11 AM",
        icon: Clock,
    },
    {
        label: "Cancellations",
        value: "6",
        delta: "-3% vs last month",
        deltaColor: "text-red-600",
        icon: CircleX,
    },
];

const monthlyVisits = [
  { month: "Jan", visits: 52 },
  { month: "Feb", visits: 62 },
  { month: "Mar", visits: 68 },
  { month: "Apr", visits: 64 },
  { month: "May", visits: 90 },
  { month: "Jun", visits: 98 },
  { month: "Jul", visits: 82 },
  { month: "Aug", visits: 58 },
  { month: "Sep", visits: 0 },
  { month: "Oct", visits: 0 },
  { month: "Nov", visits: 0 },
  { month: "Dec", visits: 0 },
];
 
const visitPurposeDistribution = [
  { name: "Training Enrollment", value: 38, color: "#2563eb" },
  { name: "Corporate Training", value: 24, color: "#9333ea" },
  { name: "Partnership Meeting", value: 18, color: "#059669" },
  { name: "Accreditation Visit", value: 12, color: "#f59e0b" },
  { name: "Course Inquiry", value: 8, color: "#ef4444" },
];
 
const dailyVisitorTrend = [
  { day: "Mon", visitors: 12 },
  { day: "Tue", visitors: 18 },
  { day: "Wed", visitors: 7 },
  { day: "Thu", visitors: 13 },
  { day: "Fri", visitors: 22 },
  { day: "Sat", visitors: 7 },
  { day: "Sun", visitors: 2 },
];
 
const topVisitPurposes = [
  {
    purpose: "Training Enrollment",
    count: 20,
    share: 38,
    avgDuration: "2h 15m",
    trend: "up",
  },
  {
    purpose: "Corporate Training",
    count: 12,
    share: 24,
    avgDuration: "4h 30m",
    trend: "up",
  },
  {
    purpose: "Partnership Meeting",
    count: 9,
    share: 18,
    avgDuration: "1h 45m",
    trend: "flat",
  },
  {
    purpose: "Accreditation Visit",
    count: 6,
    share: 12,
    avgDuration: "3h 00m",
    trend: "down",
  },
  {
    purpose: "Course Inquiry",
    count: 4,
    share: 8,
    avgDuration: "1h 00m",
    trend: "down",
  },
];
 
const trendStyles = {
  up: { icon: ArrowUp, color: "text-emerald-600" },
  flat: { icon: ArrowRight, color: "text-slate-400" },
  down: { icon: ArrowDown, color: "text-red-500" },
};

function TrendIcon({ trend }) {
    const { icon: Icon, color } = trendStyles[trend];
    return <Icon className={`h-4 w-4 ${color}`} strokeWidth={2.5} />;
}

export default function AdminReportPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className='flex min-h-screen bg-slate-50'>
        <Sidebar 
            active="reports"
            open={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
        />

        <div className='flex-1 flex-col min-w-0'>
            <AdminHeader title="Reports & Analytics" onMenuClick={() => setSidebarOpen(true)} />

            <main className='px-4 py-8 sm:px-8'>
                {/* Header row */}
                <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
                    <p className='text-slate-600 text-sm'>
                        Analytics overview for <span className='font-semibold text-slate-900'>August 2026</span>
                    </p>
                    <button
                        type='button'
                        className='inline-flex w-fit items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 font-semibold text-slate-700 shadow-sm hover:bg-slate-50'
                    >
                        <Download className='h-4 w-4' />
                        Export Report
                    </button>
                </div>

                {/* Stat cards */}
                <div className='mt-6 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4'>
                    {stats.map(({ label, value, delta, deltaColor, icon: Icon }) => (
                        <div 
                        key={label}
                        className='rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5'
                        >
                            <div className='flex items-start justify-between'>
                                <p className='text-xs text-slate-500 font-medium'>{label}</p>
                                <Icon className='h-4 w-4 shrink-0 text-slate-300' strokeWidth={2} />
                            </div>
                            <p className='mt-3 text-2xl font-semibold text-slate-900 sm:text-xl'>{value}</p>
                            {delta && (
                                <p className={`mt-1 text-xs font-medium sm:text-sm ${deltaColor}`}>{delta}</p>
                            )}
                        </div>
                    ))}
                </div>

                {/* Monthly visits + purpose distribution */}
                <div className='mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]'>
                    <div className='rounded-2xl border border-slate-100 bg-white p-6 shadow-sm'>
                        <h3 className='text-base font-bold text-slate-900'>Monthly Visits - 2026</h3>
                        <p className='text-xs text-slate-500'>Total visitors recorded each month</p>
                        <div className='mt-4 h-72'>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={monthlyVisits}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke='#e2e8f0' />
                                    <XAxis
                                        dataKey='month'
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
                                        cursor={{ fill: "#f1f5f9" }}
                                        contentStyle={{ borderRadius: 8, borderColor: "#e2e8f0"}}
                                     />
                                     <Bar
                                        dataKey="visits"
                                        fill='#2563eb'
                                        radius={[4, 4, 0, 0]}
                                        barSize={32}
                                        maxBarSize={40}
                                     />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div>
                        <h3 className='text-base font-bold text-slate-900'>Visit Purpose Distribution</h3>
                        <p className='text-xs text-slate-500'>Breakdown of visit categories</p>
                        <div className='mt-6 h-64'>
                            <ResponsiveContainer width="70%" height="70%">
                                <PieChart>
                                    <Pie
                                        data={visitPurposeDistribution}
                                        dataKey="value"
                                        nameKey="name"
                                        innerRadius="65%"
                                        outerRadius="100%"
                                        paddingAngle={2}
                                        shape={(props) => (
                                            <Sector
                                                {...props}
                                                fill={visitPurposeDistribution[props.index]?.color}
                                                stroke='none'
                                             />
                                        )}
                                     />
                                     <Tooltip 
                                        contentStyle={{ borderRadius: 8, borderColor: "#e2e8f0", fontSize: 12 }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <ul className='space-y-2'>
                            {visitPurposeDistribution.map((item) => (
                                <li key={item.name} className='flex items-center justify-between text-sm'>
                                    <span className='flex items-center gap-2 text-slate-600'>
                                        <span
                                            className='h-2.5 w-2.5 rounded-full'
                                            style={{ backgroundColor: item.color }}
                                        />
                                        {item.name}
                                    </span>
                                    <span className='font-semibold text-slate-900'>{item.value}%</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Daily visitor trend */}
                <div className='mt-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm'>
                    <h3 className='text-base font-bold text-slate-900'>Daily Visitor Trend - This week</h3>
                    <p className='text-xs text-slate-500'>Number of visitors received each day</p>
                    <div className='mt-4 h-72'>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={dailyVisitorTrend}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke='#e2e8f0' />
                                <XAxis 
                                    dataKey="day"
                                    tickLine={false}
                                    axisLine={false}
                                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                                />
                                <YAxis
                                    tickLine={false}
                                    axisLine={false}
                                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                                 />
                                 <Tooltip contentStyle={{ borderRadius: 8, borderColor: "e2e8f0" }} />
                                 <Line
                                    type='monotone'
                                    dataKey="visitors"
                                    stroke='#2563eb'
                                    strokeWidth={1.5}
                                    dot={{ r:3, fill: "#2563eb", strokeWidth: 0 }}
                                    activeDot={{ r: 6 }}
                                 />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Top visit purposes */}
                <div className='mt-6 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:p-6'>
                    <h3 className='text-base font-bold text-slate-900'>Top Visit Purposes - August 2026</h3>

                    {/* Mobile/tablet: stacked cards */}
                    <div className='mt-4 space-y-3 lg:hidden'>
                        {topVisitPurposes.map((row) => (
                            <div key={row.purpose} className='rounded-xl border border-slate-100 p-4'>
                                <div className='flex items-center justify-between'>
                                    <p className='font-semibold text-slate-900'>{row.purpose}</p>
                                    <TrendIcon trend={row.trend} />
                                </div>
                                <div className='mt-3 grid grid-cols-2 gap-2 text-sm'>
                                    <div>
                                        <p className='text-xs text-slate-400 font-medium'>Count</p>
                                        <p className='text-slate-700 font-medium'>{row.count}</p>
                                    </div>
                                    <div>
                                        <p className='text-xs text-slate-400 font-medium'>Avg Duration</p>
                                        <p className='text-slate-700'>{row.avgDuration}</p>
                                    </div>
                                    <div className='col-span-2'>
                                        <p className='text-xs text-slate-400'>Share</p>
                                        <div className='mt-1 flex items-center gap-2'>
                                            <div className='bg-slate-100 h-1.5 flex-1 rounded-full'>
                                                <div 
                                                    className='h-1.5 rounded-full bg-blue-600'
                                                    style={{ width: `${row.share}%` }}
                                                />
                                            </div>
                                            <span className='text-xs font-semibold text-slate-700'>{row.share}%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Desktop: full table */}
                    <div className='mt-4 hidden overflow-x-auto md:block'>
                        <table className='w-full min-w-180 text-left'>
                            <thead>
                                <tr className='border-b border-slate-100 text-xs font-semibold uppercase tracking-wide text-slate-400'>
                                    <th className='py-3 pr-4'>Purpose</th>
                                    <th className='py-3 pr-4'>Count</th>
                                    <th className='py-3 pr-4'>% Share</th>
                                    <th className='py-3 pr-4'>Avg Duration</th>
                                    <th className='py-3 pr-4'>Trend</th>
                                </tr>
                            </thead>
                            <tbody>
                                {topVisitPurposes.map((row) => (
                                    <tr key={row.purpose} className='border-b border-slate-50 last:border-0'>
                                        <td className='py-4 pr-4 font-medium text-slate-900'>{row.purpose}</td>
                                        <td className='py-4 pr-4 text-slate-600'>{row.count}</td>
                                        <td className='py-4 pr-4'>
                                            <div className='flex items-center gap-3'>
                                                <div className='h-1.5 w-28 rounded-full bg-slate-100'>
                                                    <div
                                                        className='h-1.5 rounded-full bg-blue-600'
                                                        style={{ width: `${row.share}%`}}
                                                     />
                                                </div>
                                                <span className='text-slate-700'>{row.share}%</span>
                                            </div>
                                        </td>
                                        <td className='py-4 pr-4 text-slate-600'>{row.avgDuration}</td>
                                        <td className='py-4 pr-4'>
                                            <TrendIcon trend={row.trend} />
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
