import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import Header from "./components/Header";
import Appointment from "./pages/Appointment";
import ScrollToSection from "./components/ScrollToSection";

function App() {
  return (
    <>
      <ScrollToSection />
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/appointment" element={<Appointment />} />
      </Routes>
    </>
  );
}

export default App;