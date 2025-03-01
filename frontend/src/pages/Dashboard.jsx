import { use, useState, useRef,useEffect, useContext } from "react";
import { FaUserCircle } from "react-icons/fa";
import ProfileModal from "../components/ProfileModal";
import GeneratePassword from "../components/GeneratePassword";
import SavePassword from "../components/ListAllPassword";
import Profile from "../components/Profile";
import TwoFactorAuth from "../components/TwoFactorAuth";
import Home from "../components/Home";
import axios from "axios";
import { useGlobalContext } from "../context/context";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PasswordGenerator from "../components/GeneratePassword";
import PasswordManager from "../components/PasswordManager";
import ListAllPassword from "../components/ListAllPassword";

// import MasterPasswordSetup from "../utility/MasterPasswordSetup";


export default function Dashboard() {
  const navigate = useNavigate();
  const modalRef = useRef(null);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const { user, userLoggedIn, logoutUser, loginUser } = useGlobalContext();

  const serverURL = "http://127.0.0.1:8000";

  const token = localStorage.getItem("token");


  // Add event handler for outside clicks
  useEffect(() => {
    function handleClickOutside(event) {
      if (isModalOpen && modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    }

    // Add event listener when modal is open
    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    // Clean up the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);


  const fetchUser = async () => {

    if (!token) {
      logoutUser();
      navigate("/signin");
      return;
    }


    // console.log(userLoggedIn);

    try {
      const res = await fetch(`${serverURL}/api/user/user-info`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Send token in Authorization header
        },
      });

      if (res.status === 401) {
        // Token expired or invalid
        localStorage.clear(); // Clear any stale data
        logoutUser();
        navigate("/signin");
        toast.error("Session expired. Please login again");
        return;
      }

      const data = await res.json();
      loginUser(data.user);
      console.log("User Data For Dashboard", user);


    } catch (error) {
      console.log("Unable To Fetch User Data For Dashboard: ", error);
      toast.error("Something Went Wrong. Please Try again");
    }
  };

  // Add a cleanup function to useEffect
  useEffect(() => {

    // if (userLoggedIn) {
    //   fetchUser();
    // }

    fetchUser();

    // Optional: Set up an interval to periodically check token validity
    const intervalId = setInterval(() => {
      fetchUser();
    }, 1000 * 60 * 2); // Check every 2 minutes

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);




  // Function to render content based on selectedOption
  const renderContent = () => {
    switch (selectedOption) {
      case "Profile":
        return <Profile user={user || {}} />;
      case "GeneratePassword":
        return <PasswordManager/>
      case "ListAllPassword":
        return <ListAllPassword />;
      case "2FA":
        return <TwoFactorAuth email={user.email || ""} />;
      case "LogOut":
        logoutUser();
        localStorage.clear();
        navigate("/signin");
        toast.success("Logged Out Successfully");
        return null;
      
      // case "MasterPasswordSetup":
      //   return <MasterPasswordSetup />;

      case "Home":
        return <Home />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-800 ">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-0"
        } bg-gray-900 text-white transition-all duration-300 overflow-hidden`}
      >
        <div className="flex justify-between p-4">
          <button
            className="p-2 hover:cursor-pointer bg-gray-700 rounded"
            onClick={() => setIsSidebarOpen(false)}
          >
            Close
          </button>
        </div>

        {/* Sidebar Items */}
        <div className="p-4">
          <ul className="space-y-4">
            <li
              className="hover:bg-gray-700 p-2 rounded cursor-pointer"
              onClick={() => setSelectedOption("Profile")}
            >
              Profile
            </li>
            <li
              className="hover:bg-gray-700 p-2 rounded cursor-pointer"
              onClick={() => setSelectedOption("GeneratePassword")}
            >
              Generate Password
            </li>
            <li
              className="hover:bg-gray-700 p-2 rounded cursor-pointer"
              onClick={() => setSelectedOption("ListAllPassword")}
            >
              Show Passwords
            </li>


            {/* <li
              className="hover:bg-gray-700 p-2 rounded cursor-pointer"
              onClick={() => setSelectedOption("MasterPasswordSetup")}
            >
              Master Key
            </li> */}


            <li
              className="hover:bg-gray-700 p-2 rounded cursor-pointer"
              onClick={() => setSelectedOption("2FA")}
            >
              Two-Factor Authentication (2FA)
            </li>
            <li
              className="hover:bg-gray-700 p-2 rounded cursor-pointer text-red-500"
              onClick={() => setSelectedOption("LogOut")}
            >
              Logout
            </li>
          </ul>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col bg-gray-800 text-white">
        {/* Navbar */}
        <div className="flex justify-between items-center bg-gray-900 p-4">
          <div className="flex gap-10">
            <button
              className={`p-2 hover:cursor-pointer bg-gray-700 rounded ${
                isSidebarOpen ? "hidden" : ""
              }`}
              onClick={() => setIsSidebarOpen(true)}
            >
              Open
            </button>
            <h1 className="text-4xl md:text-3xl font-bold hover:cursor-pointer "
            onClick={() => setSelectedOption("Home")}
            >PassVault</h1>
          </div>
          <FaUserCircle
            className="text-white text-4xl cursor-pointer"
            onClick={() => setIsModalOpen(!isModalOpen)}
          />
        </div>

<div ref={modalRef}>
        {/* Profile Modal */}
        <ProfileModal
          isOpen={isModalOpen}
          onClick={() => setIsModalOpen(false)}
          user={user}
        />
</div>


        {/* Content Rendering Based on Selection */}
        <div className="flex-1 flex items-center justify-center">
          {renderContent()}
        </div>
      </div>
    </div>
  );


// In your return statement, update the container elements:
// return (
//   <div className="flex min-h-screen bg-gray-800">
//     {/* Sidebar */}
//     <div
//       className={`${
//         isSidebarOpen ? "w-64" : "w-0"
//       } bg-gray-900 text-white transition-all duration-300 h-screen sticky top-0`}
//     >
//       {/* Sidebar content remains the same */}
//       <div className="flex justify-between p-4">
//         <button
//           className="p-2 hover:cursor-pointer bg-gray-700 rounded"
//           onClick={() => setIsSidebarOpen(false)}
//         >
//           Close
//         </button>
//       </div>

//       {/* Sidebar Items - remains the same */}
//       <div className="p-4">
//         {/* existing sidebar items */}
//       </div>
//     </div>

//     {/* Main content */}
//     <div className="flex-1 flex flex-col bg-gray-800 text-white min-h-screen">
//       {/* Navbar */}
//       <div className="flex justify-between items-center bg-gray-900 p-4 sticky top-0 z-10">
//         {/* navbar content remains the same */}
//       </div>

//       {/* Profile Modal - remains the same */}
//       <ProfileModal
//         isOpen={isModalOpen}
//         onClick={() => setIsModalOpen(false)}
//         user={user}
//       />

//       {/* Content Rendering Based on Selection */}
//       <div className="flex-1 flex items-start justify-center p-4 bg-gray-800">
//         {renderContent()}
//       </div>
//     </div>
//   </div>
// );

}
