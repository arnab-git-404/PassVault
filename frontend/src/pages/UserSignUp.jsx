// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FaGoogle } from "react-icons/fa";
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   signInWithPopup,
//   GoogleAuthProvider,
// } from "firebase/auth";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { toast } from "react-toastify";
// import { useContext } from "react";
// import { useGlobalContext } from "../context/context";


// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

// // Firebase config (replace with your actual config)
// const firebaseConfig = {
//   apiKey: "AIzaSyDv4YE_nD1kVZtK5Y2zvYdbKekNWttpvk4",
//   authDomain: "passvault-f36db.firebaseapp.com",
//   projectId: "passvault-f36db",
//   storageBucket: "passvault-f36db.firebasestorage.app",
//   messagingSenderId: "51233071431",
//   appId: "1:51233071431:web:c48c786903a5acb18bac62",
//   measurementId: "G-YBTQT6X9EE",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// function UserSignUp() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const [otp, setOTP] = useState("");
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);

//   const serverURL = import.meta.env.VITE_APP_SERVER_URL;

//   const { loginUser, userLoggedIn } = useGlobalContext();

//   if (userLoggedIn) {
//     navigate("/dashboard");
//   }

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleGoogleSignIn = async () => {
//     const provider = new GoogleAuthProvider();

//     try {
//       const result = await signInWithPopup(analytics, provider);
//       const user = result.user;

//       // Extract needed user info from Google account
//       const userData = {
//         name: user.displayName,
//         email: user.email,
//         google_id: user.uid,
//         profile_picture: user.photoURL,
//       };

//       console.log("Google Sign-In successful", userData);

//       const res = await fetch(`${serverURL}/api/user/google-auth`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(userData),
//       });

//       const data = await res.json();
//       console.log("Google Sign-In Api Data: ", data);

//       if (data.status_code === 200) {
//         toast.success(data.message || "Google authentication successful");
//         localStorage.setItem("token", data.token);
//         loginUser(data.user);
//         navigate("/dashboard");
//       } else {
//         toast.error(data.message || "Authentication failed");
//       }
//     } catch (error) {
//       console.error("Error signing in with Google: ", error.message);
//       toast.error("Google authentication failed");
//     }
//   };

//   const handleSignUp = async (e) => {
//     e.preventDefault();

//     if (!email) {
//       toast.error("Please enter email");
//       return;
//     }

//     if (!password) {
//       toast.error("Please enter a password");
//       return;
//     }

//     if (!name) {
//       toast.error("Please enter a name");
//       return;
//     }

//     if (!otp) {
//       toast.error("Please enter the OTP");
//       return;
//     }

//     try {
//       console.log(email, password, name, otp);

//       const res = await fetch(`${serverURL}/api/user/signup`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name,
//           email,
//           password,
//           otp,
//         }),
//       });

//       console.log(res);
//       const data = await res.json(); // get response body
//       console.log(data);

//       if (data.status_code === 400) {
//         toast.error(data.message);
//       }

//       if (data.status_code === 200) {
//         toast.success(data.message);
//         localStorage.setItem("token", data.token);
//         console.log(data.token);
//         loginUser(data.user);
//         navigate("/dashboard");
//       }
//     } catch (error) {
//       console.error("Error signing up: ", error.message);
//       toast.error("failed", error);
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

//   return (
//     <div className=" bg-gray-900 flex items-center min-h-screen w-full justify-center">
//       <div className="w-full max-w-md mx-2 lg:mx-4">
//         <div className="bg-white shadow-lg rounded-lg pb-5 pt-2 mt-5">
//           <div className="px-5 pt-4">
//             <form onSubmit={handleSignUp}>
//               <div className="text-3xl sm:text-4xl mb-5 font-bold text-gray-800 text-center">
//                 Sign Up
//               </div>

//               <div className="mb-3">
//                 <label
//                   htmlFor="name"
//                   className="block text-lg font-medium text-gray-700"
//                 >
//                   Name
//                 </label>
//                 <input
//                   type="text"
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                   id="name"
//                   name="name"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   placeholder="Enter Your Name"
//                 />
//               </div>

//               <div className="mb-3">
//                 <label
//                   htmlFor="email"
//                   className="block text-lg font-medium text-gray-700"
//                 >
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                   id="email"
//                   name="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="example@gmail.com"
//                 />
//               </div>

//               <div className="mb-3 relative ">
//                 <label
//                   htmlFor="password"
//                   className="block text-lg font-medium text-gray-700"
//                 >
//                   Password
//                 </label>
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                   id="password"
//                   name="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="Enter Your Password"
//                 />
//                 <div
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer mt-6 text-2xl "
//                   onClick={togglePasswordVisibility}
//                 >
//                   {showPassword ? <FaEye /> : <FaEyeSlash />}
//                 </div>
//               </div>

//               <div className="mb-3 flex justify-between ">
//                 <div>
//                   <label
//                     htmlFor="password"
//                     className="block text-lg font-medium text-gray-700"
//                   >
//                     Enter Otp
//                   </label>
//                   <input
//                     type="number"
//                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                     id="otp"
//                     name="otp"
//                     value={otp}
//                     onChange={(e) => setOTP(e.target.value)}
//                     placeholder="Check Your Email For Otp"
//                   />
//                 </div>

//                 <button
//                   onClick={sendOTP}
//                   className="mt-5 block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 >
//                   Send Code
//                 </button>
//               </div>
//               <div className="flex justify-center hover:cursor-pointer ">
//                 <button
//                   className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                   id="loginButton"
//                   type="submit"
//                 >
//                   Sign Up
//                 </button>
//               </div>

//               <div className="flex flex-col items-center hover:cursor-pointer ">
//                 <p className="my-1">
//                   <span className="text-gray-600">or</span>
//                 </p>

//                 <button
//                   onClick={handleGoogleSignIn}
//                   className="flex items-center w-full justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700"
//                 >
//                   <FaGoogle className="mr-2" /> Sign Up with Google
//                 </button>
//               </div>
//             </form>

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

// export default UserSignUp;





import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle , FaSpinner } from "react-icons/fa";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useGlobalContext } from "../context/context";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Firebase config - keeping exactly as provided by Firebase
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

function UserSignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [otp, setOTP] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [sendingOTP, setSendingOTP] = useState(false);
  const navigate = useNavigate();

  const serverURL = import.meta.env.VITE_APP_SERVER_URL;

  const { loginUser, userLoggedIn } = useGlobalContext();

  // Use useEffect for redirection
  useEffect(() => {
    if (userLoggedIn) {
      navigate("/dashboard");
    }
  }, [userLoggedIn, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleSignIn = async () => {
    try {
      // Create a new provider instance each time
      const provider = new GoogleAuthProvider();
      
      // Add scopes if needed
      provider.addScope('profile');
      provider.addScope('email');
      
      // Set custom parameters
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      
      // Sign in with popup
      const result = await signInWithPopup(auth, provider);
      
      // Extract user info
      const user = result.user;
      
      console.log("Google Sign-In successful", user);

      // Extract needed user info
      const userData = {
        name: user.displayName,
        email: user.email,
        google_id: user.uid,
        profile_picture: user.photoURL,
      };

      // Call your backend API
      const res = await fetch(`${serverURL}/api/google/google-auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      // if (!res.ok) {
      //   throw new Error(`Server returned ${res.status}: ${res.statusText}`);
      // }

      const data = await res.json();
      
      console.log(data)

      if (data.status_code === 200) {
        toast.success(data.message || "Google authentication successful");
        localStorage.setItem("token", data.token);
        loginUser(data.user);
        navigate("/dashboard");
      } else {
        toast.error(data.message || "Authentication failed");
      }
    } catch (error) {
      console.error("Error signing in with Google: ", error);
      
      // Detailed error handling
      if (error.code) {
        switch(error.code) {
          case 'auth/configuration-not-found':
            toast.error("Firebase configuration error. Please verify Google Auth is enabled in Firebase console.");
            break;
          case 'auth/popup-blocked':
            toast.error("Popup was blocked by your browser. Please allow popups for this site.");
            break;
          case 'auth/popup-closed-by-user':
            toast.error("Authentication canceled. Please try again.");
            break;
          case 'auth/unauthorized-domain':
            toast.error("This domain is not authorized for OAuth operations. Add it in the Firebase console.");
            break;
          default:
            toast.error(`Authentication error: ${error.message}`);
        }
      } else {
        toast.error(`Google authentication failed: ${error.message}`);
      }
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter email");
      return;
    }

    if (!password) {
      toast.error("Please enter a password");
      return;
    }

    if (!name) {
      toast.error("Please enter a name");
      return;
    }

    if (!otp) {
      toast.error("Please enter the OTP");
      return;
    }

    try {
      const res = await fetch(`${serverURL}/api/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          otp,
        }),
      });

      const data = await res.json();
      console.log("SignUp Data: ",data);

      if (data.status_code === 400) {
        toast.error(data.message);
      }

      if (data.status_code === 200) {
        toast.success(data.message);
        localStorage.setItem("token", data.token);
        loginUser(data.user);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error signing up: ", error.message);
      toast.error("Failed to sign up: " + error.message);
    }
  };

  const sendOTP = async (e) => {
    e.preventDefault();

    if (email === "" || email === null) {
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
        }),
      });

      if (!res.ok) {
        toast.error("Failed to send OTP");
        throw new Error("Failed to send OTP");
      }

      const data = await res.json();
      console.log(data);

      if(data.status_code === 200) {
        toast.success("OTP sent successfully!");
      } else {
        toast.error("Failed to send OTP, please try again.");
        console.log("Failed TO Send OTP: ",data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error("Failed to send OTP");
    } finally {
      setSendingOTP(false);
    }
  };

  return (
    <div className="bg-gray-900 flex items-center min-h-screen w-full justify-center">
      <div className="w-full max-w-md mx-2 lg:mx-4">
        <div className="bg-white shadow-lg rounded-lg pb-5 pt-2 mt-5">
          <div className="px-5 pt-4">
            <form onSubmit={handleSignUp}>
              <div className="text-3xl sm:text-4xl mb-5 font-bold text-gray-800 text-center">
                Sign Up
              </div>

              <div className="mb-3">
                <label
                  htmlFor="name"
                  className="block text-lg font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter Your Name"
                />
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Your Password"
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer mt-6 text-2xl"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </div>
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



                {/* <button
                  type="button"
                  onClick={sendOTP}
                  className="mt-5 block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  Send Code
                </button> */}

                <button
                  type="button"
                  onClick={sendOTP}
                  disabled={sendingOTP}
                  className=" hover:cursor-pointer mt-5 block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
              <div className="flex justify-center hover:cursor-pointer">
                <button
                  className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  id="loginButton"
                  type="submit"
                >
                  Sign Up
                </button>
              </div>

              <div className="flex flex-col items-center hover:cursor-pointer">
                <p className="my-1">
                  <span className="text-gray-600">or</span>
                </p>

                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className=" hover:cursor-pointer flex items-center w-full justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  <FaGoogle className="mr-2" /> Sign Up with Google
                </button>
              </div>
            </form>

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

export default UserSignUp;