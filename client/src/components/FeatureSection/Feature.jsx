import React from 'react'
import FeatureCta from './FeatureCta';
import {
    UserCheck,
    CalendarDays,
    ShieldCheck,
    BarChart3,
    Zap,
    BadgeCheck
} from "lucide-react";

const features = [
    { 
        id: 1,
        icon: UserCheck,
        title: "Smart Check-In",
        description: "Seamless visitor registration and real-time check-in with digital badge generation."        
    },
    { 
        id: 2,
        icon: CalendarDays,
        title: "Appointment Scheduling",
        description: "Pre-book visits with automated confirmation and reminder notifications."        
    },
    { 
        id: 3,
        icon: ShieldCheck,
        title: "Security & Compliance",
        description: "Complete audit trail with visitor logs, host tracking, and access controls."        
    },
    { 
        id: 4,
        icon: BarChart3,
        title: "Analytics & Reports",
        description: "Comprehensive dashboards with visitor trends, peak hours, and custom exports."        
    },
    { 
        id: 5,
        icon: Zap,
        title: "Instant Notifications",
        description: "Real-time alerts for hosts when their guests arrive at reception."        
    },
    { 
        id: 6,
        icon: BadgeCheck,
        title: "Professional Records",
        description: "Digital visitor cards with photo capture and purpose-of-visit documentation."        
    },
];
export default function Feature() {
  return (
    <section id='features' className='bg-slate-50'>
        <div className='mx-auto max-w-7xl px-6 py-16 md:py-24'>
            <div className='mx-auto max-w-2xl text-center'>
                <p className='text-blue-600 font-bold text-sm tracking-wide leading-tight'>PLATFORM FEATURES</p>
                <h2 className='mt-3 text-slate-900 font-extrabold leading-tight tracking-tight text-4xl sm:text-5xl'>Everything you need to manage visitors</h2>
                <p className='text-slate-500 leading-relaxed mt-5'>A complete suite of tools designed for modern institutions to handle visitor flow efficiently and professionally.</p>
            </div>
        
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-14 mx-auto gap-6'>
                {features.map((feature) => {
                const IconComponent = feature.icon;
                    return (
                    <div 
                    key={feature.id}
                    className='border border-slate-200 px-3 py-4 rounded-2xl bg-white p-7 shadow-sm'
                    >
                        <div className='flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50'>
                            <IconComponent className='h-5 w-5 text-blue-600' stroke-width={2}/>
                        </div>
                        <h3 className='font-bold mt-5 text-lg text-slate-900'>{feature.title}</h3>
                        <p className='mt-2 leading-relaxed text-slate-500'>{feature.description}</p>
                    </div>
                    )
                })}
            </div>    
        </div>

        {/* Call-to-action section */}
        <FeatureCta/>
    </section>
  )
}
