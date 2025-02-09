import { useState } from "react";

export default function SavePassword() {
  const [platform, setPlatform] = useState("");
  const [password, setPassword] = useState("");
  const [savedPasswords, setSavedPasswords] = useState([]);

  const handleSave = () => {
    if (platform && password) {
      const newEntry = { platform, password };
      setSavedPasswords([...savedPasswords, newEntry]);
      setPlatform("");
      setPassword("");
    }
  };

  return (
    <div className="p-4 bg-gray-800 text-white rounded shadow-lg w-96">
      <h2 className="text-2xl font-bold mb-4">Save Password</h2>

      <input
        type="text"
        placeholder="Platform Name"
        className="w-full p-2 mb-2 bg-gray-700 rounded"
        value={platform}
        onChange={(e) => setPlatform(e.target.value)}
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
        onClick={handleSave}
      >
        Save
      </button>

      <div className="mt-4">
        <h3 className="text-xl font-semibold mb-2">Saved Passwords</h3>
        <ul>
          {savedPasswords.map((item, index) => (
            <li key={index} className="p-2 bg-gray-700 my-1 rounded">
              <span className="font-semibold">{item.platform}</span>: {item.password}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
