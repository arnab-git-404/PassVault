import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaTools, FaHardHat } from 'react-icons/fa';

export default function PlaceholderPage() {
  const { pageType } = useParams();
  const navigate = useNavigate();
  
  // Map of page types to their friendly names and descriptions
  const pageInfo = {
    features: {
      title: "Features",
      description: "Discover the powerful features of PassVault"
    },
    pricing: {
      title: "Pricing Plans",
      description: "Flexible pricing options for individuals and teams"
    },
    blog: {
      title: "Blog",
      description: "The latest updates and security insights"
    },
    about: {
      title: "About Us",
      description: "The team behind PassVault"
    },
    contact: {
      title: "Contact Us",
      description: "Get in touch with our support team"
    },
    security: {
      title: "Security Practices",
      description: "How we protect your sensitive data"
    },
    privacy: {
      title: "Privacy Policy",
      description: "How we handle your personal information"
    },
    terms: {
      title: "Terms of Service",
      description: "The legal agreement between you and PassVault"
    },
    "bug-bounty": {
      title: "Bug Bounty Program",
      description: "Help us improve our security and get rewarded"
    },
    sitemap: {
      title: "Sitemap",
      description: "Navigate all pages of our website"
    },
    default: {
      title: "Coming Soon",
      description: "This page is under construction"
    }
  };
  
  // Get the page info or use default if not found
  const currentPage = pageInfo[pageType] || pageInfo.default;
  
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col text-white">
      {/* Header */}
      <header className="bg-gray-800 p-4 border-b border-gray-700 flex justify-between items-center">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
        >
          <FaArrowLeft className="mr-2" /> Back to home
        </button>
        
        <div className="text-gray-400 text-sm">
          PassVault • {currentPage.title}
        </div>
      </header>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="max-w-2xl w-full bg-gray-800 rounded-xl p-8 shadow-lg">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-blue-900 bg-opacity-30 rounded-full">
              <FaTools className="text-blue-400 text-5xl animate-pulse" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-center mb-4">{currentPage.title}</h1>
          <p className="text-xl text-center text-gray-300 mb-8">{currentPage.description}</p>
          
          <div className="bg-gray-700 bg-opacity-50 p-6 rounded-lg mb-8 border-l-4 border-blue-500">
            <div className="flex items-start">
              <div className="bg-blue-900 bg-opacity-30 p-2 rounded-full mr-4">
                <FaHardHat className="text-yellow-400" />
              </div>
              <div>
                <h2 className="font-bold text-lg mb-2">Under Construction</h2>
                <p className="text-gray-300">
                  We're currently working on this page to provide you with the best experience possible. 
                  Thank you for your patience as we build out our platform.
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <Link 
              to="/" 
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Return to Homepage
            </Link>
          </div>
        </div>
        
        <div className="mt-8 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} PassVault. All rights reserved.
        </div>
      </div>
    </div>
  );
}