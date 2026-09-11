import React, { useMemo, useState } from 'react';
import { Link } from "react-router-dom";
import { Plus, Menu, Search, Filter, Eye } from "lucide-react";
import Sidebar from '../components/Sidebar';
import AdminHeader from '../components/AdminHeader';

const visitors = [
  {
    id: "VIS-001",
    name: "Adaeze Okonkwo",
    initials: "AO",
    avatarBg: "bg-cyan-500",
    email: "adaeze@techbridge.ng",
    phone: "+234 803 456 7890",
    purpose: "Training Enrollment",
    date: "2026-08-07",
    time: "09-00 AM",
    host: "Mr. Chukwu",
    status: "Checked In",
  },
  {
    id: "VIS-002",
    name: "Emeka Nwosu",
    initials: "EN",
    avatarBg: "bg-orange-500",
    email: "emeka@digitalsol.ng",
    phone: "+234 807 234 5678",
    purpose: "Partnership Meeting",
    date: "2026-08-07",
    time: "10-30 AM",
    host: "Mrs. Adeola",
    status: "Scheduled",
  },
  {
    id: "VIS-003",
    name: "Fatima Al-Hassan",
    initials: "FA",
    avatarBg: "bg-pink-500",
    email: "fatima@fme.ng",
    phone: "+234 815 678 9012",
    purpose: "Accreditation Visit",
    date: "2026-08-07",
    time: "11-00 AM",
    host: "Director Afolabi",
    status: "Checked In",
  },
  {
    id: "VIS-004",
    name: "Chidi Ezenwachi",
    initials: "CE",
    avatarBg: "bg-purple-500",
    email: "chidi@zenithtech.ng",
    phone: "+234 801 345 6789",
    purpose: "Course Inquiry",
    date: "2026-08-06",
    time: "02-00 PM",
    host: "Ms. Adeyemi",
    status: "Checked Out",
  },
  {
    id: "VIS-005",
    name: "Ngozi Amaechi",
    initials: "NA",
    avatarBg: "bg-blue-500",
    email: "ngoz1@firstbank.ng",
    phone: "+234 803 567 8901",
    purpose: "Corporate Training",
    date: "2026-08-06",
    time: "09-30 AM",
    host: "Mr. Chukwu",
    status: "Checked Out",
  },
  {
    id: "VIS-006",
    name: "Tunde Afolabi",
    initials: "TA",
    avatarBg: "bg-blue-700",
    email: "tunde.afolabi@lasg.gov.ng",
    phone: "+234 816 789 0123",
    purpose: "Official Visit",
    date: "2026-08-05",
    time: "10-00 AM",
    host: "Director Afolabi",
    status: "Cancelled",
  },
  {
    id: "VIS-007",
    name: "Blessing Eze",
    initials: "BE",
    avatarBg: "bg-blue-600",
    email: "blessing.eze@gmail.com",
    phone: "+234 809 456 7890",
    purpose: "Training Enrollment",
    date: "2026-08-07",
    time: "01-00 AM",
    host: "Ms. Adeyemi",
    status: "Scheduled",
  },
  {
    id: "VIS-008",
    name: "Mohammed Yusuf",
    initials: "MY",
    avatarBg: "bg-teal-500",
    email: "m.yusuf@dangote.com",
    phone: "+234 802 345 6789",
    purpose: "Corporate Training",
    date: "2026-08-08",
    time: "09-00 AM",
    host: "Mr. Chukwu",
    status: "Scheduled",
  },
];

const filterTabs = ["All", "Scheduled", "Checked In", "Checked Out", "Cancelled"];

const statusStyles= {
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

export default function AdminVisitorsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [query, setQuery] = useState("");

  const filteredVisitors = useMemo(() => {
    return visitors.filter((visitor) => {
      const matchesFilter = 
        activeFilter === "All" || visitor.status === activeFilter;

        const q = query.trim().toLowerCase();
        const matchesQuery = 
          !q || 
          visitor.name.toLowerCase().includes(q) ||
          visitor.email.toLowerCase().includes(q);

          return matchesFilter && matchesQuery;
    });
  }, [activeFilter, query]);

  return (
    <div className='flex min-h-screen bg-slate-50'>
      <Sidebar 
      active="visitors"
      open={sidebarOpen}
      onClose={() => setSidebarOpen(false)}
      />

      <div className='flex-1 min-w-0 flex-col'>
        {/* Topbar */}
        <AdminHeader title="Visitors" onMenuClick={() => setSidebarOpen(true)} />

          <main className='px-4 py-8 sm:px-8'>
            {/* Search + filters */}
            <div className='flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between'>
              <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
                <div className='relative w-full sm:w-80'>
                  <Search className='pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400' />
                  <input 
                    type='text'
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder='Search visitors by name, company, or email...'
                    className='w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm
                    text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
                  />
                </div>

                <div className='flex items-center gap-2'>
                  <span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-400'>
                    <Filter className='h-4 w-4' />
                  </span>
                  <div className='flex gap-2 overflow-x-auto'>
                    {filterTabs.map((tab) => (
                      <button
                        key={tab}
                        type='button'
                        onClick={() => setActiveFilter(tab)}
                        className={`shrink-0 rounded-lg px-3.5 py-1.5 text-sm font-semibold ${activeFilter === tab
                          ? "bg-blue-600 text-white"
                          : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                          }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                type='button'
                className='inline-flex w-fit items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 hover:bg-blue-700'
              >
                <Plus className='h-4 w-4' />
                Add Visitor
              </button>
            </div>
            
            {/* Visitors list */}
            <div className='mt-6 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:p-6'>
              {filteredVisitors.length === 0 ? (
                <p className='py-10 text-center text-sm text-slate-500'>
                  No visitors match your search or filter.</p>
              ) : (
                <>
                {/* Mobile/tablet: stacked cards */}
                <div className='space-y-3 lg:hidden'>
                  {filteredVisitors.map((visitor) => (
                    <div
                      key={visitor.id}
                      className='bg-white rounded-2xl border border-slate-100 p-4 shadow-sm space-y-3'
                    >
                      <div className='flex items-start justify-between gap-2'>
                        <div className='flex items-center gap-3'>
                          <span
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white ${visitor.avatarBg}`}
                          >
                            {visitor.initials}
                          </span>
                          <div className='flex flex-col gap-2 sm:flex-row'>
                          <div>
                            <h3 className='font-semibold text-slate-900m leading-tight'>{visitor.name}</h3>
                            <p className='text-xs text-slate-400 font-medium mt-0.5'>{visitor.id}</p>
                          </div>
                          <div>
                            <StatusBadge status={visitor.status} />
                          </div>
                          </div>

                          <hr className='border-slate-100' />

                          <div className='grid grid-cols-2 gap-3 text-xs'>
                            <div>
                              <p className='text-[10px] uppercase font-bold text-slate-400'>Contact</p>
                              <p className='truncate text-slate-700 font-medium mt-0.5'>{visitor.email}</p>
                              <p className='text-slate-400 text-[11px]'>{visitor.phone}</p>
                            </div>
                            <div>
                              <p className='text-[10px] uppercase font-bold text-slate-400'>Purpose</p>
                              <p className='font-medium text-slate-700 mt-0.5'>{visitor.purpose}</p>
                            </div>
                            <div>
                              <p className='text-[10px] uppercase font-bold text-slate-400'>Host</p>
                              <p className='font-medium text-slate-700 mt-0.5'>{visitor.host}</p>
                            </div>
                            <div>
                              <p className='text-[10px] uppercase font-bold text-slate-400'>Appointment</p>
                              <p className='text-slate-700'>{visitor.date} . {visitor.time}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                  ))}
                </div>

                {/* Desktop:full table */}
                <div className='hidden overflow-x-auto lg:block'>
                  <table className='w-full min-w-225 text-left'>
                    <thead>
                      <tr className='border-b border-slate-100 text-xs font-semibold uppercase tracking-wide text-slate-400'>
                        <th className='py-3 pr-4'>Visitor</th>
                        <th className='py-3 pr-4'>Contact</th>
                        <th className='py-3 pr-4'>Purpose</th>
                        <th className='py-3 pr-4'>Appointment</th>
                        <th className='py-3 pr-4'>Host</th>
                        <th className='py-3 pr-4'>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredVisitors.map((visitor) => (
                        <tr
                          key={visitor.id}
                          className='border-b border-slate-50 last:border-0' 
                        >
                          <td className='py-4 pr-4'>
                            <div className='flex items-center gap-3'>
                              <span 
                                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white ${visitor.avatarBg}`}
                              >
                                {visitor.initials}
                              </span>
                              <div className='leading-tight'>
                                <p className='font-semibold text-slate-900'>{visitor.name}</p>
                                <p className='text-xs text-slate-400'>{visitor.id}</p>
                              </div>
                            </div>
                          </td>
                          <td className='py-4 pr-4'>
                            <p className='text-slate-700'>{visitor.email}</p>
                            <p className='text-xs text-slate-400'>{visitor.phone}</p>
                          </td>
                          <td className='py-4 pr-4 text-slate-600'>
                            {visitor.purpose}
                          </td>
                          <td className='py-4 pr-4'>
                            <p className='text-slate-900'>{visitor.date}</p>
                            <p className='text-xs text-slate-400'>{visitor.time}</p>
                          </td>
                          <td className='py-4 pr-4 text-slate-600'>
                            {visitor.host}
                          </td>
                          <td className='py-4 pr-4'>
                            <StatusBadge status={visitor.status} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                </>
              )}
            </div>
          </main>
      </div>
    </div>
  );
}
