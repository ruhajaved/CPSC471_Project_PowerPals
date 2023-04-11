import React, { createContext, useState, useEffect } from "react";
export const CustomerContext = createContext({
  CustomerID: null,
  MembershipID: null,
  MembershipTier: null
});

export const CustomerProvider = ({ children }) => {
  const [customerID, setCustomerID] = useState(() => {
    // Initialize state with the value from local storage
    return localStorage.getItem("customerID");
  });

  const [membershipID, setMembershipID] = useState(() => {
    // Initialize state with the value from local storage
    return localStorage.getItem("membershipID");
  });

  const [membershipTier, setMembershipTier] = useState(() => {
    // Initialize state with the value from local storage
    return localStorage.getItem("membershipTier");
  });

  useEffect(() => {
    if (customerID !== null) {
      localStorage.setItem("customerID", customerID);
    }
    // Save the adminID value to local storage each time it changes
    if (membershipID !== null) {
      localStorage.setItem("membershipID", membershipID);
    }
    if (membershipTier !== null) {
      localStorage.setItem("membershipTier", membershipTier);
    }
  }, [customerID, membershipID, membershipTier]);

  const login = (id) => {
    setCustomerID(id);
  };

  const logout = () => {
    setCustomerID(null);
    localStorage.removeItem("customerID");
  };

  const trackMembership = (membershipID, membershipTier) => {
    setMembershipID(membershipID);
    setMembershipTier(membershipTier);
  }

  const value = {
    CustomerID: customerID,
    MembershipID: membershipID,
    MembershipTier: membershipTier,
    login: login,
    logout: logout,
    trackMembership: trackMembership
  };

  return (
    <CustomerContext.Provider value={value}>
      {children}
    </CustomerContext.Provider>
  );
};
