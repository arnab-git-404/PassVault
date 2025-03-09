// import React, { useContext, useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { FaGoogle } from "react-icons/fa";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import { useGlobalContext } from "../context/context";
// import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID,
//   measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
// };

// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const auth = getAuth(app);

// function UserSignIn() {

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const { setMasterPassword ,loginUser, userLoggedIn } = useGlobalContext();

//   const serverURL = import.meta.env.VITE_APP_SERVER_URL;

//   let navigate = useNavigate();
//   console.log("User LoggedIn Status: ", userLoggedIn);

//   useEffect(() => {
//     if (userLoggedIn) {
//       navigate("/dashboard");
//     }
//   }, [userLoggedIn, navigate]);
//   // console.log(userLoggedIn);

//   const handleGoogleSignIn = async (e) => {

//     try {
//       const provider = new GoogleAuthProvider();
//       const result = await signInWithPopup(auth, provider);

//       const user = result.user;
//       console.log("Google Sign In", user);

//       const userData = {
//         name: user.displayName,
//         email: user.email,
//         google_id: user.uid,
//         profile_picture: user.photoURL,
//       };

//       // Call your backend API
//       const res = await fetch(`${serverURL}/api/google/google-auth`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(userData),
//       });

//       const data = await res.json();
//       console.log("Data From Google Auth ApI: ", data);

//       if (data.status_code === 200) {

//         toast.success(data.message || "Google authentication successful");
//         localStorage.setItem("token", data.token);
//         loginUser(data.user);
//         navigate("/dashboard");

//       } else {
//         toast.error(data.message || "Authentication failed");
//       }
//     } catch (error) {
//       console.error("Error signing in with Google: ", error);

//       // Detailed error handling
//       if (error.code) {
//         switch (error.code) {
//           case "auth/configuration-not-found":
//             toast.error(
//               "Firebase configuration error. Please verify Google Auth is enabled in Firebase console."
//             );
//             break;
//           case "auth/popup-blocked":
//             toast.error(
//               "Popup was blocked by your browser. Please allow popups for this site."
//             );
//             break;
//           case "auth/popup-closed-by-user":
//             toast.error("Authentication canceled. Please try again.");
//             break;
//           case "auth/unauthorized-domain":
//             toast.error(
//               "This domain is not authorized for OAuth operations. Add it in the Firebase console."
//             );
//             break;
//           default:
//             toast.error(`Authentication error: ${error.message}`);
//         }
//       } else {
//         toast.error(`Google authentication failed: ${error.message}`);
//       }
//     }
//   };

//   const signInHandler = async (e) => {
//     e.preventDefault();

//     console.log(email, password);

//     if (!email || !password) {
//       toast.error("Email and password are required");
//       return;
//     }

//     try {
//       const res = await fetch(`${serverURL}/api/user/signin`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email,
//           password,
//         }),
//       });

//       const data = await res.json();
//       console.log(res);

//       if (data.status_code === 404) {
//         toast.error(data.message);
//       }

//       if (data.status_code === 401) {
//         toast.error(data.message);
//       }

//       if (data.status_code === 200) {
//         toast.success(data.message);
//         localStorage.setItem("token", data.token);
//         loginUser(data.user);

//         // setMasterPassword(password);

//         console.log("User Data From SigniN Page:", data.user);

//         // localStorage.setItem("user", JSON.stringify(data.user)); Pending TODO
//         navigate("/dashboard");
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Failed to Sign In", error);
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <div className=" bg-gray-900 flex items-center min-h-screen w-full justify-center">
//       <div className="w-full max-w-md  mx-2 lg:mx-4">
//         <div className="bg-white shadow-lg rounded-lg pb-5 pt-2 mt-5">
//           <div className="px-5 pt-4">
//             <form onSubmit={signInHandler}>
//               <div className="text-3xl sm:text-4xl mb-5 font-medium text-gray-800 text-center">
//                 Sign In
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
//                 <div>
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
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     placeholder="Enter Password"
//                   />

//                   <div
//                     className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer mt-6 text-2xl "
//                     onClick={togglePasswordVisibility}
//                   >
//                     {showPassword ? <FaEye /> : <FaEyeSlash />}
//                   </div>
//                 </div>
//               </div>

//               <div className="text-right py-3">
//                 <Link
//                   to={"/forget-password"}
//                   className=" hover:underline text-lg hover:cursor-pointer text-indigo-600 hover:text-red-500 "
//                 >
//                   Forgot password?
//                 </Link>
//               </div>
//               <div className="flex justify-center">
//                 <button
//                   className=" hover:cursor-pointer w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                   id="loginButton"
//                   type="submit"
//                 >
//                   Sign In
//                 </button>
//               </div>
//                 </form>

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

//             <div>
//               <p className="text-center text-sm mt-2">
//                 Don't have an account? &nbsp;&nbsp; | &nbsp;&nbsp;
//                 <Link
//                   to={"/signup"}
//                   className="font-bold text-indigo-600 hover:text-indigo-500"
//                 >
//                   Sign Up
//                 </Link>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UserSignIn;

// @ -7,8 +7,8 @@ import { useNavigate } from "react-router-dom";
// import { useGlobalContext } from "../context/context";
// import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import { initializeApp } from "firebase/app";

// import { getAnalytics } from "firebase/analytics";

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
// @ -19,17 +19,16 @@ const firebaseConfig = {
//   measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
// };

// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const auth = getAuth(app);

// function UserSignIn() {

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const { loginUser, userLoggedIn } = useGlobalContext();
//   const { setMasterPassword ,loginUser, userLoggedIn } = useGlobalContext();

//   const serverURL = import.meta.env.VITE_APP_SERVER_URL;

// @ -160,8 +159,8 @@ function UserSignIn() {
//         navigate("/dashboard");
//       }
//     } catch (error) {
//       console.log("Failed to Sign In Because: "+error);
//       // toast.error("Failed to Sign In", error);
//       console.log(error);
//       toast.error("Failed to Sign In", error);
//     }
//   };

import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaGoogle,FaSpinner } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/context";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

function UserSignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [gAuthCode, setgAuthCode] = useState("");
  const [verifyingPassword, setVerifyingPassword] = useState(false); 
  
  
  const { loginUser, userLoggedIn, setMasterPassword } = useGlobalContext();
  const serverURL = import.meta.env.VITE_APP_SERVER_URL;

  let navigate = useNavigate();
  console.log("User LoggedIn Status: ", userLoggedIn);

  useEffect(() => {
    if (userLoggedIn) {
      navigate("/dashboard");
    }
  }, [userLoggedIn, navigate]);

  const handleGoogleSignIn = async (e) => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const user = result.user;
      console.log("Google Sign In", user);

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

      const data = await res.json();
      console.log("Data From Google Auth API: ", data);

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
        switch (error.code) {
          case "auth/configuration-not-found":
            toast.error(
              "Firebase configuration error. Please verify Google Auth is enabled in Firebase console."
            );
            break;
          case "auth/popup-blocked":
            toast.error(
              "Popup was blocked by your browser. Please allow popups for this site."
            );
            break;
          case "auth/popup-closed-by-user":
            toast.error("Authentication canceled. Please try again.");
            break;
          case "auth/unauthorized-domain":
            toast.error(
              "This domain is not authorized for OAuth operations. Add it in the Firebase console."
            );
            break;
          default:
            toast.error(`Authentication error: ${error.message}`);
        }
      } else {
        toast.error(`Google authentication failed: ${error.message}`);
      }
    }
  };

  const signInHandler = async (e) => {
    e.preventDefault();

    console.log(email, password);

    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }

    // if(!gAuthCode ){
    //   toast.error("2FA Code is required");
    //   return;
    // }

    setVerifyingPassword(true);

    try {
      const res = await fetch(`${serverURL}/api/user/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();
      console.log(res);

      if (data.status_code === 404) {
        toast.error(data.message);
      }

      if (data.status_code === 401) {
        toast.error(data.message);
      }

      if (data.status_code === 200) {
        toast.success(data.message);
        localStorage.setItem("token", data.token);
        loginUser(data.user);

        console.log("User Data From SignIn Page:", data.user);

        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Failed to Sign In:", error);
      toast.error("Failed to Sign In");
    } finally{
      setVerifyingPassword(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className=" bg-gray-900 flex items-center min-h-screen w-full justify-center">
      <div className="w-full max-w-md  mx-2 lg:mx-4">
        <div className="bg-white shadow-lg rounded-lg pb-5 pt-2 mt-5">
          <div className="px-5 pt-4">
            <form onSubmit={signInHandler}>
              <div className="text-3xl sm:text-4xl mb-5 font-medium text-gray-800 text-center">
                Sign In
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
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password"
                  />
                  <div
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-2xl"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label
                  htmlFor="gAuthCode"
                  className="block text-lg font-medium text-gray-700"
                >
                  2FA Authenticator Code
                </label>
                <input
                  type="number"
                  className="mt-1 block w-72  px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  id="gAuthCode"
                  name="gAuthCode"
                  value={gAuthCode}
                  onChange={(e) => setgAuthCode(e.target.value)}
                  placeholder="Check Your Authenticator App For OTP"
                />
              </div>

              <div className="text-right py-3">
                <Link
                  to={"/forget-password"}
                  className=" hover:underline text-lg hover:cursor-pointer text-indigo-600 hover:text-red-500 "
                >
                  Forgot password?
                </Link>
              </div>
              <div className="flex justify-center">
                <button
                  className=" hover:cursor-pointer w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  id="loginButton"
                  type="submit"
                >
                  {verifyingPassword ? (
                      <>
                        <FaSpinner className="inline mr-2 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      "Sign In"
                    )}

                </button>
              </div>
            </form>

            <div className="flex flex-col items-center hover:cursor-pointer ">
              <p className="my-1">
                <span className="text-gray-600">or</span>
              </p>

              <button
                onClick={handleGoogleSignIn}
                className="flex items-center w-full justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <FaGoogle className="mr-2" /> Sign Up with Google
              </button>
            </div>

            <div>
              <p className="text-center text-sm mt-2">
                Don't have an account? &nbsp;&nbsp; | &nbsp;&nbsp;
                <Link
                  to={"/signup"}
                  className="font-bold text-indigo-600 hover:text-indigo-500"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserSignIn;
