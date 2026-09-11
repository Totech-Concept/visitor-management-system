import React from 'react'
import { Link } from "react-router-dom";
import { Bell, Plus, Menu } from "lucide-react";

export default function AdminHeader({ title, onMenuClick }) {
  return (
    <header className=' sticky top-0 z-30 flex items-center justify-between border-b border-slate-100 bg-white px-4 py-4 sm:px-8'>
                    <div className='flex items-center gap-3'>
                        <button
                            type='button'
                            onClick={onMenuClick}
                            aria-label='Open menu'
                            className='flex p-2 rounded-lg text-slate-600 lg:hidden'
                        >
                           <Menu className='h-5 w-5' /> 
                        </button>
                        <h2 className='text-base font-semibold text-slate-900'>{title}</h2>
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
    
  )
}
