// import { useState } from "react";
// import { useGlobalContext } from "../context/context";
// import { toast } from "react-toastify";

import { version } from "react"



// export default function SavePassword() {
//   const [platform, setPlatform] = useState("");
//   const [password, setPassword] = useState("");
//   const [savedPasswords, setSavedPasswords] = useState([]);
//   const { user } = useGlobalContext();

//   console.log("User Data From SavePassword", user.email)

//   const serverURL = "http://127.0.0.1:8000";
  
//   const token = localStorage.getItem("token");


//   const handleSave = async () => {

   

//     const newEntry = { platform, password };
    
//     // password/save-password?email=${user.email}

//     try {
//       const res = await fetch(`http://127.0.0.1:8000/api/password/show-passwords/${user.email}`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       }
//       );
      

//       const data = await res.json();
//       console.log(data);
//       console.log(res)


//     } catch (error) {
//       console.log("Failed to Save PassWord",error)
//       toast.error(error.message);
//     }



//     if (platform && password) {
//       const newEntry = { platform, password };
//       setSavedPasswords([...savedPasswords, newEntry]);
//       setPlatform("");
//       setPassword("");
//     }
//   };

//   return (
//     <div className="p-4 bg-gray-800 text-white rounded shadow-lg">
//       <h2 className="text-2xl font-bold mb-4">Show Password</h2>

//       <input
//         type="text"
//         placeholder="Platform Name"
//         className="w-full p-2 mb-2 bg-gray-700 rounded"
//         value={platform}
//         onChange={(e) => setPlatform(e.target.value)}
//       />
      
//       <input
//         type="password"
//         placeholder="Password"
//         className="w-full p-2 mb-2 bg-gray-700 rounded"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />

//       <button
//         className="w-full bg-blue-600 p-2 rounded hover:bg-blue-700"
//         onClick={handleSave}
//       >
//         Save
//       </button>

//       <div className="mt-4">
//         <h3 className="text-xl font-semibold mb-2">Saved Passwords</h3>

//         <ul>
//           {savedPasswords.map((item, index) => (
//             <li key={index} className="p-2 bg-gray-700 my-1 rounded">
//               <span className="font-semibold">{item.platform}</span>: {item.password}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }



// 2nd version 

// import { useState, useEffect } from "react";
// import { useGlobalContext } from "../context/context";
// import { toast } from "react-toastify";
// import { FaEye, FaEyeSlash, FaCopy, FaTrash, FaEdit } from "react-icons/fa";

// export default function SavePassword({ prefilledPassword = "" }) {
//   const [title, setTitle] = useState("");
//   const [password, setPassword] = useState(prefilledPassword);
//   const [savedPasswords, setSavedPasswords] = useState([]);
//   const [showPasswords, setShowPasswords] = useState({});
//   const { user } = useGlobalContext();

//   const serverURL = "http://127.0.0.1:8000";
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     if (prefilledPassword) {
//       setPassword(prefilledPassword);
//     }
//     fetchSavedPasswords();
//   }, [prefilledPassword, user.email]);

//   const fetchSavedPasswords = async () => {
//     if (!user?.email) return;
    
//     try {
//       const res = await fetch(`${serverURL}/api/password/show-passwords/${user.email}`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });
      
//       const data = await res.json();
//       if (data.status_code === 200 && data.passwords) {
//         // Extract the passwords array from the first item if it exists
//         const passwordsArray = data.passwords[0]?.passwords || [];
//         setSavedPasswords(passwordsArray);
//       }
//     } catch (error) {
//       console.error("Failed to fetch passwords", error);
//       toast.error("Failed to load saved passwords");
//     }
//   };

//   const handleSave = async () => {
//     if (!title) {
//       toast.error("Platform name is required");
//       return;
//     }

//     if (!password) {
//       toast.error("Password is required");
//       return;
//     }

//     try {
//       const res = await fetch(`${serverURL}/api/password/save-password`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           email: user.email,
//           title,
//           password,
//         }),
//       });

//       const data = await res.json();
      
//       if (data.status_code === 200) {
//         toast.success("Password saved successfully");
//         setTitle("");
//         setPassword("");
//         fetchSavedPasswords();
//       } else {
//         toast.error("Failed to save password");
//       }
//     } catch (error) {
//       console.error("Failed to save password", error);
//       toast.error("An error occurred while saving the password");
//     }
//   };

//   const copyToClipboard = (text) => {
//     navigator.clipboard.writeText(text)
//       .then(() => toast.success("Copied to clipboard"))
//       .catch(() => toast.error("Failed to copy"));
//   };

//   const togglePasswordVisibility = (id) => {
//     setShowPasswords(prev => ({
//       ...prev,
//       [id]: !prev[id]
//     }));
//   };

//   return (
//     <div className="p-4 bg-gray-800 text-white rounded shadow-lg w-full">
//       <h2 className="text-2xl font-bold mb-4">Password Manager</h2>

//       <div className="mb-6">
//         <input
//           type="text"
//           placeholder="Platform/Website Name"
//           className="w-full p-2 mb-2 bg-gray-700 rounded"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
        
//         <div className="relative">
//           <input
//             type="password"
//             placeholder="Password"
//             className="w-full p-2 mb-2 bg-gray-700 rounded"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>

//         <button
//           className="w-full bg-blue-600 p-2 rounded hover:bg-blue-700 transition"
//           onClick={handleSave}
//         >
//           Save Password
//         </button>
//       </div>

//       <div className="mt-8">
//         <h3 className="text-xl font-semibold mb-4">Saved Passwords : {savedPasswords.length} </h3> 

//         {savedPasswords.length === 0 ? (
//           <p className="text-gray-400">No saved passwords yet</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             {savedPasswords.map((item, index) => (
//               <div key={item.id || index} className="bg-gray-700 p-4 rounded-lg shadow flex flex-col">
//                 <div className="flex justify-between items-center mb-2">
//                   <h4 className="font-bold text-lg truncate">{item.title}</h4>
//                   <div className="flex space-x-2">
//                     <button 
//                       onClick={() => togglePasswordVisibility(item.id)}
//                       className="text-gray-300 hover:text-white p-1"
//                     >
//                       {showPasswords[item.id] ? <FaEyeSlash /> : <FaEye />}
//                     </button>
//                     <button 
//                       onClick={() => copyToClipboard(item.password)}
//                       className="text-gray-300 hover:text-white p-1"
//                     >
//                       <FaCopy />
//                     </button>
//                   </div>
//                 </div>
//                 <div className="bg-gray-800 p-2 rounded mt-1">
//                   <code className="font-mono">
//                     {showPasswords[item.id] ? item.password : "•".repeat(Math.min(12, item.password.length))}
//                   </code>
//                 </div>
//                 <div className="mt-auto pt-3 flex justify-end space-x-2">
//                   <button className="text-blue-400 hover:text-blue-300 p-1">
//                     <FaEdit />
//                   </button>
//                   <button className="text-red-400 hover:text-red-300 p-1">
//                     <FaTrash />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


// 3rd version

import { useState, useEffect } from "react";
import { useGlobalContext } from "../context/context";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash, FaCopy, FaTrash, FaEdit, FaTimes } from "react-icons/fa";

export default function ListAllPassword({ prefilledPassword = "" }) {

  const { user } = useGlobalContext();
  const [title, setTitle] = useState("");
  const [password, setPassword] = useState(prefilledPassword);
  const [savedPasswords, setSavedPasswords] = useState([]);
  const [showPasswords, setShowPasswords] = useState({});
  
  // States for edit functionality
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editPassword, setEditPassword] = useState("");
  
  // State for delete confirmation
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const serverURL = "http://127.0.0.1:8000";
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (prefilledPassword) {
      setPassword(prefilledPassword);
    }
    fetchSavedPasswords();
  }, [prefilledPassword, user?.email]);

  const fetchSavedPasswords = async () => {
    if (!user?.email) return;
    
    try {
      const res = await fetch(`${serverURL}/api/password/show-passwords/${user.email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      
      const data = await res.json();
      if (data.status_code === 200 && data.passwords) {
        // Extract the passwords array from the first item if it exists
        const passwordsArray = data.passwords[0]?.passwords || [];
        setSavedPasswords(passwordsArray);
      }
    } catch (error) {
      console.error("Failed to fetch passwords", error);
      toast.error("Failed to load saved passwords");
    }
  };

  // console.log("Saved Passwords", savedPasswords);

  const handleSave = async () => {
    if (!title) {
      toast.error("Platform name is required");
      return;
    }

    if (!password) {
      toast.error("Password is required");
      return;
    }

    try {
      const res = await fetch(`${serverURL}/api/password/save-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: user.email,
          title,
          password,
        }),
      });

      const data = await res.json();
      
      if (data.status_code === 200) {
        toast.success("Password saved successfully");
        setTitle("");
        setPassword("");
        fetchSavedPasswords();
      } else {
        toast.error("Failed to save password");
      }
    } catch (error) {
      console.error("Failed to save password", error);
      toast.error("An error occurred while saving the password");
    }
  };

  // EDIT functionality
  const startEdit = (item) => {
    setEditId(item.id);
    setEditTitle(item.title);
    setEditPassword(item.password);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditId(null);
    setEditTitle("");
    setEditPassword("");
  };

  const handleUpdate = async () => {
    if (!editTitle || !editPassword) {
      toast.error("All fields are required");
      return;
    }

    try {
      const res = await fetch(`${serverURL}/api/password/update-password/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: user.email,
          password_id: editId,
          password: editPassword,
        }),
      });

      const data = await res.json();
      
      if (data.status_code === 200) {
        toast.success("Password updated successfully");
        cancelEdit();
        fetchSavedPasswords();
      } else {
        toast.error(data.detail || "Failed to update password");
      }
    } catch (error) {
      console.error("Failed to update password", error);
      toast.error("An error occurred while updating the password");
    }
  };

  // DELETE functionality
  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowDeleteConfirm(true);
  };

  const cancelDelete = () => {
    setDeleteId(null);
    setShowDeleteConfirm(false);
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`${serverURL}/api/password/delete-password`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: user.email,
          password_id: deleteId,
        }),
      });

      const data = await res.json();
      console.log("Delete Functionality: ",data);
      
      if (data.status_code === 200) {
        toast.success("Password deleted successfully");
        fetchSavedPasswords();
      } else {
        toast.error(data.detail || "Failed to delete password");
      }
      
      cancelDelete();
    } catch (error) {
      console.error("Failed to delete password", error);
      toast.error("An error occurred while deleting the password");
      cancelDelete();
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => toast.success("Copied to clipboard"))
      .catch(() => toast.error("Failed to copy"));
  };

  const togglePasswordVisibility = (id) => {
    setShowPasswords(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="p-4 bg-gray-800 text-white rounded shadow-lg w-full">
      <h2 className="text-2xl font-bold mb-4">Password Manager</h2>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Platform/Website Name"
          className="w-full p-2 mb-2 bg-gray-700 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        
        <div className="relative">
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-2 bg-gray-700 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className=" hover:cursor-pointer w-full bg-blue-600 p-2 rounded hover:bg-blue-700 transition"
          onClick={handleSave}
        >
          Save Password
        </button>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Edit Password</h3>
              <button onClick={cancelEdit} className="text-gray-400 hover:text-white">
                <FaTimes />
              </button>
            </div>
            
            <input
              type="text"
              placeholder="Platform/Website Name"
              className="w-full p-2 mb-3 bg-gray-700 rounded"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              disabled
            />
            
            <input
              type="text"
              placeholder="Password"
              className="w-full p-2 mb-4 bg-gray-700 rounded"
              value={editPassword}
              onChange={(e) => setEditPassword(e.target.value)}
            />
            
            <div className="flex justify-end space-x-3">
              <button 
                className=" hover:cursor-pointer px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
                onClick={cancelEdit}
              >
                Cancel
              </button>
              <button 
                className="hover:cursor-pointer px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>
            <p className="mb-6">Are you sure you want to delete this password? This action cannot be undone.</p>
            
            <div className="flex justify-end space-x-3">
              <button 
                className="hover:cursor-pointer px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
                onClick={cancelDelete}
              >
                Cancel
              </button>
              <button 
                className="hover:cursor-pointer px-4 py-2 bg-red-600 rounded hover:bg-red-700"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Total Saved Passwords : {savedPasswords.length} </h3>

        {savedPasswords.length === 0 ? (
          <p className="text-gray-400">No saved passwords yet</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedPasswords.map((item, index) => (
              <div key={item.id || index} className="bg-gray-700 p-4 rounded-lg shadow flex flex-col">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold text-lg truncate">{item.title}</h4>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => togglePasswordVisibility(item.id)}
                      className="text-gray-400 hover:text-white p-1 hover:cursor-pointer "
                    >
                      {showPasswords[item.id] ? <FaEyeSlash /> : <FaEye />}
                    </button>
                    <button 
                      onClick={() => copyToClipboard(item.password)}
                      className="hover:cursor-pointer text-gray-400 hover:text-white p-1"
                    >
                      <FaCopy />
                    </button>
                  </div>
                </div>
                <div className="bg-gray-800 p-2 rounded mt-1">
                  <code className="font-mono">
                    {showPasswords[item.id] ? item.password : "•".repeat(Math.min(12, item.password.length))}
                  </code>
                </div>
                <div className="mt-auto pt-3 flex justify-end space-x-2">
                  <button 
                    className=" hover:cursor-pointer text-blue-400 hover:text-blue-300 p-1"
                    onClick={() => startEdit(item)}
                  >
                    <FaEdit />
                  </button>
                  <button 
                    className="hover:cursor-pointer text-red-400 hover:text-red-300 p-1"
                    onClick={() => confirmDelete(item.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
