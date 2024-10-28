// NavigationContext.js
import React, { createContext, useContext, useState } from 'react';

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
  const [isNavigatedFromOtherPage, setIsNavigatedFromOtherPage] = useState(false);

  const [previousPages, setPreviousPages] = useState([]);


  return (
    <NavigationContext.Provider value={{ isNavigatedFromOtherPage, setIsNavigatedFromOtherPage,previousPages,setPreviousPages }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  return useContext(NavigationContext);
};
