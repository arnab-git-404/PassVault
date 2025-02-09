import React from "react";

export default function Profile({ user }) {
  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-96">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      
      <div className="mb-4">
        <p className="text-gray-400">Name:</p>
        <p className="text-lg font-semibold">{user.name}</p>
      </div>

      <div className="mb-4">
        <p className="text-gray-400">Email:</p>
        <p className="text-lg font-semibold">{user.email}</p>
      </div>

      <div className="mb-4">
        <p className="text-gray-400">Two-Factor Authentication : </p>
        <p className="text-lg font-semibold">{user.Two_factor_authentication}</p>
      </div>

      <div className="flex flex-col gap-3 mt-4">
        <button
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
          onClick={user.changePassword}
        >
          Change Password
        </button>
        <button
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
          onClick={user.logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
