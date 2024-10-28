import React, { useEffect, useState } from "react";
import Navbar from "../compenent/Navbar";
import FlutterContainer from "../compenent/FlutterContainer";

import { useNavigate } from "react-router-dom";
import { useFlutter } from "../context/FlutterProvider";
import { Outlet } from "react-router-dom";
import { KeepAlive } from "react-keep-alive";
import {
  sendflutterTimerJourneyRouteBack,
} from "../utils/FlutterRoute";
import { useNavigation } from "../context/NavigationProvider ";
import BackIcon from "../assets/backIcon.png";
import { goToPage, handleBack } from "../utils/FlutterRoute";

const BlocMultiPage3 = () => {
  const { initialized, containerRef } = useFlutter();
  const { isNavigatedFromOtherPage, setIsNavigatedFromOtherPage, previousPages, setPreviousPages } =
  useNavigation();

  const navigate = useNavigate();
  useEffect(() => {
    window.navigateToPage = (path) => {
      goToPage(path,setPreviousPages,navigate);
    };
    window.navigateBack = () => {
      handleBack(previousPages,setPreviousPages,navigate);
    };
  }, [navigate]);

  useEffect(() => {                                             
    setIsNavigatedFromOtherPage(true);
  }, []);
  useEffect(() => {    
    if (containerRef.current) {
      containerRef.current.style.width = '450px';
      containerRef.current.style.height = '800px';
    }
  }, [containerRef]);
  return (
    <div>
      <Navbar />
      <p className="text-center"> React Page3</p>
      <div className="flex flex-col justify-center items-center">
        <KeepAlive name="flutter-container">
          <FlutterContainer containerRef={containerRef} />
        </KeepAlive>
        <Outlet />
        <div className="w-full flex flex-row justify-start items-center pl-16 pr-16 mt-10">
          <button
            onClick={() => {
              handleBack(previousPages,setPreviousPages,navigate);
              sendflutterTimerJourneyRouteBack(initialized);
            }}
          >
            <img src={BackIcon} alt="BackIcon" className="h-10" />
          </button>{" "}
        </div>
      </div>
    </div>
  );
};

export default BlocMultiPage3;

