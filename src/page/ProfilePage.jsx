import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FlutterWeatherApp from "../compenent/flutter-ui/FlutterWeatherComponent";
import WeatherState from "../compenent/WeatherComponent";
import Navbar from "../compenent/Navbar";
import { useFlutter } from "../context/FlutterInitializer";
import FlutterWebAisApp from "../compenent/flutter-ui/FlutterWebAisComponent";
// import FlutterComponent from '../compenent/flutter-ui/MainCom'
import FlutterCoreApp from "../compenent/flutter-ui/FlutterCoreComponent";
import FlutterMainApp from "../compenent/flutter-ui/FlutterMainComponent";
import FlutterComponent from "../compenent/flutter-ui/test";
import {useFlutterStyles} from '../context/FlutterStyleContext'

const ProfilePage = () => {
  // const { initialized } = useFlutter();
  const { initialized, renderFlutterApp } = useFlutter();

  const { setFlutterStyles } = useFlutterStyles();

  useEffect(() => {
      setFlutterStyles({
          width: '500px',
          height: '600px',
          // สไตล์อื่น ๆ ที่ต้องการปรับ
      });
  }, [setFlutterStyles]);

  // let path = "catalog";
  // const waitForFlutterRoute = () => {
  //   return new Promise((resolve) => {
  //     const check = setInterval(() => {
  //       if (typeof window.flutterRoute === "function") {
  //         clearInterval(check);
  //         resolve();
  //       }
  //     }, 100);
  //   });
  // };
  // useEffect(() => {
  //   if (initialized) {
  //     waitForFlutterRoute().then(() => {
  //       console.log("FlutterProvComponent Path: ", path);

  //       window.flutterRoute(`/${path}`);
  //       console.log(`_Route "/${path}" has been sent to Flutter app.`);
  //     });
  //   }
  // }, [initialized]);
  

  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-center items-center">
        {/* <FlutterMainApp path={"language"} flutterCss={flutterCss} /> */}
        <WeatherState />
      </div>
    </div>
  );
};

export default ProfilePage;
// const flutterInstance = useFlutter();
{
  /* <FlutterWeatherApp /> */
}
{
  /* <FlutterMainApp path={"weather"} flutterCss={flutterCss}/> */
}
{
  /* <FlutterWebAisApp />  */
}
{
  /* <FlutterCoreApp /> */
}
{
  /* <WeatherState /> */
}
const flutterCss = {
  border: "1px solid #eee",
  borderRadius: "5px",
  width: "450px",
  height: "800px",
  transition: "all 150ms ease-in-out",
  overflow: "hidden",
  position: "relative",
};
