// import React, { useEffect,useState } from 'react';



// const FlutterMainApp = ({path,flutterCss}) => {
//   const [initialized, setInitialized] = useState(false);

//   useEffect(() => {
//     const loadScript = (src) => {
//       return new Promise((resolve, reject) => {
//         const script = document.createElement('script');
//         script.src = src;
//         script.onload = () => resolve();
//         script.onerror = () => reject(new Error(`Script load error: ${src}`));
//         document.head.appendChild(script);
//       });
//     };

//     const initializeFlutter = async () => {
//       try {
//         await loadScript('http://localhost:8089/flutter.js');     
//         if (window._flutter) {
//           const targetElement = document.getElementById('flutter-main-container');
//           const assetBase = 'http://localhost:8089/';
//           const entrypointUrl = `${assetBase}main.dart.js`;
          
//           _flutter.loader.loadEntrypoint({
//             entrypointUrl: entrypointUrl,
//             assetBase: assetBase,
//             onEntrypointLoaded: async (engineInitializer) => {
//               try {
//                 let appRunner = await engineInitializer.initializeEngine({
//                   hostElement: targetElement,
//                   assetBase: assetBase,
//                 });

//                 let app = await appRunner.runApp();
//                 console.log('Flutter app initialized:', app);
//                 setInitialized(true); // บอกว่า Flutter ถูกโหลดเสร็จแล้ว

//               } catch (error) {
//                 console.error('Error initializing Flutter app:', error);
//               }
//             }
//           });
//         } else {
//           console.error('_flutter is not defined.');
//         }
//       } catch (error) {
//         console.error('Error loading flutter.js:', error);
//       }
//     };
//     initializeFlutter();
//   }, []);

//   const waitForFlutterRoute = () => {
//     return new Promise((resolve) => {
//       const check = setInterval(() => {
//         if (typeof window.flutterRoute === 'function') {
//           clearInterval(check);
//           resolve();
//         }
//       }, 100);
//     });
//   };
//   useEffect(() => {
//     if (initialized) {
//       waitForFlutterRoute().then(() => {
//         window.flutterRoute(`/${path}`); 
//         console.log(`_Route "/${path}" has been sent to Flutter app.`);
//       });
//     }
//   }, [initialized]);

//   return <div id="flutter-main-container" style={flutterCss}></div>;
// };

// export default FlutterMainApp;
import React, { useEffect, useState } from 'react';

const FlutterMainApp = ({ path, flutterCss }) => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Script load error: ${src}`));
        document.head.appendChild(script);
      });
    };

    let isMounted = true; // ตัวแปรเช็คว่าคอมโพเนนต์ยังติดตั้งอยู่

    const initializeFlutter = async () => {
      try {
        await loadScript('http://localhost:8089/flutter.js');     
        if (window._flutter) {
          const targetElement = document.getElementById('flutter-main-container');
          const assetBase = 'http://localhost:8089/';
          const entrypointUrl = `${assetBase}main.dart.js`;
          
          _flutter.loader.loadEntrypoint({
            entrypointUrl: entrypointUrl,
            assetBase: assetBase,
            onEntrypointLoaded: async (engineInitializer) => {
              try {
                let appRunner = await engineInitializer.initializeEngine({
                  hostElement: targetElement,
                  assetBase: assetBase,
                });

                let app = await appRunner.runApp();
                console.log('Flutter app initialized:', app);
                
                if (isMounted) { // เช็คว่าคอมโพเนนต์ยังติดตั้งอยู่
                  setInitialized(true); // บอกว่า Flutter ถูกโหลดเสร็จแล้ว
                }
              } catch (error) {
                console.error('Error initializing Flutter app:', error);
              }
            }
          });
        } else {
          console.error('_flutter is not defined.');
        }
      } catch (error) {
        console.error('Error loading flutter.js:', error);
      }
    };

    initializeFlutter();

    // ฟังก์ชัน cleanup ที่จะทำงานเมื่อคอมโพเนนต์ unmounted
    return () => {
      isMounted = false; // ปิดตัวแปรเช็คเมื่อคอมโพเนนต์ unmounted
    };
  }, []);

  const waitForFlutterRoute = () => {
    return new Promise((resolve) => {
      const check = setInterval(() => {
        if (typeof window.flutterRoute === 'function') {
          clearInterval(check);
          resolve();
        }
      }, 100);
    });
  };

  useEffect(() => {
    if (initialized) {
      waitForFlutterRoute().then(() => {
        window.flutterRoute(`/${path}`); 
        console.log(`_Route "/${path}" has been sent to Flutter app.`);
      });
    }
  }, [initialized]);

  return <div id="flutter-main-container" style={flutterCss}></div>;
};

export default FlutterMainApp;
