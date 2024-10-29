import React, { useEffect, useState } from "react";
import Navbar from "../compenent/Navbar";
import FlutterContainer from "../compenent/ui/FlutterContainer";

import { useNavigate } from "react-router-dom";
import { useFlutter } from "../context/FlutterProvider";
import { Outlet } from "react-router-dom";
import { KeepAlive } from "react-keep-alive";
import {
  sendRouteToFlutter,
  sendflutterTimerJourneyRoute,
  RouteDTO,
} from "../utils/FlutterRoute";
import { useNavigation } from "../context/route/NavigationProvider ";
import ForwardIcon from "../assets/forwardIcon.png";
import {
  goToPage,
  handleBack,
  setupNavigateToPage,
  setupNavigateBack,
} from "../utils/FlutterRoute";
import { setVerticalScreen } from "../utils/utils";

const BlocMultiPage = () => {
  const { initialized, containerRef } = useFlutter();
  const { isNavigatedFromOtherPage, previousPages, setPreviousPages } =
    useNavigation();

  const navigate = useNavigate();

  // useEffect นี้ใช้เพื่อเซ็ตอัพฟังก์ชัน navigate ไปยังหน้าใหม่และย้อนกลับหน้าเก่า
  useEffect(() => {
    // ตั้งค่า navigateToPage ให้เป็นฟังก์ชัน global
    const cleanupSetupNavigateToPage = setupNavigateToPage(
      setPreviousPages,
      navigate
    );
    // ตั้งค่า navigateBack ให้เป็นฟังก์ชัน global
    const cleanupSetupNavigateBack = setupNavigateBack(
      previousPages,
      setPreviousPages,
      navigate
    );
    // ทำความสะอาดเมื่อ component ถูก unmount
    return () => {
      cleanupSetupNavigateToPage();
      cleanupSetupNavigateBack();
    };
  }, [navigate, setPreviousPages, previousPages]);

  // ถ้าไม่ได้มาจากหน้าอื่นไปให้ flutter หน้า timer
  useEffect(() => {
    if (!isNavigatedFromOtherPage) {
      sendRouteToFlutter(RouteDTO.timer, initialized);
    }
  }, [initialized, isNavigatedFromOtherPage]);

  // ตั้งค่าให้แอป Flutter แสดงผลในแนวตั้งโดยใช้ containerRef
  useEffect(() => {
    setVerticalScreen(containerRef)
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
            goToPage("/bloc-multi2", setPreviousPages, navigate);
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
