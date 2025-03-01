import { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import SignUpModal from "./SignUpModal";
import { useGlobalContext } from "../context/context";

export default function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(10);
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeLowercase, setIncludeLowercase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [strength, setStrength] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userLoggedIn } = useGlobalContext();


  const generatePassword = () => {



    if (
      !includeUppercase &&
      !includeLowercase &&
      !includeNumbers &&
      !includeSymbols
    ) {
      toast.error("Please select at least one option", {
        position: "top-right",
      });
      return;
    }

    let characters = "";
    if (includeUppercase) characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLowercase) characters += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) characters += "0123456789";
    if (includeSymbols) characters += "!@#$%^&*()_+{}[]<>?";

    if (characters.length === 0) return;

    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      generatedPassword += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }

    setPassword(generatedPassword);
    evaluateStrength(generatedPassword);
    // setIsModalOpen(true);
  };

  const evaluateStrength = (password) => {
    if (password.length < 6) setStrength("Weak");
    else if (password.length < 12) setStrength("Medium");
    else setStrength("Strong");
  };

  const copyToClipboard = () => {
    if (password === "") {
      toast.error("No password to copy", {
        position: "top-right",
      });
      return;
    }

    navigator.clipboard.writeText(password);

    if (password) {
      toast.success("Password copied to clipboard", {
        position: "top-right",
      });

      if (!userLoggedIn) {
        setIsModalOpen(true);
      }
    }
  };

  return (
    <div className="p-6 mx-auto bg-black rounded-xl shadow-md space-y-4  ">
      <h1 className="text-xl font-bold">Password Generator</h1>

      <div className="flex items-center border p-2 rounded ">
        <input
          type="text"
          readOnly
          value={password}
          placeholder="Password"
          className="flex-grow p-2 outline-none"
        />
        <button
          onClick={copyToClipboard}
          className="hover:cursor-pointer ml-2 p-2 bg-blue-500 text-white rounded"
        >
          Copy
        </button>
      </div>

      <div className="text-xl ">
        <label>Password Length: {length}</label>
        <input
          type="range"
          min="1"
          max="20"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="w-full hover:cursor-pointer "
        />
      </div>

      <div className="space-y-2 ">
        <label className="flex items-center text-xl hover:cursor-pointer ">
          <input
            type="checkbox"
            className="text-xl transform scale-125 "
            checked={includeUppercase}
            onChange={() => setIncludeUppercase(!includeUppercase)}
          />
          <span className="ml-2 text-xl ">Include Uppercase Letters</span>
        </label>

        <label className="flex items-center text-xl hover:cursor-pointer ">
          <input
            type="checkbox"
            className="text-xl transform scale-125 "
            checked={includeLowercase}
            onChange={() => setIncludeLowercase(!includeLowercase)}
          />
          <span className="ml-2">Include Lowercase Letters</span>
        </label>
        <label className="flex items-center text-xl hover:cursor-pointer ">
          <input
            type="checkbox"
            className="text-xl transform scale-125 "
            checked={includeNumbers}
            onChange={() => setIncludeNumbers(!includeNumbers)}
          />
          <span className="ml-2">Include Numbers</span>
        </label>
        <label className="flex items-center text-xl hover:cursor-pointer ">
          <input
            type="checkbox"
            className="text-xl transform scale-125 "
            checked={includeSymbols}
            onChange={() => setIncludeSymbols(!includeSymbols)}
          />
          <span className="ml-2">Include Symbols</span>
        </label>
      </div>

      <div className="flex items-center">
        <p className="mr-2">Strength:</p>
        <span
          className={`p-2 rounded text-white ${
            strength === "Weak"
              ? "bg-red-500"
              : strength === "Medium"
              ? "bg-yellow-500"
              : "bg-green-500"
          }`}
        >
          {strength}
        </span>
      </div>

      <button
        onClick={generatePassword}
        className=" hover:cursor-pointer w-full p-2 bg-green-500 text-white rounded"
      >
        Generate Password
      </button>

      <SignUpModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
