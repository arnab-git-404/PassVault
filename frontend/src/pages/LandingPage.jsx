import React from "react";
import { Link } from "react-router-dom";
import GeneratePassword from "../components/GeneratePassword";
import SignUpModal from "../components/SignUpModal";

export default function LandingPage() {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-6">
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl gap-8 md:gap-16">
        {/* Left Side Content */}
        <div className="w-full md:w-2/3 text-left">
          <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">Welcome to PassVault</h1>
          <p className="text-lg text-gray-300 mb-6 animate-fade-in">
            Securely store, manage, and generate passwords with ease.
            Your digital security starts here.
          </p>
          
          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {/* Feature 1 */}
            <div className="hover:cursor-pointer bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
              <h2 className="text-2xl font-bold mb-2">🔒 Secure Storage</h2>
              <p className="text-gray-400">Your passwords are encrypted with military-grade security.</p>
            </div>

            {/* Feature 2 */}
            <div className="hover:cursor-pointer bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
              <h2 className="text-2xl font-bold mb-2">⚡ Easy Access</h2>
              <p className="text-gray-400">Access your passwords anytime, anywhere with our intuitive dashboard.</p>
            </div>

            {/* Feature 3 */}
            <div className="hover:cursor-pointer bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
              <h2 className="text-2xl font-bold mb-2">🛡️ Two-Factor Authentication</h2>
              <p className="text-gray-400">Enhance your security with built-in 2FA support.</p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-8">
            <button className="hover:cursor-pointer bg-green-500 px-6 py-3 rounded-lg text-lg hover:bg-green-600 transition-transform transform hover:scale-105 shadow-md hover:shadow-lg">
              <Link to="/signin">Create an Account</Link>
            </button>
          </div>
        </div>

        {/* Right Side - Generate Password */}
        <div className="w-full md:w-1/3 flex justify-center mt-8 md:mt-0">
          <div className="bg-blue-600 p-6 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105 w-96 md:max-w-xs lg:max-w-sm">
            <GeneratePassword />
          </div>
        </div>
      </div>
    </div>
  );
}
