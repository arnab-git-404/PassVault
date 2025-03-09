// import { useState } from "react";
// import GeneratePassword from "./GeneratePassword";
// import SavePassword from "./ListAllPassword";
// import { toast } from "react-toastify";
// import { useGlobalContext } from "../context/context";
// // import { EncryptPassword, DecryptPassword } from "../utility/EncryptPassword";

// const PasswordManager = () => {
//   const [title, setTitle] = useState("");
//   // const [platform, setPlatform] = useState("");
//   const [password, setPassword] = useState("");

//   const { user, masterPassword } = useGlobalContext();

//   console.log("User Email In PasswordManager:", user.email);

//   const serverURL = "http://127.0.0.1:8000";
//   const token = localStorage.getItem("token");

//   const handleSavePassword = async () => {
//     if (!title) {
//       toast.error("Platform Name is required");
//       return;
//     }

//     if (!password) {
//       toast.error("Password is required");
//       return;
//     }


//     // Encrypt password with master password before sending
//     // const encryptedPassword = EncryptPassword(password, masterPassword);

//     const newEntry = { email: user.email, title, password };

//     try {
//       const res = await fetch(`${serverURL}/api/password/save-password`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(newEntry),
//       });

//       const data = await res.json();
//       // console.log(data);
//       if (data.status_code === 200) {
//         toast.success(data.message);
//         setTitle("");
//         setPassword("");
//       }
//     } catch (error) {
//       console.log("Failed to Save Password", error);
//       toast.error(error.message);
//     }
//   };



//   // // Test code
//   // const master = "Ayush";
//   // const plain = "secretPassword123";
//   // const encrypted = EncryptPassword(plain, master);
//   // const decrypted = DecryptPassword(encrypted, master);
//   // console.log("Original:", plain);
//   // console.log("Encrypted:", encrypted);
//   // console.log("Decrypted:", decrypted);
//   // console.log("Match:", plain === decrypted);



//   return (
//     <div className="w-full max-w-4xl p-6">
//       <h2 className="text-2xl font-bold mb-6 text-center">Password Manager</h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {/* Password Generation Section */}
//         <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
//           <h3 className="text-xl font-semibold mb-4"></h3>
//           <GeneratePassword />
//         </div>

//         {/* Password Saving Section */}
//         <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
//           <h3 className="text-xl font-semibold mb-4"></h3>
//           <div className="p-4 bg-gray-800 text-white rounded shadow-lg ">
//             <h2 className="text-2xl font-bold mb-4">Save Password</h2>

//             <input
//               type="text"
//               placeholder="Platform/Website Name"
//               className="w-full p-2 mb-2 bg-gray-700 rounded"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//             />

//             <input
//               type="password"
//               placeholder="Password"
//               className="w-full p-2 mb-2 bg-gray-700 rounded"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />

//             <button
//               className="w-full bg-blue-600 p-2 rounded hover:bg-blue-700"
//               on
//               onClick={handleSavePassword}
//             >
//               Save
//             </button>

//             <div className="mt-4"></div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PasswordManager;






// @ -1,32 +1,22 @@
// import { use, useState, useEffect } from "react";
// import { useState } from "react";
// import GeneratePassword from "./GeneratePassword";
// import SavePassword from "./ListAllPassword";
// import { toast } from "react-toastify";
// import { useGlobalContext } from "../context/context";
// import { useMasterPassword } from "../context/MasterPasswordContext";

// import {
//   generateSalt,
//   encryptPassword,
//   decryptPassword,
// } from "../utility/CryptoUtils";

// // import { EncryptPassword, DecryptPassword } from "../utility/EncryptPassword";

// const PasswordManager = () => {
//   const [title, setTitle] = useState("");
//   // const [platform, setPlatform] = useState("");
//   const [password, setPassword] = useState("");
//   // const [userSalt, setUserSalt] = useState("");

//   const { user } = useGlobalContext();
//   const { masterKey, masterSalt } = useMasterPassword();

//   // const masterKey = "Arnab";
//   const { user, masterPassword } = useGlobalContext();

//   console.log("User Email In PasswordManager:", user.email);

//   const serverURL = "http://127.0.0.1:8000";
//   const token = localStorage.getItem("token");


//   const handleSavePassword = async () => {

//     try {
//       const res = await fetch(`${serverURL}/api/password/save-password`, {
//         method: "POST",
//         headers: {
// @ -82,7 +46,6 @@ const PasswordManager = () => {

//       const data = await res.json();
//       // console.log(data);

//       if (data.status_code === 200) {
//         toast.success(data.message);
//         setTitle("");
// @ -94,21 +57,23 @@ const PasswordManager = () => {
//     }
//   };

//   // Test code
//   // const master = "Ayush9856";


//   // // Test code
//   // const master = "Ayush";
//   // const plain = "secretPassword123";
//   // const encrypted = encryptPassword(plain, master, userSalt);
//   // const decrypted = decryptPassword(encrypted, master, userSalt);
//   // const encrypted = EncryptPassword(plain, master);
//   // const decrypted = DecryptPassword(encrypted, master);
//   // console.log("Original:", plain);
//   // console.log("Encrypted:", encrypted);
//   // console.log("Decrypted:", decrypted);
//   // console.log("Match:", plain === decrypted);



//   return (
//     <div className="w-full max-w-4xl p-6">
//       <h2 className="text-2xl font-bold mb-6 text-center">
//         Generate Password & Save
//       </h2>
//       <h2 className="text-2xl font-bold mb-6 text-center">Password Manager</h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {/* Password Generation Section */}
// @ -140,7 +105,7 @@ const PasswordManager = () => {
//             />

//             <button
//               className=" hover:cursor-pointer w-full bg-blue-600 p-2 rounded hover:bg-blue-700"
//               className="w-full bg-blue-600 p-2 rounded hover:bg-blue-700"
//               on
//               onClick={handleSavePassword}
//             >












import React, { useState } from "react";
import { toast } from "react-toastify";
import GeneratePassword from "./GeneratePassword";
import { useGlobalContext } from "../context/context";
import { useMasterPassword } from "../context/MasterPasswordContext";
import { encryptPassword } from "../utility/CryptoUtils";

const PasswordManager = () => {
  const [title, setTitle] = useState("");
  const [password, setPassword] = useState("");

  const { user } = useGlobalContext();
  const { masterKey, masterSalt } = useMasterPassword();

  const serverURL = "http://127.0.0.1:8000";
  const token = localStorage.getItem("token");

  const handleSavePassword = async () => {
    // Validation
    if (!title) {
      toast.error("Platform Name is required");
      return;
    }

    if (!password) {
      toast.error("Password is required");
      return;
    }

    try {
      // Encrypt password and title with master key and salt
      const encryptedPassword = await encryptPassword(
        password,
        masterKey,
        masterSalt
      );

      const encryptedTitle = await encryptPassword(
        title,
        masterKey,
        masterSalt
      );

      if (!encryptedPassword || !encryptedTitle) {
        toast.error("Encryption failed");
        return;
      }

      const newEntry = { 
        email: user.email, 
        title: encryptedTitle, 
        password: encryptedPassword,
        masterSalt 
      };

      const res = await fetch(`${serverURL}/api/password/save-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newEntry),
      });

      const data = await res.json();

      if (data.status_code === 200) {
        toast.success(data.message);
        setTitle("");
        setPassword("");
      } else {
        toast.error(data.message || "Failed to save password");
      }
    } catch (error) {
      console.error("Failed to Save Password", error);
      toast.error("An error occurred while saving the password");
    }
  };

  return (
    <div className="w-full max-w-4xl p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Password Manager
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Password Generation Section */}
        <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
          <GeneratePassword />
        </div>

        {/* Password Saving Section */}
        <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
          <div className="p-4 bg-gray-800 text-white rounded shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Save Password</h2>

            <input
              type="text"
              placeholder="Platform/Website Name"
              className="w-full p-2 mb-2 bg-gray-700 rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 mb-2 bg-gray-700 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              className="w-full bg-blue-600 p-2 rounded hover:bg-blue-700"
              onClick={handleSavePassword}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordManager;