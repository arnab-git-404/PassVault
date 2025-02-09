// import React from "react";

// function ProfileModal({ isOpen, onClose, user }) {
//     if (!isOpen) return null;

//     return (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//             <div className="bg-white p-6 rounded shadow-lg relative w-96">
//                 <span
//                     className="absolute top-2 right-2 text-gray-500 cursor-pointer hover:text-gray-700"
//                     onClick={onClose}
//                 >
//                     &times;
//                 </span>
//                 <h2 className="text-2xl mb-4">User Profile</h2>
//                 <div className="mb-4">
//                     <p className="mb-2"><strong>Name:</strong> {user.name}</p>
//                     <p className="mb-2"><strong>Email:</strong> {user.email}</p>
//                 </div>
//                 <button
//                     className="bg-blue-500 text-white px-4 py-2 rounded mb-2 cursor-pointer hover:bg-blue-600"
//                     onClick={user.changePassword}
//                 >
//                     Change Password
//                 </button>
//                 <button
//                     className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-red-600"
//                     onClick={user.logout}
//                 >
//                     Logout
//                 </button>
//             </div>
//         </div>
//     );
// }

// export default ProfileModal;



import { useState } from "react";
import { LogOut, Settings, Download, Star, Search, User } from "lucide-react";


export default function ProfileModal( {isOpen, onClose, user } ) {

    if (!isOpen) return null;
  

  return (
    <div className="relative  ">

      {isOpen && (
        <div className="absolute right-3 mt-2 w-80 bg-gray-800 text-white rounded-lg shadow-lg p-4">
          <ul className="space-y-2">
            <li className="flex items-center p-2 hover:bg-blue-600 rounded cursor-pointer">
              <Search className="w-4 h-4 mr-2" /> Explore GPTs
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
            </li>
            <li className="flex items-center p-2 rounded cursor-pointer text-red-600">
              <LogOut className="w-4 h-4 mr-2" /> Log out
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}


