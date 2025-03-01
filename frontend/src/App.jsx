import React, { useState } from "react";
import UserSignIn from "./pages/UserSignIn";
import UserSignUp from "./pages/UserSignUp";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbars from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import { ToastContainer, toast } from "react-toastify";
import UserForgetPassword from "./pages/UserForgetPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import { useGlobalContext } from "./context/context";
import { Navigate } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <ToastContainer theme="dark" />
        {/* <Navbars />  */}

        <Routes>
          <Route exact path="/" element={<LandingPage />} />

          <Route path="/signup" element={<UserSignUp />} />

          <Route path="/signin" element={<UserSignIn />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard /> {/* This route is protected */}
              </ProtectedRoute>
            }
          />

          <Route
            exact
            path="/forget-password"
            element={<UserForgetPassword />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
