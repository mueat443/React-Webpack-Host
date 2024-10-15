import React, { createContext, useState } from 'react';

export const ProductStateContext = createContext();

export const ProductStateProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  return (
    <ProductStateContext.Provider value={{ cart, setCart }}>
      {children}
    </ProductStateContext.Provider>
  );
};
