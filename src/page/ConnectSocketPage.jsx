import React, {useEffect } from "react";
import ConnectSocketComponent from "../compenent/ConnectSocketComponent";
import Navbar from "../compenent/Navbar";
import FlutterContainer from "../compenent/FlutterContainer";

import { useFlutter } from "../context/FlutterProvider";
import { Outlet } from "react-router-dom";
import { KeepAlive } from "react-keep-alive";

const ConnectSocketPage = () => {
  const { containerRef} = useFlutter(); 
             
  return (
    <div>
      <Navbar />
      <ConnectSocketComponent />
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

export default ConnectSocketPage;
