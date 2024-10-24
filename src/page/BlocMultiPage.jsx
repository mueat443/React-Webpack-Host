import React, { useEffect, useState } from "react";
import Navbar from "../compenent/Navbar";
import FlutterContainer from "../compenent/FlutterContainer";

import { useNavigate } from "react-router-dom";
import { useFlutter } from "../context/FlutterProvider";
import { Outlet } from "react-router-dom";
import { KeepAlive } from "react-keep-alive";
import {
  sendRouteToFlutter,
  sendflutterTimerJourneyRoute,
  sendflutterTimerJourneyRouteBack,
} from "../utils/FlutterRoute";
import BlocMultiComponent from "../compenent/BlocMultiComponent";
import { useNavigation } from "../context/NavigationProvider ";
import ForwardIcon from "../assets/forwardIcon.png";
import { goToPage, handleBack } from "../utils/FlutterRoute";



const BlocMultiPage = () => {
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
    if (!isNavigatedFromOtherPage) {
      sendRouteToFlutter("timer", initialized);
    }
  }, [initialized, isNavigatedFromOtherPage]);
  
  useEffect(() => {    
    if (containerRef.current) {
      containerRef.current.style.width = '450px';
      containerRef.current.style.height = '800px';
    }
  }, [containerRef]);
  return (
    <div>
      <Navbar />
      <p className="text-center"> React Page1</p>
      <div className="flex flex-col justify-end items-end">
        <KeepAlive name="flutter-container">
          <FlutterContainer containerRef={containerRef} />
        </KeepAlive>
        <Outlet />
      </div>
      <div className="w-full flex flex-row justify-end items-center pl-16 pr-16 mt-10">
        <button
          onClick={() => {
            // navigate("/bloc-multi2");
            goToPage("/bloc-multi2",setPreviousPages,navigate);
            sendflutterTimerJourneyRoute("page2", initialized);
          }}
        >
          <img src={ForwardIcon} alt="ForwardIcon" className="h-10" />
        </button>{" "}
      </div>
    </div>
  );
};
export default BlocMultiPage;

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
