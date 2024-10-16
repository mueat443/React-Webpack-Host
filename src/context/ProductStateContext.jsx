import React, { createContext, useState, useEffect,useContext } from 'react';

export const ProductStateContext = createContext();

export const ProductStateProvider = ({ children }) => {
  const [cart, setCart] = useState(0);
  const [flutterState, setFlutterState] = useState(null);

  useEffect(() => {
    const onFlutterReady = (event) => {
      const exportedState = event.detail;
      setFlutterState(exportedState);
    };
    window.addEventListener("flutter-shopping", onFlutterReady);

    return () => {
      window.removeEventListener("flutter-shopping", onFlutterReady);
    };
  }, []);

  useEffect(() => {
    window.notifyStateChangeShop = (state) => {
      try {
        const parsedData = JSON.parse(state);
        const cartLength = parsedData.cart.items.length;
        console.log("parsedData:", cartLength);
        setCart(cartLength);
      } catch (error) {
        console.error("Failed to parse JSON:", error);
      }
    };

    return () => {
      window.notifyStateChangeShop = null; // ลบ notifyStateChangeShop เมื่อ unmount
    };
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