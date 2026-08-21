import React from "react";
import { useState } from "react";

export default function VisitorForm() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    purpose: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("http://localhost:3000/visitors", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
      });
       
      if (!response.ok) {
        throw new Error("Failed to add visitor");
      }
      
      const data = await response.json();
      
      console.log(data);

      setFormData({
        name: "",
        company: "",
        purpose: ""
      });
    } catch (error) {
      console.error("Submission error", error);
    };
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Visitor Name: </label>
      <input
        type="text"
        placeholder="John Doe"
        id="name"
        name="name"
        value={formData.name}
        required
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />

      <label htmlFor="company">Company: </label>
      <input
        type="text"
        placeholder="XYZ Company"
        id="company"
        name="company"
        value={formData.company}
        required
        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
      />

      <label htmlFor="purpose">Purpose: </label>
      <input
        type="text"
        id="purpose"
        name="purpose"
        value={formData.purpose}
        required
        onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
      />

      <button type="submit">Add Visitor</button>
    </form>
  );
}


// import { useEffect, useState } from "react";
// import Header from "../components/Header";
// import Hero from "../components/HeroSection/Hero"
// import About from "../components/AboutSection/About";
// import Feature from "../components/FeatureSection/Feature";
// import Contact from "../components/ContactSection/Contact";
// import Footer from "../components/FooterSection/Footer";
// import VisitorForm from "../components/VisitorForm";

// function App() {
//   // const [data, setData] = useState([]);

//   // useEffect(() => {
//   //   fetch("http://localhost:3000/visitors")
//   //     .then((response) => response.json())
//   //     .then((result) => {
//   //       setData(result);
//   //     })
//   //     .catch((error) => {
//   //       console.error(error);
//   //     });
//   // }, []);

//   return (
//     <div>
//       <Header/>
//       <Hero/>
//       <About/>
//       <Feature/>
//       <Contact/>
//       <Footer/>

//       {/* <h1>Visitor Management System</h1>
//       <VisitorForm />

//       { data.length > 0 ? (
//         <>
//             {data.map((visitor) => (
//                 <div key={visitor.id}>
//                     <h2>{visitor.name}</h2>
//                     <p><strong>Company: </strong>{visitor.company}</p>
//                     <p><strong>Purpose: </strong>{visitor.purpose}</p>
//                     <p><strong>Status: </strong>{visitor.status}</p>
//                     <hr />
//                 </div>
//               )
//             )}
//         </>
//       ) : (
//         <p>Loading...</p>
//       )} */}
//     </div>
//   );
// }

// export default App;
