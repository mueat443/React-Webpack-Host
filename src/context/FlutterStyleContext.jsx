import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
const FlutterStylesContext = createContext();

export const FlutterStylesProvider = ({ children }) => {
    const [flutterStyles, setFlutterStyles] = useState({});

    return (
        <FlutterStylesContext.Provider value={{ flutterStyles, setFlutterStyles }}>
            {children}
        </FlutterStylesContext.Provider>
    );
};

export const useFlutterStyles = () => useContext(FlutterStylesContext);