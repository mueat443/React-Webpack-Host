import React from "react";
import LoginComponent from "../compenent/LoginComponent";
import aisIcon from "../assets/ais.png";
import FlutterContainer from "../compenent/FlutterContainer";

import { useFlutter } from "../context/FlutterProvider";
import { Outlet } from "react-router-dom";
import { KeepAlive } from "react-keep-alive";

const LogInPage = () => {
  const { initialized, containerRef } = useFlutter();

  return (
    <div className="flex flex-col w-full h-screen justify-center font-kanit">
      <p className="text-center">
        Login Page{" "}
        <span className="inline-flex items-center">
          <img src={aisIcon} alt="React Icon" className="ml-2 h-7 w-10 mt-5" />
        </span>
      </p>
      <LoginComponent />
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

export default LogInPage;
