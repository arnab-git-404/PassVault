import React, { createContext, useContext, useState, useEffect } from "react";
import {
  generateSalt,
  encryptPassword,
  decryptPassword,
} from "../utility/CryptoUtils";
import { toast } from "react-toastify";
import axios from "axios";
import { useGlobalContext } from "./context";


const MasterPasswordContext = createContext();

export const useMasterPassword = () => useContext(MasterPasswordContext);

export const MasterPasswordProvider = ({ children }) => {

  const [isSetup, setIsSetup] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const [verificationHash, setVerificationHash] = useState('');
  const [masterSalt, setMasterSalt] = useState('');
  const [masterIv, setMasterIv] = useState('');
  const [masterKey, setMasterKey] = useState('');
  
 const { userLoggedIn } = useGlobalContext();

 const serverUrl = import.meta.env.VITE_APP_SERVER_URL;
 
  // Check if master password is already set up
  useEffect(() => {
    const checkMasterKeySetup = async () => {
      try {

        // First check localStorage for offline access
        const saltHex = localStorage.getItem('masterKeySalt');
        const ivHex = localStorage.getItem('masterKeyIv');
        const verificationHex = localStorage.getItem('masterKeyVerification');
        
        //Debuging
        console.log("1st Stage")

        if (saltHex && ivHex && verificationHex) {
          setMasterSalt(saltHex);
          setMasterIv(ivHex);
          setVerificationHash(verificationHex);
          setIsSetup(true);
        }

        console.log("2ns Stage")
        
        // Try to get from server if user is logged in
        const token = localStorage.getItem('token');
        if (token) {
          console.log(token)
          console.log("3rd Stage")

          const response = await axios.get(`${serverUrl}/api/user/get-masterKeyHash`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          console.log("4th Stage");


          console.log("Response For HashedData:" + response)
        

          if (response.data.is_setup) {
            // Save to state
            setMasterSalt(response.data.salt );
            setMasterIv(response.data.iv);
            setVerificationHash(response.data.verification_hash);
            setIsSetup(true);
            

            // Also save to localStorage for offline access
            localStorage.setItem('masterKeySalt', response.data.salt);
            localStorage.setItem('masterKeyIv', response.data.iv);
            localStorage.setItem('masterKeyVerification', response.data.verification_hash);
          }
        }
      } catch (error) {
        console.error("Error checking master key setup:", error);
      }
    };

    checkMasterKeySetup();
  }, [userLoggedIn]);


  // Setup master password
  const setupMasterPassword = async (password) => {
    try {

      // Generate salt
      const salt = crypto.getRandomValues(new Uint8Array(16));
      const saltHex = Array.from(salt)
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");


      // Derive the master key
      const keyMaterial = await crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(password),
        { name: "PBKDF2" },
        false,
        ["deriveBits", "deriveKey"]
      );
      
      const derivedKey = await crypto.subtle.deriveKey(
        {
          name: "PBKDF2",
          salt,
          iterations: 100000,
          hash: "SHA-256",
        },
        keyMaterial,
        { name: "AES-GCM", length: 256 },
        true,
        ["encrypt", "decrypt"]
      );

      // Create verification data
      const verificationData = new TextEncoder().encode("PASSVAULT_VERIFICATION");
      
      // Generate IV for encryption
      const iv = crypto.getRandomValues(new Uint8Array(12));
      const ivHex = Array.from(iv)
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
      
      // Encrypt the verification data
      const encryptedVerification = await crypto.subtle.encrypt(
        {
          name: "AES-GCM",
          iv,
        },
        derivedKey,
        verificationData
      );
      
      // Convert to hex for storage
      const verificationHex = Array.from(new Uint8Array(encryptedVerification))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
      
      // Save to localStorage
      localStorage.setItem("masterKeySalt", saltHex);
      localStorage.setItem("masterKeyIv", ivHex);
      localStorage.setItem("masterKeyVerification", verificationHex);
      
      // Save to state
      setMasterSalt(saltHex);
      setMasterIv(ivHex);
      setVerificationHash(verificationHex);
      setIsSetup(true);
      setIsUnlocked(true);
      
      console.log("This Data From MasterPassword Context During SetUp Master Key: ","Salt:" , saltHex , "Iv:"+ivHex, "Verification:"+verificationHex );


      // Export the key for in-memory use
      const rawKey = await crypto.subtle.exportKey("raw", derivedKey);
      setMasterKey(rawKey);
      
      // Save to server if logged in
      const token = localStorage.getItem('token');
      if (token) {
        await axios.post(`${serverUrl}/api/user/set-masterKeyHash`, 
          { 
            verification_hash: verificationHex,
            salt: saltHex,
            iv: ivHex
          },
          {
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            }
          }
        );
        console.log("VerifyHash:" , verificationHex , "\nVerifySalt:"+saltHex, "\nVerifyIv:"+ivHex );

      }
      
      toast.success("Master password set up successfully");
      return true;
    } catch (error) {
      console.error("Error setting up master password:", error);
      toast.error("Failed to set up master password");
      return false;
    }
  };


  // Verify master password
  const verifyMasterPassword = async (password) => {
  try {
    const saltHex = masterSalt || localStorage.getItem('masterKeySalt');
    const ivHex = masterIv || localStorage.getItem('masterKeyIv');
    const verificationHex = verificationHash || localStorage.getItem('masterKeyVerification');
    
    if (!saltHex || !ivHex || !verificationHex) {
      return false; // No verification data found
    }
    
    // Convert hex strings back to Uint8Array
    const salt = new Uint8Array(saltHex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
    const iv = new Uint8Array(ivHex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
    const storedVerification = new Uint8Array(verificationHex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
    
    // Derive the key using the same parameters
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(password),
      { name: 'PBKDF2' },
      false,
      ['deriveBits', 'deriveKey']
    );
    
    const masterKey = await crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt,
        iterations: 100000,
        hash: 'SHA-256'
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['decrypt']
    );
    
    // Try to decrypt the verification data
    try {
      const decrypted = await crypto.subtle.decrypt(
        {
          name: 'AES-GCM',
          iv
        },
        masterKey,
        storedVerification
      );
      
      // Check if the decrypted data is our verification string
      const decryptedText = new TextDecoder().decode(decrypted);
      return decryptedText === 'PASSVAULT_VERIFICATION';
    } catch (e) {
      // Decryption failed - wrong password
      return false;
    }
  } catch (error) {
    console.error("Error verifying master password:", error);
    return false;
  }
  };



  // Unlock vault with password
  const unlockVault = async (password) => {
  try {
    const isValid = await verifyMasterPassword(password);
    
    if (isValid) {
      // Derive the master key for in-memory use (don't store the actual password)
      const saltHex = masterSalt || localStorage.getItem('masterKeySalt');
      const salt = new Uint8Array(saltHex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
      
      const keyMaterial = await crypto.subtle.importKey(
        'raw',
        new TextEncoder().encode(password),
        { name: 'PBKDF2' },
        false,
        ['deriveBits', 'deriveKey']
      );
      
      const key = await crypto.subtle.deriveKey(
        {
          name: 'PBKDF2',
          salt,
          iterations: 100000,
          hash: 'SHA-256'
        },
        keyMaterial,
        { name: 'AES-GCM', length: 256 },
        true,
        ['encrypt', 'decrypt']
      );
      
      // Store the key in memory
      const rawKey = await crypto.subtle.exportKey("raw", key);
      setMasterKey(rawKey);
      setIsUnlocked(true);
      toast.success("Vault unlocked successfully");
      return true;
    } else {
      toast.error("Incorrect master password");
      return false;
    }
  } catch (error) {
    console.error("Error unlocking vault:", error);
    toast.error("Failed to unlock vault");
    return false;
  }
  };

  // Lock the vault
  const lockVault = () => {
    setMasterKey(() => null);
    setIsUnlocked(() => false);
      // Force a state update by using localStorage as a backup signal
  localStorage.setItem('vaultLockTimestamp', Date.now().toString());
  
  toast.success("Vault locked");
  
  console.log("Vault locked: isUnlocked set to false");
  };


  const getMasterCryptoKey = async () => {
    if (!masterKey) {
      console.error("No master key available");
      return null;
    }
    
    try {
      // Import the raw key material back as a CryptoKey
      return await crypto.subtle.importKey(
        'raw',
        masterKey,
        { name: 'AES-GCM', length: 256 },
        false,
        ['encrypt', 'decrypt']
      );
    } catch (error) {
      console.error("Error converting master key:", error);
      return null;
    }
  };

  // For debugging purposes, you can add this helper
  const arrayBufferToHex = (buffer) => {
    return Array.from(new Uint8Array(buffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  };












  return (
    <MasterPasswordContext.Provider
      value={{
        isSetup,
        isUnlocked,
        masterKey,
        masterSalt,
        setupMasterPassword,
        unlockVault,
        verifyMasterPassword,
        lockVault,
        getMasterCryptoKey,
      }}
    >
      {children}
    </MasterPasswordContext.Provider>
  );
};

