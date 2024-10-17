import React, { useEffect } from "react";
import Navbar from "../compenent/Navbar";
import FlutterContainer from "../compenent/FlutterContainer";

import { useFlutter } from "../context/FlutterProvider";
import { Outlet } from "react-router-dom";
import { KeepAlive } from "react-keep-alive";
import { sendRouteToFlutter } from "../utils/FlutterRoute";
import BlocMultiComponent from "../compenent/BlocMultiComponent";

const BlocMultiPage = () => {
  const { initialized ,containerRef} = useFlutter(); 

  useEffect(() => {
    sendRouteToFlutter("timer", initialized);
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
      <BlocMultiComponent event={"flutter-timer"}/>
      <BlocMultiComponent event={"flutter-timer2"}/>

      </div>
    </div>
  );
};

export default BlocMultiPage;

