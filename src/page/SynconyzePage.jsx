import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FlutterCoreApp from "../compenent/flutter-ui/FlutterCoreComponent";

const SynconyzePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Set a delay of 5 seconds (5000 milliseconds)
    const timer = setTimeout(() => {
      navigate("/profile"); // Navigate to /profile after delay
    }, 1000);

    // Cleanup the timer if the component is unmounted
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <h1>กำลังโหลดข้อมูล...</h1>
      <div style={{ display: "none" }}>
        <FlutterCoreApp />
      </div>
    </div>
  );
};

export default SynconyzePage;
