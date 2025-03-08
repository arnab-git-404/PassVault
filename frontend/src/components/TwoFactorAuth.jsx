import { useState, useEffect } from "react";
import axios from "axios";
import { useGlobalContext } from "../context/context";
import { toast } from "react-toastify";

export default function TwoFactorAuth({ email }) {
  const { user } = useGlobalContext();

  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

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
    axios
      .post(`${serverUrl}/api/user/2fa/enable`, { email: email })
      .then( (response) => 
        
        setQrCode(response.data.qrCode) )
      .catch((error) => console.error("Error enabling 2FA", error));
  };

  // Verify 2FA Code
  const verify2FA = () => {
    console.log("this is in verify2FA", email, verificationCode);
    axios
      .post(`${serverUrl}/api/user/2fa/verify`, {
        email: email,
        verification_code: verificationCode,
      })
      .then((response) => {
        if (response.data.status_code === 200) {
          console.log("this is in verify2FA", response.data);

          setIs2FAEnabled(true);
          setQrCode("");
          // alert("2FA Enabled Successfully!");
          toast.success("2FA Enabled Successfully!");
        } else {
          // alert("Invalid Code. Try Again.");
          toast.error("Invalid Code. Try Again.");
        }
      })
      .catch((error) => console.error("Error verifying 2FA", error));
  };

  return (
    <div className="max-w-5xl p-6">
      <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Two-Factor Authentication</h2>

        {is2FAEnabled ? (
          <>
            <p className="text-green-500 font-bold ">2FA is Enabled</p>

            <button
              onClick={() => {
                toast.success("Coming Soon....");
              }}
              className=" hover:cursor-pointer font-bold bg-red-600 px-4 py-2 rounded mt-4 "
            >
              Reset
            </button>
          </>
        ) : (
          <>

{/* {Hide the Enable 2FA button if Button Clicked} */}
{ qrCode ? null : 
   <button
   className=" hover:cursor-pointer bg-blue-600 px-4 py-2 rounded mb-4"
   onClick={enable2FA}
 >
   Enable 2FA
 </button>
}


         

            {qrCode && (
              <>
                <p className="mb-4">
                  Scan this QR code using Google Authenticator:
                </p>
                <img src={qrCode} alt="QR Code" className="mb-4" />

                <input
                  type="text"
                  placeholder="Enter Code"
                  className="p-2 text-white rounded w-full mb-2 bg-green-900"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                />

                <button
                  className="hover:cursor-pointer bg-green-600 px-4 py-2 rounded"
                  onClick={verify2FA}
                >
                  Verify & Enable
                </button>
              
              
              
                <button
                  className="hover:cursor-pointer ml-6  bg-red-600 px-4 py-2 rounded"
                  onClick={ () => {
                    setQrCode("");
                    setVerificationCode("");
                  }}
                >
                  Cancel
                </button>


              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
