import React, { useContext, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import FlutterMainApp from "../compenent/flutter-ui/FlutterMainComponent";
import FlutterManageProviderComponent from "../compenent/poc/FlutterManageProviderComponent";
import CoreWithLanPage from "./ConnectSocketPage";
import "../index.scss";
import { LanguageStateContext } from "../context/LanguageStateContext";
import { useNavigate } from "react-router-dom";
import FlutterFix from "../compenent/poc/Flutter-provider-fix";
import LanStateComponent from "../compenent/LanguageComponent"
import FlutterWebAisApp from "../compenent/flutter-ui/FlutterWebAisComponent"
import Navbar from "../compenent/Navbar";
import { useFlutter } from "../context/FlutterProvider";
import {useFlutterStyles} from '../context/FlutterStyleContext'

const FlutterWithReactPage = () => {
  const { initialized  } = useFlutter();
  const { setFlutterStyles } = useFlutterStyles();

  const navigate = useNavigate();
  useEffect(() => {                                             
    window.navigateToPage = (path) => {
      navigate(path);
    };
  }, [navigate]);

  
  let path = "language";
  const waitForFlutterRoute = () => {
    return new Promise((resolve) => {
      const check = setInterval(() => {
        if (typeof window.flutterRoute === "function") {
          clearInterval(check);
          resolve();
        }
      }, 100);
    });
  };
  useEffect(() => {
    if (initialized) {
      waitForFlutterRoute().then(() => {
        console.log("FlutterProvComponent Path: ", path);

        window.flutterRoute(`/${path}`);
        console.log(`_Route "/${path}" has been sent to Flutter app.`);
      });
    }
  }, [initialized]);

  useEffect(() => {
    setFlutterStyles({
        width: '450px',
        height: '800px',
        position: 'absolute',    
        top: '45%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    });
}, [setFlutterStyles]);

  return (
    <div className="flex flex-col font-kanit w-screen h-screen">
      <div className="w-full flex flex-col justify-center">
      <Navbar />
      </div>
    </div>
  );
};

export default FlutterWithReactPage;

const flutterCss = {
  border: '1px solid #eee',
  borderRadius: '5px',
  width: '450px',  
  height: '800px', 
  transition: 'all 150ms ease-in-out',
  overflow: 'hidden',
  position: 'relative', 
};