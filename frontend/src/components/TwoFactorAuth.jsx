import { useState, useEffect } from "react";
import axios from "axios";

export default function TwoFactorAuth({ userEmail }) {
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  // Fetch current 2FA status
  useEffect(() => {
    axios
      .get(`/api/2fa/status?email=${userEmail}`)
      .then((response) => setIs2FAEnabled(response.data.enabled))
      .catch((error) => console.error("Error fetching 2FA status", error));
  }, [userEmail]);

  // Enable 2FA and get QR code
  const enable2FA = () => {
    axios
      .post("/api/2fa/enable", { email: userEmail })
      .then((response) => setQrCode(response.data.qrCode))
      .catch((error) => console.error("Error enabling 2FA", error));
  };
  

  // Verify 2FA Code
  const verify2FA = () => {
    axios
      .post("/api/2fa/verify", { email: userEmail, code: verificationCode })
      .then((response) => {
        if (response.data.success) {
          setIs2FAEnabled(true);
          setQrCode("");
          alert("2FA Enabled Successfully!");
        } else {
          alert("Invalid Code. Try Again.");
        }
      })
      .catch((error) => console.error("Error verifying 2FA", error));
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-96">
      <h2 className="text-2xl font-bold mb-4">Two-Factor Authentication</h2>

      {is2FAEnabled ? (
        <p className="text-green-500">2FA is Enabled</p>
      ) : (
        <>
          <button
            className=" hover:cursor-pointer bg-blue-600 px-4 py-2 rounded mb-4"
            onClick={enable2FA}
          >
            Enable 2FA
          </button>

          {qrCode && (
            <>
              <p>Scan this QR code using Google Authenticator:</p>
              <img src={qrCode} alt="QR Code" className="mb-4" />

              <input
                type="text"
                placeholder="Enter Code"
                className="p-2 text-black rounded w-full mb-2"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
              <button
                className="hover:cursor-pointer bg-green-600 px-4 py-2 rounded"
                onClick={verify2FA}
              >
                Verify & Enable
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}
