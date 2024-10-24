// src/context/AccountContext.js
import React, { createContext, useState, useContext } from 'react';

export const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
  const [savingsBalance, setSavingsBalance] = useState(1000); // Example initial balance

  return (
    <AccountContext.Provider value={{ savingsBalance, setSavingsBalance }}>
      {children}
    </AccountContext.Provider>
  );
};

// Custom hook to use the account context
export const useAccount = () => useContext(AccountContext);
