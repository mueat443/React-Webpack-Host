import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

// สร้าง Context สำหรับ Flutter
const FlutterContext = createContext();

// FlutterProvider คือคอมโพเนนต์ที่ทำหน้าที่จัดการการโหลดและการแสดงผลของแอป Flutter
export const FlutterProvider = ({ children, src = 'http://localhost:8089/flutter.js' }) => {
  // เก็บข้อมูลของอินสแตนซ์ Flutter และ container ของแอป Flutter
  const flutterInstance = useRef(null);
  const containerRef = useRef(document.createElement('div')); 
  const [initialized, setInitialized] = useState(false);

  // useEffect ใช้สำหรับโหลด Flutter เมื่อมีการเรนเดอร์ครั้งแรก
  useEffect(() => {

    // ตรวจสอบว่ามีการเพิ่ม containerRef เข้าไปใน body หรือไม่ ถ้าไม่มีให้เพิ่มเข้าไป
    if (!document.body.contains(containerRef.current)) {
      document.body.appendChild(containerRef.current);
    }

    // ฟังก์ชันโหลดสคริปต์ Flutter โดยรับ src เป็น URL ของสคริปต์
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Script load error: ${src}`));
        document.head.appendChild(script);
      });
    };

    // ฟังก์ชันเริ่มต้นแอป Flutter
    const initializeFlutter = async () => {
      // ตรวจสอบว่าแอป Flutter ยังไม่ได้ถูกโหลดก่อนหน้านี้
      if (!flutterInstance.current) {
        try {
          // โหลดสคริปต์ Flutter
          await loadScript(src);
          if (window._flutter) {
            // กำหนด path สำหรับ asset และ entrypoint ของ Flutter
            const assetBase = src.replace('flutter.js', '');
            const entrypointUrl = `${assetBase}main.dart.js`;
            window._flutter.loader.loadEntrypoint({
              entrypointUrl,
              assetBase,
              onEntrypointLoaded: async (engineInitializer) => {
                // เริ่มต้นเอนจิ้นของ Flutter และรันแอป
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

    // เรียกใช้ฟังก์ชันเริ่มต้นแอป Flutter
    initializeFlutter();

    // คืนค่า cleanup function (ถ้ามี)
    return () => {
    };
  }, [src]);

  // ส่งค่า context สำหรับ Flutter instance, การตั้งค่า initialized และ container reference ให้กับลูกคอมโพเนนต์
  return (
    <FlutterContext.Provider value={{ flutterInstance: flutterInstance.current, initialized, containerRef }}>
      {children}
    </FlutterContext.Provider>
  );
};

// useFlutter เป็น custom hook สำหรับเข้าถึง FlutterContext
export const useFlutter = () => useContext(FlutterContext);
