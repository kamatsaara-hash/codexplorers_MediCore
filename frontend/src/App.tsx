import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import RoleSelect from "./pages/RoleSelect";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

import { DashboardLayout } from "./components/DashboardLayout";
import AdminOverview from "./pages/admin/AdminOverview";
import AdminDoctors from "./pages/admin/AdminDoctors";
import AdminPatients from "./pages/admin/AdminPatients";
import Pharmacy from "./pages/shared/Pharmacy";

import DoctorPatients from "./pages/doctor/DoctorPatients";
import DoctorSchedule from "./pages/doctor/DoctorSchedule";
import DoctorPharmacy from "./pages/doctor/DoctorPharmacy";

import PatientSymptoms from "./pages/patient/PatientSymptoms";
import PatientReports from "./pages/patient/PatientReports";
import PatientBook from "./pages/patient/PatientBook";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RoleSelect />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />

          {/* Admin */}
          <Route path="/admin" element={<DashboardLayout role="admin" />}>
            <Route index element={<AdminOverview />} />
            <Route path="doctors" element={<AdminDoctors />} />
            <Route path="patients" element={<AdminPatients />} />
            <Route path="pharmacy" element={<Pharmacy />} />
          </Route>

          {/* Doctor */}
          <Route path="/doctor" element={<DashboardLayout role="doctor" />}>
            <Route index element={<DoctorPatients />} />
            <Route path="schedule" element={<DoctorSchedule />} />
            <Route path="pharmacy" element={<DoctorPharmacy />} />
          </Route>

          {/* Patient */}
          <Route path="/patient" element={<DashboardLayout role="patient" />}>
            <Route index element={<PatientSymptoms />} />
            <Route path="reports" element={<PatientReports />} />
            <Route path="book" element={<PatientBook />} />
          </Route>

          <Route path="/index" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
