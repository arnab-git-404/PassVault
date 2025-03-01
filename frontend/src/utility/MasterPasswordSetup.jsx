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