import { useEffect, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/HeroSection/Hero";
import About from "./components/AboutSection/About";
import Feature from "./components/FeatureSection/Feature";
import Contact from "./components/ContactSection/Contact";
import Footer from "./components/FooterSection/Footer";
import VisitorForm from "./components/VisitorForm";

function App() {
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   fetch("http://localhost:3000/visitors")
  //     .then((response) => response.json())
  //     .then((result) => {
  //       setData(result);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);

  return (
    <div>
      <Header/>
      <Hero/>
      <About/>
      <Feature/>
      <Contact/>
      <Footer/>

      {/* <h1>Visitor Management System</h1>
      <VisitorForm />

      { data.length > 0 ? (
        <>
            {data.map((visitor) => (
                <div key={visitor.id}>
                    <h2>{visitor.name}</h2>
                    <p><strong>Company: </strong>{visitor.company}</p>
                    <p><strong>Purpose: </strong>{visitor.purpose}</p>
                    <p><strong>Status: </strong>{visitor.status}</p>
                    <hr />
                </div>
              )
            )}
        </>
      ) : (
        <p>Loading...</p>
      )} */}
    </div>
  );
}

export default App;