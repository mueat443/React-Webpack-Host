import React, { createContext, useState, useEffect,useContext } from 'react';
import {setupNotifyStateChangeShop} from "../interop"
import {initializeFlutterListener} from "../utils/Event"

export const ProductStateContext = createContext();

export const ProductStateProvider = ({ children }) => {
  const [cart, setCart] = useState(0);
  const [flutterState, setFlutterState] = useState(null);


  useEffect(() => {
    const cleanupFlutterListener = initializeFlutterListener("flutter-shopping",setFlutterState);
    return cleanupFlutterListener; 
  }, []);

  useEffect(() => {
    const cleanupFlutterNotifier = setupNotifyStateChangeShop(setCart);
    return cleanupFlutterNotifier;  
  }, []);

  return (
    <ProductStateContext.Provider value={{ cart, setCart }}>
      {children}
    </ProductStateContext.Provider>
  );
};
export const useProductStateContext = () => {
  return useContext(ProductStateContext);
};