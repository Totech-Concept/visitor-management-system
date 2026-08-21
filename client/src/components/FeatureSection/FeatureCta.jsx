import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function FeatureCta() {
  return (
    <section className='bg-linear-to-br from-blue-600 to-blue-700 text-center'>
        <div className='mx-auto max-w-4xl px-6 py-20 text-center md:py-24'>
            <h2 className='font-extrabold text-4xl text-white leading-tight tracking-tight sm:text-5xl'>Ready to visit CIT Institute?</h2>
            <p className='mt-5 text-lg text-blue-100'>Book your appointment online and skip the queue at reception.</p>
        
        <div className='mt-9 flex flex-col items-center justify-center gap-5 sm:flex-row'>
            <Link 
            to="/appointment"
            className='rounded-lg bg-slate-50 px-6 py-3.5 text-sm font-semibold text-slate-900 shadow-sm hover:bg-white'>Book Appointment Now</Link>
            <Link to='/#features'
                className='inline-flex items-center gap-1.5 text-sm font-semibold text-white underline underline-offset-4 hover:text-blue-100'
            >Learn about our courses 
                <ArrowRight className='h-4 w-4'/>
            </Link>
            </div>
        </div>
    </section>
  )
}
