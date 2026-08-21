import Header from "../components/Header";
import Hero from "../components/HeroSection/Hero"
import About from "../components/AboutSection/About";
import Feature from "../components/FeatureSection/Feature";
import Contact from "../components/ContactSection/Contact";
import Footer from "../components/FooterSection/Footer";
import VisitorForm from "../components/VisitorForm";

function Home() {
  return (
    <div>
      <Header/>
      <Hero/>
      <About/>
      <Feature/>
      <Contact/>
      <Footer/>
    </div>
  );
}

export default Home;