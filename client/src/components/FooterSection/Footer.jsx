import React from 'react'
import { Link } from "react-router-dom";
import { Monitor, 
    MapPin, 
    Phone, 
    Mail, 
    Globe, 
    } from "lucide-react";

const socialLinks = [
    {
       initial: "T",
       label: "Twitter",
       href: "#" 
    },
    {
       initial: "L",
       label: "LinkedIn",
       href: "#" 
    },
    {
       initial: "F",
       label: "Facebook",
       href: "#" 
    },
];

const quickLinks = [
    {
        label: "About Us",
        href: "/#about"
    },
    {
        label: "Features",
        href: "/#features"
    },
    {
        label: "Book Appointment",
        href: "/appointment"
    },
    {
        label: "Staff Login",
        href: "/staff-login"
    },
];

const contacts = [
    {
        icon: MapPin,
        label: "24 Tech Drive, Victoria Island, Lagos"
    },
    {
        icon: Phone,
        label: "+234 8000 000 8324"
    },
    {
        icon: Mail,
        label: "info@citinstitute.ng"
    },
    {
        icon: Globe,
        label: "www.citinstitute.ng"
    },
];

export default function Footer() {
  return (
    <footer className='bg-slate-950 text-amber-50'>
        <div className='mx-auto max-w-7xl px-6 py-16'>
            <div className='grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]'>
                {/* {Brand} */}
                <div>
                    <div className='flex items-center gap-3'>
                        <div className='flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600'>
                           <Monitor className='h-5 w-5' strokeWidth={2.5} /> 
                        </div>
                        <p className='text-lg font-bold text-white'>CIT Institute</p>
                    </div>

                        <p className='mt-5 max-w-xs leading-relaxed text-slate-400'>Nigeria's premier computer training institute, empowering the next generation of 
                            digital professionals since 2005.
                        </p>

                        <div className='mt-6 flex items-center gap-3'>
                            {socialLinks.map((link) => {
                                return(
                                    <a key={link.label}
                                        href={link.href}
                                        className='flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 text-sm font-semibold
                                        text-slate-300 hover:bg-slate-700 hover:text-white'
                                        >
                                        {link.initial}
                                    </a>
                                )
                            })}
                        </div>
                    </div>

                    {/* {Quick Links} */}
                    <div>
                        <p className='text-base font-bold text-white'>Quick Links</p>
                        <ul className='mt-5 space-y-3'>
                            {quickLinks.map((link) => (
                                <li key={link.label}
                                >
                                    <Link to={link.href}>{link.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <p className='text-base font-bold text-white'>Contact</p>
                        <ul className='mt-5 space-y-3 text-slate-400'>
                            {contacts.map(({icon: Icon, label}) => (
                               <li key={label}
                                    className='flex items-start gap-2.5'
                               >
                                    <span>
                                        <Icon className='mt-0.5 h-4 w-4 shrink-0 text-slate-500' />
                                    </span>
                                    <span>{label}</span>
                               </li> 
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className='mt-14 flex flex-col items-start justify-between gap-4 border-t border-slate-800
                pt-8 sm:flex-row sm:items-center'>
                    <p className='text-sm text-slate-500'>© 2026 CIT Institute. All rights reserved.</p>
                    <p className='text-sm text-slate-500'>Powered by CIT Visitor Management System</p>
                </div>
            </div>
    </footer>
  );
}
