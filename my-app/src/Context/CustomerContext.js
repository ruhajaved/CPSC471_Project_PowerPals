import React, { createContext, useState, useEffect } from "react";
export const CustomerContext = createContext({
  CustomerID: null,
});

export const CustomerProvider = ({ children }) => {
  const [customerID, setCustomerID] = useState(() => {
    // Initialize state with the value from local storage
    return localStorage.getItem("customerID");
  });

  useEffect(() => {
    // Save the adminID value to local storage each time it changes
    if (customerID !== null) {
      localStorage.setItem("customerID", customerID);
    }
  }, [customerID]);

  const login = (id) => {
    setCustomerID(id);
  };

  const logout = () => {
    setCustomerID(null);
    localStorage.removeItem("customerID");
  };

  const value = {
    CustomerID: customerID,
    login: login,
    logout: logout,
  };

  return (
    <CustomerContext.Provider value={value}>
      {children}
    </CustomerContext.Provider>
  );
};
