// import { pbkdf2Sync, randomBytes } from 'crypto-browserify'; // You'll need to install this


// // Generate a strong key from master password
// export function deriveKey(masterPassword, salt, iterations = 100000) {
//   const key = pbkdf2Sync(
//     masterPassword,
//     salt,
//     iterations,
//     32, // 256 bits
//     'sha256'
//   );
//   return key.toString('hex');
// }


// // Generate a verification hash to check if master password is correct
// export function generateVerificationHash(derivedKey) {
//   // This would be better with bcrypt or argon2 in a real app
//   const verificationSalt = randomBytes(16).toString('hex');
//   const verificationHash = pbkdf2Sync(
//     derivedKey,
//     verificationSalt,
//     10000,
//     32,
//     'sha256'
//   ).toString('hex');
  
//   return { verificationHash, verificationSalt };
// }


// // Verify master password is correct
// export function verifyMasterPassword(enteredPassword, userSalt, storedVerificationHash, verificationSalt, iterations = 100000) {
//   const derivedKey = deriveKey(enteredPassword, userSalt, iterations);
//   const checkHash = pbkdf2Sync(
//     derivedKey,
//     verificationSalt,
//     10000,
//     32,
//     'sha256'
//   ).toString('hex');
  
//   return checkHash === storedVerificationHash;
// }