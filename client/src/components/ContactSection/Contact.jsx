import React from 'react'
import ContactForm from './ContactForm';
import {
    MapPin,
    Phone,
    Mail,
    Clock
} from "lucide-react"

const contactDetails = [
    {
        icon: MapPin,
        label: "Address",
        lines: "24 Tech Drive, Victoria Island, Lagos, Nigeria"
    },
    {
        icon: Phone,
        label: "Phone",
        lines: "+234 8000 000 8324 (CIT TECH)"
    },
    {
        icon: Mail,
        label: "Email",
        lines: "info@citinstitute.ng"
    },
    {
        icon: Clock,
        label: "Hours",
        lines: "Mon-Fri: 8:00 AM Sat: 9:00 AM - 2:00 PM"
    },
];
export default function Contact() {
  return (
    <section id='contact' className='bg-white scroll-mt-15 md:scroll-mt-24 lg:scroll-mt-2'>
        <div className='mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-16 md:py-24 lg:grid-cols-2 lg:gap-16'>
            <div>
                <p className='text-sm text-blue-600 font-bold tracking-wide'>GET IN TOUCH</p>
                <h2 className='font-extrabold text-slate-900 text-4xl mt-3 tracking-tight sm:text-5xl'>Contact Us</h2>
                <p className='mt-6 max-w-md leading-relaxed text-slate-500'>Have questions about our programs or visit procedures? Our team is happy to help you.</p>

            <div className='mt-10 space-y-6'>
                {contactDetails.map((detail) => {
                    const IconComponent = detail.icon;
                    return (
                        <div key={detail.label} className='flex items-start gap-4'>
                            <span className='bg-blue-50 flex rounded-xl h-11 w-11 shrink-0 items-center justify-center'>
                                <IconComponent className='w-5 h-5 text-blue-600' strokeWidth={2} />
                            </span>
                            <div>
                                <p className='font-semibold text-slate-900'>{detail.label}</p>
                                <p className='text-slate-500'>{detail.lines}</p>
                            </div>
                        </div>
                    )
                })}
                </div>
            </div>
            <ContactForm/>
        </div>
    </section>
  )
}
