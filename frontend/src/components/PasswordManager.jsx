import { useState } from "react";
import GeneratePassword from "./GeneratePassword";
import SavePassword from "./ListAllPassword";
import { toast } from "react-toastify";
import { useGlobalContext } from "../context/context";
// import { EncryptPassword, DecryptPassword } from "../utility/EncryptPassword";

const PasswordManager = () => {
  const [title, setTitle] = useState("");
  // const [platform, setPlatform] = useState("");
  const [password, setPassword] = useState("");

  const { user, masterPassword } = useGlobalContext();

  console.log("User Email In PasswordManager:", user.email);

  const serverURL = "http://127.0.0.1:8000";
  const token = localStorage.getItem("token");

  const handleSavePassword = async () => {
    if (!title) {
      toast.error("Platform Name is required");
      return;
    }

    if (!password) {
      toast.error("Password is required");
      return;
    }


    // Encrypt password with master password before sending
    // const encryptedPassword = EncryptPassword(password, masterPassword);

    const newEntry = { email: user.email, title, password };

    try {
      const res = await fetch(`${serverURL}/api/password/save-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newEntry),
      });

      const data = await res.json();
      // console.log(data);
      if (data.status_code === 200) {
        toast.success(data.message);
        setTitle("");
        setPassword("");
      }
    } catch (error) {
      console.log("Failed to Save Password", error);
      toast.error(error.message);
    }
  };



  // // Test code
  // const master = "Ayush";
  // const plain = "secretPassword123";
  // const encrypted = EncryptPassword(plain, master);
  // const decrypted = DecryptPassword(encrypted, master);
  // console.log("Original:", plain);
  // console.log("Encrypted:", encrypted);
  // console.log("Decrypted:", decrypted);
  // console.log("Match:", plain === decrypted);



  return (
    <div className="w-full max-w-4xl p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Password Manager</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Password Generation Section */}
        <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4"></h3>
          <GeneratePassword />
        </div>

        {/* Password Saving Section */}
        <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4"></h3>
          <div className="p-4 bg-gray-800 text-white rounded shadow-lg ">
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
              on
              onClick={handleSavePassword}
            >
              Save
            </button>

            <div className="mt-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordManager;
