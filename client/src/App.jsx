import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import Header from "./components/Header";
import Appointment from "./pages/Appointment";
import ScrollToSection from "./components/ScrollToSection";
import StaffLogin from "./pages/StaffLogin";

function App() {
  return (
    <>
      <ScrollToSection />
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/staff-login" element={<StaffLogin />} />
      </Routes>
    </>
  );
}

export default App;