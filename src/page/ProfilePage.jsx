import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FlutterWeatherApp from "../compenent/flutter-ui/FlutterWeatherComponent";
import WeatherState from "../compenent/WeatherComponent";
import Navbar from "../compenent/Navbar";
import { useFlutter } from "../context/FlutterInitializer";
import FlutterWebAisApp from "../compenent/flutter-ui/FlutterWebAisComponent";
import FlutterCoreApp from "../compenent/flutter-ui/FlutterCoreComponent";
import FlutterMainApp from "../compenent/flutter-ui/FlutterMainComponent";
import FlutterComponent from "../compenent/flutter-ui/test";
import {useFlutterStyles} from '../context/FlutterStyleContext'

const ProfilePage = () => {

  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-center items-center">
        <FlutterMainApp path={"weather"} flutterCss={flutterCss} />
        <WeatherState />
      </div>
    </div>
  );
};

export default ProfilePage;

const flutterCss = {
  border: "1px solid #eee",
  borderRadius: "5px",
  width: "450px",
  height: "800px",
  transition: "all 150ms ease-in-out",
  overflow: "hidden",
  position: "relative",
};
