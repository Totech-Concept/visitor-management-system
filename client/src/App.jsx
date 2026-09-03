import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import Header from "./components/Header";
import Appointment from "./pages/Appointment";
import ScrollToSection from "./components/ScrollToSection";
import StaffLogin from "./pages/StaffLogin";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Dashboard from "./pages/Dashboard";


function App() {
  return (
    <>
      <ScrollToSection />
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/staff-login" element={<StaffLogin />} />
        <Route 
        path="/dashboard" 
        element={
          <ProtectedRoutes>
            <Dashboard />
          </ProtectedRoutes>
        } />
      </Routes>
    </>
  );
}

export default App;