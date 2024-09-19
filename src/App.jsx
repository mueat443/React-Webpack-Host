import React from "react";
import ReactDOM from "react-dom";
import FlutterApp from "./FlutterComponent";
import LanStateComponent from "./LanStateComponent";
import FlutterManageProviderComponent from "./FlutterManageProviderComponent";
import "./index.scss";

const App = () => {
  return (
    <div className="flex flex-col font-kanit w-screen h-screen">
      <p className="bg-red-500 text-center h-20 align-middle mt-10 text-4xl">React + Flutter (Provider)</p>
      <div className="w-full flex flex-row ">
        <div className="bg-red-300 flex flex-col w-full ml-80 ">
          <div className="w-full  mt-32">
            <FlutterManageProviderComponent />
          </div>
          <div className="w-full">
            <LanStateComponent />
          </div>
        </div>

        <div className="flex justify-center w-full  mr-80">
          <FlutterApp />
        </div>
      </div>
    </div>
  );
};
ReactDOM.render(
  <App />,
  document.getElementById("app")
);
