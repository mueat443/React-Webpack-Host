import React, {useEffect } from "react";
import ConnectSocketComponent from "../compenent/ConnectSocketComponent";
import FlutterCoreApp from "../compenent/flutter-ui/FlutterCoreComponent";
import { LanguageStateProvider } from "../context/LanguageStateContext";
import Navbar from "../compenent/Navbar";
import FlutterMainApp from "../compenent/flutter-ui/FlutterMainComponent";
import {useFlutterStyles} from '../context/FlutterStyleContext'

const ConnectSocketPage = () => {
  const { setFlutterStyles } = useFlutterStyles();

  useEffect(() => {
    setFlutterStyles({
      display: "none"
    });
}, [setFlutterStyles]);
                   
  return (
    <div>
      <Navbar />
      <ConnectSocketComponent />
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