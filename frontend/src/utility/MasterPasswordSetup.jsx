// import { useState } from "react";
// import { toast } from "react-toastify";
// import { useMasterPassword } from "../context/MasterPasswordContext";
// import { FaEye, FaEyeSlash } from "react-icons/fa"; // Make sure react-icons is installed

// const MasterPasswordSetup = () => {
//   const [masterPassword, setMasterPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   // Get the setupMasterPassword function from context
//   const { setupMasterPassword, isSetup } = useMasterPassword();

//   const handleSetup = async () => {
//     // 1. Basic validation
//     if (masterPassword.length < 8) {
//       toast.error("Master password must be at least 8 characters");
//       return;
//     }

//     if (masterPassword !== confirmPassword) {
//       toast.error("Passwords don't match");
//       return;
//     }

//     // Show loading state
//     setIsLoading(true);

//     try {
//       // Use the setupMasterPassword from context which handles all crypto
//       // operations and server communication
//       const success = await setupMasterPassword(masterPassword);

//       if (success) {
//         // Reset form fields after successful setup
//         setMasterPassword("");
//         setConfirmPassword("");
//       }
//     } catch (error) {
//       console.error("Error setting up master password:", error);
//       toast.error("Failed to set up master password");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="w-full max-w-md p-6 bg-gray-900 rounded-lg shadow-lg">
//       <h1 className="text-2xl font-bold mb-4">Create Master Password</h1>

//       { isSetup ? (
//         <>
//           <h1 className="text-green-500 font-bold">
//             Already Created
//           </h1>

//           {/* <p className="text-green-5" > Just Unlock Your Vault and Start Working</p> */}
//           <button
//             onClick={() => {
//               toast.success("Coming Soon....");
//             }}
//             className=" hover:cursor-pointer font-bold bg-red-600 px-4 py-2 rounded mt-4 "
//           >
//             Reset
//           </button>
//         </>
//       ) : (

//         <>
//           <p className="mb-4 text-gray-300">
//             This password will protect all your saved passwords. Make sure it's
//             strong and you don't forget it - it cannot be recovered!
//           </p>

//           <div className="mb-4">
//             <label className="block text-gray-300 mb-1">Master Password</label>
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Enter a strong password"
//                 className="w-full p-2 bg-gray-700 rounded pr-10"
//                 value={masterPassword}
//                 onChange={(e) => setMasterPassword(e.target.value)}
//                 disabled={isLoading}
//               />
//               <button
//                 type="button"
//                 className="hover:cursor-pointer absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-200"
//                 onClick={() => setShowPassword(!showPassword)}
//                 disabled={isLoading}
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </button>
//             </div>
//           </div>

//           <div className="mb-6">
//             <label className="block text-gray-300 mb-1">
//               Confirm Master Password
//             </label>
//             <div className="relative">
//               <input
//                 type={showConfirmPassword ? "text" : "password"}
//                 placeholder="Re-enter your password"
//                 className="w-full p-2 bg-gray-700 rounded pr-10"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 disabled={isLoading}
//               />
//               <button
//                 type="button"
//                 className="hover:cursor-pointer absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-200"
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                 disabled={isLoading}
//               >
//                 {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
//               </button>
//             </div>
//           </div>

//           <button
//             className={` hover:cursor-pointer  w-full p-2 rounded font-medium ${
//               isLoading
//                 ? "bg-blue-800 cursor-not-allowed"
//                 : "bg-blue-600 hover:bg-blue-700"
//             }`}
//             onClick={handleSetup}
//             disabled={isLoading}
//           >
//             {isLoading ? "Setting up..." : "Set Master Password"}
//           </button>

//           <p className="mt-4 text-sm text-gray-400">
//             Note: Your master password is used to encrypt your vault. If you
//             forget it, there's no way to recover your stored passwords.
//           </p>
//         </>
//       )}
//     </div>
//   );
// };

// export default MasterPasswordSetup;



// import { useState } from "react";
// import { toast } from "react-toastify";
// import { deriveKey, generateVerificationHash } from './MasterKeyUtils'
// // import { randomBytes } from 'crypto-browserify';



// const MasterPasswordSetup = ({ onSetupComplete }) => {
//   const [masterPassword, setMasterPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const handleSetupMasterPassword = async () => {
//     if (masterPassword.length < 8) {
//       toast.error("Master password must be at least 8 characters");
//       return;
//     }
    
//     if (masterPassword !== confirmPassword) {
//       toast.error("Passwords don't match");
//       return;
//     }

//     try {
//       // Generate unique salt for this user
//       const userSalt = randomBytes(16).toString('hex');
      
//       // Derive the key that will be used for encryption
//       const derivedKey = deriveKey(masterPassword, userSalt);
      
//       // Generate verification data
//       const { verificationHash, verificationSalt } = generateVerificationHash(derivedKey);
      
//       // This would be sent to your server and stored with the user record
//       // Don't store the master password or derived key!
//       await saveUserKeyData({
//         userSalt,
//         verificationHash,
//         verificationSalt
//       });
      
//       // Store derived key in memory only (never in localStorage/sessionStorage)
//       sessionStorage.setItem('tempDerivedKey', derivedKey); // Note: Better to use a more secure in-memory solution
      
//       toast.success("Master password created successfully!");
//       onSetupComplete();
//     } catch (error) {
//       toast.error("Failed to set up master password");
//       console.error(error);
//     }
//   };

//   // Mock function - implement actual API call
//   const saveUserKeyData = async (data) => {
//     // API call to save the verification data
//     console.log("Saving key data:", data);
//     return true;
//   };

//   return (
//     <div className="p-4 bg-gray-800 text-white rounded shadow-lg">
//       <h2 className="text-2xl font-bold mb-4">Create Master Password</h2>
//       <p className="mb-4 text-gray-300">
//         This password will encrypt all your saved passwords. 
//         If you forget it, your data cannot be recovered.
//       </p>
      
//       <input
//         type="password"
//         placeholder="Master Password"
//         className="w-full p-2 mb-2 bg-gray-700 rounded"
//         value={masterPassword}
//         onChange={(e) => setMasterPassword(e.target.value)}
//       />
      
//       <input
//         type="password"
//         placeholder="Confirm Master Password"
//         className="w-full p-2 mb-4 bg-gray-700 rounded"
//         value={confirmPassword}
//         onChange={(e) => setConfirmPassword(e.target.value)}
//       />
      
//       <button
//         className="w-full bg-blue-600 p-2 rounded hover:bg-blue-700"
//         onClick={handleSetupMasterPassword}
//       >
//         Set Master Password
//       </button>
//     </div>
//   );
// };

// export default MasterPasswordSetup;



import React, { useState } from "react";
import { toast } from "react-toastify";
import { useMasterPassword } from "../context/MasterPasswordContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const MasterPasswordSetup = () => {
  const [masterPassword, setMasterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { setupMasterPassword, isSetup } = useMasterPassword();

  const handleSetup = async () => {
    // Enhanced validation
    if (masterPassword.length < 8) {
      toast.error("Master password must be at least 8 characters long");
      return;
    }

    // Add complexity check
    const hasUppercase = /[A-Z]/.test(masterPassword);
    const hasLowercase = /[a-z]/.test(masterPassword);
    const hasNumber = /[0-9]/.test(masterPassword);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(masterPassword);

    if (!(hasUppercase && hasLowercase && hasNumber && hasSpecialChar)) {
      toast.error("Password must include uppercase, lowercase, number, and special character");
      return;
    }

    if (masterPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const success = await setupMasterPassword(masterPassword);

      if (success) {
        // Reset form fields after successful setup
        setMasterPassword("");
        setConfirmPassword("");
        toast.success("Master password set up successfully!");
      }
    } catch (error) {
      console.error("Error setting up master password:", error);
      toast.error("Failed to set up master password");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  // console.log(isSetup)

  const renderPasswordInput = (
    label, 
    value, 
    onChange,
    showPass,
    onToggleVisibility
  ) => (
    <div className="mb-4">
      <label className="block text-gray-300 mb-1">{label}</label>
      <div className="relative">
        <input
          type={showPass ? "text" : "password"}
          placeholder={`Enter ${label.toLowerCase()}`}
          className="w-full p-2 bg-gray-700 rounded pr-10"
          value={value}
          onChange={onChange}
          disabled={isLoading}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-200"
          onClick={onToggleVisibility}
          disabled={isLoading}
        >
          {showPass ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
    </div>
  );

  if (isSetup) {
    return (
      <div className="w-full max-w-md p-6 bg-gray-900 rounded-lg shadow-lg">
        <h1 className="text-green-500 font-bold text-xl mb-4">Master Password Already Created</h1>
        <button
          onClick={() => toast.info("Vault reset functionality coming soon")}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Reset Vault
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md p-6 bg-gray-900 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Create Master Password</h1>

      <p className="mb-4 text-gray-300">
        Create a strong master password to protect your vault. 
        It must be at least 12 characters long and include uppercase, 
        lowercase, numbers, and special characters.
      </p>

      {renderPasswordInput(
        "Master Password", 
        masterPassword, 
        (e) => setMasterPassword(e.target.value),
        showPassword,
        () => togglePasswordVisibility('password')
      )}

      {renderPasswordInput(
        "Confirm Master Password", 
        confirmPassword, 
        (e) => setConfirmPassword(e.target.value),
        showConfirmPassword,
        () => togglePasswordVisibility('confirm')
      )}

      <button
        className={`w-full p-2 rounded font-medium ${
          isLoading
            ? "bg-blue-800 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
        onClick={handleSetup}
        disabled={isLoading}
      >
        {isLoading ? "Setting up..." : "Set Master Password"}
      </button>

      <p className="mt-4 text-sm text-gray-400">
        Warning: If you forget your master password, 
        there is no way to recover your stored passwords.
      </p>
    </div>
  );
};

export default MasterPasswordSetup;