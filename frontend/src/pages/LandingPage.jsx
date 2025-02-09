import React from "react";
import { Link } from "react-router-dom";



export default function LandingPage() {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-6">
      {/* Hero Section */}
      <div className="text-center max-w-3xl">
        <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">Welcome to PassVault</h1>
        <p className="text-lg text-gray-300 mb-6 animate-fade-in">
          Securely store, manage, and generate passwords with ease. 
          Your digital security starts here.
        </p>
        <button className="hover:cursor-pointer bg-blue-600 px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition-transform transform hover:scale-105 shadow-md hover:shadow-lg">
          Get Started
        </button>
      </div>
      
      {/* Features Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className=" hover:cursor-pointer bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow hover:scale-105">
          <h2 className="text-2xl font-bold mb-2">🔒 Secure Storage</h2>
          <p className="text-gray-400">Your passwords are encrypted with military-grade security.</p>
        </div>
        <div className="hover:cursor-pointer bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow hover:scale-105">
          <h2 className="text-2xl font-bold mb-2">⚡ Easy Access</h2>
          <p className="text-gray-400">Access your passwords anytime, anywhere with our intuitive dashboard.</p>
        </div>
        <div className="hover:cursor-pointer bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow hover:scale-105">
          <h2 className="text-2xl font-bold mb-2">🛡️ Two-Factor Authentication</h2>
          <p className="text-gray-400">Enhance your security with built-in 2FA support.</p>
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="mt-12">
        <button  className=" hover:cursor-pointer bg-green-500 px-6 py-3 rounded-lg text-lg hover:bg-green-600 transition-transform transform hover:scale-105 shadow-md hover:shadow-lg">
          <Link to={'/signin'} >Create an Account</Link>
        </button>
      </div>
    </div>
  );
}
