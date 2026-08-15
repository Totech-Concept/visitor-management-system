import React from 'react'
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
        href: "#about"
    },
    {
        label: "Features",
        href: "#features"
    },
    {
        label: "Book Appointment",
        href: "#book"
    },
    {
        label: "Staff Login",
        href: "#staff-login"
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
    <footer className=''>
        <div>
            <div>
                {/* {Brand} */}
                <div>
                    <div>
                        <div>
                           <Monitor className='h-5 w-5 text-white' strokeWidth={2.5} /> 
                        </div>

                        <p>Nigeria's premier computer training institute, empowering the next generation of 
                            digital professionals since 2005.
                        </p>

                        <div>
                            {socialLinks.map((link) => {
                                return(
                                    <a key={link.label}
                                        href={link.href}>
                                        {link.initial}
                                    </a>
                                )
                            })}
                        </div>
                    </div>

                    {/* {Quick Links} */}
                    <div>
                        <p>Quick Links</p>
                        <ul>
                            {quickLinks.map((link) => (
                                <li key={link.label}
                                    href={link.href}
                                >
                                    <a>{link.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <p>Contact</p>
                        <ul>
                            {contacts.map(({icon: Icon, label}) => (
                               <li key={label}>
                                    <span>
                                        <Icon className='h-5 w-5' strokeWidth={2}/>
                                    </span>
                                    <a>{label}</a>
                               </li> 
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </footer>
  )
}
