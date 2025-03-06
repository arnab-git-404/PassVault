// import React, { useContext, useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { useGlobalContext } from "../context/context";


// function UserForgetPassword() {
//   const [email, setEmail] = useState("");
//   const [otp, setOTP] = useState("");
//   const [otpVerfied, setOtpVerified] = useState(false);
//   const [newPassword, setNewPassword] = useState("");
//   const [cnfPassword, setCnfPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const {logoutUser} = useGlobalContext();


//   const serverURL = import.meta.env.VITE_APP_SERVER_URL;

//   const navigate = useNavigate();

//   const submitOtpHandler = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch(`${serverURL}/api/user/verify-otp`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email,
//           otp,
//         }),
//       });

//       if (!res.ok) {
//         throw new Error("Failed to submit the form");
//       }

//       const data = await res.json();
//       console.log(data);

//       if (data.status_code === 400) {
//         toast.error(data.message);
//       } else if (data.status_code === 200) {
//         toast.success("Form Submitted Successfully!");
//         setOtpVerified(true);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const sendOTP = async (e) => {
//     e.preventDefault();

//     if (email === "" || email === null) {
//       toast.error("Please enter email");
//       return;
//     }

//     try {
//       const res = await fetch(`${serverURL}/api/user/send-otp`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email,
//         }),
//       });

//       if (!res.ok) {
//         throw new Error("Failed to send OTP");
//         toast.error("Failed to send OTP");
//       }

//       const data = await res.json();
//       console.log(data);
//       toast.success("OTP sent successfully!");
//     } catch (error) {
//       console.log(error);
//       toast.error("Failed to send OTP");
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const sumbitNewPassword = async (e) => {
//     e.preventDefault();

//     if (newPassword === "" || newPassword === null) {
//       toast.error("Please enter new password");
//       return;
//     }

//     if (newPassword !== cnfPassword) {
//       toast.error("Passwords do not match");
//       return;
//     }

//     try {
//       const res = await fetch(`${serverURL}/api/user/reset-password`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email,
//           otp,
//           newPassword,
//         }),
//       });

//       const data = await res.json();
//       console.log(data);

//       if (data.status_code === 200) {
//         toast.success("Password reset successfully!");
//         logoutUser();
//         setOtpVerified(false);
//         navigate("/signin");
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.log("Failed To reset PassWord: ",error);
//       toast.error("An error occurred during password reset.");
//     }
//   };


//   return (
//     <div className=" bg-gray-900 flex items-center min-h-screen w-full justify-center">
//       <div className="w-full max-w-md  mx-2 lg:mx-4">
//         <div className="bg-white shadow-lg rounded-lg pb-5 pt-2 mt-5">
//           <div className="px-5 pt-4">
//             {otpVerfied ? (
//               <form onSubmit={sumbitNewPassword}>
//                 <div className="text-3xl sm:text-4xl mb-5 font-medium text-gray-800 text-center">
//                   Enter New Password
//                 </div>

//                 <div className="mb-3 relative">
//                   <label
//                     htmlFor="password"
//                     className="block text-lg font-medium text-gray-700"
//                   >
//                     Password
//                   </label>
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                     id="password"
//                     name="password"
//                     value={newPassword}
//                     onChange={(e) => setNewPassword(e.target.value)}
//                     placeholder="Enter New Password"
//                   />
//                   <div
//                     className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer mt-6 text-2xl "
//                     onClick={togglePasswordVisibility}
//                   >
//                     {showPassword ? <FaEye /> : <FaEyeSlash />}
//                   </div>
//                 </div>

//                 <div className="mb-3 relative">
//                   <label
//                     htmlFor="cnfPassword"
//                     className="block text-lg font-medium text-gray-700"
//                   >
//                     Confirm Password
//                   </label>
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                     id="cnfPassword"
//                     name="cnfPassword"
//                     value={cnfPassword}
//                     onChange={(e) => setCnfPassword(e.target.value)}
//                     placeholder="Confirm Password"
//                   />
//                   <div
//                     className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer mt-6 text-2xl "
//                     onClick={togglePasswordVisibility}
//                   >
//                     {showPassword ? <FaEye /> : <FaEyeSlash />}
//                   </div>
//                 </div>

//                 <div className="flex justify-center">
//                   <button
//                     className=" hover:cursor-pointer w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                     id="loginButton"
//                     type="submit"
//                   >
//                     Reset Password
//                   </button>
//                 </div>
//               </form>
//             ) : (
//               <form onSubmit={submitOtpHandler}>
//                 <div className="text-3xl sm:text-4xl mb-5 font-medium text-gray-800 text-center">
//                   Forget Password
//                 </div>

//                 <div className="mb-3">
//                   <label
//                     htmlFor="email"
//                     className="block text-lg font-medium text-gray-700"
//                   >
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                     id="email"
//                     name="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="example@gmail.com"
//                   />
//                 </div>

//                 <div className="mb-3 flex justify-between ">
//                   <div>
//                     <label
//                       htmlFor="otp"
//                       className="block text-lg font-medium text-gray-700"
//                     >
//                       Enter Otp
//                     </label>

//                     <input
//                       type="number"
//                       className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                       id="otp"
//                       name="otp"
//                       value={otp}
//                       onChange={(e) => setOTP(e.target.value)}
//                       placeholder="Check Your Email For Otp"
//                     />
//                   </div>

//                   <button
//                     className=" hover:cursor-pointer mt-5 block  px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                     onClick={sendOTP}
//                   >
//                     Send Code
//                   </button>
//                 </div>

//                 <div className="flex justify-center">
//                   <button
//                     className=" hover:cursor-pointer w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                     id="loginButton"
//                     type="submit"
//                   >
//                     Submit OTP
//                   </button>
//                 </div>
//               </form>
//             )}
//             <div>
//               <p className=" mt-6 text-center text-sm">
//                 Already have an account? &nbsp; &nbsp;|&nbsp; &nbsp;
//                 <Link
//                   to={"/signin"}
//                   className="font-bold text-indigo-600 hover:text-indigo-500"
//                 >
//                   Sign In
//                 </Link>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UserForgetPassword;







// @ -1,9 +1,9 @@
// import React, { useContext, useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { useGlobalContext } from "../context/context";
// import { FaGoogle, FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";


// function UserForgetPassword() {
// @ -14,14 +14,12 @@ function UserForgetPassword() {
//   const [cnfPassword, setCnfPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const {logoutUser} = useGlobalContext();
//   const [sendingOTP, setSendingOTP] = useState(false);


//   const serverURL = import.meta.env.VITE_APP_SERVER_URL;

//   const navigate = useNavigate();

//   const purpose = "reset_password"

//   const submitOtpHandler = async (e) => {
//     e.preventDefault();
//     try {
// @ -63,7 +61,6 @@ function UserForgetPassword() {
//     }

//     try {
//       setSendingOTP(true);
//       const res = await fetch(`${serverURL}/api/user/send-otp`, {
//         method: "POST",
//         headers: {
// @ -71,13 +68,12 @@ function UserForgetPassword() {
//         },
//         body: JSON.stringify({
//           email,
//           purpose
//         }),
//       });

//       if (!res.ok) {
//         throw new Error("Failed to send OTP");
        
//         toast.error("Failed to send OTP");
//       }

//       const data = await res.json();
// @ -86,8 +82,6 @@ function UserForgetPassword() {
//     } catch (error) {
//       console.log(error);
//       toast.error("Failed to send OTP");
//     } finally{
//       setSendingOTP(false);
//     }
//   };

// @ -251,23 +245,13 @@ function UserForgetPassword() {
//                       placeholder="Check Your Email For Otp"
//                     />
//                   </div>
//                 <button
//                   type="button"
//                   onClick={sendOTP}
//                   disabled={sendingOTP}
//                   className="mt-5 block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 >
//                   {sendingOTP ? (
//                     <>
//                       <FaSpinner className="inline mr-2 animate-spin" />
//                       Sending...
//                     </>
//                   ) : (
//                     "Send Code"
//                   )}
//                 </button>


//                   <button
//                     className=" hover:cursor-pointer mt-5 block  px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                     onClick={sendOTP}
//                   >
//                     Send Code
//                   </button>
//                 </div>

//                 <div className="flex justify-center">




















import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/context";

function UserForgetPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [cnfPassword, setCnfPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [sendingOTP, setSendingOTP] = useState(false);

  const { logoutUser } = useGlobalContext();
  const serverURL = import.meta.env.VITE_APP_SERVER_URL;
  const navigate = useNavigate();
  const purpose = "reset_password";

  const submitOtpHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${serverURL}/api/user/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
        }),
      });

      const data = await res.json();

      if (data.status_code === 400) {
        toast.error(data.message);
      } else if (data.status_code === 200) {
        toast.success("OTP Verified Successfully!");
        setOtpVerified(true);
      }
    } catch (error) {
      console.error("OTP Verification Error:", error);
      toast.error("Failed to verify OTP");
    }
  };

  const sendOTP = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter email");
      return;
    }

    try {
      setSendingOTP(true);
      const res = await fetch(`${serverURL}/api/user/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          purpose,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("OTP sent successfully!");
      } else {
        toast.error(data.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error("Send OTP Error:", error);
      toast.error("Failed to send OTP");
    } finally {
      setSendingOTP(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const submitNewPassword = async (e) => {
    e.preventDefault();

    if (!newPassword) {
      toast.error("Please enter new password");
      return;
    }

    if (newPassword !== cnfPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await fetch(`${serverURL}/api/user/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
          newPassword,
        }),
      });

      const data = await res.json();

      if (data.status_code === 200) {
        toast.success("Password reset successfully!");
        logoutUser();
        setOtpVerified(false);
        navigate("/signin");
      } else {
        toast.error(data.message || "Password reset failed");
      }
    } catch (error) {
      console.error("Password Reset Error:", error);
      toast.error("An error occurred during password reset");
    }
  };

  return (
    <div className="bg-gray-900 flex items-center min-h-screen w-full justify-center">
      <div className="w-full max-w-md mx-2 lg:mx-4">
        <div className="bg-white shadow-lg rounded-lg pb-5 pt-2 mt-5">
          <div className="px-5 pt-4">
            {otpVerified ? (
              <form onSubmit={submitNewPassword}>
                <div className="text-3xl sm:text-4xl mb-5 font-medium text-gray-800 text-center">
                  Enter New Password
                </div>

                <div className="mb-3 relative">
                  <label
                    htmlFor="password"
                    className="block text-lg font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    id="password"
                    name="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter New Password"
                  />
                  <div
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer mt-6 text-2xl"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </div>
                </div>

                <div className="mb-3 relative">
                  <label
                    htmlFor="cnfPassword"
                    className="block text-lg font-medium text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    id="cnfPassword"
                    name="cnfPassword"
                    value={cnfPassword}
                    onChange={(e) => setCnfPassword(e.target.value)}
                    placeholder="Confirm Password"
                  />
                  <div
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer mt-6 text-2xl"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </div>
                </div>

                <div className="flex justify-center">
                  <button
                    className="hover:cursor-pointer w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    id="loginButton"
                    type="submit"
                  >
                    Reset Password
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={submitOtpHandler}>
                <div className="text-3xl sm:text-4xl mb-5 font-medium text-gray-800 text-center">
                  Forget Password
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="email"
                    className="block text-lg font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@gmail.com"
                  />
                </div>

                <div className="mb-3 flex justify-between">
                  <div>
                    <label
                      htmlFor="otp"
                      className="block text-lg font-medium text-gray-700"
                    >
                      Enter OTP
                    </label>

                    <input
                      type="number"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      id="otp"
                      name="otp"
                      value={otp}
                      onChange={(e) => setOTP(e.target.value)}
                      placeholder="Check Your Email For OTP"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={sendOTP}
                    disabled={sendingOTP}
                    className="mt-5 block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm hover:bg-gray-100"
                  >
                    {sendingOTP ? (
                      <>
                        <FaSpinner className="inline mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Code"
                    )}
                  </button>
                </div>

                <div className="flex justify-center">
                  <button
                    className="hover:cursor-pointer w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    id="loginButton"
                    type="submit"
                  >
                    Submit OTP
                  </button>
                </div>
              </form>
            )}
            <div>
              <p className="mt-6 text-center text-sm">
                Already have an account? &nbsp; &nbsp;|&nbsp; &nbsp;
                <Link
                  to={"/signin"}
                  className="font-bold text-indigo-600 hover:text-indigo-500"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserForgetPassword;
