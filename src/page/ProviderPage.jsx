// import React, { useEffect } from "react";
// import { useFlutter } from "../context/FlutterInitializer";
// import FlutterProvComponent from "../compenent/flutter-ui/test";
// import Navbar from "../compenent/Navbar";

// const AdjustFlutterContainer = () => {
//   const { initialized } = useFlutter();
//   let path = "cart";
//   const waitForFlutterRoute = () => {
//     return new Promise((resolve) => {
//       const check = setInterval(() => {
//         if (typeof window.flutterRoute === "function") {
//           clearInterval(check);
//           resolve();
//         }
//       }, 100);
//     });
//   };
//   useEffect(() => {
//     if (initialized) {
//       waitForFlutterRoute().then(() => {
//         console.log("FlutterProvComponent Path: ", path);

//         window.flutterRoute(`/${path}`);
//         console.log(`_Route "/${path}" has been sent to Flutter app.`);
//       });
//     }
//   }, [initialized]);

//   return (
//     <div className="w-full h-full bg-green flex flex-col items-center">
//       <Navbar />
//       <div className="flex items-center bg-orange">
//         <FlutterProvComponent path={"language"} />
//         <p>Provider</p>
//       </div>
//     </div>
//   );
// };

// export default AdjustFlutterContainer;
// //   const { initialized, setContainerStyle } = useFlutter();

// //   useEffect(() => {
// //     if (initialized) {
// //       // Change the style dynamically
// //       setContainerStyle((prevStyle) => ({
// //         ...prevStyle,
// //         width: '600px',  // Change the width
// //         height: '900px', // Change the height
// //         border: '2px solid #000', // Change the border
// //         display: 'none'
// //       }));
// //     }
// //   }, [initialized, setContainerStyle]);
