import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaEye,
  FaEyeSlash,
  FaSpinner,
  FaLock,
  FaShieldAlt,
  FaTrash,
  FaKey,
  FaExclamationTriangle,
  FaArrowLeft,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { useGlobalContext } from "../context/context";

function Settings() {
  const navigate = useNavigate();
  const { userLoggedIn, user, logoutUser , fetchUser } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [dialogAction, setDialogAction] = useState("");

  // Master key reset states
  const [masterKeyResetOtp, setMasterKeyResetOtp] = useState("");
  const [twoFactorCode, setTwoFactorCode] = useState("");
  const [sendingMasterKeyOtp, setSendingMasterKeyOtp] = useState(false);
  const [resetMasterKeyLoading, setResetMasterKeyLoading] = useState(false);
  const [showMasterKeyConfirm, setShowMasterKeyConfirm] = useState(false);

  // Password reset states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // 2FA states
  const [otpEmail, setOtpEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [sendingOTP, setSendingOTP] = useState(false);

  const serverURL = import.meta.env.VITE_APP_SERVER_URL;

  // Redirect if not logged in
  useEffect(() => {
    if (!userLoggedIn) {
      navigate("/signin");
    } else if (user && user.email) {
      setOtpEmail(user.email);
      
    }
  }, [userLoggedIn, navigate, user]);


  console.log(user)



  
  
  
  const sendResetOTP = async (e) => {
    e.preventDefault();

    if (!otpEmail) {
      toast.error("Email is required");
      return;
    }

    setSendingOTP(true);

    try {
      const token = localStorage.getItem("token");
      const purpose = "2fa_reset";
      const res = await fetch(`${serverURL}/api/user/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: otpEmail,
          purpose,
        }),
      });

      const data = await res.json();

      if (data.status_code === 200) {
        toast.success(data.message || "OTP sent successfully");
      } else {
        toast.error(data.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Failed to send OTP");
    } finally {
      setSendingOTP(false);
    }
  };

  const resetTwoFactorAuth = async (e) => {
    e.preventDefault();

    if (!otp) {
      toast.error("Please enter the OTP");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${serverURL}/api/user/reset-2fa`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: otpEmail,
          otp,
        }),
      });

      const data = await res.json();

      if (data.status_code === 200) {
        toast.success(data.message || "2FA reset successful");
        setOtp("");
      } else {
        toast.error(data.message || "Failed to reset 2FA");
      }
    } catch (error) {
      console.error("Error resetting 2FA:", error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const confirmAction = (action) => {
    setDialogAction(action);
    setShowConfirmDialog(true);
  };

  const handleConfirm = async () => {
    setShowConfirmDialog(false);

    if (dialogAction === "delete_account") {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${serverURL}/api/user/delete-account`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (data.status_code === 200) {
          localStorage.clear();
          toast.success(data.message || "Account deleted successfully");
          logoutUser();
          navigate("/signup");
        } else {
          toast.error(data.message || "Failed to delete account");
        }
      } catch (error) {
        console.error("Error deleting account:", error);
        toast.error("An error occurred. Please try again later.");
      }
    }
  };

  // Add this function to confirm master key reset
  const confirmMasterKeyReset = async () => {
    setShowMasterKeyConfirm(false);
    setResetMasterKeyLoading(true);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${serverURL}/api/user/reset-master-key`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          otp: masterKeyResetOtp,
          twoFactorCode: twoFactorCode,
        }),
      });

      const data = await res.json();

      if (data.status_code === 200) {
        // Clear encrypted passwords from local storage
        localStorage.removeItem("encryptedPasswords");
        localStorage.removeItem("masterKeyVerification");

        toast.success(data.message);
        setMasterKeyResetOtp("");
        setTwoFactorCode("");

        // Redirect to dashboard or master key setup
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        toast.error(data.message || "Failed to reset master key");
      }
    } catch (error) {
      console.error("Error resetting master key:", error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setResetMasterKeyLoading(false);
    }
  };

  // Add this function to handle the master key reset
  const handleMasterKeyReset = async (e) => {
    e.preventDefault();

    if (!masterKeyResetOtp) {
      toast.error("Please enter the OTP");
      return;
    }

    if (user.is_2FA_Enabled && !twoFactorCode) {
      toast.error("2FA verification code is required");
      return;
    }

    setShowMasterKeyConfirm(true);
  };

  const sendMasterKeyResetOTP = async (e) => {
    e.preventDefault();

    setSendingMasterKeyOtp(true);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${serverURL}/api/user/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: user.email,
          purpose: "master_key_reset",
        }),
      });

      const data = await res.json();

      if (data.status_code === 200) {
        toast.success(data.message || "OTP sent successfully");
      } else {
        toast.error(data.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Failed to send OTP");
    } finally {
      setSendingMasterKeyOtp(false);
    }
  };

  return (

    <div className="bg-gray-900 min-h-screen py-6">
      <div className="max-w-4xl mx-auto px-4">
        {/* Add back button here */}


        <div className="  flex justify-start mb-8">
          <button
            onClick={() => navigate("/dashboard")}
            className=" hover:cursor-pointer group flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg transition-all duration-200 shadow-lg hover:shadow-indigo-500/50 transform hover:-translate-y-0.5"
          >
            <div className=" bg-opacity-20 rounded-full p-1.5 mr-1 group-hover:bg-opacity-30 transition-all">
              <FaArrowLeft className="text-xl" />
            </div>
            <span className="font-medium">Back to Dashboard</span>
          </button>
        </div>

        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          Account Settings
        </h1>

        {/* Password Reset */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <FaShieldAlt className="mr-2" /> Reset Two-Factor Authentication
          </h2>

          <form onSubmit={resetTwoFactorAuth}>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={otpEmail}
                onChange={(e) => setOtpEmail(e.target.value)}
                placeholder="Your email address"
                readOnly={user && user.email}
              />
            </div>

            <div className="mb-4 flex gap-3">
              <div className="flex-1">
                <label className="block text-gray-700 font-medium mb-2">
                  OTP
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                />
              </div>

              <div className="flex items-end">
                <button
                  type="button"
                  onClick={sendResetOTP}
                  disabled={sendingOTP}
                  className=" hover:cursor-pointer px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {sendingOTP ? (
                    <>
                      <FaSpinner className="inline mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send OTP"
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className=" hover:cursor-pointer w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {loading ? (
                <FaSpinner className="inline mr-2 animate-spin" />
              ) : (
                "Reset 2FA"
              )}
            </button>
          </form>
        </div>

        {/* Master Key Reset */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2 flex items-center">
            <FaKey className="mr-2" /> Reset Master Key
          </h2>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <FaExclamationTriangle className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  <strong>Warning:</strong> Resetting your master key will{" "}
                  <strong>permanently delete all your saved passwords</strong>.
                  You will need to set up a new master key and re-add all your
                  passwords.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleMasterKeyReset}>
            <div className="mb-4 flex gap-3">
              <div className="flex-1">
                <label className="block text-gray-700 font-medium mb-2">
                  Email Verification OTP
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={masterKeyResetOtp}
                  onChange={(e) => setMasterKeyResetOtp(e.target.value)}
                  placeholder="Enter OTP sent to your email"
                />
              </div>

              <div className="flex items-end">
                <button
                  type="button"
                  onClick={sendMasterKeyResetOTP}
                  disabled={sendingMasterKeyOtp}
                  className="hover:cursor-pointer px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {sendingMasterKeyOtp ? (
                    <>
                      <FaSpinner className="inline mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send OTP"
                  )}
                </button>
              </div>
            </div>

            {/* Only show 2FA field if user has 2FA enabled */}
            {user && user.is_2FA_Enabled && (
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Two-Factor Authentication Code
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={twoFactorCode}
                  onChange={(e) => setTwoFactorCode(e.target.value)}
                  placeholder="Enter your 2FA code"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={resetMasterKeyLoading}
              className="w-full py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              {resetMasterKeyLoading ? (
                <FaSpinner className="inline mr-2 animate-spin" />
              ) : (
                "Reset Master Key & Delete All Passwords"
              )}
            </button>
          </form>
        </div>

        {/* Delete Account */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <FaTrash className="mr-2" /> Delete Account
          </h2>

          <p className="text-gray-600 mb-4 hover:text-gray-800">
            This action will permanently delete your account and all associated
            data. This cannot be undone.
          </p>

          <button
            onClick={() => confirmAction("delete_account")}
            className=" hover:cursor-pointer w-full py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Delete My Account
          </button>
        </div>
      </div>

      {/* Add Master Key Reset Confirmation Dialog */}
      {showMasterKeyConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4 text-red-600">
              Confirm Master Key Reset
            </h3>
            <p className="mb-6">
              This will{" "}
              <strong>permanently delete all your saved passwords</strong> and
              reset your master key. You will need to set up a new master key
              and re-add all your passwords.
              <br />
              <br />
              Are you absolutely sure you want to proceed?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowMasterKeyConfirm(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={confirmMasterKeyReset}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Confirm Action</h3>
            <p className="mb-6">
              {dialogAction === "delete_account"
                ? "Are you sure you want to delete your account? This action cannot be undone."
                : "Are you sure you want to proceed with this action?"}
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirmDialog(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Settings;