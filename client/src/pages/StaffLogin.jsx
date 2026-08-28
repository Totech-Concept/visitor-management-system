import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Monitor } from "lucide-react"

const DEMO_EMAIL = "admin@citinstitute.ng";
const DEMO_PASSWORD = "admin123";

export default function StaffLogin() {

    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: ""});
    const [rememberMe, setRememberMe] = useState(false);
    const [status, setStatus] = useState({state: "idle, message: "});

    const handleChange = (e) => {
        const [name, value] = e.target;

        setForm((form) => ({
            ...form,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.email || !form.password) {
            setStatus({ state: "error", message: "Please enter both email and password." });
            return;
        }

        setStatus({ state: "loading", message: "" });
    

    try {
        const response = await fetch("http://localhost:5173/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(form)
        });
        const result = await response.json();

        if(!response.ok || !result.success) {
            throw new Error(result.message || "Invalid email or password.")
        }

        setStatus({ state: "success", message: "Signed in successfully."})
        // Persist token, then redirect to the staff dashboard.
        // localStorage.setItem("token", result.token);
        navigate("/dashboard");
    } catch(err) {
        setStatus({ state: "error", message: err.message});
    }
};

    const inputClasses = 
        "w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500";
  return (
    <div className='flex min-h-screen items-center justify-center bg-linear-to-br from-slate-500 via-blue-50/40 to-white px-6 py-12'>
        <div className='w-full max-w-md'>
            <div className='flex flex-col items-center text-center'>
                <div className='flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 shadow-sm shadow-blue-600/30'>
                    <Monitor className='w-8 h-8 text-white' strokeWidth={2.2}/>
                </div>
                <h1 className='mt-4 text-2xl font-bold text-slate-900'>
                    CIT Institute
                </h1>
                <p className='mt-1 text-slate-500'>
                    Sign in to Visitor Management System
                </p>
            </div>

            {/* Card */}
            <div className='mt-8 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8'>
                <form onSubmit={handleSubmit} className='space-y-5'>
                    <div>
                        <label htmlFor='email' className='text-sm font-semibold text-slate-800'>
                            Email Address<span className='text-red-500'> *</span>
                        </label>
                        <input 
                        id='email'
                        type='email'
                        placeholder='admin@citinstitute.ng'
                        value={form.email}
                        name='email'
                        onChange={handleChange}
                        className={`mt-2 ${inputClasses}`}
                        />
                    </div>

                    <div>
                        <label htmlFor='password' className='text-sm font-semibold text-slate-800'>
                            Password<span className='text-red-500'> *</span>
                        </label>
                            <input
                                id='password' 
                                type="password"
                                placeholder="••••••••"
                                value={form.password}
                                name='password'
                                onChange={handleChange}
                                className={`mt-2 ${inputClasses}`}
                            />
                        </div>

                    <div className='flex items-center justify-between'>
                        <label htmlFor='rememberMe'
                            className='flex items-center gap-2 text-sm text-slate-700'
                        >
                            <input 
                            id='rememberMe'
                            type='checkbox'
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className='h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500'
                            />
                            Remember me
                        </label>
                        <Link
                            to="/forgot-password"
                            className='text-sm font-medium text-blue-600 hover:text-blue-700'
                        >
                            Forgot password?
                        </Link>
                    </div>

                    {status.state === "error" && (
                        <p className='text-sm font-medium text-red-600'>{status.message}</p>
                    )}

                    <button
                        type='submit'
                        disabled={status.state === "loading"}
                        className='w-full rounded-lg bg-blue-600 py-3.5 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60'
                    >{status.state === "loading" ? "Signing in..." : "Sign In"}</button>
                </form>

                <div className='mt-6 rounded-xl bg-slate-50 px-4 py-3 text-center'>
                    <p className='text-sm font-semibold text-slate-700'>Demo credentials</p>
                    <p className='mt-0.5 text-sm text-slate-500'>{DEMO_EMAIL} / {DEMO_PASSWORD}</p>
                </div>
            </div>

                    
            <p className='mt-6 text-center text-slate-600'>Need to schedule a visit? {" "}</p>
            <Link to="/appointment" className='font-semibold text-blue-600 hover:text-blue-700'>Book appointment</Link>
        </div> 
    </div>
  );
}
