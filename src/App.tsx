import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";

import HomePage from "./pages/public/HomePage";
import DepartmentsPage from "./pages/public/DepartmentsPage";
import CoursesPage from "./pages/public/CoursesPage";
import ContactPage from "./pages/public/ContactPage";
import LoginPage from "./pages/auth/LoginPage";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminDepartments from "./pages/admin/AdminDepartments";
import AdminClasses from "./pages/admin/AdminClasses";
import AdminStudents from "./pages/admin/AdminStudents";
import AdminCourses from "./pages/admin/AdminCourses";
import AdminAttendance from "./pages/admin/AdminAttendance";
import AdminContacts from "./pages/admin/AdminContacts";

import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import TeacherAttendance from "./pages/teacher/TeacherAttendance";
import TeacherHistory from "./pages/teacher/TeacherHistory";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public */}
            <Route path="/" element={<HomePage />} />
            <Route path="/departments" element={<DepartmentsPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Admin */}
            <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/departments" element={<ProtectedRoute role="admin"><AdminDepartments /></ProtectedRoute>} />
            <Route path="/admin/classes" element={<ProtectedRoute role="admin"><AdminClasses /></ProtectedRoute>} />
            <Route path="/admin/students" element={<ProtectedRoute role="admin"><AdminStudents /></ProtectedRoute>} />
            <Route path="/admin/courses" element={<ProtectedRoute role="admin"><AdminCourses /></ProtectedRoute>} />
            <Route path="/admin/attendance" element={<ProtectedRoute role="admin"><AdminAttendance /></ProtectedRoute>} />
            <Route path="/admin/contacts" element={<ProtectedRoute role="admin"><AdminContacts /></ProtectedRoute>} />

            {/* Teacher */}
            <Route path="/teacher" element={<ProtectedRoute role="teacher"><TeacherDashboard /></ProtectedRoute>} />
            <Route path="/teacher/attendance" element={<ProtectedRoute role="teacher"><TeacherAttendance /></ProtectedRoute>} />
            <Route path="/teacher/history" element={<ProtectedRoute role="teacher"><TeacherHistory /></ProtectedRoute>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
