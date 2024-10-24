import React, { useEffect } from "react";
import Navbar from "../compenent/Navbar";
import FlutterContainer from "../compenent/FlutterContainer";

import { useFlutter } from "../context/FlutterProvider";
import { Outlet } from "react-router-dom";
import { KeepAlive } from "react-keep-alive";
import { sendRouteToFlutter } from "../utils/FlutterRoute";

const ProductPage = () => {
  const { initialized, containerRef } = useFlutter();

  useEffect(() => {
    sendRouteToFlutter("catalog", initialized);
  }, [initialized]);

  useEffect(() => {    
    if (containerRef.current) {
      containerRef.current.style.width = '450px';
      containerRef.current.style.height = '800px';
    }
  }, [containerRef]);

  return (
    <div>
      <Navbar />
      <KeepAlive name="flutter-container">
        <FlutterContainer containerRef={containerRef} />
      </KeepAlive>
      <Outlet />
    </div>
  );
};

export default ProductPage;
