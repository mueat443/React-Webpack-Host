// import React, { useEffect,useRef } from 'react';

// const flutterCss = {
//   border: '1px solid #eee',
//   borderRadius: '5px',
//   width: '450px',  
//   height: '800px', 
//   transition: 'all 150ms ease-in-out',
//   overflow: 'hidden',
//   position: 'relative', 
// };
// const FlutterCoreApp = () => {

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
//         await loadScript('http://localhost:8081/flutter.js');     
//         if (window._flutter) {
//           const targetElement = document.getElementById('flutter-core-container');
//           const assetBase = 'http://localhost:8081/';
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

//   return <div id="flutter-core-container" style={flutterCss}></div>;
// };

// export default FlutterCoreApp;
import React, { useEffect, useRef } from 'react';

const flutterCss = {
  border: '1px solid #eee',
  borderRadius: '5px',
  width: '450px',  
  height: '800px', 
  transition: 'all 150ms ease-in-out',
  overflow: 'hidden',
  position: 'relative',
};

let flutterAppInstance = null;

const FlutterCoreApp = () => {
  const containerRef = useRef(null); 

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

    const initializeFlutter = async () => {
      try {
        if (!flutterAppInstance) {
          await loadScript('http://localhost:8089/flutter.js');
          if (window._flutter) {
            const targetElement = containerRef.current;
            const assetBase = 'http://localhost:8089/';
            const entrypointUrl = `${assetBase}main.dart.js`;

            window._flutter.loader.loadEntrypoint({
              entrypointUrl: entrypointUrl,
              assetBase: assetBase,
              onEntrypointLoaded: async (engineInitializer) => {
                try {
                  let appRunner = await engineInitializer.initializeEngine({
                    hostElement: targetElement,
                    assetBase: assetBase,
                  });
                  flutterAppInstance = await appRunner.runApp(); 
                  console.log('Flutter app initialized:', flutterAppInstance);
                } catch (error) {
                  console.error('Error initializing Flutter app:', error);
                }
              }
            });
          } else {
            console.error('_flutter is not defined.');
          }
        } else {
          console.log('Using existing Flutter app instance.');
          containerRef.current.appendChild(flutterAppInstance.hostElement);
        }
      } catch (error) {
        console.error('Error loading flutter.js:', error);
      }
    };

    initializeFlutter();

    return () => {
      if (flutterAppInstance) {
        console.log('Removing Flutter app instance.');
        flutterAppInstance.hostElement.remove();
      }
    };
  }, []);

  return <div ref={containerRef} id="flutter-core-container" style={flutterCss}></div>;
};

export default FlutterCoreApp;

