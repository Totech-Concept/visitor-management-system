import React from 'react'
import { Link } from 'react-router-dom';
import { ArrowRight } from "lucide-react";

export default function HeroButtons() {
  return (
    <div className='mt-8 flex flex-col gap-4 sm:flex-row'>
        <Link 
        to="/appointment"
        className='inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600
        px-6 py-3.5 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 hover:bg-blue-700'>
            <ArrowRight className='w-4 h-4' />
            Book an Appointment</Link>

        <Link
        to='/signIn' 
        className='inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200
        bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 hover:bg-slate-50'>Staff Sign In</Link>
    </div>
  )
}
