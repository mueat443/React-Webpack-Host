import { useFlutter } from "../../context/FlutterInitializer";
import React, { useEffect } from "react";

const FlutterWebAisApp = () => {
  const { initialized } = useFlutter();

  // ถ้ายังไม่ถูก initialize ให้แสดงข้อความว่ายังไม่โหลด
  if (!initialized) {
    return <div>Loading Flutter App...</div>;
  }

  return <div id="flutter-main-container" style={{ width: '450px', height: '800px' }} />;
};

export default FlutterWebAisApp;
