import React, { useEffect, useMemo, useState } from 'react';
import { Link } from "react-router-dom";
import { Bell, Plus, Menu, List, CalendarRange } from "lucide-react";
import Sidebar from '../components/Sidebar';
import AdminHeader from '../components/AdminHeader';


const tabs = [
    { key: "today", label: "Today" },
    { key: "upcoming", label: "Upcoming" },
    { key: "approved", label: "Approved" },
    { key: "cancelled", label: "Cancelled" },
];

const statusStyles = {
    Confirmed: "bg-blue-50 text-blue-700",
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

function getInitials(name) {
    if (!name) return "";

    return name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
}

function formatDate(dateString) {
    if (!dateString) return "";

    const cleanDate = getCleanLocalDateString(dateString);
    const [year, month, day] = cleanDate.split("-");

    if (!year || !month || !day) return "";

    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const monthName = months[parseInt(month, 10) - 1];
    return `${monthName} ${parseInt(day, 10)}, ${year}`;
}

function getCleanLocalDateString(rawDate) {
    if (!rawDate) return "";

    if(typeof rawDate === "string") {
        return rawDate.slice(0, 10);
    }


    const d = new Date(rawDate);
    if (isNaN(d.getTime())) return String(rawDate).slice(0, 10);

    const year = d.getUTCFullYear();
    const month = String(d.getUTCMonth() + 1).padStart(2, "0");
    const day = String(d.getUTCDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

function formatTime(timeString) {
    if (!timeString) return "";

    const [hours, minutes] = timeString.split(":");
    const date = new Date();

    date.setHours(Number(hours), Number(minutes), 0, 0);

    return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
    });
}

function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

export default function AdminAppointmentPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("approved");
    const [view, setView] = useState("list");

    const [appointments, setAppointments] = useState([]);
    const [appointmentStats, setAppointmentStats] = useState({
        today: 0,
        upcoming: 0,
        confirmed: 0,
        cancelled: 0,
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchAppointmentsData = async () => {
            try {
                setLoading(true);
                setError("");

                const [appointmentsResponse, statsResponse] = await Promise.all([
                    fetch("http://localhost:3000/appointments"),
                    fetch("http://localhost:3000/appointments/stats"),
                ]);

                const appointmentsData = await appointmentsResponse.json();
                const statsData = await statsResponse.json();

                if (!appointmentsResponse.ok) {
                    throw new Error(
                        appointmentsData.message || "Failed to fetch appointments"
                    );
                }

                if (!statsResponse.ok) {
                    throw new Error(
                        statsData.message || "Failed to fetch appointment statistics"
                    );
                }

                setAppointments(
                    Array.isArray(appointmentsData) 
                    ? appointmentsData 
                    : appointmentsData.data || appointmentsData.appointments || []
                );
                setAppointmentStats(statsData);

            } catch (error) {
                console.error("Appointment page error:", error);
                setError(error.message || "Failed to load appointments");
            } finally {
                setLoading(false);
            }
        };
        
        fetchAppointmentsData();
    }, []);

    const today = getTodayDate();

    const processedAppointments = useMemo(() => {
        return appointments.map((appt) => {
            const appointmentDate = getCleanLocalDateString(appt.appointment_date);

            return {
                ...appt,
                cleanDate: appointmentDate,
                name: appt.full_name,
                initials: getInitials(appt.full_name),
                avatarBg: "bg-blue-600",
                displayDate: formatDate(appointmentDate),
                displayTime: formatTime(appt.appointment_time),
                displayStatus:
                    appt.status === "confirmed"
                        ? "Confirmed" : "Cancelled",
            };
        });
    }, [appointments]);

    const tabCounts = {
        today: Number(appointmentStats.today) || 0,
        upcoming: Number(appointmentStats.upcoming) || 0,
        approved: Number(appointmentStats.confirmed) || 0,
        cancelled: Number(appointmentStats.cancelled) || 0,
    }

    const visibleAppointments = useMemo(() => {
        return processedAppointments.filter((appt) => {
            const status = (appt.status || "").toLowerCase();


            switch (activeTab) {
                case "today":
                    return status === "confirmed" && appt.cleanDate === today;
                case "upcoming":
                    return status === "confirmed" && appt.cleanDate > today;
                case "approved":
                    return status === "confirmed";
                case "cancelled":
                    return status === "cancelled";
                default:
                    return true;
            }
        });
    }, [processedAppointments, activeTab]);

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
                    {loading ? (
                        <div className='py-10 text-center text-sm text-slate-500'>
                            Loading appointments...
                        </div>
                    ) : error ? (
                        <div className='py-10 text-center'>
                            <p className='text-sm font-medium text-red-600'>
                                {error}
                            </p>
                        </div>
                    ) : view === "calendar" ? (
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
                                                <p className='truncate font-semibold text-slate-900'>{appt.full_name}</p>
                                                <p className='truncate text-sm text-slate-500'>{appt.company} . {appt.purpose}</p>
                                            </div>
                                        </div>

                                        <div className='flex items-center justify-between gap-4 sm:justify-end sm:gap-6'>
                                            <div className='text-left sm:text-right'>
                                                <p className='text-sm sm:text-right text-slate-900'>{appt.displayDate}</p>
                                                <p className='text-xs text-slate-400'>{appt.displayTime}</p>
                                            </div>
                                            <StatusBadge status={appt.displayStatus} />
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
