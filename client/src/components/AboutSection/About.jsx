import React from 'react'
import aboutImage from './visitor-about-image.png'


const stats = [
    {
        id: 1,
        value: "15,000+",
        label: "Graduates"
    },
    {
        id: 2,
        value: "50+",
        label: "Courses Offered"
    },
    {
        id: 3,
        value: "20+",
        label: "Years Experience"
    },
    {
        id: 4,
        value: "95%",
        label: "Employment Rate"
    }
];
export default function About() {
  return (
    <section id='about' className='bg-white'>
        <div className='mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 md:py-24 lg:grid-cols-2 lg:gap-16'>
            <div className='order-4 lg:order-1 overflow-hidden shadow-sm '>
                <img 
                    src={aboutImage}
                    alt='Students collaborating at computer institute'
                    className='h-100 w-full object-cover rounded-2xl'
                />
            </div>

            <div className='order-3 lg:order-2'>
                <p className='text-sm font-bold text-blue-600 tracking-wide'>ABOUT CIT INSTITUTE</p>
                <h2 className='mt-3 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl'>
                    Empowering Digital Futures Since 2005</h2>
                <p className='mt-6 max-w-xl leading-relaxed text-slate-500'>The Computer &amp; Information Technology Institute (CIT) is a premier training center dedicated to equiping students, 
                    professionals, and organizations with cutting-edge digital skills. With stste-of-art facilities and expert instructors, 
                    we have trained over 15,000 graduates across Nigeria.
                </p>
            

                <div className='mt-10 grid grid-cols-2 gap-4 sm:max-w-lg'>
                    {stats.map((stat) => (
                        <div 
                        key={stat.id}
                        className='rounded-xl bg-slate-50 px-6 py-5'
                        >
                            <p className='text-3xl font-extrabold text-blue-600'>{stat.value}</p>
                            <p className='mt-1 text-sm text-slate-600'>{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
  )
}
