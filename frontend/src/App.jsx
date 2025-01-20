import React from "react";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import AdminDashboard from "./components/admin/AdminDashboard";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          {/* Login dan Register */}
          <Route path="/" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />

          {/* Halaman dashboard berdasarkan role */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />

          {/* Halaman fallback jika route tidak ditemukan */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
