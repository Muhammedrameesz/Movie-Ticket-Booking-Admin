import React, { createContext, useState, useContext, useEffect } from "react";

const CancellationContext = createContext();

export const useCancellationContext = () => useContext(CancellationContext);

export const CancellationProvider = ({ children }) => {
  const [length, setLength] = useState(
    Number(localStorage.getItem("cancelBookingsLength")) || 0
  );

  const updateLength = (newLength) => {
    setLength(newLength);
    localStorage.setItem("cancelBookingsLength", newLength);
  };

  return (
    <CancellationContext.Provider value={{ length, updateLength }}>
      {children}
    </CancellationContext.Provider>
  );
};
