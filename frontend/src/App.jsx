import React, { useState } from "react";
import UserSignIn from "./pages/UserSignIn";
import UserSignUp from "./pages/UserSignUp";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbars from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <>
      <Router>
        {/* <Navbars />  */}
      
        <Routes>
          
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/Signin" element={<UserSignIn />} />
          <Route exact path="/signup" element={<UserSignUp />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
