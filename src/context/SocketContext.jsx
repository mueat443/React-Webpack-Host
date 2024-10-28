import React, { createContext, useContext, useEffect, useState } from "react";
import {setupNotifyStateChangeSocket} from "../interop"
import {initializeFlutterListener} from "../utils/Event"

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [protocolVersion, setProtocolVersion] = useState("");
  const [flutterState, setFlutterState] = useState(null);

  useEffect(() => {
    const cleanupFlutterListener = initializeFlutterListener("flutter-socket",setFlutterState);
    return cleanupFlutterListener; 
  }, []);

  useEffect(() => {
    const cleanupNotifyStateChangeSocket = setupNotifyStateChangeSocket(setProtocolVersion);
    return cleanupNotifyStateChangeSocket;  
  }, [flutterState]);

  return (
    <SocketContext.Provider value={{ protocolVersion, flutterState }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => {
  return useContext(SocketContext);
};
