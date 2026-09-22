import React, { useEffect, useMemo, useState } from 'react';
import { Link } from "react-router-dom";
import { Plus, Search, Filter, LogIn, LogOut, XCircle } from "lucide-react";
import Sidebar from '../components/Sidebar';
import AdminHeader from '../components/AdminHeader';


const filterTabs = ["All", "Scheduled", "Checked In", "Checked Out", "Cancelled"];

const avatarColors = [
  "bg-cyan-500",
  "bg-blue-600",
  "bg-orange-500",
  "bg-pink-500",
  "bg-purple-500",
  "bg-blue-500",
  "bg-teal-500",
  "bg-blue-700",
];

const purposeOptions = [
  "Prospective Student Visit",
  "Training Enrollment",
  "Course Inquiry",
  "Corporate Training",
  "Partnership Meeting",
  "Accreditation Visit",
  "Interview",
  "Other"
];

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

function getInitials(fullName) {
  if (!fullName) return "??";

  const nameParts = fullName.trim().split(/\s+/);

  if (nameParts.length === 1) {
    return nameParts[0].slice(0, 2).toUpperCase();
  }

  return (
    nameParts[0][0] + nameParts[nameParts.length - 1][0]
  ).toUpperCase();
}

function getCleanLocalDateString(rawDate) {
  if (!rawDate) return "";
  if (typeof rawDate === "string") return rawDate.slice(0, 10);
  const d = new Date(rawDate);
  if (isNaN(d.getTime())) return String(rawDate).slice(0, 10);
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(d.getUTCDate()).padStart(2, "0")}`;
}

// Helper: Check if rawDate string (YYYY-MM-DD) is today or in the future
function isTodayOrFuture(rawDate) {
  if (!rawDate || rawDate === "-" || rawDate.length < 10) return false;
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [y, m, d] = rawDate.split("-");
  const apptDate = new Date(Number(y), Number(m) - 1, Number(d));

  return apptDate >= today;
}

export default function AdminVisitorsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [query, setQuery] = useState("");

  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showAddVisitor, setShowAddVisitor] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [visitorForm, setVisitorForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    company: "",
    purpose: "",
    host: "",
    appointment_id: "",
    status: "Scheduled",
    notes: "",
  });
  
    const fetchVisitors = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("http://localhost:3000/visitors");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch visitors");
        }

        const visitorData = data.visitors || data;
        const formattedVisitors = visitorData.map((visitor) => {
        const fullName = visitor.full_name || "Unknown Visitor";

          const createdDate = visitor.created_at
            ? new Date(visitor.created_at)
            : null;

          const date = createdDate
            ? getCleanLocalDateString(createdDate)
            : "-";

          const time = createdDate
            ? createdDate.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
            : "-";

          return {
            id: visitor.visitor_reference,
            databaseId: visitor.id,
            name: fullName,
            initials: getInitials(fullName),
            avatarBg: avatarColors[visitor.id % avatarColors.length],
            email: visitor.email,
            phone: visitor.phone,
            company: visitor.company || "Individual",
            purpose: visitor.purpose,
            date,
            time,
            rawDate: date,
            host: visitor.host,
            status: visitor.status,
          };
        });

        setVisitors(formattedVisitors);
      } catch (error) {
        console.error("Error fetching visitors:", error);
        setError(error.message || "Failed to load visitors. Please try again.")
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
    fetchVisitors();
}, []);

  // Handler: Check-In Visitor
  const handleCheckIn = async (databaseId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3000/visitors/${databaseId}/check-in`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}`},
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to check in visitor");

      setVisitors((prev) =>
        prev.map((item) =>
          item.databaseId === databaseId ? { ...item, status: "Checked In" } : item
        )
      );
    } catch (error) {
      console.error("Check In visitor failed", error.message);
    }
  }

  // Handler: Check-Out Visitor
  const handleCheckOut = async (databaseId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3000/visitors/${databaseId}/check-out`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to check out visitor");

      setVisitors((prev) =>
        prev.map((item) => 
          item.databaseId === databaseId ? { ...item, status: "Checked Out" } : item
        )
      );
    } catch (error) {
      console.error("Check Out visitor failed", error.message)
    }
  };

  // Handler: Cancel Visitor
  const handleCancelVisitor = async (databaseId) => {
    if (!window.confirm("Are you sure you want to cancel this visitor's schedule?")) return;
    
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3000/visitors/${databaseId}/status`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to cancel visitor schedule");

      setVisitors((prev) =>
        prev.map((item) => 
          item.databaseId === databaseId ? { ...item, status: "Cancelled" } : item
        )
      );
    } catch (error) {
      console.error("Check Out visitor failed", error.message)
    }
  };

  // Action Condition Guards
    const canCheckIn = (visitor) => {
      return visitor.status === "Scheduled" && isTodayOrFuture(visitor.rawDate);
      };

    const canCheckOut = (visitor) => {
      return visitor.status === "Checked In" && isTodayOrFuture(visitor.rawDate);
      };
    const canCancel = (visitor) => {
      if (visitor.status === "Checked In" || visitor.status === "Checked Out" || visitor.status === "Cancelled") {
        return false;
      }
      return isTodayOrFuture(visitor.rawDate);
      };

  // Form input handler
  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setVisitorForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Close/reset form
  const closeAddVisitor = () => {
    setShowAddVisitor(false);
    setFormError("");

    setVisitorForm({
      full_name: "",
      email: "",
      phone: "",
      company: "",
      purpose: "",
      host: "",
      appointment_id: "",
      status: "Scheduled",
      notes: "",
    });
  };

  // Submit visitor
  const handleAddVisitor = async(e) => {
    e.preventDefault();

    setSubmitting(true);
    setFormError("");
    setSuccessMessage("");

    try {
      const response = await fetch("http://localhost:3000/visitors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...visitorForm,
          appointment_id: visitorForm.appointment_id
            ? Number(visitorForm.appointment_id)
            : null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add visitors");
      }

      // Refresh the visitor list
      await fetchVisitors();

      // Reset the form and close the modal
      closeAddVisitor();

      // Show success message
      setSuccessMessage("Visitor added successfully.");

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);

    } catch (error) {
      console.error("Error adding visitor:", error);
      setFormError(
        error.message || "Failed to add visitor Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const filteredVisitors = useMemo(() => {
    return visitors.filter((visitor) => {
      const matchesFilter = 
        activeFilter === "All" || visitor.status === activeFilter;

        const q = query.trim().toLowerCase();

        const matchesQuery = 
          !q || 
          visitor.name?.toLowerCase().includes(q) ||
          visitor.company?.toLowerCase().includes(q) ||
          visitor.email?.toLowerCase().includes(q);

          return matchesFilter && matchesQuery;
    });
  }, [visitors, activeFilter, query]);

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
                onClick={() => {
                  setFormError("");
                  setSuccessMessage("");
                  setShowAddVisitor(true);
                }}
                className='inline-flex w-fit items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 hover:bg-blue-700'
              >
                <Plus className='h-4 w-4' />
                Add Visitor
              </button>
            </div>

            {successMessage && (
              <div className='mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emeraldn-700'>
                {successMessage}
              </div>
            )}
            
            {/* Visitors list container */}
            <div className='mt-6 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:p-6'>
              {loading ? (
                <p className='py-10 text-center text-sm text-slate-500'>
                  Loading visitors...
                </p>
              ) : error ? (
                <p className='py-10 text-center text-sm text-red-500'>
                  {error}
                </p>
              ) : filteredVisitors.length === 0 ? (
                <p className='py-10 text-center text-sm text-slate-500'>
                  No visitors match your search or filter.
                </p>
              ) : (
                <>
                {/* Mobile/tablet: stacked cards */}
                <div className='space-y-3 lg:hidden'>
                  {filteredVisitors.map((visitor) => {
                    const showCheckIn = canCheckIn(visitor);
                    const showCheckOut = canCheckOut(visitor);
                    const showCancel = canCancel(visitor);
                    const hasActions = showCheckIn || showCheckOut || showCancel;

                    return (
                    <div key={visitor.id} className='bg-white rounded-2xl border border-slate-100 p-4 shadow-sm sm:p-5'>
                      <div className='flex items-start justify-between gap-2'>
                        <div className='flex items-center gap-3 min-w-0'>
                          <span
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white ${visitor.avatarBg}`}
                          >
                            {visitor.initials}
                          </span>
                          <div className='min-w-0'>
                            <h3 className='truncate font-semibold text-slate-900 leading-tight'>{visitor.name}</h3>
                            <p className='text-xs text-slate-400 mt-0.5'>{visitor.id}</p>
                          </div>
                          </div>
                            <StatusBadge status={visitor.status} />
                          </div>

                          <hr className='my-3 border-slate-100' />

                          <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs ml-2'>
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

                          {/* Receptionist Action Buttons (Mobile) */}
                          <div className='mt-4 flex items-center justify-end gap-2 border-t border-slate-100 pt-3'>
                            {!hasActions && (
                              <span className='text-xs text-slate-400 italic'>No actions available</span>
                            )}
                            {showCheckIn && (
                              <button
                                type='button'
                                onClick={() => handleCheckIn(visitor.databaseId)}
                                className='inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700 transition' 
                              >
                                <LogIn className='h-3.5 w-3.5' /> Check In
                              </button>
                            )}
                            {showCheckOut && (
                              <button
                                type='button'
                                onClick={() => handleCheckOut(visitor.databaseId)}
                                className='inline-flex items-center gap-1 rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-900 transition' 
                              >
                                <LogOut className='h-3.5 w-3.5' /> Check Out
                              </button>
                            )}
                            {showCancel && (
                              <button
                                type='button'
                                onClick={() => handleCancelVisitor(visitor.databaseId)}
                                className='inline-flex items-center gap-1 rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-900 transition' 
                              >
                                <XCircle className='h-3.5 w-3.5' /> Cancel
                              </button>
                            )}
                          </div>
                        </div>
                        );
                    })}
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
                        <th className='py-3 text-right pr-2'>Actions</th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-slate-50'>
                      {filteredVisitors.map((visitor) => {
                        const showCheckIn = canCheckIn(visitor);
                        const showCheckOut = canCheckOut(visitor);
                        const showCancel = canCancel(visitor);
                        const hasActions = showCheckIn || showCheckOut || showCancel;
                        return (
                        <tr
                          key={visitor.id}
                          className='border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition' 
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
                          <td className='py-4 text-right pr-2'>
                            <div className='flex items-center justify-end gap-2'>
                              {!hasActions && (
                              <span className='text-xs text-slate-400 italic'>No actions available</span>
                            )}
                            {showCheckIn && (
                              <button
                                type='button'
                                onClick={() => handleCheckIn(visitor.databaseId)}
                                className='inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700 transition' 
                              >
                                <LogIn className='h-3.5 w-3.5' /> Check In
                              </button>
                            )}
                            {showCheckOut && (
                              <button
                                type='button'
                                onClick={() => handleCheckOut(visitor.databaseId)}
                                className='inline-flex items-center gap-1 rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-900 transition' 
                              >
                                <LogOut className='h-3.5 w-3.5' /> Check Out
                              </button>
                            )}
                            {showCancel && (
                              <button
                                type='button'
                                onClick={() => handleCancelVisitor(visitor.databaseId)}
                                className='inline-flex items-center gap-1 rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-900 transition' 
                              >
                                <XCircle className='h-3.5 w-3.5' /> Check Out
                              </button>
                            )}
                            </div>
                          </td>
                        </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                </>
              )}
            </div>
          </main>
      </div>

      {/* Registration modal */}
      {showAddVisitor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 py-6">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-xl">

          {/* Modal Header */}
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Add Visitor
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Register a new visitor
            </p>
        </div>

        <button
          type="button"
          onClick={closeAddVisitor}
          className="rounded-lg px-3 py-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
        >
          ✕
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleAddVisitor} className="p-6">

        {formError && (
          <div className="mb-5 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
            {formError}
          </div>
        )}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

          {/* Full Name */}
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
              Full Name
            </label>

            <input
              type="text"
              name="full_name"
              value={visitorForm.full_name}
              onChange={handleFormChange}
              placeholder="Enter visitor's full name"
              required
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={visitorForm.email}
              onChange={handleFormChange}
              placeholder="visitor@example.com"
              required
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
              Phone
            </label>

            <input
              type="tel"
              name="phone"
              value={visitorForm.phone}
              onChange={handleFormChange}
              placeholder="08012345678"
              required
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Company */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
              Company
            </label>

            <input
              type="text"
              name="company"
              value={visitorForm.company}
              onChange={handleFormChange}
              placeholder="Company or Individual"
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Purpose */}
          <div>
                <label htmlFor='purpose' className=' mb-1.5 text-sm font-semibold text-slate-700'>Purpose</label>
                <select 
                id='purpose'
                name='purpose'
                value={visitorForm.purpose}
                onChange={handleFormChange}
                required
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                
                >
                  <option value="" disabled>Select purpose of visit</option>

                    {purposeOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                </select>
              </div>

          {/* Host */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
              Host
            </label>

            <input
              type="text"
              name="host"
              value={visitorForm.host}
              onChange={handleFormChange}
              placeholder="Staff member to visit"
              required
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Appointment ID */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
              Appointment ID
              <span className="ml-1 text-xs font-normal text-slate-400">
                (Optional)
              </span>
            </label>

            <input
              type="number"
              name="appointment_id"
              value={visitorForm.appointment_id}
              onChange={handleFormChange}
              placeholder="e.g. 12"
              min="1"
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Status */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
              Status
            </label>

            <select
              name="status"
              value={visitorForm.status}
              onChange={handleFormChange}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="Scheduled">Scheduled</option>
              <option value="Checked In">Checked In</option>
              <option value="Checked Out">Checked Out</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          {/* Notes */}
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
              Notes
              <span className="ml-1 text-xs font-normal text-slate-400">
                (Optional)
              </span>
            </label>

            <textarea
              name="notes"
              value={visitorForm.notes}
              onChange={handleFormChange}
              rows="3"
              placeholder="Additional information about the visitor..."
              className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">

          <button
            type="button"
            onClick={closeAddVisitor}
            disabled={submitting}
            className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={submitting}
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Adding Visitor..." : "Add Visitor"}
          </button>
        </div>
      </form>
    </div>
  </div>
)}
    </div>
  );
}

