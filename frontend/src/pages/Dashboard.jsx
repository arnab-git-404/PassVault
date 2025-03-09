// import { use, useState, useRef,useEffect, useContext } from "react";
// import { FaUserCircle } from "react-icons/fa";
// import ProfileModal from "../components/ProfileModal";
// import GeneratePassword from "../components/GeneratePassword";
// import SavePassword from "../components/ListAllPassword";
// import Profile from "../components/Profile";
// import TwoFactorAuth from "../components/TwoFactorAuth";
// import Home from "../components/Home";
// import axios from "axios";
// import { useGlobalContext } from "../context/context";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import PasswordGenerator from "../components/GeneratePassword";
// import PasswordManager from "../components/PasswordManager";
// import ListAllPassword from "../components/ListAllPassword";

// // import MasterPasswordSetup from "../utility/MasterPasswordSetup";

// export default function Dashboard() {
//   const navigate = useNavigate();
//   const modalRef = useRef(null);

//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedOption, setSelectedOption] = useState("");

//   const { user, userLoggedIn, logoutUser, loginUser } = useGlobalContext();

//   const serverURL = "http://127.0.0.1:8000";

//   const token = localStorage.getItem("token");

//   // Add event handler for outside clicks
//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (isModalOpen && modalRef.current && !modalRef.current.contains(event.target)) {
//         setIsModalOpen(false);
//       }
//     }

//     // Add event listener when modal is open
//     if (isModalOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     // Clean up the event listener
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isModalOpen]);

//   const fetchUser = async () => {

//     if (!token) {
//       logoutUser();
//       navigate("/signin");
//       return;
//     }

//     // console.log(userLoggedIn);

//     try {
//       const res = await fetch(`${serverURL}/api/user/user-info`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`, // Send token in Authorization header
//         },
//       });

//       if (res.status === 401) {
//         // Token expired or invalid
//         localStorage.clear(); // Clear any stale data
//         logoutUser();
//         navigate("/signin");
//         toast.error("Session expired. Please login again");
//         return;
//       }

//       const data = await res.json();
//       loginUser(data.user);
//       console.log("User Data For Dashboard", user);

//     } catch (error) {
//       console.log("Unable To Fetch User Data For Dashboard: ", error);
//       toast.error("Something Went Wrong. Please Try again");
//     }
//   };

//   // Add a cleanup function to useEffect
//   useEffect(() => {

//     // if (userLoggedIn) {
//     //   fetchUser();
//     // }

//     fetchUser();

//     // Optional: Set up an interval to periodically check token validity
//     const intervalId = setInterval(() => {
//       fetchUser();
//     }, 1000 * 60 * 2); // Check every 2 minutes

//     return () => clearInterval(intervalId); // Cleanup on component unmount
//   }, []);

//   // Function to render content based on selectedOption
//   const renderContent = () => {
//     switch (selectedOption) {
//       case "Profile":
//         return <Profile user={user || {}} />;
//       case "GeneratePassword":
//         return <PasswordManager/>
//       case "ListAllPassword":
//         return <ListAllPassword />;
//       case "2FA":
//         return <TwoFactorAuth email={user.email || ""} />;
//       case "LogOut":
//         logoutUser();
//         localStorage.clear();
//         navigate("/signin");
//         toast.success("Logged Out Successfully");
//         return null;

//       // case "MasterPasswordSetup":
//       //   return <MasterPasswordSetup />;

//       case "Home":
//         return <Home />;
//       default:
//         return <Home />;
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-800 ">
//       {/* Sidebar */}
//       <div
//         className={`${
//           isSidebarOpen ? "w-64" : "w-0"
//         } bg-gray-900 text-white transition-all duration-300 overflow-hidden`}
//       >
//         <div className="flex justify-between p-4">
//           <button
//             className="p-2 hover:cursor-pointer bg-gray-700 rounded"
//             onClick={() => setIsSidebarOpen(false)}
//           >
//             Close
//           </button>
//         </div>

//         {/* Sidebar Items */}
//         <div className="p-4">
//           <ul className="space-y-4">
//             <li
//               className="hover:bg-gray-700 p-2 rounded cursor-pointer"
//               onClick={() => setSelectedOption("Profile")}
//             >
//               Profile
//             </li>
//             <li
//               className="hover:bg-gray-700 p-2 rounded cursor-pointer"
//               onClick={() => setSelectedOption("GeneratePassword")}
//             >
//               Generate Password
//             </li>
//             <li
//               className="hover:bg-gray-700 p-2 rounded cursor-pointer"
//               onClick={() => setSelectedOption("ListAllPassword")}
//             >
//               Show Passwords
//             </li>

//             {/* <li
//               className="hover:bg-gray-700 p-2 rounded cursor-pointer"
//               onClick={() => setSelectedOption("MasterPasswordSetup")}
//             >
//               Master Key
//             </li> */}

//             <li
//               className="hover:bg-gray-700 p-2 rounded cursor-pointer"
//               onClick={() => setSelectedOption("2FA")}
//             >
//               Two-Factor Authentication (2FA)
//             </li>
//             <li
//               className="hover:bg-gray-700 p-2 rounded cursor-pointer text-red-500"
//               onClick={() => setSelectedOption("LogOut")}
//             >
//               Logout
//             </li>
//           </ul>
//         </div>
//       </div>

//       {/* Main content */}
//       <div className="flex-1 flex flex-col bg-gray-800 text-white">
//         {/* Navbar */}
//         <div className="flex justify-between items-center bg-gray-900 p-4">
//           <div className="flex gap-10">
//             <button
//               className={`p-2 hover:cursor-pointer bg-gray-700 rounded ${
//                 isSidebarOpen ? "hidden" : ""
//               }`}
//               onClick={() => setIsSidebarOpen(true)}
//             >
//               Open
//             </button>
//             <h1 className="text-4xl md:text-3xl font-bold hover:cursor-pointer "
//             onClick={() => setSelectedOption("Home")}
//             >PassVault</h1>
//           </div>
//           <FaUserCircle
//             className="text-white text-4xl cursor-pointer"
//             onClick={() => setIsModalOpen(!isModalOpen)}
//           />
//         </div>

// <div ref={modalRef}>
//         {/* Profile Modal */}
//         <ProfileModal
//           isOpen={isModalOpen}
//           onClick={() => setIsModalOpen(false)}
//           user={user}
//         />
// </div>

//         {/* Content Rendering Based on Selection */}
//         <div className="flex-1 flex items-center justify-center">
//           {renderContent()}
//         </div>
//       </div>
//     </div>
//   );

// }

// @ -1,142 +1,66 @@
// import { use, useState, useRef, useEffect, useContext } from "react";
// import {
//   FaUserCircle,
//   FaLock,
//   FaBars,
//   FaTimes,
//   FaHome,
//   FaUser,
//   FaKey,
//   FaListAlt,
//   FaShieldAlt,
//   FaSignOutAlt,
//   FaCog,
// } from "react-icons/fa";
// import { use, useState, useRef,useEffect, useContext } from "react";
// import { FaUserCircle } from "react-icons/fa";
// import ProfileModal from "../components/ProfileModal";
// import GeneratePassword from "../components/GeneratePassword";
// import SavePassword from "../components/ListAllPassword";
// import Profile from "../components/Profile";
// import TwoFactorAuth from "../components/TwoFactorAuth";
// import Home from "../components/Home";
// import axios from "axios";
// import { useGlobalContext } from "../context/context";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import PasswordGenerator from "../components/GeneratePassword";
// import PasswordManager from "../components/PasswordManager";
// import ShowAllPassword from "../components/ShowAllPassword";
// import MasterPasswordSetup from "../utility/MasterPasswordSetup";
// import { useMasterPassword } from "../context/MasterPasswordContext";
// import VaultUnlock from "../components/VaultUnlock";
// import VaultStatus from "../components/VaultStatus";
// import { Link } from "react-router-dom";
// import ListAllPassword from "../components/ListAllPassword";

// // import MasterPasswordSetup from "../utility/MasterPasswordSetup";

// export default function Dashboard() {
//   const navigate = useNavigate();
//   const modalRef = useRef(null);
//   const sidebarRef = useRef(null);

//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedOption, setSelectedOption] = useState("");
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

//   const { user, userLoggedIn, logoutUser, loginUser } = useGlobalContext();

//   const { isSetup, isUnlocked, lockVault } = useMasterPassword();

//   const serverURL = "http://127.0.0.1:8000";

//   const token = localStorage.getItem("token");

//   // Add event handler for outside clicks
//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (
//         isModalOpen &&
//         modalRef.current &&
//         !modalRef.current.contains(event.target)
//       ) {
//       if (isModalOpen && modalRef.current && !modalRef.current.contains(event.target)) {
//         setIsModalOpen(false);
//       }
//     }

//     // Add event listener when modal is open
//     if (isModalOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     // Clean up the event listener
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isModalOpen]);

//   // NEWLY ADDED CODE FOR SIDEBAR CLOSE ON OUTSIDE CLICK

//   // Handle resize events for responsive design
//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//       // Auto-close sidebar on mobile when resizing
//       if (window.innerWidth < 768 && isSidebarOpen) {
//         setIsSidebarOpen(false);
//       }
//     };

//     window.addEventListener("resize", handleResize);
//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, [isSidebarOpen]);

//   // Add event handler for outside clicks to close sidebar on mobile
//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (
//         isMobile &&
//         isSidebarOpen &&
//         sidebarRef.current &&
//         !sidebarRef.current.contains(event.target) &&
//         !event.target.closest('button[aria-label="Toggle sidebar"]')
//       ) {
//         setIsSidebarOpen(false);
//       }
//     }

//     if (isMobile && isSidebarOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isMobile, isSidebarOpen]);

//   // Handle modal click-outside closing
//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (
//         isModalOpen &&
//         modalRef.current &&
//         !modalRef.current.contains(event.target)
//       ) {
//         setIsModalOpen(false);
//       }
//     }

//     if (isModalOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isModalOpen]);

//   const fetchUser = async () => {

//     if (!token) {
//       logoutUser();
//       navigate("/signin");
//       return;
//     }

//     // console.log(userLoggedIn);

//     try {
// @ -150,8 +74,8 @@ export default function Dashboard() {

//       if (res.status === 401) {
//         // Token expired or invalid
//         logoutUser();
//         localStorage.clear(); // Clear any stale data
//         logoutUser();
//         navigate("/signin");
//         toast.error("Session expired. Please login again");
//         return;
// @ -160,6 +84,8 @@ export default function Dashboard() {
//       const data = await res.json();
//       loginUser(data.user);
//       console.log("User Data For Dashboard", user);

//     } catch (error) {
//       console.log("Unable To Fetch User Data For Dashboard: ", error);
//       toast.error("Something Went Wrong. Please Try again");
// @ -168,6 +94,11 @@ export default function Dashboard() {

//   // Add a cleanup function to useEffect
//   useEffect(() => {

//     // if (userLoggedIn) {
//     //   fetchUser();
//     // }

//     fetchUser();

//     // Optional: Set up an interval to periodically check token validity
// @ -178,149 +109,45 @@ export default function Dashboard() {
//     return () => clearInterval(intervalId); // Cleanup on component unmount
//   }, []);

//   useEffect(() => {
//     // This will run whenever isUnlocked changes
//     console.log(
//       "Dashboard detected vault status change: isUnlocked =",
//       isUnlocked
//     );

//     // If the vault is locked and user was viewing password-related features, redirect to home
//     if (
//       !isUnlocked &&
//       (selectedOption === "GeneratePassword" ||
//         selectedOption === "ShowAllPassword")
//     ) {
//       setSelectedOption("Home");
//     }
//   }, [isUnlocked]);

//   // Handle navigation action
//   const handleNavigation = (option) => {
//     setSelectedOption(option);
//     if (isMobile) {
//       setIsSidebarOpen(false);
//     }
//   };

//   // Function to render content based on selectedOption
//   const renderContent = () => {
//     // If trying to access password features without setup/unlock, show VaultUnlock

//     if (
//       (!isSetup || !isUnlocked) &&
//       (selectedOption === "GeneratePassword" ||
//         selectedOption === "ShowAllPassword")
//     ) {
//       return (
//         <div className="w-full max-w-md">
//           <div className="text-center mb-6">
//             <div className="bg-yellow-700 bg-opacity-30 inline-block p-3 rounded-full animate-pulse">
//               <FaLock size={40} className="text-yellow-500" />
//             </div>
//             <h2 className="text-2xl font-bold mt-4">Vault Access Required</h2>
//             <p className="text-gray-300 mt-2 mb-6">
//               {!isSetup
//                 ? "You need to set up your master password first"
//                 : "You need to unlock your vault to access this feature"}
//             </p>
//           </div>

//           <VaultUnlock
//             onUnlockSuccess={() => {
//               toast.success("Vault unlocked successfully!");
//               setSelectedOption(selectedOption); // Re-render the selected option
//             }}
//           />
//         </div>
//       );
//     }

//     switch (selectedOption) {
//       case "Profile":
//         return <Profile user={user || {}} />;
//       case "GeneratePassword":
//         return <PasswordManager />;
//       case "ShowAllPassword":
//         return <ShowAllPassword />;
//         return <PasswordManager/>
//       case "ListAllPassword":
//         return <ListAllPassword />;
//       case "2FA":
//         return <TwoFactorAuth email={user.email || ""} />;
//       case "LogOut":
//         lockVault();
//         logoutUser();
//         localStorage.clear();
//         navigate("/signin");
//         toast.success("Logged Out Successfully");
//         return null;

//       case "MasterPasswordSetup":
//         return (
//           <MasterPasswordSetup
//           // onComplete={(password, salt) => {

//           //   setupMasterPassword(password, salt);
//           //   setSelectedOption("Home");

//           // }}
//           />
//         );

//       // case "MasterPasswordSetup":
//       //   return <MasterPasswordSetup />;

//       case "Home":
//         return <Home />;
//       default:
//         return (
//           <Home
//             isSetup={isSetup}
//             isUnlocked={isUnlocked}
//             onSetupClick={() => setSelectedOption("MasterPasswordSetup")}
//           />
//         );
//         return <Home />;
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-800 ">
//       {/* Overlay for mobile when sidebar is open */}
//       {isMobile && isSidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-20 transition-opacity duration-300"
//           onClick={() => setIsSidebarOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       {/* <div
//       <div
//         className={`${
//           isSidebarOpen ? "w-64" : "w-0"
//         } bg-gray-900 text-white transition-all duration-300 overflow-hidden`}
//       > */}

//       <div
//         ref={sidebarRef}
//         className={`${
//           isSidebarOpen
//             ? isMobile
//               ? "translate-x-0 w-64"
//               : "translate-x-0 w-64"
//             : isMobile
//             ? "-translate-x-full w-64"
//             : "-translate-x-full w-64"
//         } fixed h-full bg-gray-900 text-white transition-all duration-300 ease-in-out transform z-30 overflow-y-auto`}
//       >
//         <div className="flex items-center justify-between p-4 border-b border-gray-700">
//           <div className="flex items-center space-x-2">
//             <FaLock className="text-blue-400" />
//             <h1 className="text-xl font-bold">PassVault</h1>
//           </div>
//           <button
//             className=" hover:cursor-pointer p-2 hover:bg-gray-700 rounded-full transition-colors"
//             onClick={() => setIsSidebarOpen(false)}
//             aria-label="Close sidebar"
//           >
//             <FaTimes />
//           </button>
//         </div>

//         {/*
//         <div className="flex justify-between p-4">
//           <button
//             className="p-2 hover:cursor-pointer bg-gray-700 rounded"
// @ -328,27 +155,17 @@ export default function Dashboard() {
//           >
//             Close
//           </button>
//         </div> */}
//         </div>

//         {/* Sidebar Items */}
//         {/* <div className="p-4">
//         <div className="p-4">
//           <ul className="space-y-4">

//           <li
//               className="hover:bg-gray-700 p-2 rounded cursor-pointer"
//               onClick={() => setSelectedOption("Home")}
//             >
//               Home
//             </li>

//             <li
//               className="hover:bg-gray-700 p-2 rounded cursor-pointer"
//               onClick={() => setSelectedOption("Profile")}
//             >
//               Profile
//             </li>

//             <li
//               className="hover:bg-gray-700 p-2 rounded cursor-pointer"
//               onClick={() => setSelectedOption("GeneratePassword")}
// @ -357,17 +174,19 @@ export default function Dashboard() {
//             </li>
//             <li
//               className="hover:bg-gray-700 p-2 rounded cursor-pointer"
//               onClick={() => setSelectedOption("ShowAllPassword")}
//               onClick={() => setSelectedOption("ListAllPassword")}
//             >
//               Show Passwords
//             </li>

//             <li

//             {/* <li
//               className="hover:bg-gray-700 p-2 rounded cursor-pointer"
//               onClick={() => setSelectedOption("MasterPasswordSetup")}
//             >
//               Master Key
//             </li>
//             </li> */}

//             <li
//               className="hover:bg-gray-700 p-2 rounded cursor-pointer"
// @ -375,139 +194,12 @@ export default function Dashboard() {
//             >
//               Two-Factor Authentication (2FA)
//             </li>

//             <li
//               className="hover:bg-gray-700 p-2 rounded cursor-pointer text-red-500"
//               onClick={() => setSelectedOption("LogOut")}
//             >
//               Logout
//             </li>

//           </ul>
//         </div> */}

//         {/* 2nd Sidebar Items */}
//         <div className="p-4">
//           <ul className="space-y-2">
//             <li>
//               <button
//                 className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
//                   selectedOption === "Home"
//                     ? "bg-blue-600 text-white"
//                     : "hover:bg-gray-700 text-gray-300"
//                 }`}
//                 onClick={() => handleNavigation("Home")}
//               >
//                 <FaHome />
//                 <span>Home</span>
//               </button>
//             </li>

//             <li>
//               <button
//                 className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
//                   selectedOption === "Profile"
//                     ? "bg-blue-600 text-white"
//                     : "hover:bg-gray-700 text-gray-300"
//                 }`}
//                 onClick={() => handleNavigation("Profile")}
//               >
//                 <FaUser />
//                 <span>Profile</span>
//               </button>
//             </li>

//             <li>
//               <button
//                 className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
//                   selectedOption === "GeneratePassword"
//                     ? "bg-blue-600 text-white"
//                     : "hover:bg-gray-700 text-gray-300"
//                 }`}
//                 onClick={() => handleNavigation("GeneratePassword")}
//               >
//                 <FaKey />
//                 <span>Generate Password</span>
//               </button>
//             </li>

//             <li>
//               <button
//                 className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
//                   selectedOption === "ShowAllPassword"
//                     ? "bg-blue-600 text-white"
//                     : "hover:bg-gray-700 text-gray-300"
//                 }`}
//                 onClick={() => handleNavigation("ShowAllPassword")}
//               >
//                 <FaListAlt />
//                 <span>Show Passwords</span>
//               </button>
//             </li>

//             <li>
//               <button
//                 className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
//                   selectedOption === "MasterPasswordSetup"
//                     ? "bg-blue-600 text-white"
//                     : "hover:bg-gray-700 text-gray-300"
//                 }`}
//                 onClick={() => handleNavigation("MasterPasswordSetup")}
//               >
//                 <FaCog />
//                 <span>Master Key</span>
//               </button>
//             </li>

//             <li>
//               <button
//                 className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
//                   selectedOption === "2FA"
//                     ? "bg-blue-600 text-white"
//                     : "hover:bg-gray-700 text-gray-300"
//                 }`}
//                 onClick={() => handleNavigation("2FA")}
//               >
//                 <FaShieldAlt />
//                 <span>2FA Authentication</span>
//               </button>
//             </li>

//             <li>
//               <button
//                 className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
//                   selectedOption === "Settings"
//                     ? "bg-blue-600 text-white"
//                     : "hover:bg-gray-700 text-gray-300"
//                 }`}
//                 onClick={ ()=> navigate('/settings') }
//               >
//                 <FaCog />
//                 <span>Settings</span>
//               </button>
//             </li>

//             <li className="mt-8">
//               <button
//                 className="w-full flex items-center space-x-3 p-3 rounded-lg text-red-400 hover:bg-red-900 hover:bg-opacity-30 transition-colors"
//                 onClick={() => handleNavigation("LogOut")}
//               >
//                 <FaSignOutAlt />
//                 <span>Logout</span>
//               </button>
//             </li>

//           </ul>
//         </div>
//       </div>
// @ -515,7 +207,7 @@ export default function Dashboard() {
//       {/* Main content */}
//       <div className="flex-1 flex flex-col bg-gray-800 text-white">
//         {/* Navbar */}
//         {/* <div className="flex justify-between items-center bg-gray-900 p-4">
//         <div className="flex justify-between items-center bg-gray-900 p-4">
//           <div className="flex gap-10">
//             <button
//               className={`p-2 hover:cursor-pointer bg-gray-700 rounded ${
// @ -525,597 +217,80 @@ export default function Dashboard() {
//             >
//               Open
//             </button>
//             <h1
//               className="text-4xl md:text-3xl font-bold hover:cursor-pointer "
//               onClick={() => setSelectedOption("Home")}
//             >
//               PassVault
//             </h1>
//           </div>

//           <div className="flex gap-6 ">
//             <button
//               onClick={() => {
//                 toast.success("Coming Soon....");
//               }}
//               className=" hover:cursor-pointer font-bold bg-red-600 px-4 py-2 rounded mt-4 "
//             >
//               Lock Vault
//             </button>

//             <button>
//               {" "}
//               <FaUserCircle
//                 className="text-white text-4xl cursor-pointer"
//                 onClick={() => setIsModalOpen(!isModalOpen)}
//               />{" "}
//             </button>
//           </div>
//         </div> */}

//         {/* 2ND version NavBar  */}
//         {/* <div className="flex justify-between items-center bg-gray-900 p-4">
//         <div className="flex gap-10">
//     <button
//       className={`p-2 hover:cursor-pointer bg-gray-700 rounded ${
//         isSidebarOpen ? "hidden" : ""
//       }`}
//       onClick={() => setIsSidebarOpen(true)}
//     >
//       Open
//     </button>
//     <h1
//       className="text-4xl md:text-3xl font-bold hover:cursor-pointer"
//       onClick={() => setSelectedOption("Home")}
//     >
//       PassVault
//     </h1>
//   </div>

//   <div className="flex items-center gap-4">
//     {/* <VaultStatus isSetup={isSetup} isUnlocked={isUnlocked} /> */}

//         {/* <button
//   onClick={() => {
//     if (isUnlocked) {
//       lockVault(); // This calls the context function
//       // No need for additional toast since lockVault already shows one

//       // Force a re-render of components that depend on the vault status
//       setSelectedOption(prev => {
//         // If we're on the "GeneratePassword" or "ShowAllPassword" page,
//         // redirect to home since vault is now locked
//         if (prev === "GeneratePassword" || prev === "ShowAllPassword") {
//           return "Home";
//         }
//         // Otherwise just return the same option to trigger re-render
//         return prev;
//       });
//     } else {
//       setSelectedOption("Home");
//       toast.info("Use the 'Unlock Vault' option to access your passwords");
//     }
//   }}
//   className={`  hover:cursor-pointer font-bold ${
//     isUnlocked ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
//   } px-4 py-2 rounded-full transition-colors`}
// >
//   {isUnlocked ? "Lock Vault" : "Unlock Vault"}
// </button>

//     <FaUserCircle
//       className="text-white text-4xl cursor-pointer"
//       onClick={() => setIsModalOpen(!isModalOpen)}
//     />
//   </div>
//         </div> */}

//         {/* // 3rd version of Navbar */}
//         <div className="bg-gray-900 text-white shadow-lg">
//           <div className="container mx-auto px-4 py-3">
//             <div className="flex justify-between items-center">
//               <div className="flex items-center space-x-4">
//                 <button
//                   className=" hover:cursor-pointer p-2 hover:bg-gray-700 rounded-md transition-colors"
//                   onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//                   aria-label="Toggle sidebar"
//                 >
//                   <FaBars className="text-gray-300" />
//                 </button>
//                 <h1
//                   className="text-2xl font-bold cursor-pointer hidden md:block"
//                   onClick={() => setSelectedOption("Home")}
//                 >
//                   PassVault
//                 </h1>
//               </div>

//               <div className="flex items-center space-x-3">
//                 <button
//                   onClick={() => {
//                     if (isUnlocked) {
//                       lockVault();
//                       setSelectedOption((prev) => {
//                         if (
//                           prev === "GeneratePassword" ||
//                           prev === "ShowAllPassword"
//                         ) {
//                           return "Home";
//                         }
//                         return prev;
//                       });
//                     } else {
//                       setSelectedOption("Home");
//                       toast.info(
//                         "Use the 'Unlock Vault' option to access your passwords"
//                       );
//                     }
//                   }}
//                   className={`flex items-center space-x-1 px-3 py-1.5 rounded-full transition-colors ${
//                     isUnlocked
//                       ? "bg-red-600 hover:bg-red-700"
//                       : "bg-blue-600 hover:bg-blue-700"
//                   }`}
//                 >
//                   <FaLock className="text-sm" />
//                   <span className=" hover:cursor-pointer hidden sm:inline">
//                     {isUnlocked ? "Lock Vault" : "Unlock Vault"}
//                   </span>
//                 </button>

//                 <button
//                   className="p-1 rounded-full hover:bg-gray-700 transition-colors"
//                   onClick={() => setIsModalOpen(!isModalOpen)}
//                 >
//                   <FaUserCircle className="text-2xl text-gray-300" />
//                 </button>
//               </div>
//             </div>
//             <h1 className="text-4xl md:text-3xl font-bold hover:cursor-pointer "
//             onClick={() => setSelectedOption("Home")}
//             >PassVault</h1>
//           </div>
//         </div>

//         <div ref={modalRef}>
//           {/* Profile Modal */}
//           <ProfileModal
//             isOpen={isModalOpen}
//             onClick={() => setIsModalOpen(false)}
//             user={user}
//           <FaUserCircle
//             className="text-white text-4xl cursor-pointer"
//             onClick={() => setIsModalOpen(!isModalOpen)}
//           />
//         </div>

//         {/* Content Rendering Based on Selection */}
// <div ref={modalRef}>
//         {/* Profile Modal */}
//         <ProfileModal
//           isOpen={isModalOpen}
//           onClick={() => setIsModalOpen(false)}
//           user={user}
//         />
// </div>

//         <div className="flex-1 md:p-6 flex items-center justify-center">

//         {/* Content Rendering Based on Selection */}
//         <div className="flex-1 flex items-center justify-center">
//           {renderContent()}
//         </div>
//       </div>
//     </div>
//   );
// }

// // import { use, useState, useRef, useEffect, useContext } from "react";
// // import { FaUserCircle, FaLock, FaBars, FaTimes, FaHome, FaUser, FaKey, FaListAlt, FaShieldAlt, FaSignOutAlt, FaCog } from "react-icons/fa";
// // import ProfileModal from "../components/ProfileModal";
// // import Profile from "../components/Profile";
// // import TwoFactorAuth from "../components/TwoFactorAuth";
// // import Home from "../components/Home";
// // import { useGlobalContext } from "../context/context";
// // import { useNavigate } from "react-router-dom";
// // import { toast } from "react-toastify";
// // import PasswordManager from "../components/PasswordManager";
// // import ShowAllPassword from "../components/ShowAllPassword";
// // import MasterPasswordSetup from "../utility/MasterPasswordSetup";
// // import { useMasterPassword } from "../context/MasterPasswordContext";
// // import VaultUnlock from "../components/VaultUnlock";
// // import VaultStatus from "../components/VaultStatus";

// // export default function Dashboard() {
// //   const navigate = useNavigate();
// //   const modalRef = useRef(null);
// //   const sidebarRef = useRef(null);

// //   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [selectedOption, setSelectedOption] = useState("Home");
// //   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

// //   const {
// //     user,
// //     userLoggedIn,
// //     logoutUser,
// //     loginUser,
// //   } = useGlobalContext();

// //   const { isSetup, isUnlocked, lockVault } = useMasterPassword();

// //   const serverURL = "http://127.0.0.1:8000";

// //   const token = localStorage.getItem("token");

// //   // Handle resize events for responsive design
// //   useEffect(() => {
// //     const handleResize = () => {
// //       setIsMobile(window.innerWidth < 768);
// //       // Auto-close sidebar on mobile when resizing
// //       if (window.innerWidth < 768 && isSidebarOpen) {
// //         setIsSidebarOpen(false);
// //       }
// //     };

// //     window.addEventListener('resize', handleResize);
// //     return () => {
// //       window.removeEventListener('resize', handleResize);
// //     };
// //   }, [isSidebarOpen]);

// //   // Add event handler for outside clicks to close sidebar on mobile
// //   useEffect(() => {
// //     function handleClickOutside(event) {
// //       if (
// //         isMobile &&
// //         isSidebarOpen &&
// //         sidebarRef.current &&
// //         !sidebarRef.current.contains(event.target) &&
// //         !event.target.closest('button[aria-label="Toggle sidebar"]')
// //       ) {
// //         setIsSidebarOpen(false);
// //       }
// //     }

// //     if (isMobile && isSidebarOpen) {
// //       document.addEventListener("mousedown", handleClickOutside);
// //     }

// //     return () => {
// //       document.removeEventListener("mousedown", handleClickOutside);
// //     };
// //   }, [isMobile, isSidebarOpen]);

// //   // Handle modal click-outside closing
// //   useEffect(() => {
// //     function handleClickOutside(event) {
// //       if (
// //         isModalOpen &&
// //         modalRef.current &&
// //         !modalRef.current.contains(event.target)
// //       ) {
// //         setIsModalOpen(false);
// //       }
// //     }

// //     if (isModalOpen) {
// //       document.addEventListener("mousedown", handleClickOutside);
// //     }

// //     return () => {
// //       document.removeEventListener("mousedown", handleClickOutside);
// //     };
// //   }, [isModalOpen]);

// //   const fetchUser = async () => {
// //     if (!token) {
// //       logoutUser();
// //       navigate("/signin");
// //       return;
// //     }

// //     try {
// //       const res = await fetch(`${serverURL}/api/user/user-info`, {
// //         method: "GET",
// //         headers: {
// //           "Content-Type": "application/json",
// //           Authorization: `Bearer ${token}`,
// //         },
// //       });

// //       if (res.status === 401) {
// //         logoutUser();
// //         localStorage.clear();
// //         navigate("/signin");
// //         toast.error("Session expired. Please login again");
// //         return;
// //       }

// //       const data = await res.json();
// //       loginUser(data.user);
// //       console.log("User Data For Dashboard", user);
// //     } catch (error) {
// //       console.log("Unable To Fetch User Data For Dashboard: ", error);
// //       toast.error("Something Went Wrong. Please Try again");
// //     }
// //   };

// //   useEffect(() => {
// //     fetchUser();

// //     const intervalId = setInterval(() => {
// //       fetchUser();
// //     }, 1000 * 60 * 2); // Check every 2 minutes

// //     return () => clearInterval(intervalId);
// //   }, []);

// //   useEffect(() => {
// //     console.log("Dashboard detected vault status change: isUnlocked =", isUnlocked);

// //     if (!isUnlocked && (selectedOption === "GeneratePassword" || selectedOption === "ShowAllPassword")) {
// //       setSelectedOption("Home");
// //     }
// //   }, [isUnlocked]);

// //   // Handle navigation action
// //   const handleNavigation = (option) => {
// //     setSelectedOption(option);
// //     if (isMobile) {
// //       setIsSidebarOpen(false);
// //     }
// //   };

// //   // Function to render content based on selectedOption
// //   const renderContent = () => {
// //     if (
// //       (!isSetup || !isUnlocked) &&
// //       (selectedOption === "GeneratePassword" ||
// //         selectedOption === "ShowAllPassword")
// //     ) {
// //       return (
// //         <div className="w-full max-w-md">
// //           <div className="text-center mb-6">
// //             <div className="bg-yellow-700 bg-opacity-30 inline-block p-3 rounded-full animate-pulse">
// //               <FaLock size={40} className="text-yellow-500" />
// //             </div>
// //             <h2 className="text-2xl font-bold mt-4">Vault Access Required</h2>
// //             <p className="text-gray-300 mt-2 mb-6">
// //               {!isSetup
// //                 ? "You need to set up your master password first"
// //                 : "You need to unlock your vault to access this feature"}
// //             </p>
// //           </div>

// //           <VaultUnlock
// //             onUnlockSuccess={() => {
// //               toast.success("Vault unlocked successfully!");
// //               setSelectedOption(selectedOption);
// //             }}
// //           />
// //         </div>
// //       );
// //     }

// //     switch (selectedOption) {
// //       case "Profile":
// //         return <Profile user={user || {}} />;
// //       case "GeneratePassword":
// //         return <PasswordManager />;
// //       case "ShowAllPassword":
// //         return <ShowAllPassword />;
// //       case "2FA":
// //         return <TwoFactorAuth email={user.email || ""} />;
// //       case "LogOut":
// //         lockVault();
// //         logoutUser();
// //         localStorage.clear();
// //         navigate("/signin");
// //         toast.success("Logged Out Successfully");
// //         return null;
// //       case "MasterPasswordSetup":
// //         return <MasterPasswordSetup />;
// //       case "Home":
// //       default:
// //         return (
// //           <Home
// //             isSetup={isSetup}
// //             isUnlocked={isUnlocked}
// //             onSetupClick={() => setSelectedOption("MasterPasswordSetup")}
// //           />
// //         );
// //     }
// //   };

// //   return (
// //     <div className="flex min-h-screen bg-gray-800">
// //       {/* Overlay for mobile when sidebar is open */}
// //       {isMobile && isSidebarOpen && (
// //         <div
// //           className="fixed inset-0 bg-black bg-opacity-50 z-20 transition-opacity duration-300"
// // In your return statement, update the container elements:
// // return (
// //   <div className="flex min-h-screen bg-gray-800">
// //     {/* Sidebar */}
// //     <div
// //       className={`${
// //         isSidebarOpen ? "w-64" : "w-0"
// //       } bg-gray-900 text-white transition-all duration-300 h-screen sticky top-0`}
// //     >
// //       {/* Sidebar content remains the same */}
// //       <div className="flex justify-between p-4">
// //         <button
// //           className="p-2 hover:cursor-pointer bg-gray-700 rounded"
// //           onClick={() => setIsSidebarOpen(false)}
// //         />
// //       )}

// //       {/* Sidebar */}
// //       <div
// //         ref={sidebarRef}
// //         className={`${
// //           isSidebarOpen
// //             ? isMobile
// //               ? "translate-x-0 w-64"
// //               : "translate-x-0 w-64"
// //             : isMobile
// //               ? "-translate-x-full w-64"
// //               : "-translate-x-full w-64"
// //         } fixed h-full bg-gray-900 text-white transition-all duration-300 ease-in-out transform z-30 overflow-y-auto`}
// //       >
// //         <div className="flex items-center justify-between p-4 border-b border-gray-700">
// //           <div className="flex items-center space-x-2">
// //             <FaLock className="text-blue-400" />
// //             <h1 className="text-xl font-bold">PassVault</h1>
// //           </div>
// //           <button
// //             className="p-2 hover:bg-gray-700 rounded-full transition-colors"
// //             onClick={() => setIsSidebarOpen(false)}
// //             aria-label="Close sidebar"
// //           >
// //             <FaTimes />
// //           </button>
// //         </div>

// //         {/* Sidebar Items */}
// //         <div className="p-4">
// //           <ul className="space-y-2">
// //             <li>
// //               <button
// //                 className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
// //                   selectedOption === "Home" ? "bg-blue-600 text-white" : "hover:bg-gray-700 text-gray-300"
// //                 }`}
// //                 onClick={() => handleNavigation("Home")}
// //               >
// //                 <FaHome />
// //                 <span>Home</span>
// //               </button>
// //             </li>

// //             <li>
// //               <button
// //                 className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
// //                   selectedOption === "Profile" ? "bg-blue-600 text-white" : "hover:bg-gray-700 text-gray-300"
// //                 }`}
// //                 onClick={() => handleNavigation("Profile")}
// //               >
// //                 <FaUser />
// //                 <span>Profile</span>
// //               </button>
// //             </li>

// //             <li>
// //               <button
// //                 className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
// //                   selectedOption === "GeneratePassword" ? "bg-blue-600 text-white" : "hover:bg-gray-700 text-gray-300"
// //                 }`}
// //                 onClick={() => handleNavigation("GeneratePassword")}
// //               >
// //                 <FaKey />
// //                 <span>Generate Password</span>
// //               </button>
// //             </li>

// //             <li>
// //               <button
// //                 className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
// //                   selectedOption === "ShowAllPassword" ? "bg-blue-600 text-white" : "hover:bg-gray-700 text-gray-300"
// //                 }`}
// //                 onClick={() => handleNavigation("ShowAllPassword")}
// //               >
// //                 <FaListAlt />
// //                 <span>Show Passwords</span>
// //               </button>
// //             </li>

// //             <li>
// //               <button
// //                 className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
// //                   selectedOption === "MasterPasswordSetup" ? "bg-blue-600 text-white" : "hover:bg-gray-700 text-gray-300"
// //                 }`}
// //                 onClick={() => handleNavigation("MasterPasswordSetup")}
// //               >
// //                 <FaCog />
// //                 <span>Master Key</span>
// //               </button>
// //             </li>

// //             <li>
// //               <button
// //                 className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
// //                   selectedOption === "2FA" ? "bg-blue-600 text-white" : "hover:bg-gray-700 text-gray-300"
// //                 }`}
// //                 onClick={() => handleNavigation("2FA")}
// //               >
// //                 <FaShieldAlt />
// //                 <span>Two-Factor Authentication</span>
// //               </button>
// //             </li>

// //             <li className="mt-8">
// //               <button
// //                 className="w-full flex items-center space-x-3 p-3 rounded-lg text-red-400 hover:bg-red-900 hover:bg-opacity-30 transition-colors"
// //                 onClick={() => handleNavigation("LogOut")}
// //               >
// //                 <FaSignOutAlt />
// //                 <span>Logout</span>
// //               </button>
// //             </li>
// //           </ul>
// //         </div>
// //         >
// //           Close
// //         </button>
// //       </div>

// //       {/* Main content */}
// //       <div className="flex-1 flex flex-col min-h-screen ml-0 transition-all duration-300">
// //         {/* Navbar */}
// //         <div className="bg-gray-900 text-white shadow-lg">
// //           <div className="container mx-auto px-4 py-3">
// //             <div className="flex justify-between items-center">
// //               <div className="flex items-center space-x-4">
// //                 <button
// //                   className="p-2 hover:bg-gray-700 rounded-md transition-colors"
// //                   onClick={() => setIsSidebarOpen(!isSidebarOpen)}
// //                   aria-label="Toggle sidebar"
// //                 >
// //                   <FaBars className="text-gray-300" />
// //                 </button>
// //                 <h1
// //                   className="text-2xl font-bold cursor-pointer hidden md:block"
// //                   onClick={() => setSelectedOption("Home")}
// //                 >
// //                   PassVault
// //                 </h1>
// //               </div>

// //               <div className="flex items-center space-x-3">
// //                 <button
// //                   onClick={() => {
// //                     if (isUnlocked) {
// //                       lockVault();
// //                       setSelectedOption(prev => {
// //                         if (prev === "GeneratePassword" || prev === "ShowAllPassword") {
// //                           return "Home";
// //                         }
// //                         return prev;
// //                       });
// //                     } else {
// //                       setSelectedOption("Home");
// //                       toast.info("Use the 'Unlock Vault' option to access your passwords");
// //                     }
// //                   }}
// //                   className={`flex items-center space-x-1 px-3 py-1.5 rounded-full transition-colors ${
// //                     isUnlocked
// //                       ? "bg-red-600 hover:bg-red-700"
// //                       : "bg-blue-600 hover:bg-blue-700"
// //                   }`}
// //                 >
// //                   <FaLock className="text-sm" />
// //                   <span className="hidden sm:inline">
// //                     {isUnlocked ? "Lock Vault" : "Unlock Vault"}
// //                   </span>
// //                 </button>
// //       {/* Sidebar Items - remains the same */}
// //       <div className="p-4">
// //         {/* existing sidebar items */}
// //       </div>
// //     </div>

// //                 <button
// //                   className="p-1 rounded-full hover:bg-gray-700 transition-colors"
// //                   onClick={() => setIsModalOpen(!isModalOpen)}
// //                 >
// //                   <FaUserCircle className="text-2xl text-gray-300" />
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //     {/* Main content */}
// //     <div className="flex-1 flex flex-col bg-gray-800 text-white min-h-screen">
// //       {/* Navbar */}
// //       <div className="flex justify-between items-center bg-gray-900 p-4 sticky top-0 z-10">
// //         {/* navbar content remains the same */}
// //       </div>

// //         <div ref={modalRef}>
// //           {/* Profile Modal */}
// //           <ProfileModal
// //             isOpen={isModalOpen}
// //             onClick={() => setIsModalOpen(false)}
// //             user={user}
// //           />
// //         </div>
// //       {/* Profile Modal - remains the same */}
// //       <ProfileModal
// //         isOpen={isModalOpen}
// //         onClick={() => setIsModalOpen(false)}
// //         user={user}
// //       />

// //         {/* Content Rendering Based on Selection */}
// //         <div className="flex-1 p-4 md:p-6">
// //           <div className="flex justify-center">
// //             {renderContent()}
// //           </div>
// //         </div>
// //       {/* Content Rendering Based on Selection */}
// //       <div className="flex-1 flex items-start justify-center p-4 bg-gray-800">
// //         {renderContent()}
// //       </div>
// //     </div>
// //   );
// // }
// //   </div>
// // );

// // }

import React, { useState, useRef, useEffect } from "react";
import {
  FaUserCircle,
  FaLock,
  FaBars,
  FaTimes,
  FaHome,
  FaUser,
  FaKey,
  FaListAlt,
  FaShieldAlt,
  FaSignOutAlt,
  FaCog,
  FaWrench
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import ProfileModal from "../components/ProfileModal";
import Profile from "../components/Profile";
import TwoFactorAuth from "../components/TwoFactorAuth";
import Home from "../components/Home";
import PasswordManager from "../components/PasswordManager";
import ShowAllPassword from "../components/ShowAllPassword";
import MasterPasswordSetup from "../utility/MasterPasswordSetup";
import VaultUnlock from "../components/VaultUnlock";

import { useGlobalContext } from "../context/context";
import { useMasterPassword } from "../context/MasterPasswordContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const modalRef = useRef(null);
  const sidebarRef = useRef(null);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Home");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const { user, userLoggedIn, logoutUser, loginUser } = useGlobalContext();
  const { isSetup, isUnlocked, lockVault } = useMasterPassword();

  const serverURL = "http://127.0.0.1:8000";
  const token = localStorage.getItem("token");

  // Handle resize events for responsive design
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768 && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isSidebarOpen]);

  // Close sidebar on outside click for mobile & Desktop
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !event.target.closest('button[aria-label="Toggle sidebar"]')
      ) {
        setIsSidebarOpen(false);
      }
    }

    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen]);



  // Close modal on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        isModalOpen &&
        modalRef.current &&
        !modalRef.current.contains(event.target)
      ) {
        setIsModalOpen(false);
      }
    }

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isModalOpen]);

  // Fetch user data
  const fetchUser = async () => {
    if (!token) {
      logoutUser();
      navigate("/signin");
      return;
    }

    try {
      const res = await fetch(`${serverURL}/api/user/user-info`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        logoutUser();
        localStorage.clear();
        navigate("/signin");
        toast.error("Session expired. Please login again");
        return;
      }

      const data = await res.json();
      loginUser(data.user);
    } catch (error) {
      console.error("Unable To Fetch User Data For Dashboard: ", error);
      toast.error("Something Went Wrong. Please Try again");
    }
  };

  // Periodic user data refresh and initial fetch
  useEffect(() => {
    fetchUser();
    const intervalId = setInterval(fetchUser, 1000 * 60 * 2);
    return () => clearInterval(intervalId);
  }, []);

  // Handle vault status changes
  useEffect(() => {
    if (
      !isUnlocked &&
      (selectedOption === "GeneratePassword" ||
        selectedOption === "ShowAllPassword")
    ) {
      setSelectedOption("Home");
    }
  }, [isUnlocked]);

  // Navigation handler
  const handleNavigation = (option) => {
    setSelectedOption(option);
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  // Content rendering logic
  const renderContent = () => {
    if (
      (!isSetup || !isUnlocked) &&
      (selectedOption === "GeneratePassword" ||
        selectedOption === "ShowAllPassword")
    ) {
      return (
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <div className="bg-yellow-700 bg-opacity-30 inline-block p-3 rounded-full animate-pulse">
              <FaLock size={40} className="text-yellow-500" />
            </div>
            <h2 className="text-2xl font-bold mt-4">Vault Access Required</h2>
            <p className="text-gray-300 mt-2 mb-6">
              {!isSetup
                ? "You need to set up your master password first"
                : "You need to unlock your vault to access this feature"}
            </p>
          </div>

          <VaultUnlock
            onUnlockSuccess={() => {
              toast.success("Vault unlocked successfully!");
              setSelectedOption(selectedOption);
            }}
          />
        </div>
      );
    }

    switch (selectedOption) {
      case "Profile":
        return <Profile />;
      case "GeneratePassword":
        return <PasswordManager />;
      case "ShowAllPassword":
        return <ShowAllPassword />;
      case "2FA":
        return <TwoFactorAuth />;
      case "LogOut":
        return <div className="text-center">Logging out...</div>;


      case "MasterPasswordSetup":
        return <MasterPasswordSetup />;
      case "Settings":
        return <div className="text-center">Redirecting to settings...</div>;

      case "Home":
      default:
        return (
          <Home
            isSetup={isSetup}
            isUnlocked={isUnlocked}
            onSetupClick={() => setSelectedOption("MasterPasswordSetup")}
          />
        );
    }
  };


  useEffect(() => {
    if (selectedOption === "Settings") {
      navigate("/settings");
    }
  }, [selectedOption, navigate]);
  
  useEffect(() => {
    if (selectedOption === "LogOut") {
      lockVault();
      logoutUser();
      localStorage.clear();
      navigate("/signin");
      toast.success("Logged Out Successfully");
    }
  }, [selectedOption]);


  return (
    <div className="flex min-h-screen bg-gray-800">
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div
        ref={sidebarRef}
        className={`${
          isSidebarOpen
            ? isMobile
              ? "translate-x-0 w-64"
              : "translate-x-0 w-64"
            : isMobile
            ? "-translate-x-full w-64"
            : "-translate-x-full w-64"
        } fixed h-full bg-gray-900 text-white transition-all duration-300 ease-in-out transform z-30 overflow-y-auto`}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <FaLock className="text-blue-400" />
            <h1 className="text-xl font-bold">PassVault</h1>
          </div>
          <button
            className="p-2 hover:bg-gray-700 rounded-full transition-colors"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <FaTimes />
          </button>
        </div>

        {/* Sidebar items */}
        <div className="p-4">
          <ul className="space-y-2">
            {[
              { name: "Home", icon: FaHome, color: "text-blue-400" },
              { name: "Profile", icon: FaUser, color: "text-purple-400" },
              {
                name: "GeneratePassword",
                icon: FaKey,
                color: "text-yellow-400",
                label: "Generate Password",
              },
              {
                name: "ShowAllPassword",
                icon: FaListAlt,
                color: "text-orange-400",
                label: "Show Passwords",
              },
              {
                name: "MasterPasswordSetup",
                icon: FaCog,
                color: "text-red-400",
                label: "Master Key",
              },
              {
                name: "2FA",
                icon: FaShieldAlt,
                color: "text-green-400",
                label: "2FA Authentication",
              },
              {
                name: "Settings",
                icon: FaWrench,
                color: "text-silver-400",
                label: "Settings",
              },
            ].map(({ name, icon: Icon, color, label }) => (
              <li key={name}>
                <button
                  className={`hover:cursor-pointer w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    selectedOption === name
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-700 text-gray-300"
                  }`}
                  onClick={() => handleNavigation(name)}
                >
                  <Icon
                    className={selectedOption === name ? "text-white" : color}
                  />
                  <span>{label || name}</span>
                </button>
              </li>
            ))}

            <li className="mt-8">
              <button
                className="w-full flex items-center space-x-3 p-3 rounded-lg hover:cursor-pointer hover:bg-red-900 hover:bg-opacity-30 transition-colors"
                onClick={() => handleNavigation("LogOut")}
              >
                <FaSignOutAlt className="text-red-400" />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col bg-gray-800 text-white">
        {/* Navbar */}
        <div className="bg-gray-900 text-white shadow-lg">
          <div className="container mx-auto px-4 py-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <button
                  className="p-2 hover:bg-gray-700 rounded-md transition-colors"
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  aria-label="Toggle sidebar"
                >
                  <FaBars className="text-gray-300" />
                </button>
                <h1
                  className="text-2xl font-bold cursor-pointer hidden md:block"
                  onClick={() => setSelectedOption("Home")}
                >
                  PassVault
                </h1>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => {
                    if (isUnlocked) {
                      lockVault();
                      setSelectedOption((prev) =>
                        ["GeneratePassword", "ShowAllPassword"].includes(prev)
                          ? "Home"
                          : prev
                      );
                    } else {
                      setSelectedOption("Home");
                      toast.info(
                        "Use the 'Unlock Vault' option to access your passwords"
                      );
                    }
                  }}
                  className={`flex items-center space-x-1 px-3 py-1.5 rounded-full transition-colors ${
                    isUnlocked
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  <FaLock className="text-sm" />
                  <span className="hidden sm:inline">
                    {isUnlocked ? "Lock Vault" : "Unlock Vault"}
                  </span>
                </button>

                <button
                  className="p-1 rounded-full hover:bg-gray-700 transition-colors"
                  onClick={() => setIsModalOpen(!isModalOpen)}
                >
                  <FaUserCircle className="text-2xl text-gray-300" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div ref={modalRef}>
          <ProfileModal
            isOpen={isModalOpen}
            onClick={() => setIsModalOpen(false)}
            user={user}
          />
        </div>

        {/* Content Rendering Based on Selection */}
        <div className="flex-1 p-4 md:p-6 flex items-center justify-center">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
