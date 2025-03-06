# 🔐 PassVault - Secure Password Manager

PassVault is a **secure, client-side password manager** that encrypts and decrypts passwords using a **Master Password**. The encryption process follows **AES-GCM (256-bit encryption)** with **PBKDF2 key derivation**, ensuring that your sensitive data is stored securely.

---

## 🚀 Features

✅ **Master Password-Based Encryption** - Your Master Password never gets stored; it is only used to derive a secure key for encrypting/decrypting data.

✅ **AES-GCM Encryption** - Military-grade encryption to store passwords securely.

✅ **Secure Vault Unlocking** - Unlock vaults using your Master Password.

✅ **Session-Based Security** - The Master Key is stored **only in memory** and never saved permanently.

✅ **Password Generation & Management** - Easily create, store, and manage encrypted passwords.

✅ **Offline-First Approach** - Works without a backend; encrypted passwords can be stored locally or on a server.

✅ **Zero-Knowledge Security** - No Master Password or encryption keys are stored anywhere.

---

## 📂 Project Structure

```
├── src
│   ├── context
│   │   ├── MasterPasswordContext.jsx   # Manages Master Password & Vault Unlocking
│   ├── components
│   │   ├── MasterPasswordSetup.jsx     # UI for setting up the Master Password
│   │   ├── VaultUnlock.jsx             # UI for unlocking the vault
│   │   ├── ShowAllPassword.jsx         # UI for managing stored passwords
│   ├── utility
│   │   ├── CryptoUtils.jsx             # Encryption & Decryption utilities
│   ├── App.js                          # Main application entry point
├── public
│   ├── index.html
├── package.json
├── README.md
```

---

## ⚙️ Installation & Setup

### **1️⃣ Clone the Repository**

```sh
$ git clone https://github.com/your-username/passvault.git
$ cd passvault
```

### **2️⃣ Install Dependencies**

```sh
$ npm install
```

### **3️⃣ Start the Development Server**

```sh
$ npm start
```

### **4️⃣ Build for Production**

```sh
$ npm run build
```

---

## 🔑 How It Works

### **1️⃣ First-Time User - Set Up Master Password**

- The user sets a **Master Password**.
- The system generates a **cryptographic key using PBKDF2**.
- A verification hash is stored securely for future authentication.

### **2️⃣ Returning User - Unlock Vault**

- User enters the Master Password.
- The system **re-derives the Master Key** using PBKDF2.
- The vault is unlocked, allowing encryption/decryption of stored passwords.

### **3️⃣ Encrypt & Decrypt Passwords**

- Passwords are stored securely in an **encrypted format using AES-GCM**.
- Only the correct Master Password can decrypt them.

### **4️⃣ Master Key Storage Policy**

- The **Master Key is NEVER stored permanently** (Only in session memory).
- After refreshing or logging out, the Master Password must be entered again to derive the key.

---

## 🔒 Security Considerations

🔹 **Zero-Knowledge Encryption**: No sensitive data (Master Password or encryption key) is stored anywhere. If the Master Password is lost, encrypted passwords cannot be recovered.

🔹 **AES-GCM Encryption**: Secure and efficient encryption method used by modern security applications.

🔹 **PBKDF2 Key Derivation**: Strengthens password security with 100,000 iterations.

🔹 **Session-Based Security**: The Master Key is kept **only in memory**, reducing the risk of leaks.

---

## ✨ Future Enhancements

- 🔹 Implement **2FA for additional security**.
- 🔹 Allow **password export/import** with encryption.
- 🔹 Build a **browser extension for autofill**.

---

## 👥 Contributing

Pull requests are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`feature-xyz`).
3. Commit your changes.
4. Push to your fork and submit a pull request.

---

## 📄 License

This project is licensed under the **MIT License**. Feel free to use and modify it.

---

## 💡 Need Help?

If you have any questions or run into issues, feel free to [open an issue](https://github.com/your-username/passvault/issues) or contact me via GitHub!

🚀 **Happy Coding & Stay Secure!** 🔐

