// import React, { createContext, useContext, useState, useEffect } from "react";

// // สร้าง Context
// const CountContext = createContext([0, () => {}]);

// export function CountProvider({ children }) {
//   const [count, setCount] = useState(0);

//   // Function ส่ง count ไป Flutter
//   function sendCountToFlutter(newCount) {
//     if (window.sendCountToFlutter) {
//       window.sendCountToFlutter(newCount); // เรียกฟังก์ชัน Flutter
//     }
//   }
//   // อัปเดต count ใน React และส่งไป Flutter
//   function updateCount(newCount) {
//     setCount(newCount);
//     sendCountToFlutter(newCount);
//   }

//   // ตั้งค่าฟังก์ชันรับข้อมูลจาก Flutter
//   useEffect(() => {
//     window.receiveCountFromFlutter = (newCount) => {
//       setCount(newCount); // รับค่า count ใหม่จาก Flutter
//     };
//   }, []);

//   return (
//     <CountContext.Provider value={[count, updateCount]}>
//       {children}
//     </CountContext.Provider>
//   );
// }

// export function useCount() {
//   return useContext(CountContext);
// }
import React, { createContext, useContext, useState, useEffect } from "react";

// Create Context for Count
const CountContext = createContext([0, () => {}]);

export function CountProvider({ children }) {
  const [count, setCount] = useState(0);

  // Function to send count from React to Flutter
  function sendCountToFlutter(newCount) {
    if (window._appState && window._appState.setCount) {
      window._appState.setCount(newCount); // Call Flutter function to update count
    }
  }

  // Update count in React and send to Flutter
  function updateCount(newCount) {
    setCount(newCount);
    sendCountToFlutter(newCount); // Send count to Flutter
  }

  // Setup function to receive count updates from Flutter
  useEffect(() => {
    const handleCountUpdate = (newCount) => {
      console.log('Received count from Flutter:', newCount);
      setCount(newCount); // Update count in React
    };

    // Define `updateReactCount` to allow Flutter to update React's state
    window.updateReactCount = (newCount) => {
      console.log('Updating React count:', newCount);
      setCount(newCount);
    };

    // Ensure _appState is available and setup handler
    if (window._appState && window._appState.addHandler) {
      window._appState.addHandler(handleCountUpdate);
    }

    // Cleanup the handler when component unmounts
    return () => {
      if (window._appState && window._appState.removeHandler) {
        window._appState.removeHandler(handleCountUpdate);
      }
    };
  }, []);

  return (
    <CountContext.Provider value={[count, updateCount]}>
      {children}
    </CountContext.Provider>
  );
}

export function useCount() {
  return useContext(CountContext);
}
