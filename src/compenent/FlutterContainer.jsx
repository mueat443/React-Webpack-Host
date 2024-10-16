// import React, { useEffect } from 'react';
// import { useFlutter } from '../context/FlutterProvider';
// import ReactDOM from 'react-dom';

//  const FlutterContainer = () => {
//     const { containerRef, flutterCss } = useFlutter();
  
//     return (
//       <>
//         {ReactDOM.createPortal(
//           <div id="flutter-main-container" ref={containerRef} style={flutterCss} />,
//           document.body // Render ลงใน DOM แต่จะย้ายตำแหน่งได้จาก component
//         )}
//       </>
//     );
//   };
// export default FlutterContainer

// const flutterCss = {
//     border: '1px solid #eee',
//     borderRadius: '5px',
//     width: '450px',
//     height: '800px',
//     display: 'block', // บังคับให้แสดง
//     visibility: 'visible', // บังคับให้มองเห็น
//     transition: 'all 150ms ease-in-out',
//     overflow: 'hidden',
//     position: 'relative',
//   };
// FlutterContainer.js
// FlutterContainer.jsx
// import React from 'react';
// import ReactDOM from 'react-dom';
// import { useFlutter } from '../context/FlutterProvider';

// export const FlutterContainer = ({ isVisible }) => {
//   const { containerRef } = useFlutter();

//   if (!containerRef) {
//     console.error('containerRef is undefined');
//     return null; 
//   }

//   return (
//     <div
//       id="flutter-main-container"
//       ref={containerRef}
//       style={{
        // border: '1px solid #eee',
        // borderRadius: '5px',
        // width: '450px',
        // height: '800px',
        // transition: 'all 150ms ease-in-out',
        // overflow: 'hidden',
        // position: 'relative',
        // display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center',
        // margin: '0 auto',      
        // zIndex: 1,                
//       }}
//     />
//   )
// };
import React from 'react';
import ReactDOM from 'react-dom';

const FlutterContainer = ({ containerRef, isVisible }) => {
  return ReactDOM.createPortal(
    <div
      id="flutter-main-container"
      ref={containerRef}
      style={{
        display: "block",
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
      }}
    >
    </div>,
    document.body 
  );
};

export default FlutterContainer;
