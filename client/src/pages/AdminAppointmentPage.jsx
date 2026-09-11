import React, { useMemo, useState } from 'react';
import { Link } from "react-router-dom";
import { Bell, Plus, Menu, List, CalendarRange } from "lucide-react";
import Sidebar from '../components/Sidebar';
import AdminHeader from '../components/AdminHeader';

const appointments = [
  {
    id: 1,
    tab: "approved",
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
    id: 2,
    tab: "approved",
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
    id: 3,
    tab: "approved",
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
    id: 4,
    tab: "approved",
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
    id: 5,
    tab: "approved",
    name: "Seun Bakare",
    initials: "SB",
    avatarBg: "bg-cyan-500",
    company: "Flutterwave",
    purpose: "Corporate Training",
    date: "2026-08-05",
    time: "11:00 AM",
    status: "Checked Out",
  },
  {
    id: 6,
    tab: "cancelled",
    name: "Tunde Afolabi",
    initials: "TA",
    avatarBg: "bg-blue-600",
    company: "Lagos State Government",
    purpose: "Official Visit",
    date: "2026-08-05",
    time: "10:00 AM",
    status: "Cancelled",
  },
];

const tabs = [
    { key: "today", label: "Today" },
    { key: "upcoming", label: "Upcoming" },
    { key: "approved", label: "Approved" },
    { key: "cancelled", label: "Cancelled" },
];

const statusStyles = {
    "Checked In": "bg-emerald-50 text-emerald-700",
    Scheduled: "bg-blue-50 text-blue-700",
    "Checked Out": "bg-slate-100 text-slate-600",
    Cancelled: "bg-red-50 text-red-600",
};

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[status]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

export default function AdminAppointmentPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("approved");
    const [view, setView] = useState("list");

    const tabCounts = useMemo(() => {
        const counts = { today: 0, upcoming: 0, approved: 0, cancelled: 0 };
        appointments.forEach((appt) => {
            counts[appt.tab] = (counts[appt.tab] || 0) + 1;
        });
        return counts;
    }, [appointments]);

    const visibleAppointments = useMemo(
        () => appointments.filter((appt) => appt.tab === activeTab),
        [activeTab]
    );

  return (
    <div className='flex min-h-screen bg-slate-50'>
                <Sidebar 
                    active="appointments"
                    open={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                />
        
        
                <div className='flex-1 min-w-0 flex-col'>
                    {/* Topbar */}
                    <AdminHeader title="Appointments" onMenuClick={() => setSidebarOpen(true)} />

                    <main className='px-4 py-8 sm:px-8'>
                    {/* Tabs + list/calender toggle */}
                    <div className='flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between'>
                        <div className='flex gap-2 overflow-x-auto rounded-xl bg-slate-100 p-1.5'>
                            {tabs.map(({ key, label }) => (
                                <button
                                    key={key}
                                    type='button'
                                    onClick={() => setActiveTab(key)}
                                    className={`flex shrink-0 items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-semibold ${
                                            activeTab === key
                                            ? "bg-white text-slate-900 shadow-sm"
                                            : "text-slate-500 hover:text-slate-800"
                                        }`}
                                >
                                    {label}
                                    <span
                                        className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-xs font-bold ${
                                                activeTab === key
                                                ? "bg-blue-600 text-white"
                                                : "bg-slate-200 text-slate-500"
                                            }`}
                                    >
                                        {tabCounts[key]}
                                    </span>
                                </button>
                            ))}
                        </div>

                        <div className='flex shrink-0 gap-2'>
                            <button
                                type='button'
                                onClick={() => setView("list")}
                                className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-semibold ${
                                        view === "list"
                                        ? "bg-blue-600 text-white shadow-sm shadow-blue-600/20"
                                        : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                                    }`}
                            >
                                <List className='h-4 w-4' />
                                List
                            </button>
                            <button
                                type='button'
                                onClick={() => setView("calendar")}
                                className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-semibold ${
                                        view === "calendar"
                                        ? "bg-blue-600 text-white shadow-sm shadow-blue-600/20"
                                        : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                                    }`}
                            >
                                <CalendarRange className='h-4 w-4' />
                                Calender
                            </button>
                        </div>
                    </div>

                    {/* Appointments list */}
                    <div className='mt-6 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:p-6'>
                        {view === "calendar" ? (
                            <div className='flex flex-col items-center justify-center gap-2 py-16 text-center'>
                                <CalendarRange className='h-8 w-8 text-slate-300' />
                                <p className='font-semibold text-slate-700'>Calendar view coming soon</p>
                                <p className='text-sm text-slate-500'>Switch back to List to see appointments for now.</p>
                            </div>
                        ) : visibleAppointments.length === 0 ? (
                            <p className='py-10 text-center text-sm text-slate-500'>No appointments in this category.</p>
                        ) : (
                            <div className='divide-y divide-slate-50'>
                                {visibleAppointments.map((appt) => (
                                    <div
                                    key={appt.id}
                                    className='flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between'
                                    >
                                        <div className='flex min-w-0 items-center gap-3'>
                                            <span
                                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white ${appt.avatarBg}`}
                                            >
                                                {appt.initials}
                                            </span>
                                            <div className='min-w-0 leading-tight'>
                                                <p className='truncate font-semibold text-slate-900'>{appt.name}</p>
                                                <p className='truncate text-sm text-slate-500'>{appt.company} . {appt.purpose}</p>
                                            </div>
                                        </div>

                                        <div className='flex items-center justify-between gap-4 sm:justify-end sm:gap-6'>
                                            <div className='text-left sm:text-right'>
                                                <p className='text-sm sm:text-right text-slate-900'>{appt.date}</p>
                                                <p className='text-xs text-slate-400'>{appt.time}</p>
                                            </div>
                                            <StatusBadge status={appt.status} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    </main>
                 </div>       
        
    </div>
  );
}
