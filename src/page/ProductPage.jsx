import React, { useEffect } from "react";
import Navbar from "../compenent/Navbar";
import FlutterContainer from "../compenent/ui/FlutterContainer";

import { useFlutter } from "../context/FlutterProvider";
import { Outlet } from "react-router-dom";
import { KeepAlive } from "react-keep-alive";
import { sendRouteToFlutter,RouteDTO } from "../utils/FlutterRoute";
import { setVerticalScreen } from "../utils/utils";

const ProductPage = () => {
  const { initialized, containerRef } = useFlutter();

  useEffect(() => {
    sendRouteToFlutter(RouteDTO.catalog, initialized);
  }, [initialized]);

  useEffect(() => {    
    setVerticalScreen(containerRef)
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
