import React from "react";

export const RouteDTO = {
  catalog: "catalog",
  cart: "cart",
  socket: "socket",
  weather: "weather",
  language: "language",
  timer: "timer",
  page2: "page2",
  page3: "page3",
}

export function setupNavigateToPage(setPreviousPages,navigate) {
  window.navigateToPage = (path) => {
    goToPage(path,setPreviousPages,navigate);
  };
  return () => {
    delete window.setupnavigateToPage;
  };
}
export function setupNavigateBack(previousPages,setPreviousPages,navigate) {
  window.navigateBack = () => {
    handleBack(previousPages,setPreviousPages,navigate);
  };
  return () => {
    delete window.navigateBack;
  };
}




export const goToPage = (path, setPreviousPages, navigate) => {
  setPreviousPages((prev) => [...prev, path]);
  navigate(path);
};

export const handleBack = (previousPages, setPreviousPages, navigate) => {  
  let _previousPages = previousPages
  if (_previousPages.length > 0) {    
    _previousPages.pop()
  }
  console.log("_previousPages:",_previousPages);
  
  if (_previousPages.length > 0) { 
    const lastPage = _previousPages[previousPages.length - 1]; 
    setPreviousPages(_previousPages)
    navigate(lastPage); 
  } else {
    navigate("/bloc-multi");
  }
  };


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
 
export const sendRouteToFlutter = async (path, initialized) => {
  if (initialized) {
    await waitForFlutterRoute("flutterRoute");
    window.flutterRoute(`/${path}`);
    console.log(`_Route "/${path}" has been sent to Flutter app.`);
  }
};


export const sendflutterTimerJourneyRoute = async (path, initialized) => {
  if (initialized) {
    await waitForFlutterRoute("flutterTimerJourneyRoute");
    console.log(`flutterTimerJourneyRoute /${path}`);
    
    window.flutterTimerJourneyRoute(`/${path}`);
    console.log(`_Route "/${path}" has been sent to Flutter app.`);
  }
};
export const sendflutterTimerJourneyRouteBack = async (initialized) => {
  if (initialized) {
    await waitForFlutterRoute("flutterTimerJourneyRouteBack");
    window.flutterTimerJourneyRouteBack();
  }
};

