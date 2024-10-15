import React, { useEffect, useState } from 'react';

// คอมโพเนนต์หลัก
const FlutterFix = () => {
  const [flutterState, setFlutterState] = useState(null);
  const [text, setText] = useState('');

  useEffect(() => {
    const onFlutterReady = (event) => {
      const exportedState = event.detail; //
      setFlutterState(exportedState);
      console.log("Flutter state initialized:", exportedState);     
      if (exportedState && exportedState.textNotifier) {
        const textChangeListener = () => {
          const currentText = exportedState.getText(); // รับค่าปัจจุบันจาก Flutter
          setText(currentText);
        };

        exportedState.textNotifier.addListener(textChangeListener);
        return () => {
          exportedState.textNotifier.removeListener(textChangeListener);
        };
      }
    };
    window.addEventListener('flutter-initialized', onFlutterReady);

    return () => {
      window.removeEventListener('flutter-initialized', onFlutterReady);
    };
  }, []);


  const sendMessageToFlutter = (newText) => {
    if (flutterState && flutterState.setText) {
      flutterState.setText(newText); // เรียกใช้ฟังก์ชัน setText ใน Flutter
      setText(newText); // อัปเดตสถานะใน React
    }
  };

  return (
    <div>
      <h1>React Application</h1>
      <input 
        type="text" 
        value={text} 
        onChange={(e) => sendMessageToFlutter(e.target.value)} 
        placeholder="Type something..."
      />
      <p>Current Text: {text}</p>
    </div>
  );
};

export default FlutterFix;
