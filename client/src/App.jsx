import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import Appointment from "./pages/Appointment";
import ScrollToSection from "./components/ScrollToSection";
import StaffLogin from "./pages/StaffLogin";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Dashboard from "./pages/Dashboard";
import AdminVisitorsPage from "./pages/AdminVisitorsPage";
import AdminAppointmentPage from "./pages/AdminAppointmentPage";
import AdminReportPage from "./pages/AdminReportPage";


function App() {
  return (
    <>
      <ScrollToSection />
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
        <Route path="/dashboard/visitors" element={<AdminVisitorsPage />} />
        <Route path="/dashboard/appointments" element={<AdminAppointmentPage />} />
        <Route path="/dashboard/reports" element={<AdminReportPage />} />
      </Routes>
    </>
  );
}

export default App;