import React from "react";
import AdminDashboard from "./components/admin/AdminDashboard";
import Page from "./components/pembeli/Page";
import PrivateRoute from "./components/PrivateRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          {/* Halaman pengguna */}
          <Route
            path="/users"
            element={
              <PrivateRoute>
                <Page />
              </PrivateRoute>
            }
          />

          {/* Halaman admin dashboard */}
          <Route
            path="/admin-dashboard"
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
