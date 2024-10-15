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
const FlutterWithReactPage = () => {

  const navigate = useNavigate();
  useEffect(() => {
    window.navigateToPage = (path) => {
      navigate(path);
    };
  }, [navigate]);

  return (
    <div className="flex flex-col font-kanit w-screen h-screen">
      <div className="w-full flex flex-col justify-center">
      <Navbar />
        <p className="text-center h-20 align-middle mt-10 text-4xl">
          React + Flutter
        </p>
        <div className="flex flex-row justify-center">
        <FlutterMainApp path={"language"} flutterCss={flutterCss}/>
        </div>
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