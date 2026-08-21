import React from 'react';
import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/FooterSection/Footer';
import { Link } from "react-router-dom";
import { ChevronLeft, Info } from 'lucide-react';

const purposeOptions = [
  "Prospective Student Visit",
  "Training Enrollment",
  "Course Inquiry",
  "Corporate Training",
  "Partnership Meeting",
  "Accreditation Visit",
  "Interview",
  "Other"
];

const timeOptions = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];

const initialForm = {
  fullName: "",
    company: "",
    email: "",
    phone: "",
    purpose: "",
    date: "",
    time: "",
    notes: ""
};

export default function Appointment() {
  const [status, setStatus] = useState({ state: "idle", message: "" });
  const [formData, setFormData] = useState(initialForm);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((formData) => ({
      ...formData, 
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const required = ["fullName", "email", "phone", "purpose", "date", "time"];
    const missing = required.filter((field) => !formData[field]);
    if (missing.length > 0) {
      setStatus({
        state: "error",
        message: "Please fill in all required fields."
      });
      return;
    }

    setStatus({ state: "loading", message: ""});

    try {
      const response = await fetch("http://localhost:3000/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Something went wrong.")
      }

      setStatus({
        state: "success",
        message: data.message || "Appointment booked successfully.",
      });
      setFormData(initialForm);
    } catch (error) {
      setStatus({
        state: "error",
        message: error.message
      });

    }
  }

  const inputClasses = "w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500";
  
  return (
    <div className='min-h-screen bg-slate-50'>
      <Header />
      <div className='mx-auto max-w-3xl px-6 py-12'>
        <Link
        to="/"
        className='inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-800'
        >
          <ChevronLeft className='h-4 w-4'/>
          Back to home</Link>

          <h1 className='mt-6 text-4xl font-extrabold tracking-tight text-slate-900'>Book an Appointment</h1>
          <p className='mt-2 text-slate-500'>Fill in the details to schedule your visit to CIT Institute.</p>

          <form onSubmit={handleSubmit}
            className='mt-8 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8'
          >
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
              <div>
                <label htmlFor='fullName' className='text-sm font-semibold text-slate-800'>Full Name<span className='text-red-500'> *</span></label>
                <input 
                type='text' 
                id='fullName' 
                name='fullName'
                placeholder='Adaeze Okonkwo'
                value={formData.fullName}
                onChange={handleChange}
                className={`mt-2 ${inputClasses}`}
                />
              </div>
              <div>
                <label htmlFor='company' className='text-sm font-semibold text-slate-800'>Company / Organization</label>
                <input 
                type='text' 
                id='company' 
                name='company'
                placeholder="Company or 'Individual'"
                value={formData.company}
                onChange={handleChange}
                className={`mt-2 ${inputClasses}`}
                />
              </div>

              <div>
                <label htmlFor='email' className='text-sm font-semibold text-slate-800'>Email Address<span className='text-red-500'> *</span></label>
                <input 
                type='email' 
                id='email' 
                name='email'
                placeholder='you@example.com'
                value={formData.email}
                onChange={handleChange}
                className={`mt-2 ${inputClasses}`}
                />
              </div>
              <div>
                <label htmlFor='phone' className='text-sm font-semibold text-slate-800'>Phone Number<span className='text-red-500'> *</span></label>
                <input 
                type='tel' 
                id='phone' 
                name='phone'
                placeholder='+234 800 000 0000'
                value={formData.phone}
                onChange={handleChange}
                className={`mt-2 ${inputClasses}`}
                />
              </div>

              <div>
                <label htmlFor='purpose' className='text-sm font-semibold text-slate-800'>Purpose of Visit<span className='text-red-500'> *</span></label>
                <select 
                id='purpose'
                name='purpose'
                value={formData.purpose}
                onChange={handleChange}
                className={`mt-2 ${inputClasses}`}
                >
                  <option value="" disabled>Select purpose of visit</option>

                    {purposeOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                </select>
              </div>

              <div>
                <label htmlFor='date' className='text-sm font-semibold text-slate-800'>Preferred Date<span className='text-red-500'> *</span></label>
                <input 
                type='date'
                id='date'
                name='date'
                value={formData.date}
                onChange={handleChange}
                className={`mt-2 ${inputClasses}`}
                />
              </div>

              <div>
                <label htmlFor='time' className='text-sm font-semibold text-slate-800'>Preferred Time<span className='text-red-500'> *</span></label>
                <select 
                id='time'
                name='time'
                value={formData.time}
                onChange={handleChange}
                className={`mt-2 ${inputClasses}`}
                >
                    <option value="" disabled>Select preferred time</option>
                    {timeOptions.map((time) => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                </select>
              </div>

              <div className='sm:col-span-2'>
                <label htmlFor="notes" className='text-sm font-semibold text-slate-800'>Additional Notes</label>
                <textarea
                  id='notes'
                  name='notes'
                  value={formData.notes}
                  onChange={handleChange}
                className={`mt-2 resize-none ${inputClasses}`}
                  rows={4}
                  placeholder='Any additional information about your visit...' 
                />
              </div>
            </div>

            <div className='mt-6 flex gap-3 rounded-xl bg-blue-50 p-4'>
              <Info className='mt-0.5 h-5 w-5 text-blue-600 shrink-0'/>
              <div className='text-sm leading-relaxed text-blue-800'>
                <p className='font-semibold'>Before your visit</p>
                <p className='mt-0.5 text-blue-700'>Please bring a valid government-issued ID. Report to the reception desk upon arrival
                  and mention your reference number.
                </p>
              </div>
            </div>

            {status.state === "error" && (
              <p className='mt-4 text-sm font-medium text-red-600'>{status.message}</p>
            )}
            {status.state === "success" && (
              <p className='mt-4 text-sm font-medium text-emerald-600'>{status.message}</p>
            )}
            <button 
            type='submit'
            disabled={status.state === "loading"}
            className='mt-6 w-full rounded-lg bg-blue-600 py-3.5 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60'
            >
              {status.state === "loading" ? "Booking..." : "Confirm Appointment"}
            </button>
          </form>
      </div>
      <Footer />
    </div>
  )
}
