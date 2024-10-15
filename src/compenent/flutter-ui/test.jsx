// import React, { useEffect, useRef } from 'react';
// import { useFlutter } from '../../context/FlutterInitializer';

// const FlutterProvComponent = ({ width = '450px', height = '800px', style }) => {
//     const containerRef = useRef(null);
//     const { initialized } = useFlutter();
//     useEffect(() => {
//     console.log('Initialized:', initialized); // เพิ่มบรรทัดนี้เพื่อตรวจสอบค่า
//       if (initialized) {
//         const flutterContainer = document.getElementById('flutter-main-container');
//         console.log("flutterContainer: ",flutterContainer);
        
//         if (flutterContainer && containerRef.current) {
//           containerRef.current.appendChild(flutterContainer); 
//           flutterContainer.style.display = 'block'; 
//         }
//       }
//     }, [initialized]);

  
//     return (
//       <div
//         ref={containerRef}
//         style={{
//           border: '1px solid #eee',
//           borderRadius: '5px',
//           width,
//           height,
//           transition: 'all 150ms ease-in-out',
//           overflow: 'hidden',
//           position: 'relative',
//           ...style,
//         }}
//       >
//         {initialized ? null : <p>Loading Flutter...</p>}
//       </div>
//     );
//   };

// export default FlutterProvComponent;
// import React, { useEffect,useRef } from 'react';
// import { useFlutter } from '../../context/FlutterInitializer';

// const FlutterContainer = () => {
//   const { initialized, containerRef } = useFlutter(); // เข้าถึง container ของ Flutter
//   const flutterWrapperRef = useRef(null);

//   useEffect(() => {
//     if (initialized && containerRef.current && flutterWrapperRef.current) {
//       // ย้าย Flutter container มาแสดงที่นี่
//       flutterWrapperRef.current.appendChild(containerRef.current);
//       containerRef.current.style.display = 'block'; // แสดง Flutter UI
//     }

//     return () => {
//       if (containerRef.current) {
//         containerRef.current.style.display = 'none'; // ซ่อน Flutter app เมื่อออกจาก component
//       }
//     };
//   }, [initialized, containerRef]);

//   return (
//     <div>
//       <h2>Flutter App Section</h2>
//       {/* ส่วนที่แสดง Flutter app */}
//       <div ref={flutterWrapperRef} style={flutterCss}></div>
//     </div>
//   );
// };

// const flutterCss = {
//   border: '1px solid #ccc',
//   borderRadius: '5px',
//   width: '100%', // ขนาดตามที่ต้องการ
//   height: '800px',
//   position: 'relative',
//   overflow: 'hidden',
//   display: 'block',
// };

// export default FlutterContainer;
import React, { useEffect, useRef } from 'react';
import { useFlutter } from '../../context/FlutterInitializer';

const FlutterComponent = () => {
  const { flutterInstance } = useFlutter();
  const containerRef = useRef(null);

  useEffect(() => {
    if (flutterInstance && containerRef.current) {
      // Render the Flutter app in this container
      // Assuming you have a method to render the Flutter app
      const renderFlutterApp = () => {
        // Call the Flutter instance render function
        if (flutterInstance.render) {
          flutterInstance.render(containerRef.current); // Adjust as per your Flutter instance API
        }
      };

      renderFlutterApp();
    }
  }, [flutterInstance]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />; // Adjust size as needed
};

export default FlutterComponent;
