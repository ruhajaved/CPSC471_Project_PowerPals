import React, { createContext, useState, useEffect } from "react";
export const AdminContext = createContext({
  AdminID: null,
});

export const AdminProvider = ({ children }) => {
  const [adminID, setAdminID] = useState(() => {
    // Initialize state with the value from local storage
    return localStorage.getItem("adminID");
  });

  useEffect(() => {
    // Save the adminID value to local storage each time it changes
    localStorage.setItem("adminID", adminID);
  }, [adminID]);

  const login = (id) => {
    setAdminID(id);
  };

  const logout = () => {
    setAdminID(null);
    localStorage.removeItem("adminID");
  };

  const value = {
    AdminID: adminID,
    login: login,
    logout: logout,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};
