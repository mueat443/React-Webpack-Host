import React, { useEffect, useState } from "react";
import Navbar from "../compenent/Navbar";
import FlutterContainer from "../compenent/FlutterContainer";
import { useFlutter } from "../context/FlutterProvider";
import { Outlet } from "react-router-dom";
import { KeepAlive } from "react-keep-alive"; // Import KeepAlive
 
const TestProvider1 = () => {
  const { containerRef } = useFlutter();
  const [flutterVisible, setFlutterVisible] = useState(false);
 
  useEffect(() => {
    // เปิด Flutter UI เมื่อเข้ามาที่หน้า Home
    setFlutterVisible(true);
    return () => {
      // ปิด Flutter UI เมื่อออกจากหน้า Home
      setFlutterVisible(false);
    };
  }, []);
 
  return (
    <div>
      <Navbar />
      <h1>Home Page</h1>
      <KeepAlive name="flutter-container">
      <FlutterContainer
          containerRef={containerRef}
          isVisible={flutterVisible}
        />
      </KeepAlive>
 
      <Outlet />
 
      <p>Flutter</p>
    </div>
  );
};
 
export default TestProvider1;