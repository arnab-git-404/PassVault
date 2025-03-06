// Create a new file: utility/CryptoUtils.js
// We'll use the SubtleCrypto API which is built into browsers

// Convert string to bytes
const textToBytes = (text) => {
  return new TextEncoder().encode(text);
};

// Convert bytes to string
const bytesToText = (bytes) => {
  return new TextDecoder().decode(bytes);
};

// Convert hex string to bytes
const hexToBytes = (hex) => {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  }
  return bytes;
};

// Convert bytes to hex string
const bytesToHex = (bytes) => {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};

// Generate a random salt
export const generateSalt = () => {
  const array = new Uint8Array(16);
  window.crypto.getRandomValues(array);
  return bytesToHex(array);
};


// Encrypt a password with the master key
export const encryptPassword = async (plainPassword, masterPassword, salt) => {
  try {
    // 1. Create a key from the master password
    const keyMaterial = await window.crypto.subtle.importKey(
      "raw",
      textToBytes(masterPassword),
      { name: "PBKDF2" },
      false,
      ["deriveBits", "deriveKey"]
    );

    // 2. Derive an encryption key using PBKDF2
    const key = await window.crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: hexToBytes(salt),
        iterations: 100000,
        hash: "SHA-256",
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt"]
    );

    // 3. Create a random initialization vector (IV)
    const iv = window.crypto.getRandomValues(new Uint8Array(12));

    // 4. Encrypt the password
    const encryptedData = await window.crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      key,
      textToBytes(plainPassword)
    );

    // 5. Combine IV and encrypted data for storage
    const encryptedArray = new Uint8Array(iv.length + encryptedData.byteLength);
    encryptedArray.set(iv, 0);
    encryptedArray.set(new Uint8Array(encryptedData), iv.length);

    // 6. Return as hex string for easy storage
    return bytesToHex(encryptedArray);
  } catch (error) {
    console.error("Encryption error:", error);
    return null;
  }
};

// Decrypt a password with the master key
export const decryptPassword = async (encryptedHex, masterPassword, salt) => {
  try {
    // 1. Convert hex to bytes
    const encryptedArray = hexToBytes(encryptedHex);

    // 2. Extract the IV (first 12 bytes)
    const iv = encryptedArray.slice(0, 12);

    // 3. Extract the encrypted data (rest of the bytes)
    const encryptedData = encryptedArray.slice(12);

    // 4. Create a key from the master password (same as in encrypt)
    const keyMaterial = await window.crypto.subtle.importKey(
      "raw",
      textToBytes(masterPassword),
      { name: "PBKDF2" },
      false,
      ["deriveBits", "deriveKey"]
    );

    // 5. Derive the same encryption key
    const key = await window.crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: hexToBytes(salt),
        iterations: 100000,
        hash: "SHA-256",
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      false,
      ["decrypt"]
    );

    // 6. Decrypt the data
    const decryptedData = await window.crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      key,
      encryptedData
    );

    // 7. Convert bytes back to text
    return bytesToText(new Uint8Array(decryptedData));
  } catch (error) {
    console.error("Decryption error:", error);
    return null;
  }
};
