import React from "react";

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

export const sendRouteToFlutter = async (path, initialized) => {
  if (initialized) {
    await waitForFlutterRoute();
    window.flutterRoute(`/${path}`);
    console.log(`_Route "/${path}" has been sent to Flutter app.`);
  }
};
