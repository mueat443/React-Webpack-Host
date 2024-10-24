import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const RouteContext = createContext();

export const RouteProvider = ({ children }) => {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);

  return (
    <RouteContext.Provider value={{ currentPath }}>
      {children}
    </RouteContext.Provider>
  );
};

export const useRouteContext = () => {
  return useContext(RouteContext);
};
