import React, { useEffect,useRef  } from 'react';

const flutterCss = {
  border: '1px solid #eee',
  borderRadius: '5px',
  width: '1500px',  
  height: '450px', 
  transition: 'all 150ms ease-in-out',
  overflow: 'hidden',
  position: 'relative', 
};
const FlutterWeatherApp = () => {

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
        await loadScript('http://localhost:8082/flutter.js');     
        if (window._flutter) {
          const targetElement = document.getElementById('flutter-weather-container');
          const assetBase = 'http://localhost:8082/';
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
    
  }, []);

  return <div id="flutter-weather-container" style={flutterCss}></div>;
};

export default FlutterWeatherApp;