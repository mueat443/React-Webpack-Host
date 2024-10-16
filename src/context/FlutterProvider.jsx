import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import {useFlutterStyles} from './FlutterStyleContext'
const FlutterContext = createContext();

export const FlutterProvider = ({ children, src = 'http://localhost:8089/flutter.js' }) => {
  const flutterInstance = useRef(null);
  const containerRef = useRef(document.createElement('div')); // สร้าง div นอก React tree
  const [initialized, setInitialized] = useState(false);
  const { flutterStyles } = useFlutterStyles(); // รับค่า styles


  const flutterCss = {
    border: '1px solid #eee',
    borderRadius: '5px',
    width: '450px',  
    height: '800px', 
    transition: 'all 150ms ease-in-out',
    overflow: 'hidden',
    position: 'relative', 
    display: 'flex',            
    justifyContent: 'center',   
    alignItems: 'center',       
    margin: '0 auto',           
    ...flutterStyles,
  };
  

  useEffect(() => {
    document.body.appendChild(containerRef.current);
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
      if (!flutterInstance.current) {
        try {
          await loadScript(src);
          if (window._flutter) {
            const assetBase = src.replace('flutter.js', '');
            const entrypointUrl = `${assetBase}main.dart.js`;

            window._flutter.loader.loadEntrypoint({
              entrypointUrl,
              assetBase,
              onEntrypointLoaded: async (engineInitializer) => {
                let appRunner = await engineInitializer.initializeEngine({
                  hostElement: containerRef.current,
                  assetBase,
                });
                flutterInstance.current = await appRunner.runApp();
                setInitialized(true);
                console.log('Flutter app initialized');
              },
            });
          }
        } catch (error) {
          console.error('Error initializing Flutter app:', error);
        }
      }
    };

    initializeFlutter();

    return () => {
      containerRef.current.style.display = 'none'; 
    };
  }, [src]);

  return (
    <FlutterContext.Provider value={{ flutterInstance: flutterInstance.current, initialized }}>
      {children}
      {ReactDOM.createPortal(
        <div  id="flutter-main-container" ref={containerRef} style={flutterCss} />,
        document.body
      )}
    </FlutterContext.Provider>
  );
};

export const useFlutter = () => useContext(FlutterContext);


