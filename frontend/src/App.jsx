import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Pages
import LandingPage from "./pages/LandingPage";
import UserSignUp from "./pages/UserSignUp";
import UserSignIn from "./pages/UserSignIn";
import Dashboard from "./pages/Dashboard";
import UserForgetPassword from "./pages/UserForgetPassword";
import PlaceholderPage from "./pages/PlaceholderPage";
import Settings from "./pages/Settings";

// Components
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Router>
        <ToastContainer theme="dark" />
        
        <Routes>
          {/* Public Routes */}
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/signup" element={<UserSignUp />} />
          <Route path="/signin" element={<UserSignIn />} />
          <Route path="/forget-password" element={<UserForgetPassword />} />
          
          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          
          {/* Dynamic Page Routes */}
          <Route path="/:pageType" element={<PlaceholderPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;