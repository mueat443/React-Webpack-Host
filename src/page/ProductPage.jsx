import React, { useEffect } from "react";
import Navbar from "../compenent/Navbar";
import {useFlutterStyles} from '../context/FlutterStyleContext'
import { useFlutter } from "../context/FlutterProvider";

const ProductPage = () => {
  const { setFlutterStyles } = useFlutterStyles();
  const { initialized, renderFlutterApp } = useFlutter();

  useEffect(() => {
    setFlutterStyles({
        width: '450px',
        height: '800px',
        position: 'absolute',                                
        top: '45%',
        left: '50%',
        transform: 'translate(-50%, -50%)', 
    });
}, [setFlutterStyles]);

let path = "catalog";
const waitForFlutterRoute = () => {
  return new Promise((resolve) => {
    const check = setInterval(() => {
      if (typeof window.flutterRoute === "function") {
        clearInterval(check);
        resolve();
      }
    }, 100);
  });
};
useEffect(() => {
  if (initialized) {
    waitForFlutterRoute().then(() => {
      console.log("FlutterProvComponent Path: ", path);

      window.flutterRoute(`/${path}`);
      console.log(`_Route "/${path}" has been sent to Flutter app.`);
    });
  }
}, [initialized]);
  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-center items-center">
      </div>
    </div>
  );
};

export default ProductPage;

const flutterCss = {
  border: '1px solid #eee',
  borderRadius: '5px',
  width: '450px',  
  height: '800px', 
  transition: 'all 150ms ease-in-out',
  overflow: 'hidden',
  position: 'relative', 
};


