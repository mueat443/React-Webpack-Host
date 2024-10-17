import React, { createContext, useState } from 'react';

export const LoginStateContext = createContext();

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