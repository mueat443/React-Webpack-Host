import React, { useEffect, useState } from "react";
import Navbar from "../compenent/Navbar";
import FlutterContainer from "../compenent/FlutterContainer";
import { useFlutter } from "../context/FlutterProvider";

const TestProvider = () => {
  const { containerRef } = useFlutter();
  const [flutterVisible, setFlutterVisible] = useState(false);

  useEffect(() => {
    setFlutterVisible(true);
    return () => {
      setFlutterVisible(false);
    };
  }, []);

  return (
    <div>
      <Navbar />
      <h1>Home Page</h1>
      <FlutterContainer
        containerRef={containerRef}
        isVisible={flutterVisible}
      />
      <p>Flutter</p>
    </div>
  );
};

export default TestProvider;
