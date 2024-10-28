import React, { useContext, useState, useEffect } from "react";
import "../index.scss";
import Navbar from "../compenent/Navbar";
import FlutterContainer from "../compenent/FlutterContainer";

import { useNavigate } from "react-router-dom";
import { useFlutter } from "../context/FlutterProvider";
import { Outlet } from "react-router-dom";
import { KeepAlive } from "react-keep-alive";
import { sendRouteToFlutter,RouteDTO } from "../utils/FlutterRoute";

const FlutterWithReactPage = () => {
  const { initialized,containerRef  } = useFlutter();

  const navigate = useNavigate();
  useEffect(() => {                                             
    window.navigateToPage = (path) => {
      navigate(path);
    };
  }, [navigate]);

  useEffect(() => {
    sendRouteToFlutter(RouteDTO.language, initialized);
  }, [initialized]);

  useEffect(() => {    
    if (containerRef.current) {
      containerRef.current.style.width = '450px';
      containerRef.current.style.height = '800px';
    }
  }, [containerRef]);
  
  return (
    <div className="flex flex-col font-kanit w-screen h-screen">
      <div className="w-full flex flex-col justify-center">
      <Navbar />
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

export default FlutterWithReactPage;
