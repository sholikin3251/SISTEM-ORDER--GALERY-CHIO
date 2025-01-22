import React from "react";
import { Navigate } from "react-router-dom";

// ProtectedRoute untuk memastikan hanya role tertentu yang bisa mengakses halaman
const ProtectedRoute = ({ requiredRole, children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // Jika tidak ada token atau role tidak sesuai, redirect ke halaman login
    return <Navigate to="/login" />;
  }

  // Jika role sesuai, tampilkan komponen yang diproteksi
  return children;
};

export default ProtectedRoute;
