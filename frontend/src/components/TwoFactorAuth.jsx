import { useState, useEffect } from "react";
import axios from "axios";
import { useGlobalContext } from "../context/context";
import { toast } from "react-toastify";

export default function TwoFactorAuth({ email }) {
  const { user } = useGlobalContext();

  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);


  const serverUrl = "http://127.0.0.1:8000";
  console.log("2FA User Email: ", email);

  console.log("2FA Enabled: ", user.is_2FA_Enabled);

  useEffect(() => {
    if (user.is_2FA_Enabled) {
      setIs2FAEnabled(true);
    }
  }, [user.is_2FA_Enabled]);

  // Enable 2FA and get QR code
  const enable2FA = () => {
    setLoading(true);
    axios
      .post(`${serverUrl}/api/user/2fa/enable`, { email: email })
      .then((response) => {
        setQrCode(response.data.qrCode);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error enabling 2FA", error);
        toast.error("Failed to generate QR code");
        setLoading(false);
      });
  };

  // Verify 2FA Code
  // const verify2FA = () => {
  //   console.log("this is in verify2FA", email, verificationCode);
  //   axios
  //     .post(`${serverUrl}/api/user/2fa/verify`, {
  //       email: email,
  //       verification_code: verificationCode,
  //     })
  //     .then((response) => {
  //       if (response.data.status_code === 200) {
  //         console.log("this is in verify2FA", response.data);

  //         setIs2FAEnabled(true);
  //         setQrCode("");
  //         // alert("2FA Enabled Successfully!");
  //         toast.success("2FA Enabled Successfully!");
  //       } else {
  //         // alert("Invalid Code. Try Again.");
  //         toast.error("Invalid Code. Try Again.");
  //       }
  //     })
  //     .catch((error) => console.error("Error verifying 2FA", error));
  // };

    // Verify 2FA Code
    const verify2FA = () => {
      if (!verificationCode.trim()) {
        toast.error("Please enter the verification code");
        return;
      }
      
      setVerifying(true);
      console.log("this is in verify2FA", email, verificationCode);
      axios
        .post(`${serverUrl}/api/user/2fa/verify`, {
          email: email,
          verification_code: verificationCode,
        })
        .then((response) => {
          setVerifying(false);
          if (response.data.status_code === 200) {
            console.log("this is in verify2FA", response.data);
            setIs2FAEnabled(true);
            setQrCode("");
            toast.success("2FA Enabled Successfully!");
          } else {
            toast.error("Invalid Code. Try Again.");
          }
        })
        .catch((error) => {
          console.error("Error verifying 2FA", error);
          toast.error("Failed to verify code");
          setVerifying(false);
        });
    };


return (
  <div className="max-w-md mx-auto p-4">
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Two-Factor Authentication</h2>

      {is2FAEnabled ? (
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-green-500 font-bold">2FA is Enabled</p>
          </div>

          <button
            onClick={() => {
              toast.info("Coming Soon....");
            }}
            className="hover:cursor-pointer font-bold bg-red-600 hover:bg-red-700 transition-colors px-4 py-2 rounded mt-2"
          >
            Reset 2FA
          </button>
        </div>
      ) : (
        <>
          {!qrCode && !loading && (
            <div className="text-center">
              <p className="mb-4 text-gray-300">
                Enable two-factor authentication to add an extra layer of security to your account.
              </p>
              <button
                className="hover:cursor-pointer bg-blue-600 hover:bg-blue-700 transition-colors px-6 py-2 rounded mb-4 font-medium"
                onClick={enable2FA}
              >
                Enable 2FA
              </button>
            </div>
          )}

          {loading && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              <p className="mt-2">Generating QR code...</p>
            </div>
          )}

          {qrCode && (
            <div className="flex flex-col items-center">
              <div className="bg-white p-3 rounded-lg mb-4">
                <img src={qrCode} alt="QR Code" className="max-w-full h-auto" />
              </div>

              <div className="w-full space-y-4">
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-medium text-lg mb-2">Setup Instructions:</h3>
                  <ol className="list-decimal pl-5 space-y-1 text-gray-300">
                    <li>Install Google Authenticator or another TOTP app</li>
                    <li>Scan the QR code with the app</li>
                    <li>Enter the 6-digit code from the app below</li>
                  </ol>
                </div>

                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Enter 6-digit verification code"
                    className="p-3 text-white rounded w-full bg-gray-800 border border-gray-600 focus:border-blue-500 focus:outline-none text-center text-lg tracking-wider"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                    maxLength={6}
                  />

                  <div className="flex space-x-3">
                    <button
                      className={`flex-1 hover:cursor-pointer font-medium bg-green-600 hover:bg-green-700 transition-colors px-4 py-2 rounded ${verifying ? 'opacity-70 cursor-not-allowed' : ''}`}
                      onClick={verify2FA}
                      disabled={verifying}
                    >
                      {verifying ? (
                        <span className="flex items-center justify-center">
                          <span className="inline-block animate-spin h-4 w-4 border-2 border-t-transparent border-white rounded-full mr-2"></span>
                          Verifying...
                        </span>
                      ) : (
                        'Verify & Enable'
                      )}
                    </button>
                    
                    <button
                      className="hover:cursor-pointer bg-red-600 hover:bg-red-700 transition-colors px-4 py-2 rounded"
                      onClick={() => {
                        setQrCode("");
                        setVerificationCode("");
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  </div>
);
}
