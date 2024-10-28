import React ,{useEffect}from 'react';
const FlutterContainer = ({ containerRef,adjustStyle }) => {  
  return (
    <div
      id="flutter-main-container"
      ref={containerRef}
      style={adjustStyle ? adjustStyle :{
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
    </div>
  );
};

export default FlutterContainer;
