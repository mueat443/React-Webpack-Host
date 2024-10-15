import React, { createContext, useState } from 'react';

// สร้าง context
export const LoginStateContext = createContext();

// สร้าง provider สำหรับ context
export const LoginStateProvider = ({ children }) => {
  const [userName, setUserName] = useState(() => {
    return localStorage.getItem('userNameState') || "";
  });
  const [password, setPassword] = useState("");

  return (
    <LoginStateContext.Provider value={{ userName, setUserName, password, setPassword }}>
      {children}
    </LoginStateContext.Provider>
  );
};