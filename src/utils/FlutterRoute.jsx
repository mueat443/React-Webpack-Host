import React from "react";

// กำหนด RouteDTO เป็นคีย์ที่ใช้สำหรับจัดเก็บเส้นทางของแอปพลิเคชัน
export const RouteDTO = {
  catalog: "catalog",
  cart: "cart",
  socket: "socket",
  weather: "weather",
  language: "language",
  timer: "timer",
  page2: "page2",
  page3: "page3",
};

// setupNavigateToPage ใช้สำหรับสร้างฟังก์ชัน global "navigateToPage" เพื่อให้สามารถนำทางไปยังหน้าใหม่ได้
export function setupNavigateToPage(setPreviousPages, navigate) {
  window.navigateToPage = (path) => {
    goToPage(path, setPreviousPages, navigate);
  };
  return () => {
    delete window.setupnavigateToPage;
  };
}

// setupNavigateBack ใช้สำหรับสร้างฟังก์ชัน global "navigateBack" เพื่อให้สามารถย้อนกลับไปยังหน้าก่อนหน้าได้
export function setupNavigateBack(previousPages, setPreviousPages, navigate) {
  window.navigateBack = () => {
    handleBack(previousPages, setPreviousPages, navigate);
  };
  return () => {
    delete window.navigateBack;
  };
}

// ฟังก์ชัน goToPage ใช้ในการนำทางไปยังหน้าใหม่และเก็บเส้นทางปัจจุบันไว้ใน previousPages
export const goToPage = (path, setPreviousPages, navigate) => {
  setPreviousPages((prev) => [...prev, path]);
  navigate(path);
};

// ฟังก์ชัน handleBack ใช้ในการย้อนกลับไปยังหน้าเก่าก่อนหน้านี้ที่อยู่ใน previousPages
export const handleBack = (previousPages, setPreviousPages, navigate) => {
  let _previousPages = previousPages;
  if (_previousPages.length > 0) {
    _previousPages.pop();
  }
  console.log("_previousPages:", _previousPages);

  if (_previousPages.length > 0) {
    const lastPage = _previousPages[previousPages.length - 1];
    setPreviousPages(_previousPages);
    navigate(lastPage);
  } else {
    navigate("/bloc-multi");
  }
};

// waitForFlutterRoute รอให้ฟังก์ชันที่ระบุปรากฏขึ้นใน window ก่อนที่จะดำเนินการต่อ
const waitForFlutterRoute = (func) => {
  return new Promise((resolve) => {
    const check = setInterval(() => {
      if (typeof window[func] === "function") {
        clearInterval(check);
        resolve();
      }
    }, 100);
  });
};

// sendRouteToFlutter ส่งเส้นทางไปยังแอป Flutter เมื่อการเชื่อมต่อกับ Flutter ได้ถูกตั้งค่าเรียบร้อยแล้ว
export const sendRouteToFlutter = async (path, initialized) => {
  if (initialized) {
    await waitForFlutterRoute("flutterRoute");
    window.flutterRoute(`/${path}`);
    console.log(`_Route "/${path}" has been sent to Flutter app.`);
  }
};

// sendflutterTimerJourneyRoute ส่งเส้นทางเฉพาะของ Timer Journey ไปยังแอป Flutter
export const sendflutterTimerJourneyRoute = async (path, initialized) => {
  if (initialized) {
    await waitForFlutterRoute("flutterTimerJourneyRoute");
    console.log(`flutterTimerJourneyRoute /${path}`);
    window.flutterTimerJourneyRoute(`/${path}`);
    console.log(`_Route "/${path}" has been sent to Flutter app.`);
  }
};

// sendflutterTimerJourneyRouteBack ใช้สำหรับส่งคำสั่งให้ Flutter ย้อนกลับไปยังเส้นทางก่อนหน้าใน Timer Journey
export const sendflutterTimerJourneyRouteBack = async (initialized) => {
  if (initialized) {
    await waitForFlutterRoute("flutterTimerJourneyRouteBack");
    window.flutterTimerJourneyRouteBack();
  }
};
