import React, { useState } from "react";
import { Link } from "react-router-dom";
import GeneratePassword from "../components/GeneratePassword";
import SignUpModal from "../components/SignUpModal";
import {
  FaQuestionCircle,
  FaCircle,
  FaChevronDown,
  FaChevronUp,
  FaTwitter,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaLock,
  FaShieldAlt,
  FaLockOpen
} from "react-icons/fa";

export default function LandingPage() {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // FAQ data
  const faqData = [
    {
      question: "Is PassVault really secure?",
      answer:
        "Yes, PassVault uses AES-256 encryption, which is virtually unbreakable with current technology. Your master password never leaves your device, and all encryption/decryption happens locally.",
    },
    {
      question: "What happens if I forget my master password?",
      answer:
        "Since we never store your master password and have no way to decrypt your data without it, it's crucial that you remember it. Consider creating a secure backup of your master password in a safe place.",
    },
    {
      question: "Can I use PassVault on multiple devices?",
      answer:
        "Yes, you can access your PassVault from any device. Your encrypted data syncs securely across devices, but you'll always need your master password to decrypt it.",
    },
    {
      question: "How does the two-factor authentication work?",
      answer:
        "Two-factor authentication adds an extra layer of security by requiring something you know (your master password) and something you have (like your phone). Even if someone knows your master password, they can't access your vault without the second factor.",
    },
    {
      question: "Is PassVault open source?",
      answer:
        "Yes! We believe in transparency and community-driven security. Our code is available for review on GitHub, which means security experts worldwide can verify our security claims and help improve our platform.",
    },
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-6">
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl gap-8 md:gap-16">
        {/* Left Side Content */}
        <div className="w-full md:w-2/3 text-left">
          <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">
            Welcome to PassVault
          </h1>
          <p className="text-lg text-gray-300 mb-6 animate-fade-in">
            Securely store, manage, and generate passwords with ease. Your
            digital security starts here.
          </p>

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {/* Feature 1 */}
            <div className="hover:cursor-pointer bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
              <h2 className="text-2xl font-bold mb-2">🔒 Secure Storage</h2>
              <p className="text-gray-400">
                Your passwords are encrypted with military-grade security.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="hover:cursor-pointer bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
              <h2 className="text-2xl font-bold mb-2">⚡ Easy Access</h2>
              <p className="text-gray-400">
                Access your passwords anytime, anywhere with our intuitive
                dashboard.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="hover:cursor-pointer bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
              <h2 className="text-2xl font-bold mb-2">
                🛡️ Two-Factor Authentication
              </h2>
              <p className="text-gray-400">
                Enhance your security with built-in 2FA support.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-8">
            <button className="hover:cursor-pointer bg-green-500 px-6 py-3 rounded-lg text-lg hover:bg-green-600 transition-transform transform hover:scale-105 shadow-md hover:shadow-lg">
              <Link to="/signup">Create an Account</Link>
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

      {/* Improved FAQ Section */}
      <div className="bg-gray-900 rounded-xl p-6 mb-8 md:w-2/3 mt-16 w-full max-w-6xl">
        <h2 className="text-2xl font-bold mb-8 flex items-center justify-center">
          <FaQuestionCircle className="text-blue-400 mr-3" />
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className={`bg-gray-800 rounded-lg overflow-hidden transition-all duration-300 shadow-md ${
                activeFaq === index
                  ? "border-l-4 border-blue-500"
                  : "hover:bg-gray-750"
              }`}
            >
              {/* Question (clickable header) */}
              <div
                className="p-4 cursor-pointer flex justify-between items-center"
                onClick={() => toggleFaq(index)}
              >
                <h3 className="text-lg font-semibold flex items-center">
                  {activeFaq === index ? (
                    <FaLockOpen className="mr-3 text-blue-500 transition-colors duration-300" />
                  ) : (
                    <FaLock className="mr-3 text-gray-400 transition-colors duration-300" />
                  )}
                  {faq.question}
                </h3>
                <div
                  className={`transition-transform duration-300 ${
                    activeFaq === index ? "transform rotate-180" : ""
                  }`}
                >
                  <FaChevronDown
                    className={`${
                      activeFaq === index ? "text-blue-500" : "text-gray-400"
                    }`}
                  />
                </div>
              </div>

              {/* Answer (collapsible content) */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  activeFaq === index ? "max-h-40" : "max-h-0"
                }`}
              >
                <div className="p-4 pt-0 text-gray-300 bg-gray-800 border-t border-gray-700">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New Footer Section */}
      <footer className="w-full bg-gray-800 mt-auto pt-12 pb-6 border-t border-gray-700">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* About */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-gray-100">
                PassVault
              </h3>
              <p className="text-gray-400 mb-4">
                Secure password management with end-to-end encryption. Keep your
                digital life protected with military-grade security.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <FaTwitter size={20} />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-purple-400 transition-colors"
                >
                  <FaGithub size={20} />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                >
                  <FaLinkedin size={20} />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-red-400 transition-colors"
                >
                  <FaEnvelope size={20} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-gray-100">
                Quick Links
              </h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    to="/features"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    to="/pricing"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    to="/blog"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="hover:text-blue-400 transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Security Links */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-gray-100">Security</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    to="/security"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Security Practices
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    to="/bug-bounty"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Bug Bounty Program
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center hover:text-blue-400 transition-colors"
                  >
                    <FaShieldAlt className="mr-2" /> Security Audit Report
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright and bottom links */}
          <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} PassVault. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <Link
                to="/privacy"
                className="text-sm text-gray-500 hover:text-blue-400 transition-colors"
              >
                Privacy
              </Link>
              <Link
                to="/terms"
                className="text-sm text-gray-500 hover:text-blue-400 transition-colors"
              >
                Terms
              </Link>
              <Link
                to="/sitemap"
                className="text-sm text-gray-500 hover:text-blue-400 transition-colors"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}