import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import ProfileModal from "../components/ProfileModal";
import GeneratePassword from "../components/GeneratePassword";
import SavePassword from "../components/SavedPassword";
import Profile from "../components/Profile";
import TwoFactorAuth from "../components/TwoFactorAuth";
import Home from "../components/Home";



export default function Dashboard() {
  const user = {
    name: "John Doe",
    email: "example@gmail.com",
    Two_factor_authentication : "Enabled",
    changePassword: () => alert("Change Password Clicked"),
    logout: () => alert("Logout Clicked"),
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(""); 

  // Function to render content based on selectedOption
  const renderContent = () => {
    switch (selectedOption) {
      case "Profile":
        return <Profile user={user} />
      case "GeneratePassword":
        return <GeneratePassword />;
      case "SavedPassword":
        return <SavePassword />;
      case "2FA":
        return <TwoFactorAuth userEmail = {'gad@gmail.com'} />
      default:
        return <Home/>;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? "w-64" : "w-0"} bg-gray-900 text-white transition-all duration-300 overflow-hidden`}>
        <div className="flex justify-between p-4">
          <button className="p-2 hover:cursor-pointer bg-gray-700 rounded" onClick={() => setIsSidebarOpen(false)}>
            Close
          </button>
        </div>

        {/* Sidebar Items */}
        <div className="p-4">
          <ul className="space-y-4">
            <li className="hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={() => setSelectedOption("Profile")}>
              Profile
            </li>
            <li className="hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={() => setSelectedOption("GeneratePassword")}>
              Generate Password
            </li>
            <li className="hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={() => setSelectedOption("SavedPassword")}>
              Saved Passwords
            </li>
            <li className="hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={() => setSelectedOption("2FA")}>
              Two-Factor Authentication (2FA)
            </li>
            <li className="hover:bg-gray-700 p-2 rounded cursor-pointer text-red-600" onClick={user.logout}>
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
            <button className={`p-2 hover:cursor-pointer bg-gray-700 rounded ${isSidebarOpen ? "hidden" : ""}`} onClick={() => setIsSidebarOpen(true)}>
              Open
            </button>
            <h1 className="text-4xl md:text-3xl font-bold">PassVault</h1>
          </div>
          <FaUserCircle className="text-white text-4xl cursor-pointer" onClick={() => setIsModalOpen(!isModalOpen)} />
        </div>

        {/* Profile Modal */}
        <ProfileModal isOpen={isModalOpen} onClick={() => setIsModalOpen(false)} user={user} />

        {/* Content Rendering Based on Selection */}
        <div className="flex-1 flex items-center justify-center">{renderContent()}</div>
      </div>
    </div>
  );
}
