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

  useEffect(() => {    
    if (containerRef.current) {
      containerRef.current.style.width = '1000px';
      containerRef.current.style.height = '450px';
    }
  }, [containerRef]);


  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-center items-center">
        <KeepAlive name="flutter-container">
          <FlutterContainer containerRef={containerRef} adjustStyle={adjustStyle}/>
        </KeepAlive>
        <Outlet />
        <ProfileComponent />
      </div>
    </div>
  );
};

export default ProfilePage;

const adjustStyle = {
  display: "block",
  border: '1px solid #eee',
  borderRadius: '5px',
  width: '1000px',
  height: '450px',
  transition: 'all 150ms ease-in-out',
  overflow: 'hidden',
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '0 auto',      
}