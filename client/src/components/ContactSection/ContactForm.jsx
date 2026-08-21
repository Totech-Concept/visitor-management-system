import React, { useState} from "react";

export default function ContactForm() {

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((formData) => ({
      ...formData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if(!response.ok) {
        throw new Error("Failed to submit contact form")
      }

      const data = await response.json();
      console.log(data);

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch(error) {
      console.error('submission error', error)
    }
  }

  return (
    <div className="rounded-2xl bg-slate-50 p-6 sm:p-8">
        <h3 className="text-xl font-bold text-slate-900">Send us a message</h3>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4 ">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label 
            htmlFor="firstName"
            className="mb-1.5 block text-sm font-medium text-slate-700"
            >First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="First name"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 
              placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label 
            htmlFor="lastName"
            className="mb-1.5 block text-sm font-medium text-slate-700"
            >Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Last name"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 
              placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
        <div>
          <label 
          htmlFor="email"
          className="mb-1.5 block text-sm font-medium text-slate-700"
          >Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 
              placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div>
          <label 
          htmlFor="subject"
          className="mb-1.5 block text-sm font-medium text-slate-700"
          >Subject</label>
          <input
            type="text"
            id="subject"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 
              placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div>
          <label 
          htmlFor="message"
          className="mb-1.5 block text-sm font-medium text-slate-700"
          >Message</label>
          <textarea
            id="message"
            name="message"
            placeholder="Your message..."
            rows={5}
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full resize-none rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 
              placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 py-3.5 text-sm text-white font-semibold 
              shadow-sm shadow-blue-600/20 hover:bg-blue-700"
        >Send Message
        </button>
      </form>
    </div>
  );
}
