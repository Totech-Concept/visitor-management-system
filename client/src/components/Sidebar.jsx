import React from 'react';
import { Link } from "react-router-dom";
import { Monitor, LayoutDashboard, Users, CalendarDays, BarChart3, LogOut, X } from "lucide-react";


const navItems = [
    {id: 1, label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    {id: 2, label: "Visitors", href: "/dashboard/visitors", icon: Users },
    {id: 3, label: "Appointments", href: "/dashboard/appointments", icon: CalendarDays },
    {id: 4, label: "Reports", href: "/dashboard/reports", icon: BarChart3 },
];
export default function Sidebar({ active, user, open = false, onClose }) {
    const currentUser = user || {
        initials: "BA",
        fullName: "Adebayo O.",
        role: "Receptionist",
    };
  return (
    <>
    {/* Backdrop - mobile only, closes the sidebar when tapped */}
    {open && (
        <div
            onClick={onClose}
            className='fixed inset-0 z-40 bg-slate-900/50 lg:hidden'
        />
    )}
    <aside 
        className={`fixed lg:sticky top-0 left-0 z-50 flex h-screen w-70 shrink-0 flex-col border-r border-slate-100 bg-white transition-transform duration-200 ease-in-out lg:z-auto lg:translate-x-0 ${
        open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}>
        {/* Brand */}
        <div className='flex items-center justify-between border-b border-slate-100 px-6 py-3'>
            <div className='flex items-center gap-3'>
                <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600'>
                    <Monitor className='h-5 w-5 text-white' strokeWidth={2.5}/>
                </div>
                <div className='leading-tight'>
                    <p className='font-bold text-slate-900'>CIT Institute</p>
                    <p className='text-xs text-slate-500'>Visitor Management</p>
                </div>
            </div>

            {/* Close button - mobile only */}
            <button
                type='button'
                onClick={onClose}
                aria-label='Close menu'
                className='flex h-8 w-8 items-center justify-center text-slate-400 hover:text-slate-700 lg:hidden'
            >
                <X className="h-5 w-5" />
            </button>
        </div>

        {/* Nav */}
        <nav className='flex-1 px-4 py-6'>
            <p className='px-2 text-xs font-semibold tracking-wide text-slate-400'>MAIN MENU</p>
            <ul className='mt-3 space-y-1'>
                {navItems.map((item) => {
                    const isActive = active === item.id;
                    const IconComponent = item.icon;
                    return (
                        <li key={item.id}>
                            <Link 
                            to={item.href} 
                            onClick={onClose}
                            className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium ${
                                isActive ? "bg-blue-50 text-blue-700"
                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            }`}>
                                <span className='flex items-center gap-3'>
                                    <IconComponent className='w-4.5 h-4.5' strokeWidth={2}/>
                                    {item.label}
                                </span>
                                {isActive && (
                                    <span className='h-1.5 w-1.5 rounded-full bg-blue-600' />
                                )}
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </nav>

    {/* User + signout */}
    <div className='border-t border-slate-100 px-4 py-4'>
        <div className='flex items-center gap-3 px-4'>
            <div className='flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white'>
                {currentUser.initials}
            </div>
            <div className='leading-tight'>
                <p className='text-sm font-semibold text-slate-900'>
                    {currentUser.fullName}
                </p>
                <p className='text-xs text-slate-500'>{currentUser.role}</p>
            </div>
        </div>

        <button
            type="button"
            className='mt-4 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            >
                <LogOut className='h-4.5 w-4.5' strokeWidth={2}/>
                Sign Out
        </button>
    </div>
    </aside>
    </>
  );
}
