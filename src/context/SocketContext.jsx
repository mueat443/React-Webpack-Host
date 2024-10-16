import React, { createContext, useContext, useEffect, useState } from "react";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [protocolVersion, setProtocolVersion] = useState("");
  const [flutterState, setFlutterState] = useState(null);

  useEffect(() => {
    const onFlutterReady = (event) => {
      const exportedState = event.detail;
      exportedState.conectSocket();
      setFlutterState(exportedState);
    };
    window.addEventListener("flutter-socket", onFlutterReady);

    return () => {
      window.removeEventListener("flutter-socket", onFlutterReady);
    };
  }, []);

  useEffect(() => {
    let parsedData;
    window.notifyStateChangeSocket = (state) => {
      try {
        parsedData = JSON.parse(state);
        if (parsedData.event) {
          try {
            const parsedEvent = JSON.parse(parsedData.event);
            console.log("Parsed event:", parsedEvent);
            setProtocolVersion(parsedEvent);
          } catch (error) {
            console.error("Failed to parse event JSON:", error);
          }
        }
      } catch (error) {
        console.error("Failed to parse JSON:", error);
      }
    };
    return () => {
      window.notifyStateChangeSocket = null;
    };
  }, [flutterState]);

  return (
    <SocketContext.Provider value={{ protocolVersion, flutterState }}>
      {children}
    </SocketContext.Provider>
  );
};

// Custom hook for using the SocketContext
export const useSocketContext = () => {
  return useContext(SocketContext);
};
