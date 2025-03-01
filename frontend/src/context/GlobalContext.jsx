// GlobalContext.jsx
import React, { useState, useEffect } from "react";
import GlobalContext from "./context"; // Import the context

export const GlobalProvider = ({ children }) => {
  // const [user, setUser] = useState('');
  // const [userLoggedIn, setUserLoggedIn] = useState(false);

  // // Check if there's a logged-in user in localStorage
  // useEffect(() => {
  //   const storedUser = localStorage.getItem('user');
  //   if (storedUser) {
  //     setUser(storedUser); // Set user state from localStorage
  //     setUserLoggedIn(true);
  //   }
  // }, []);

  const [masterPassword, setMasterPassword] = useState("");

  const [masterKey, setMasterKey] = useState(null);
  const [isVaultUnlocked, setIsVaultUnlocked] = useState(false);

  // Auto-lock after inactivity
  useEffect(() => {
    if (isVaultUnlocked) {
      const timer = setTimeout(() => {
        lockVault();
      }, 5 * 60 * 1000); // 5 minutes

      return () => clearTimeout(timer);
    }
  }, [isVaultUnlocked]);


  const lockVault = () => {
    setMasterKey(null);
    setIsVaultUnlocked(false);
  };


  // Initialize state directly from localStorage
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [userLoggedIn, setUserLoggedIn] = useState(() => {
    return !!localStorage.getItem("user") && !!localStorage.getItem("token");
  });

  const loginUser = (userData) => {
    setUser(userData);
    setUserLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logoutUser = () => {
    setUser(null);
    setUserLoggedIn(false);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.clear();
  };

  return (
    <GlobalContext.Provider
      value={{
        user,
        userLoggedIn,
        loginUser,
        logoutUser,
        setUserLoggedIn,
        masterPassword,
        setMasterPassword,
        lockVault
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
