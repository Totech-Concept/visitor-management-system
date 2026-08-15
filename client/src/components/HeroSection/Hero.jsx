import React, { useEffect, useState } from 'react'
import { Monitor, Check } from 'lucide-react'
import HeroButtons from './HeroButtons'
import heroImage from './Visitor-hero-image.png'

export default function Hero() {
    const [visitorCount, setVisitorCount] = useState(0);

    useEffect(() => {
      const getVisitor = async() => {
        try {
          const response = await fetch('http://localhost:3000/visitors/count')

          if (!response.ok) {
            throw new Error('Failed to fetch visitor count')
          }
          const data = await response.json()
          setVisitorCount(data.count)
        } catch(error) {
          console.error(error)
        }
      }

      getVisitor()
    }, [])

  return (
    <section className='bg-linear-to-br from-slate-50 via-blue-50/40 to white'> 
    <div className='mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-16 md:py-24 lg:grid-cols-2 lg:gap-8'>
        <div className='order-1 lg:order-1'>
          <div>
            <span className='inline-flex items-center gap-2 rounded-full bg-blue-100/70 px-4 py-1.5 text-sm font-semibold text-blue-700'>
            <Monitor className='h-4 w-4' />
            Computer & IT Institute — Lagos</span>
          </div>
          <h1 className='mt-6 text-5xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1]'>Modern visitor<br /> 
          <span className='text-blue-600'>management</span> <br />
          made simple.</h1>
          <p className='mt-6 max-w-lg text-lg text-slate-500 leading-relaxed'>Streamline your reception at CIT Institute. Book appointments, manage visitors, and track check-ins — all in one professional platform.</p>
          < HeroButtons />
          <div className='mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-slate-200 pt-8'>
          <div>
            <p className='text-2xl font-extrabold text-slate-900'>{visitorCount}00+</p>
            <p className='mt-1 text-sm text-slate-500'>Monthly Visitors</p>
          </div>

          <div>
            <p className='text-2xl font-extrabold text-slate-900'>98%</p>
            <p className='mt-1 text-sm text-slate-500'>Satisfaction Rate</p>
          </div>

          <div>
            <p className='text-2xl font-extrabold text-slate-900'>3 min</p>
            <p className='mt-1 text-sm text-slate-500'>Avg Check-in</p>
          </div>
          </div>
        </div>

        <div className='shadow-2xl shadow-slate-900/10 order-2 lg:order-2'>
          <img 
            src={heroImage}
            alt='Office Reception'
            className='h-100 w-full object-cover rounded-2xl'
          />
        </div>
    </div>
  </section>
  )
}
