// src/context/BusinessContext.js
import React, { createContext, useState, useContext } from 'react';

// Create a context for business data
const BusinessContext = createContext();

// Provider component
export const BusinessProvider = ({ children }) => {
  const [businessData, setBusinessData] = useState({}); // Initialize with an empty object or your desired structure

  return (
    <BusinessContext.Provider value={{ businessData, setBusinessData }}>
      {children}
    </BusinessContext.Provider>
  );
};

// Custom hook to use the business context
export const useBusiness = () => useContext(BusinessContext);
