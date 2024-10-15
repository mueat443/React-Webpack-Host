import React, { useEffect } from "react";
import FlutterWeatherApp from "../compenent/flutter-ui/FlutterWeatherComponent";
import WeatherState from "../compenent/WeatherComponent";
import Navbar from "../compenent/Navbar";
import ProductComponent from "../compenent/ProductComponent";
import FlutterWebAisApp from "../compenent/flutter-ui/FlutterWebAisComponent";
// import FlutterComponent from '../compenent/flutter-ui/MainCom'
import FlutterCoreApp from "../compenent/flutter-ui/FlutterCoreComponent";
import FlutterMainApp from "../compenent/flutter-ui/FlutterMainComponent";

const ProductPage = () => {

//  useEffect(() => {
//   if (initialized) {

//       window.flutterRoute("product"); 
//       console.log('Flutter app is ready. Route "product" has been sent.');
//   }
//      },[initialized ])
  
  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-center items-center">
      <FlutterMainApp path={"catalog"} flutterCss={flutterCss}/>
      {/* <div style={{ display: "none" }}> */}
          {/* <ProductComponent /> */}
        {/* </div> */}
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
