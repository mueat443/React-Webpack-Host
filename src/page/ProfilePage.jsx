import React, { useEffect } from "react";
import ProfileComponent from "../compenent/ProfileComponent";
import Navbar from "../compenent/Navbar";
import FlutterContainer from "../compenent/FlutterContainer";

import { useFlutter } from "../context/FlutterProvider";
import { Outlet } from "react-router-dom";
import { KeepAlive } from "react-keep-alive";
import { sendRouteToFlutter } from "../utils/FlutterRoute";

const ProfilePage = () => {
  const { initialized, containerRef } = useFlutter();

  useEffect(() => {
    sendRouteToFlutter("weather", initialized);
  }, [initialized]);

  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-center items-center">
        <KeepAlive name="flutter-container">
          <FlutterContainer containerRef={containerRef} />
        </KeepAlive>
        <Outlet />
        <ProfileComponent />
      </div>
    </div>
  );
};

export default ProfilePage;
