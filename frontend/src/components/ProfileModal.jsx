import { useState } from "react";
import { LogOut, Settings, Download, Star, Search, User } from "lucide-react";
import Profile from "./Profile";
import { useGlobalContext } from "../context/context";
import { toast } from "react-toastify";
import { useMasterPassword } from "../context/MasterPasswordContext";
import { useNavigate } from "react-router-dom";

export default function ProfileModal({ isOpen, onClose, user }) {
  if (!isOpen) return null;


  const { logoutUser } = useGlobalContext();
  const { lockVault } = useMasterPassword();
  const navigate = useNavigate();



  return (
    <div className="relative  z-1">
      <div className="absolute right-3 mt-2 w-80 bg-black text-white rounded-lg shadow-lg p-4">
        <ul className="space-y-2">
          {/* <li className="flex items-center p-2 hover:bg-gray-600 rounded cursor-pointer" onClick={handleProfileClick}>
              <User className="w-4 h-4 mr-2" /> Profile
            </li>
            <li className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer">
              <Settings className="w-4 h-4 mr-2" /> Customize ChatGPT
            </li>
            <li className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer">
              <Settings className="w-4 h-4 mr-2" /> Settings
            </li>
            <li className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer">
              <Download className="w-4 h-4 mr-2" /> Download the Windows app
            </li>
            <li className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer">
              <Star className="w-4 h-4 mr-2" /> Upgrade Plan
            </li>
            <li className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer">
              <Search className="w-4 h-4 mr-2" /> Get ChatGPT search extension
            </li> */}

          <li
            className="flex items-center p-2 rounded cursor-pointer text-red-500"
            onClick={() => {
              lockVault();
              logoutUser();
              localStorage.clear();
              navigate("/signin");
              toast.success("Logged Out Successfully");
            }}
          >
            <LogOut className="w-4 h-4 mr-2" /> Log out
          </li>
        </ul>
      </div>
    </div>
  );
}
