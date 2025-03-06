// // GlobalContext.jsx
// import React, { useState, useEffect } from "react";
// import GlobalContext from "./context"; // Import the context

// export const GlobalProvider = ({ children }) => {
//   // const [user, setUser] = useState('');
//   // const [userLoggedIn, setUserLoggedIn] = useState(false);

//   // // Check if there's a logged-in user in localStorage
//   // useEffect(() => {
//   //   const storedUser = localStorage.getItem('user');
//   //   if (storedUser) {
//   //     setUser(storedUser); // Set user state from localStorage
//   //     setUserLoggedIn(true);
//   //   }
//   // }, []);

//   const [masterPassword, setMasterPassword] = useState("");

//   const [masterKey, setMasterKey] = useState(null);
//   const [isVaultUnlocked, setIsVaultUnlocked] = useState(false);

//   // Auto-lock after inactivity
//   useEffect(() => {
//     if (isVaultUnlocked) {
//       const timer = setTimeout(() => {
//         lockVault();
//       }, 5 * 60 * 1000); // 5 minutes

//       return () => clearTimeout(timer);
//     }
//   }, [isVaultUnlocked]);


//   const lockVault = () => {
//     setMasterKey(null);
//     setIsVaultUnlocked(false);
//   };


//   // Initialize state directly from localStorage
//   const [user, setUser] = useState(() => {
//     const storedUser = localStorage.getItem("user");
//     return storedUser ? JSON.parse(storedUser) : null;
//   });

//   const [userLoggedIn, setUserLoggedIn] = useState(() => {
//     return !!localStorage.getItem("user") && !!localStorage.getItem("token");
//   });

//   const loginUser = (userData) => {
//     setUser(userData);
//     setUserLoggedIn(true);
//     localStorage.setItem("user", JSON.stringify(userData));
//   };

//   const logoutUser = () => {
//     setUser(null);
//     setUserLoggedIn(false);
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     localStorage.clear();
//   };

//   return (
//     <GlobalContext.Provider
//       value={{
//         user,
//         userLoggedIn,
//         loginUser,
//         logoutUser,
//         setUserLoggedIn,
//         masterPassword,
//         setMasterPassword,
//         lockVault
//       }}
//     >
//       {children}
//     </GlobalContext.Provider>
//   );
// };






// // GlobalContext.jsx
// import React, { useState, useEffect } from "react";
// import GlobalContext from "./context"; // Import the context
// import { toast } from "react-toastify";


// export const GlobalProvider = ({ children }) => {
//   // const [user, setUser] = useState('');
//   // const [userLoggedIn, setUserLoggedIn] = useState(false);

//   // // Check if there's a logged-in user in localStorage
//   // useEffect(() => {
//   //   const storedUser = localStorage.getItem('user');
//   //   if (storedUser) {
//   //     setUser(storedUser); // Set user state from localStorage
//   //     setUserLoggedIn(true);
//   //   }
//   // }, []);

//   const [masterPassword, setMasterPassword] = useState("");

//   const [masterKey, setMasterKey] = useState(null);
//   const [isVaultUnlocked, setIsVaultUnlocked] = useState(false);

//   // Auto-lock after inactivity
//   useEffect(() => {
//     if (isVaultUnlocked) {
//       const timer = setTimeout(() => {
//         lockVault();
//       }, 5 * 60 * 1000); // 5 minutes

//       return () => clearTimeout(timer);
//     }
//   }, [isVaultUnlocked]);


//   const lockVault = () => {
//     setMasterKey(null);
//     setIsVaultUnlocked(false);
//   };

//   // Add master key related state
//   const [masterPasswordSet, setMasterPasswordSet] = useState(false);
//   const [masterSalt, setMasterSalt] = useState(null);
//   const [masterKey, setMasterKey] = useState(null); // This will only be in memory
//   const [vaultLocked, setVaultLocked] = useState(true);

//   // Initialize state directly from localStorage
//   const [user, setUser] = useState(() => {
// @ -21,100 +48,20 @@ export const GlobalProvider = ({ children }) => {
//     return !!localStorage.getItem("user") && !!localStorage.getItem("token");
//   });

//   const serverUrl = import.meta.env.VITE_APP_SERVER_URL;


//   const loginUser = (userData) => {
//     setUser(userData);
//     setUserLoggedIn(true);
//     localStorage.setItem("user", JSON.stringify(userData));

//     // this id done to remove the read mastersalt error 

//     // if (user.masterSalt) {
//     //   setMasterSalt(user.masterSalt || '');
//     //   setMasterPasswordSet(true);
//     // }


//   };

//   const logoutUser = () => {
//     setUser(null);
//     setUserLoggedIn(false);
//     setMasterKey(null);
//     setVaultLocked(true);

//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     localStorage.clear();
//   };


//   // Auto-lock after inactivity
//   useEffect(() => {
//     if (!vaultLocked && masterKey) {
//       const timer = setTimeout(() => {
//         lockVault();
//       }, 5 * 60 * 1000); // 5 minutes

//       return () => clearTimeout(timer);
//     }
//   }, [vaultLocked, masterKey]);





//   const token = localStorage.getItem("token");

//    const fetchUser = async () => {
//       if (!token) {
//         logoutUser();
//         navigate("/signin");
//         return;
//       }
  
//       // console.log(userLoggedIn);
  
//       try {
//         const res = await fetch(`${serverUrl}/api/user/user-info`, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`, // Send token in Authorization header
//           },
//         });
  
//         if (res.status === 401) {
//           // Token expired or invalid
//           logoutUser();
//           localStorage.clear(); // Clear any stale data
//           navigate("/signin");
//           toast.error("Session expired. Please login again");
//           return;
//         }
  
//         const data = await res.json();
//         loginUser(data.user);
//         console.log("User Data For Dashboard", user);
//       } catch (error) {
//         console.log("Unable To Fetch User Data For Dashboard: ", error);
//         toast.error("Something Went Wrong. Please Try again");
//       }
//     };
  











//   return (
//     <GlobalContext.Provider
//       value={{
// @ -123,12 +70,9 @@ export const GlobalProvider = ({ children }) => {
//         loginUser,
//         logoutUser,
//         setUserLoggedIn,
//         masterPasswordSet,
//         masterSalt,
//         masterKey,
//         vaultLocked,
//         fetchUser,
        
//         masterPassword,
//         setMasterPassword,
//         lockVault
//       }}
//     >
//       {children}






import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import GlobalContext from "./context";

export const GlobalProvider = ({ children }) => {
  // User Authentication State
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [userLoggedIn, setUserLoggedIn] = useState(() => {
    return !!localStorage.getItem("user") && !!localStorage.getItem("token");
  });

  // Vault Security State
  const [masterPassword, setMasterPassword] = useState("");
  const [masterKey, setMasterKey] = useState(null);
  const [masterPasswordSet, setMasterPasswordSet] = useState(false);
  const [masterSalt, setMasterSalt] = useState(null);
  const [vaultLocked, setVaultLocked] = useState(true);

  // Server Configuration
  const serverUrl = import.meta.env.VITE_APP_SERVER_URL;

  // User Authentication Methods
  const loginUser = useCallback((userData) => {
    setUser(userData);
    setUserLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(userData));
  }, []);

  const logoutUser = useCallback(() => {
    setUser(null);
    setUserLoggedIn(false);
    setMasterKey(null);
    setVaultLocked(true);

    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.clear();
  }, []);

  // Vault Lock Mechanism
  const lockVault = useCallback(() => {
    setMasterKey(null);
    setVaultLocked(true);
    toast.info("Vault locked due to inactivity");
  }, []);

  // Auto-lock Vault after Inactivity
  useEffect(() => {
    if (!vaultLocked && masterKey) {
      const timer = setTimeout(lockVault, 5 * 60 * 1000); // 5 minutes
      return () => clearTimeout(timer);
    }
  }, [vaultLocked, masterKey, lockVault]);

  
  // Fetch User Information
  const fetchUser = useCallback(async (navigate) => {
    const token = localStorage.getItem("token");

    if (!token) {
      logoutUser();
      navigate("/signin");
      return;
    }

    try {
      const res = await fetch(`${serverUrl}/api/user/user-info`, {
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
      console.error("Unable to fetch user data:", error);
      toast.error("Something went wrong. Please try again");
    }
  }, [serverUrl, loginUser, logoutUser]);

  return (
    <GlobalContext.Provider
      value={{
        // User Authentication
        user,
        userLoggedIn,
        loginUser,
        logoutUser,
        setUserLoggedIn,
        fetchUser,

        // Vault Security
        masterPassword,
        setMasterPassword,
        masterKey,
        setMasterKey,
        masterPasswordSet,
        setMasterPasswordSet,
        masterSalt,
        setMasterSalt,
        vaultLocked,
        setVaultLocked,
        lockVault
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
