













// 4TH Version
import React, { useState, useEffect } from "react";
// Update the imports section
import {
  FaShieldAlt,
  FaKey,
  FaLock,
  FaDatabase,
  FaMobileAlt,
  FaArrowRight,
  FaFingerprint,
  FaEye,
  FaCheck,
  FaExclamationTriangle,
  FaExclamationCircle,
  FaLockOpen,
  FaServer,
  FaUserShield,
  FaFileAlt,
  FaArrowDown,
  FaPlus,
  FaCode, // Added these new icons
} from "react-icons/fa";
import VaultStatus from "./VaultStatus";

export default function Home({ isSetup, isUnlocked, onSetupClick }) {
  // Animation state for security flow
  const [animationStep, setAnimationStep] = useState(0);
  const [showDecrypted, setShowDecrypted] = useState(false);

  // Cycle through animation steps
  useEffect(() => {
    const timer = setInterval(() => {
      setAnimationStep((prev) => (prev + 1) % 4);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  // Toggle password visibility periodically if vault is unlocked
  useEffect(() => {
    if (isUnlocked) {
      const visibilityTimer = setInterval(() => {
        setShowDecrypted((prev) => !prev);
      }, 4000);

      return () => clearInterval(visibilityTimer);
    }
  }, [isUnlocked]);

  // Security features cards data
  const features = [
    {
      icon: <FaKey className="text-yellow-500 text-3xl" />,
      title: "Master Password",
      description: "Single strong password that encrypts all your credentials",
      status: isSetup ? "Configured" : "Not Configured",
      statusColor: isSetup ? "text-green-500" : "text-red-500",
    },
    {
      icon: <FaLock className="text-purple-500 text-3xl" />,
      title: "Password Generator",
      description: "Create complex, unique passwords for all your accounts",
    },
    {
      icon: <FaDatabase className="text-blue-500 text-3xl" />,
      title: "Secure Storage",
      description: "End-to-end encryption keeps your data protected",
    },
    {
      icon: <FaMobileAlt className="text-green-500 text-3xl" />,
      title: "Two-Factor Authentication",
      description: "Extra security layer for your PassVault account",
    },
  ];

  // Visual step process data
  const steps = [
    {
      number: 1,
      title: "Create Master Password",
      description:
        "Set up a strong master password that will encrypt your vault",
      icon: <FaKey />,
      status: isSetup ? "complete" : "pending",
    },
    {
      number: 2,
      title: "Unlock Your Vault",
      description:
        "Use your master password to unlock access to your passwords",
      icon: <FaLock />,
      status:
        isSetup && isUnlocked ? "complete" : isSetup ? "pending" : "disabled",
    },
    {
      number: 3,
      title: "Generate & Store Passwords",
      description: "Create strong, unique passwords for your accounts",
      icon: <FaDatabase />,
      status: isUnlocked ? "complete" : "disabled",
    },
    {
      number: 4,
      title: "Access Anywhere Securely",
      description: "Your vault is accessible whenever you need it",
      icon: <FaShieldAlt />,
      status: isUnlocked ? "complete" : "disabled",
    },
  ];

  return (
    <div className="max-w-5xl w-full px-4 py-6">
      {/* Hero Section */}
      <div className="text-center mb-8">
        <div className="inline-block p-2 bg-blue-900 bg-opacity-30 rounded-lg mb-4">
          <FaShieldAlt className="text-blue-200 text-4xl inline-block animate-pulse" />
        </div>
        <h1 className="text-5xl font-bold mb-3 text-white">PassVault</h1>
        <p className="text-xl text-gray-300 mb-6">
          Your secure, encrypted password manager
        </p>

        <div className="inline-block mb-6">
          <VaultStatus isSetup={isSetup} isUnlocked={isUnlocked} />
        </div>

        {!isSetup && (
          <div className="mt-6 animate-pulse">
            <button
              onClick={onSetupClick}
              className=" hover:cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 
                text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg transform hover:scale-105 transition-all"
            >
              Set Up Your Vault Now
            </button>
            <p className="mt-3 text-gray-400">
              Everything starts with creating your secure master password
            </p>
          </div>
        )}
      </div>

      {/* Security Notes - MOVED TO TOP for prominence */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-6 mb-8 border-l-4 border-blue-600">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <FaExclamationCircle className="text-blue-400 mr-3" />
          Security Notes
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ul className="space-y-2 list-disc pl-5">
            <li className="transition-all hover:translate-x-1">
              Your master password is{" "}
              <span className="text-red-400 font-bold">never stored</span> on
              our servers
            </li>
            <li className="transition-all hover:translate-x-1">
              All encryption/decryption happens{" "}
              <span className="text-green-400 font-bold">locally</span> on your
              device
            </li>
          </ul>
          <ul className="space-y-2 list-disc pl-5">
            <li className="transition-all hover:translate-x-1">
              We use <span className="text-blue-400 font-bold">AES-256</span>{" "}
              encryption, the industry standard
            </li>
            <li className="transition-all hover:translate-x-1">
              Enable 2FA for additional account security
            </li>
          </ul>
        </div>
      </div>


    {/* Visual Process Flow with Animation - IMPROVED */}
<div className="bg-gray-900 rounded-xl p-6 mb-10 relative overflow-hidden">
  <h2 className="text-2xl font-bold mb-8 text-center flex items-center justify-center">
    <FaShieldAlt className={`text-blue-400 mr-3 ${animationStep === 0 ? 'animate-pulse' : ''}`} />
    How PassVault Works
  </h2>

  {/* Progress indicator */}
  <div className="hidden lg:block absolute top-0 left-0 w-full h-2 bg-gray-800">
    <div
      className="h-full transition-all duration-1000 ease-in-out"
      style={{
        width: isSetup ? (isUnlocked ? "100%" : "50%") : "25%",
        background: isUnlocked
          ? "linear-gradient(90deg, #10B981, #3B82F6)"
          : "linear-gradient(90deg, #3B82F6, #8B5CF6)",
      }}
    ></div>
  </div>

  {/* Current stage indicator */}
  <div className="flex justify-center mb-8">
    <div className="inline-flex bg-gray-800 rounded-full px-4 py-2">
      <span className="text-sm">
        Current Stage: 
        <span className="ml-2 font-medium">
          {!isSetup 
            ? "Not Set Up" 
            : !isUnlocked 
              ? "Set Up, Locked" 
              : "Fully Configured"}
        </span>
        <span className={`ml-2 inline-block w-2 h-2 rounded-full ${
          !isSetup 
            ? "bg-red-500" 
            : !isUnlocked 
              ? "bg-yellow-500" 
              : "bg-green-500"
        }`}></span>
      </span>
    </div>
  </div>

  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
    {steps.map((step, index) => {
      let statusColors;
      let activeClass = "";
      let stepStatusText = "";
      let statusBadgeClass = "";

      // Animation for current step
      if (animationStep === index) {
        activeClass = "ring-2 ring-offset-4 ring-offset-gray-900 ring-blue-500 transform scale-105";
      }

      // Determine step status styling and text
      switch(step.status) {
        case 'complete':
          statusColors = "bg-gradient-to-br from-green-900 to-green-800 border-green-600 text-green-300";
          stepStatusText = "Complete";
          statusBadgeClass = "bg-green-700 text-green-200";
          break;
        case 'pending':
          statusColors = "bg-gradient-to-br from-yellow-900 to-yellow-800 border-yellow-600 text-yellow-300";
          stepStatusText = "Pending";
          statusBadgeClass = "bg-yellow-700 text-yellow-200";
          break;
        default:
          statusColors = "bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 text-gray-500";
          stepStatusText = "Locked";
          statusBadgeClass = "bg-gray-700 text-gray-400";
      }

      return (
        <div
          key={index}
          className={`relative rounded-lg p-5 border shadow-lg transition-all duration-500 ${statusColors} ${activeClass} hover:shadow-xl`}
        >
          {/* Status badge */}
          <div className={`absolute top-3 right-3 rounded-full px-2 py-0.5 text-xs ${statusBadgeClass}`}>
            {stepStatusText}
          </div>
          
          {/* Step number badge */}
          <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm border-2 border-gray-900">
            {step.number}
          </div>

          <div className="flex items-center mb-4 mt-2">
            <div className={`rounded-full p-2.5 ${statusColors} ${
              animationStep === index ? 'animate-pulse shadow-glow' : ''
            }`}>
              {step.icon}
            </div>
            <div className="font-bold text-lg ml-3">{step.title}</div>
          </div>
          
          <p className="text-sm mb-3">{step.description}</p>
          
          {/* Action button for each step */}
          <div className="mt-2">
            {step.status === "complete" && 
              <span className="inline-flex items-center text-xs text-green-300">
                <FaCheck className="mr-1" /> Completed
              </span>
            }
            {step.status === "pending" && 
              <button 
                className="text-xs bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded-full transition-colors"
                onClick={step.number === 2 ? onSetupClick : null}
              >
                {step.number === 2 ? "Unlock Now" : "Start"}
              </button>
            }
            {step.status === "disabled" && 
              <span className="inline-flex items-center text-xs text-gray-500">
                <FaLock className="mr-1" /> Complete previous steps first
              </span>
            }
          </div>
          
          {/* Connection arrow */}
          {index < steps.length - 1 && (
            <div className="hidden lg:flex absolute -right-3 top-1/2 transform -translate-y-1/2 z-10">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center 
                ${step.status !== "disabled" ? "bg-blue-600" : "bg-gray-800"}`}>
                <FaArrowRight className={`text-sm 
                  ${step.status !== "disabled" ? "text-white" : "text-gray-600"}
                  ${animationStep === index ? "animate-bounce" : ""}`} 
                />
              </div>
            </div>
          )}
          
          {/* Animated highlight if current step */}
          {animationStep === index && (
            <div className="absolute inset-0 bg-blue-500 opacity-10 rounded-lg animate-pulse"></div>
          )}
        </div>
      );
    })}
  </div>
  
  {/* Progress summary text */}
  <div className="text-center mt-8 bg-gray-800 p-3 rounded-lg">
    <p className="text-sm">
      {!isSetup ? (
        <span>Get started by setting up your master password</span>
      ) : !isUnlocked ? (
        <span>Your vault is set up! Unlock it to access your passwords</span>
      ) : (
        <span>Your vault is fully configured and unlocked. You can now store and manage passwords securely!</span>
      )}
    </p>
  </div>
</div>














      {/* Security Features Grid */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-6">Security Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-900 hover:bg-gray-800 transition-colors p-6 rounded-xl shadow-lg border border-gray-700 hover:border-blue-500 transform hover:scale-[1.02]"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-gray-800 rounded-full mr-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
              </div>
              <p className="text-gray-300 mb-3">{feature.description}</p>
              {feature.status && (
                <div
                  className={`flex items-center ${feature.statusColor} text-sm font-medium mt-2`}
                >
                  {isSetup ? (
                    <FaCheck className="mr-2" />
                  ) : (
                    <FaExclamationTriangle className="mr-2 animate-pulse" />
                  )}
                  {feature.status}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Security Visualization - Password Storage Process */}
      <div className="bg-gray-900 rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <FaFingerprint
            className={`text-blue-400 mr-3 ${
              animationStep === 0 ? "animate-spin" : ""
            }`}
          />
          Security Visualization
        </h2>

        <div className="flex flex-col items-center">
          <div className="max-w-3xl w-full">
            {/* Storage Process Visualization */}
            <div className="relative mb-10 overflow-hidden">
              <h3 className="text-center text-lg font-semibold mb-6">
                How Your Password Data Is Protected
              </h3>

              {/* Process steps */}
              <div className="flex flex-col md:flex-row items-center justify-between mb-4 relative">
                {/* Animation blob that follows the current step */}
                <div
                  className={`absolute w-5 h-5 bg-blue-500 rounded-full transition-all duration-1000 ease-in-out z-20 hidden md:block`}
                  style={{
                    left:
                      animationStep === 0
                        ? "10%"
                        : animationStep === 1
                        ? "37%"
                        : animationStep === 2
                        ? "63%"
                        : animationStep === 3
                        ? "90%"
                        : "10%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    boxShadow: "0 0 15px 3px rgba(59, 130, 246, 0.7)",
                  }}
                ></div>

                {/* Connected process flow line */}
                <div className="absolute h-1 bg-gray-700 left-[10%] right-[10%] top-1/2 transform -translate-y-1/2 hidden md:block"></div>

                {/* Step 1: You create a password */}
                <div
                  className={`relative text-center p-4 ${
                    animationStep === 0
                      ? "bg-blue-900 bg-opacity-20"
                      : "bg-gray-800"
                  } rounded-lg w-full md:w-1/5 mb-4 md:mb-0 z-10 transition-colors duration-300`}
                >
                  <div
                    className={`rounded-full p-3 inline-flex justify-center items-center mb-2 bg-opacity-75 ${
                      animationStep === 0 ? "bg-blue-900" : "bg-gray-900"
                    }`}
                  >
                    <FaFileAlt
                      className={`text-blue-400 mx-auto text-xl ${
                        animationStep === 0 ? "animate-pulse" : ""
                      }`}
                    />
                  </div>
                  <div className="text-sm font-bold mb-1">Create Password</div>
                  <span
                    className={`text-xs ${
                      animationStep === 0 ? "text-blue-300" : "text-gray-400"
                    }`}
                  >
                    Plain text password
                  </span>
                </div>

                {/* Step 2: Encrypted with master key */}
                <div
                  className={`relative text-center p-4 ${
                    animationStep === 1
                      ? "bg-blue-900 bg-opacity-20"
                      : "bg-gray-800"
                  } rounded-lg w-full md:w-1/5 mb-4 md:mb-0 z-10 transition-colors duration-300`}
                >
                  <div
                    className={`rounded-full p-3 inline-flex justify-center items-center mb-2 bg-opacity-75 ${
                      animationStep === 1 ? "bg-blue-900" : "bg-gray-900"
                    }`}
                  >
                    <FaKey
                      className={`text-yellow-500 mx-auto text-xl ${
                        animationStep === 1 ? "animate-bounce" : ""
                      }`}
                    />
                  </div>
                  <div className="text-sm font-bold mb-1">Encryption</div>
                  <span
                    className={`text-xs ${
                      animationStep === 1 ? "text-blue-300" : "text-gray-400"
                    }`}
                  >
                    AES-256 encryption
                  </span>
                </div>

                {/* Step 3: Stored encrypted */}
                <div
                  className={`relative text-center p-4 ${
                    animationStep === 2
                      ? "bg-blue-900 bg-opacity-20"
                      : "bg-gray-800"
                  } rounded-lg w-full md:w-1/5 mb-4 md:mb-0 z-10 transition-colors duration-300`}
                >
                  <div
                    className={`rounded-full p-3 inline-flex justify-center items-center mb-2 bg-opacity-75 ${
                      animationStep === 2 ? "bg-blue-900" : "bg-gray-900"
                    }`}
                  >
                    <FaServer
                      className={`text-purple-400 mx-auto text-xl ${
                        animationStep === 2 ? "animate-pulse" : ""
                      }`}
                    />
                  </div>
                  <div className="text-sm font-bold mb-1">Secure Storage</div>
                  <span
                    className={`text-xs ${
                      animationStep === 2 ? "text-blue-300" : "text-gray-400"
                    }`}
                  >
                    Encrypted data only
                  </span>
                </div>

                {/* Step 4: Decryption when accessed */}
                <div
                  className={`relative text-center p-4 ${
                    animationStep === 3
                      ? "bg-blue-900 bg-opacity-20"
                      : "bg-gray-800"
                  } rounded-lg w-full md:w-1/5 z-10 transition-colors duration-300`}
                >
                  <div
                    className={`rounded-full p-3 inline-flex justify-center items-center mb-2 bg-opacity-75 ${
                      animationStep === 3 ? "bg-blue-900" : "bg-gray-900"
                    }`}
                  >
                    <FaLockOpen
                      className={`text-green-500 mx-auto text-xl ${
                        animationStep === 3 ? "animate-bounce" : ""
                      }`}
                    />
                  </div>
                  <div className="text-sm font-bold mb-1">Decryption</div>
                  <span
                    className={`text-xs ${
                      animationStep === 3 ? "text-blue-300" : "text-gray-400"
                    }`}
                  >
                    When vault is unlocked
                  </span>
                </div>
              </div>

              {/* Visualization of current process state */}
              <div className="mt-8 p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 relative overflow-hidden">
                <div className="text-center text-sm text-blue-400 font-medium mb-4">
                  {animationStep === 0
                    ? "Your password is created"
                    : animationStep === 1
                    ? "Your password is being encrypted"
                    : animationStep === 2
                    ? "Your password is securely stored"
                    : "Your password is being decrypted for use"}
                </div>

                {/* Password transformation visualization */}
                <div className="flex justify-center items-center h-16 relative">
                  <div
                    className={`absolute transition-all duration-500 transform ${
                      animationStep === 0
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-95"
                    }`}
                  >
                    <div className="bg-blue-900 bg-opacity-20 px-4 py-2 rounded-lg">
                      <span className="font-mono text-blue-300">
                        Twitter@123
                      </span>
                    </div>
                  </div>

                  <div
                    className={`absolute transition-all duration-500 transform ${
                      animationStep === 1
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-95"
                    }`}
                  >
                    <div className="bg-yellow-900 bg-opacity-20 px-4 py-2 rounded-lg">
                      <span className="font-mono text-yellow-300">
                        <span className="animate-pulse">Encrypting...</span>
                      </span>
                    </div>
                  </div>

                  <div
                    className={`absolute transition-all duration-500 transform ${
                      animationStep === 2
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-95"
                    }`}
                  >
                    <div className="bg-purple-900 bg-opacity-20 px-4 py-2 rounded-lg">
                      <span className="font-mono text-purple-300">
                        A7F9B3D2E1C8...
                      </span>
                    </div>
                  </div>

                  <div
                    className={`absolute transition-all duration-500 transform ${
                      animationStep === 3
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-95"
                    }`}
                  >
                    <div className="bg-green-900 bg-opacity-20 px-4 py-2 rounded-lg">
                      <span className="font-mono text-green-300">
                        Twitter@123
                      </span>
                    </div>
                  </div>
                </div>

                {/* Current state indicator */}
                <div className="mt-4 flex justify-center">
                  <div className="flex space-x-2">
                    {[0, 1, 2, 3].map((step) => (
                      <div
                        key={step}
                        className={`w-2 h-2 rounded-full ${
                          step === animationStep
                            ? "bg-blue-500 w-4"
                            : "bg-gray-600"
                        } transition-all duration-300`}
                      ></div>
                    ))}
                  </div>
                </div>

                {/* State of vault text */}
                <div
                  className={`mt-6 text-center text-sm ${
                    isUnlocked ? "text-green-500" : "text-red-400"
                  } animate-pulse`}
                >
                  {isUnlocked
                    ? "Your vault is currently unlocked - passwords can be decrypted"
                    : "Your vault is locked - passwords remain encrypted"}
                </div>
              </div>
            </div>

            {/* User message for confidence */}
            <div className="text-center mt-6 bg-blue-900 bg-opacity-20 p-3 rounded-lg">
              <FaUserShield className="inline-block text-blue-400 mr-2" />
              <span className="text-sm text-gray-300">
                Your passwords are always protected - even if our servers were
                compromised, your data remains secure without your master
                password.
              </span>
            </div>
          </div>
        </div>
      </div>



      {/* Master Password Security Flow Visualization */}
      <div className="bg-gray-900 rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <FaKey
            className={`text-yellow-400 mr-3 ${
              animationStep === 0 ? "animate-pulse" : ""
            }`}
          />
          Master Password Security
        </h2>

        <div className="flex flex-col items-center">
          <div className="max-w-3xl w-full">
            <div className="relative mb-6">
              <h3 className="text-center text-lg font-semibold mb-4">
                How Your Master Password Stays Secure
              </h3>

              {/* Master password flow visualization */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                {/* Left side - what happens on your device */}
                <div className="bg-gray-800 p-4 rounded-lg border border-blue-900">
                  <h4 className="text-center text-blue-400 font-semibold mb-4">
                    On Your Device
                  </h4>

                  <div className="space-y-6">
                    {/* Step 1: Enter Master Password */}
                    <div
                      className={`p-3 rounded-lg ${
                        animationStep === 0 ? "bg-blue-900 bg-opacity-20" : ""
                      } transition-colors duration-300`}
                    >
                      <div className="flex items-center mb-2">
                        <div className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center mr-3">
                          <span className="text-blue-200 font-bold">1</span>
                        </div>
                        <h5 className="font-semibold">Enter Master Password</h5>
                      </div>

                      <div className="pl-11">
                        <div className="bg-gray-900 p-2 rounded border border-gray-700 flex">
                          <span className="font-mono text-gray-400">
                            Password:{" "}
                          </span>
                          <span className="font-mono text-blue-300 ml-2">
                            {animationStep === 0
                              ? "SuperSecret123!"
                              : "•••••••••••••"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Step 2: Generate Random Salt */}
                    <div
                      className={`p-3 rounded-lg ${
                        animationStep === 1 ? "bg-blue-900 bg-opacity-20" : ""
                      } transition-colors duration-300`}
                    >
                      <div className="flex items-center mb-2">
                        <div className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center mr-3">
                          <span className="text-blue-200 font-bold">2</span>
                        </div>
                        <h5 className="font-semibold">Generate Random Salt</h5>
                      </div>

                      <div className="pl-11">
                        <div className="bg-gray-900 p-2 rounded border border-gray-700">
                          <span className="font-mono text-gray-400">
                            Salt:{" "}
                          </span>
                          <span
                            className={`font-mono text-purple-300 ${
                              animationStep === 1 ? "animate-pulse" : ""
                            }`}
                          >
                            a7f9ce56b3d2...
                          </span>
                        </div>
                      </div>
                    </div>



                    {/* Step 3: Key Derivation - ENHANCED to show both outputs */}
                    <div
                      className={`p-3 rounded-lg ${
                        animationStep === 2 ? "bg-blue-900 bg-opacity-20" : ""
                      } transition-colors duration-300`}
                    >
                      <div className="flex items-center mb-2">
                        <div className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center mr-3">
                          <span className="text-blue-200 font-bold">3</span>
                        </div>
                        <h5 className="font-semibold">
                          Derive Key & Verification Hash
                        </h5>
                      </div>

                      <div className="pl-11 relative">
                        {/* Inputs: Password + Salt */}
                        <div className="flex items-center">
                          <div className="w-1/2 bg-gray-900 p-2 rounded-l border border-gray-700">
                            <div className="flex flex-col">
                              <span className="font-mono text-gray-400 text-xs">
                                Password
                              </span>
                              <span className="font-mono text-blue-300 text-xs truncate">
                                SuperSecret123!
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center justify-center w-8">
                            <FaPlus className="text-gray-500" />
                          </div>
                          <div className="w-1/2 bg-gray-900 p-2 rounded-r border border-gray-700">
                            <div className="flex flex-col">
                              <span className="font-mono text-gray-400 text-xs">
                                Salt
                              </span>
                              <span className="font-mono text-purple-300 text-xs truncate">
                                a7f9ce56b3d2...
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* PBKDF2 Process */}
                        <div className="my-3 text-center p-2 bg-blue-800 bg-opacity-20 rounded-lg border border-blue-900">
                          <div className="font-mono text-xs text-blue-300">
                            PBKDF2(password, salt, 100,000 iterations)
                          </div>
                          <div
                            className={`${
                              animationStep === 2 ? "animate-pulse" : ""
                            }`}
                          >
                            ⚙️ ⚙️ ⚙️
                          </div>
                        </div>

                        {/* Dual Outputs with Animation */}
                        <div
                          className={` flex justify-center text-center mt-1 ${
                            animationStep === 2
                              ? "text-yellow-500 animate-bounce"
                              : "text-gray-500"
                          }`}
                        >
                          <FaArrowDown />
                        </div>

                        {/* Two outputs */}
                        <div className="mt-2 grid grid-cols-2 gap-3">
                          {/* Encryption Key - Stays on Device */}
                          <div className="bg-gray-900 p-2 rounded border border-green-700 relative">
                            <div className="flex justify-between">
                              <span className="font-mono text-gray-400 text-xs">
                                Master Key:
                              </span>
                              <span className="text-xs text-green-400">
                                Stays local
                              </span>
                            </div>
                            <span
                              className={`font-mono text-green-300 text-xs ${
                                animationStep === 2 ? "animate-pulse" : ""
                              }`}
                            >
                              e8f2d6b9c7a3...
                            </span>
                            {animationStep === 2 && (
                              <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-green-500 flex items-center justify-center text-xs">
                                🔒
                              </div>
                            )}
                          </div>

                          {/* Verification Hash - Will be Stored */}
                          <div className="bg-gray-900 p-2 rounded border border-yellow-700 relative">
                            <div className="flex justify-between">
                              <span className="font-mono text-gray-400 text-xs">
                                Verify Hash:
                              </span>
                              <span className="text-xs text-yellow-400">
                                To DataBase
                              </span>
                            </div>
                            <span
                              className={`font-mono text-yellow-300 text-xs ${
                                animationStep === 2 ? "animate-pulse" : ""
                              }`}
                            >
                              f29a4b7d6e3c...
                            </span>
                            {animationStep === 2 && (
                              <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-yellow-500 flex items-center justify-center text-xs">
                                📤
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Animation showing verification hash traveling to database */}
                        {animationStep === 2 && (
                          <div className="absolute w-4 h-4 bg-yellow-500 rounded-full right-0 top-1/2 transform -translate-y-1/2 animate-ping opacity-75"></div>
                        )}
                      </div>
                    </div>

                  </div>
                </div>

                {/* Right side - what's stored in database */}
                <div className="bg-gray-800 p-4 rounded-lg border border-purple-900">
                  <h4 className="text-center text-purple-400 font-semibold mb-4">
                    In Database
                  </h4>

                  <div className="space-y-6 relative">
                    {/* Database storage visualization */}
                    <div
                      className={`p-4 bg-gray-900 rounded-lg border ${
                        animationStep === 3
                          ? "border-green-700"
                          : "border-gray-700"
                      } transition-colors duration-300`}
                    >
                      <h5 className="font-semibold mb-4 text-center">
                        User Record
                      </h5>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="col-span-2 bg-gray-800 p-2 rounded">
                          <span className="font-mono text-gray-400">
                            user_id:{" "}
                          </span>
                          <span className="font-mono text-blue-300">
                            u_839472
                          </span>
                        </div>

                        <div className="bg-gray-800 p-2 rounded">
                          <span className="font-mono text-gray-400">
                            email:{" "}
                          </span>
                          <span className="font-mono text-blue-300">
                            user@example.com
                          </span>
                        </div>

                        <div className="bg-gray-800 p-2 rounded">
                          <span className="font-mono text-gray-400">
                            created_at:{" "}
                          </span>
                          <span className="font-mono text-blue-300">
                            2023-04-15
                          </span>
                        </div>

                        <div
                          className={`col-span-2 bg-gray-800 p-2 rounded ${
                            animationStep === 3 ? "border border-green-600" : ""
                          } transition-colors duration-300`}
                        >
                          <span className="font-mono text-gray-400">
                            salt:{" "}
                          </span>
                          <span
                            className={`font-mono text-purple-300 ${
                              animationStep === 3 ? "animate-pulse" : ""
                            }`}
                          >
                            a7f9ce56b3d2...
                          </span>
                        </div>

                        <div
                          className={`col-span-2 bg-gray-800 p-2 rounded ${
                            animationStep === 3 ? "border border-green-600" : ""
                          } transition-colors duration-300`}
                        >
                          <span className="font-mono text-gray-400">
                            verification_hash:{" "}
                          </span>
                          <span
                            className={`font-mono text-green-300 ${
                              animationStep === 3 ? "animate-pulse" : ""
                            }`}
                          >
                            f29a4b7d6e3c...
                          </span>
                        </div>

                        {/* What's NOT stored - Master Password */}
                        <div className="col-span-2 mt-2 flex items-center p-2 bg-red-900 bg-opacity-20 rounded-lg">
                          <FaExclamationCircle className="text-red-500 mr-2" />
                          <span className="text-red-300 text-sm font-medium">
                            Master password is <strong>never</strong> stored!
                          </span>
                        </div>

                        {/* What's NOT stored - Master Key */}
                        <div className="col-span-2 flex items-center p-2 bg-red-900 bg-opacity-20 rounded-lg">
                          <FaExclamationCircle className="text-red-500 mr-2" />
                          <span className="text-red-300 text-sm font-medium">
                            Encryption key is <strong>never</strong> sent to
                            server!
                          </span>
                        </div>

                      </div>
                    </div>


                    {/* Explanation of verification process */}
                    <div
                      className={`p-3 bg-blue-900 bg-opacity-20 rounded-lg border border-blue-700 ${
                        animationStep === 3 ? "animate-pulse" : ""
                      }`}
                    >
                      <h5 className="font-semibold mb-2">
                        How We Verify Your Password
                      </h5>
                      <ol className="list-decimal pl-5 text-sm space-y-1">
                        <li>When you enter your master password again</li>
                        <li>We use the stored salt to derive the same key</li>
                        <li>We try to decrypt the verification data</li>
                        <li>If decryption works, your password is correct!</li>
                      </ol>
                    </div>


                    {/* Explanation of security benefit */}
                    <div
                      className={`p-3 bg-gray-800 border-l-4 ${
                        animationStep === 3
                          ? "border-green-600"
                          : "border-gray-700"
                      } transition-colors duration-300`}
                    >
                      <p className="text-sm">
                        Even if the database is compromised, attackers only get
                        the salt and hash - they still can't decrypt your
                        passwords without knowing your master password.
                      </p>
                    </div>

                    {/* Animated security shield icon during final step */}
                    {animationStep === 3 && (
                      <div className="absolute -top-4 -right-4 bg-green-900 bg-opacity-30 p-2 rounded-full animate-pulse">
                        <FaShieldAlt className="text-green-500 text-2xl" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Animation controls/indicators */}
              <div className="mt-6 flex justify-center">
                <div className="flex space-x-3">
                  {[0, 1, 2, 3].map((step) => (
                    <div
                      key={step}
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        step === animationStep
                          ? "bg-blue-600 text-white"
                          : "bg-gray-700 text-gray-400"
                      } transition-all duration-300`}
                    >
                      {step === 0 && "Enter Password"}
                      {step === 1 && "Generate Salt"}
                      {step === 2 && "Derive Key"}
                      {step === 3 && "Store Securely"}
                    </div>
                  ))}
                </div>
              </div>
            </div>


            {/* Technical explanation */}
            <div className="bg-gray-800 p-4 rounded-lg mt-4">
              <h4 className="font-semibold mb-2 flex items-center">
                <FaCode className="text-blue-400 mr-2" />
                Technical Details
              </h4>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-300">
                <li>
                  We use <span className="text-blue-300 font-mono">PBKDF2</span>{" "}
                  with{" "}
                  <span className="text-blue-300 font-mono">
                    100,000 iterations
                  </span>{" "}
                  to derive your encryption key
                </li>
                <li>
                  The{" "}
                  <span className="text-yellow-300 font-mono">
                    verification hash
                  </span>{" "}
                  confirms your master password is correct
                </li>
                <li>
                  Your vault uses{" "}
                  <span className="text-green-300 font-mono">AES-256-GCM</span>{" "}
                  encryption for all passwords
                </li>
                <li>
                  Each password has its own{" "}
                  <span className="text-blue-300 font-mono">
                    initialization vector (IV)
                  </span>{" "}
                  for added security
                </li>
                <li>
                  The encrypted verification data contains a known string that
                  can only be decrypted with the correct key
                </li>
              </ul>
            </div>


          </div>
        </div>
      </div>

    </div>
  );
}