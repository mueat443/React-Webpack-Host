import React, { useEffect } from "react";
import WeatherState from "../compenent/WeatherComponent";
import Navbar from "../compenent/Navbar";
import {useFlutterStyles} from '../context/FlutterStyleContext'


import FlutterContainer from "../compenent/FlutterContainer";
import { useFlutter } from "../context/FlutterProvider";
import { Outlet } from "react-router-dom";
import { KeepAlive } from "react-keep-alive";

const ProfilePage = () => {
  const { initialized ,containerRef} = useFlutter(); 
  const { setFlutterStyles } = useFlutterStyles();

  useEffect(() => {
    setFlutterStyles({
        width: '800px',
        height: '500px',
        position: 'absolute',   
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)', 
    });
}, [setFlutterStyles]);

  let path = "catalog";
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
  

  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-center items-center">
      <KeepAlive name="flutter-container">
      <FlutterContainer
          containerRef={containerRef}
        />
      </KeepAlive>
      <Outlet />
        <WeatherState />
      </div>
    </div>
  );
};

export default ProfilePage;

const flutterCss = {
  width: "800px",
  height: "450px",
  transition: "all 150ms ease-in-out",
  overflow: "hidden",
  position: "relative",
};
