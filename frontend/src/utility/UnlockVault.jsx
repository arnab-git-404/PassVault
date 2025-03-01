// import { useState } from "react";
// import { toast } from "react-toastify";
// import { deriveKey, verifyMasterPassword } from "./MasterPasswordSetup";

// const UnlockVault = ({ userKeyData, onUnlock }) => {
//   const [masterPassword, setMasterPassword] = useState("");
  
//   const handleUnlock = () => {
//     try {
//       const { userSalt, verificationHash, verificationSalt } = userKeyData;
      
//       const isValid = verifyMasterPassword(
//         masterPassword,
//         userSalt,
//         verificationHash,
//         verificationSalt
//       );
      
//       if (isValid) {
//         // Generate the actual encryption key
//         const derivedKey = deriveKey(masterPassword, userSalt);
        
//         // Store in memory for the session (better to use a more secure method)
//         sessionStorage.setItem('tempDerivedKey', derivedKey);
        
//         onUnlock(derivedKey);
//         toast.success("Vault unlocked!");
//       } else {
//         toast.error("Incorrect master password");
//       }
//     } catch (error) {
//       toast.error("Failed to unlock vault");
//       console.error(error);
//     }
//   };

//   return (
//     <div className="p-4 bg-gray-800 text-white rounded shadow-lg">
//       <h2 className="text-2xl font-bold mb-4">Unlock Your Vault</h2>
//       <p className="mb-4 text-gray-300">
//         Enter your master password to access your passwords
//       </p>
      
//       <input
//         type="password"
//         placeholder="Master Password"
//         className="w-full p-2 mb-4 bg-gray-700 rounded"
//         value={masterPassword}
//         onChange={(e) => setMasterPassword(e.target.value)}
//       />
      
//       <button
//         className="w-full bg-blue-600 p-2 rounded hover:bg-blue-700"
//         onClick={handleUnlock}
//       >
//         Unlock
//       </button>
//     </div>
//   );
// };

// export default UnlockVault;