import React, {useEffect } from "react";
import ConnectSocketComponent from "../compenent/ConnectSocketComponent";
import FlutterCoreApp from "../compenent/flutter-ui/FlutterCoreComponent";
import { LanguageStateProvider } from "../context/LanguageStateContext";
import Navbar from "../compenent/Navbar";
import FlutterMainApp from "../compenent/flutter-ui/FlutterMainComponent";
import {useFlutterStyles} from '../context/FlutterStyleContext'
import FlutterContainer from "../compenent/FlutterContainer";

import { useFlutter } from "../context/FlutterProvider";
import { Outlet } from "react-router-dom";
import { KeepAlive } from "react-keep-alive";

const ConnectSocketPage = () => {
  const { setFlutterStyles } = useFlutterStyles();
  const { initialized ,containerRef} = useFlutter(); 

  useEffect(() => {
    setFlutterStyles({
      display: "none"
    });
}, [setFlutterStyles]);
                   
  return (
    <div>
      <Navbar />
      <ConnectSocketComponent />
      <div style={{ display:'none' }}>
      <KeepAlive name="flutter-container">
      <FlutterContainer
          containerRef={containerRef}
        />
      </KeepAlive>
      <Outlet />
      </div>
    </div>
  );
};

export default ConnectSocketPage;

const flutterCss = {
  border: '1px solid #eee',
  borderRadius: '5px',
  width: '450px',  
  height: '800px', 
  transition: 'all 150ms ease-in-out',
  overflow: 'hidden',
  position: 'relative', 
};