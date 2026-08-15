import React from 'react'
import { useState } from 'react'
import { Monitor, Menu, X } from 'lucide-react'

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
  return (
        <header className='border border-slate-100 sticky top-0 z-50 bg-white/90 backdrop-blur-md'>
            <div className='mx-auto flex max-w-7xl items-center justify-between px-6 py-4'>
               <div className='flex items-center gap-3'>
                    <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600'>
                        <Monitor className='h-5 w-5 text-white' strokeWidth={2.5}/>
                    </div>
                    <div className='leading-tight'>
                        <p className='font-bold text-slate-900'>CIT Institute</p>
                        <p className='text-xs text-slate-500'>Visitor Management</p>
                    </div>
                </div> 

                {/* Desktop nav */}
                <nav className='hidden items-center gap-8 lg:flex text-slate-600 text-sm'>
                    <a href='#about' className='font-medium hover:text-slate-900'>About</a>
                    <a href='#features' className='font-medium hover:text-slate-900'>Features</a>
                    <a href='#contact' className='font-medium hover:text-slate-900'>Contact</a>
                </nav>

                {/* Desktop actions */}
                <div className='hidden items-center gap-5 lg:flex'>
                    <a 
                    href='#signin'
                    className='text-sm font-medium text-slate-700 hover:text-slate-900 sm:block' 
                    >Sign In</a>
                    <button
                    className='rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white 
                    shadow-sm shadow-blue-600/20 hover:bg-blue-700'
                    >Book Appointment</button>
                </div>

                {/* Hamburger toggle (sm & md) */}
                <button
                    type='button'
                    onClick={() => setMenuOpen((open) => !open)}
                    aria-expanded={menuOpen}
                    aria-label="Toggle menu"
                    className='flex h-9 w-9 items-center justify-center text-slate-700 lg:hidden'
                >
                    {menuOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
                </button>
            </div>

            {/* Mobile menu panel */}
            {menuOpen && (
                <div className='border-t border-slate-100 px-6 py-4 lg:hidden'>
                    <nav className='flex flex-col gap-4 text-sm font-medium text-slate-600'>
                        <a href='#about' className='hover:text-slate-900'>About</a>
                        <a href='#features' className='hover:text-slate-900'>Features</a>
                        <a href='#contact' className='hover:text-slate-900'>Contact</a>
                        <a href='#signin' className='text-slate-700 hover:text-slate-900'>Sign In</a>
                        <button className='w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold
                        text-white shadow-sm shadow-blue-600/20 hover:bg-blue-700'>Book Appointment</button>
                    </nav>
                </div>
            )}
        </header>
  )
}
