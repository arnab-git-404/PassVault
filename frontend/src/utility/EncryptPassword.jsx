// // // Enhanced encryption with key derivation
// // export const EncryptPassword = (plainPassword, masterPassword) => {
// //   // Create a stronger key from master password
// //   const salt = CryptoJS.lib.WordArray.random(128 / 8);
// //   const key = CryptoJS.PBKDF2(masterPassword, salt, {
// //     keySize: 256 / 32,
// //     iterations: 1000,
// //   });

// //   // Encrypt with derived key
// //   const iv = CryptoJS.lib.WordArray.random(128 / 8);
// //   const encrypted = CryptoJS.AES.encrypt(plainPassword, key, {
// //     iv: iv,
// //   });

// //   // Store everything needed for decryption
// //   return salt.toString() + ":" + iv.toString() + ":" + encrypted.toString();
// // };

// // // Decrypt a password using the master password
// // export const DecryptPassword = (encryptedString, masterPassword) => {
// //   try {
// //     // Split the string to extract salt, IV, and encrypted data
// //     const parts = encryptedString.split(':');
// //     if (parts.length !== 3) {
// //       throw new Error('Invalid encrypted format');
// //     }
    
// //     const salt = CryptoJS.enc.Hex.parse(parts[0]);
// //     const iv = CryptoJS.enc.Hex.parse(parts[1]);
// //     const encrypted = parts[2];
    
// //     // Derive the key using the same parameters as in encryption
// //     const key = CryptoJS.PBKDF2(masterPassword, salt, {
// //       keySize: 256/32,
// //       iterations: 1000
// //     });
    
// //     // Decrypt with the derived key and IV
// //     const decrypted = CryptoJS.AES.decrypt(encrypted, key, {
// //       iv: iv
// //     });
    
// //     return decrypted.toString(CryptoJS.enc.Utf8);
// //   } catch (error) {
// //     console.error("Decryption failed:", error);
// //     return "Decryption failed";
// //   }
// // };

// // export const RevealPassword = (plainPassword, masterPassword) => {
// // }


// import CryptoJS from 'crypto-js';

// export function EncryptPassword(plainText, masterPassword) {
//   try {
//     // Add salt and IV for better security
//     const salt = CryptoJS.lib.WordArray.random(128/8);
//     const iv = CryptoJS.lib.WordArray.random(128/8);
    
//     // Generate key from password and salt
//     const key = CryptoJS.PBKDF2(masterPassword, salt, {
//       keySize: 256/32,
//       iterations: 10000
//     });
    
//     // Encrypt
//     const encrypted = CryptoJS.AES.encrypt(plainText, key, { 
//       iv: iv,
//       padding: CryptoJS.pad.Pkcs7,
//       mode: CryptoJS.mode.CBC
//     });
    
//     // Combine for storage - salt:iv:ciphertext
//     const result = salt.toString() + ':' + iv.toString() + ':' + encrypted.toString();
//     return result;
//   } catch (error) {
//     console.error('Encryption failed:', error);
//     return null;
//   }
// }

// export function DecryptPassword(cipherText, masterPassword) {
//   try {
//     // Split the combined data
//     const parts = cipherText.split(':');
//     if (parts.length !== 3) throw new Error('Invalid encrypted format');
    
//     const salt = CryptoJS.enc.Hex.parse(parts[0]);
//     const iv = CryptoJS.enc.Hex.parse(parts[1]);
//     const encrypted = parts[2];
    
//     // Regenerate the key using same salt
//     const key = CryptoJS.PBKDF2(masterPassword, salt, {
//       keySize: 256/32,
//       iterations: 10000
//     });
    
//     // Decrypt
//     const decrypted = CryptoJS.AES.decrypt(encrypted, key, { 
//       iv: iv,
//       padding: CryptoJS.pad.Pkcs7,
//       mode: CryptoJS.mode.CBC
//     });
    
//     return decrypted.toString(CryptoJS.enc.Utf8);
//   } catch (error) {
//     console.error('Decryption failed:', error);
//     return null;
//   }
// }