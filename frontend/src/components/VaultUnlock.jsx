import { useState } from "react";
import { toast } from "react-toastify";
import { useMasterPassword } from "../context/MasterPasswordContext";


const VaultUnlock = () => {
  const [password, setPassword] = useState("");
  const {verifyMasterPassword } = useMasterPassword();
  const [Loading , setIsLoading] = useState(false);

  const { 
    isSetup, 
    isUnlocked, 
    unlockVault, 
    setupMasterPassword,
  masterKey } = useMasterPassword();
    
  const handleUnlock = async () => {
    
    setIsLoading(true);

    if (!password) {
      toast.error("Please enter your master password");
      return;
    }

    try {
      const isCorrect = await verifyMasterPassword(password);

      if (isCorrect) {
        // Password is correct, unlock the vault
        const vaultStatus =  await unlockVault(password);
        console.log("Is Vault Unlocked?:", isUnlocked);
        

        // if( vaultStatus ){
        //   toast.success("Vault unlocked!");
        //   setPassword("");
        // }
        
      } else {
        toast.error("Incorrect master password");
      }
    } catch (error) {
      console.error("Error unlocking vault:", error);
      toast.error("Failed to unlock vault");
    } finally {
      setIsLoading(false);
    }


  };


  if (!isUnlocked) {
    return (
      <div className="w-full max-w-md p-6 bg-gray-900 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Unlock Your Vault</h2>
        <p className="mb-4 text-gray-300">
          Enter your master password to access your saved passwords.
        </p>

        <input
          type="password"
          placeholder="Master Password"
          className="w-full p-2 mb-4 bg-gray-700 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleUnlock()}
        />

        <button
          className="hover:cursor-pointer w-full bg-blue-600 p-2 rounded"
          onClick={handleUnlock}
        >
          Unlock Vault
        </button>
      </div>
    );
  }

  return null; // If unlocked, don't render anything
};

export default VaultUnlock;