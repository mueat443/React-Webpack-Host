import React, { useEffect, useState } from "react";
import Navbar from "../compenent/Navbar";
import FlutterContainer from "../compenent/FlutterContainer";

import { useNavigate } from "react-router-dom";
import { useFlutter } from "../context/FlutterProvider";
import { Outlet } from "react-router-dom";
import { KeepAlive } from "react-keep-alive";
import BlocMultiComponent from "../compenent/BlocMultiComponent";
import {
  sendRouteToFlutter,
  sendflutterTimerJourneyRoute,
  sendflutterTimerJourneyRouteBack,
} from "../utils/FlutterRoute";
import { useNavigation } from "../context/NavigationProvider ";
import BackIcon from "../assets/backIcon.png";
import ForwardIcon from "../assets/forwardIcon.png";
import { goToPage, handleBack } from "../utils/FlutterRoute";

const BlocMultiPage2 = () => {
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
  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-center items-center">
        <KeepAlive name="flutter-container">
          <FlutterContainer containerRef={containerRef} />
        </KeepAlive>
        <Outlet />
      </div>
      <div className="w-full flex flex-row justify-between items-center space-x-10 pl-16 pr-16 mt-10">
        <button
          onClick={() => {
            handleBack(previousPages,setPreviousPages,navigate);
            sendflutterTimerJourneyRouteBack(initialized);
          }}
        >
          <img src={BackIcon} alt="BackIcon" className="h-10" />
        </button>
        <button
          onClick={() => {
            goToPage("/bloc-multi3",setPreviousPages,navigate);
            sendflutterTimerJourneyRoute("page3", initialized);
          }}
        >
          <img src={ForwardIcon} alt="ForwardIcon" className="h-10" />
        </button>{" "}
      </div>
    </div>
  );
};

export default BlocMultiPage2;

{
  /* <BlocMultiComponent event={"flutter-timer"} duration={firstDuration}/>
      <BlocMultiComponent event={"flutter-timer2"} duration={secondDuration}/> */
}

// const [firstDuration, setFirstDuration] = useState(60);
// const [secondDuration, setSecondDuration] = useState(60);

// useEffect(() => {
//   window.notifyStateChangeTimer = (state) => {
//     try {
//       const parsedData = JSON.parse(state);
//       console.log("parsedData",parsedData);

//       const parsedDuration = parsedData.duration;
//       const parsedbroadcastName = parsedData.broadcastName;
//       if (parsedbroadcastName === "flutter-timer") {
//           setFirstDuration(parsedDuration)
//       } else if (parsedbroadcastName === "flutter-timer2") {
//           setSecondDuration(parsedDuration)
//       }
//     } catch (error) {
//       console.error("Failed to parse JSON:", error);
//     }
//   };

//   return () => {
//     window.notifyStateChangeShop = null;
//   };
// }, []);
