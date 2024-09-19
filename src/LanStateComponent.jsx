import React, { useState, useEffect } from 'react';

const translations = {
  th: "ภาษาไทย",
  en: "English",
  my: "မြန်မာစာ",
  km: "ខ្មែរ"
};

const LanStateComponent = () => {
  const [reactState, setReactState] = useState("en");

  useEffect(() => {    
    const onFlutterReady = () => {
      console.log('Flutter is ready');  // Debug message        
      if (window.receiveStateFromFlutter) {
        const initialState = window.receiveStateFromFlutter();
        console.log("Updated from Flutter: ", initialState);
        setReactState(initialState);
      } else {
        console.warn("receiveStateFromFlutter is not defined.");
      }
    };

    const onStateChanged = (event) => {
      try {
        const newState = event.detail;
        console.log('React received new state from Flutter: ', newState);
        setReactState(newState);
      } catch (error) {
        console.error("Error handling state change from Flutter: ", error);
      }
    };

    window.addEventListener('flutter-initialized', onFlutterReady);
    window.addEventListener('state-updated', onStateChanged); // Listen for state changes

    return () => {
      window.removeEventListener('flutter-initialized', onFlutterReady);
      window.removeEventListener('state-updated', onStateChanged);
    };
  }, []);

  const handleStateChange = (newState) => {
    setReactState(newState);
    if (window.sendStateToFlutter) {
      try {
        window.sendStateToFlutter(newState);
      } catch (error) {
        console.error("Error sending state to Flutter: ", error);
      }
    } else {
      console.error("sendStateToFlutter is not defined.");
    }
  };


  return (
    <div className='h-60'>
    <p className='text-center mb-6 text-3xl'>
      React Language: {translations[reactState]}
    </p>
    <div className='flex flex-col items-center space-y-4'>
      <label className='flex items-center space-x-2'>
        <input
          type='radio'
          value='th'
          checked={reactState === 'th'}
          onChange={() => handleStateChange('th')}
          className='accent-green-500'
        />
        <span>ภาษาไทย</span>
      </label>
      <label className='flex items-center space-x-2'>
        <input
          type='radio'
          value='en'
          checked={reactState === 'en'}
          onChange={() => handleStateChange('en')}
          className='accent-green-500'
        />
        <span>English</span>
      </label>
      <label className='flex items-center space-x-2'>
        <input
          type='radio'
          value='my'
          checked={reactState === 'my'}
          onChange={() => handleStateChange('my')}
          className='accent-green-500'
        />
        <span>မြန်မာစာ</span>
      </label>
      <label className='flex items-center space-x-2'>
        <input
          type='radio'
          value='km'
          checked={reactState === 'km'}
          onChange={() => handleStateChange('km')}
          className='accent-green-500'
        />
        <span>ខ្មែរ</span>
      </label>
    </div>
  </div>
  );
};

export default LanStateComponent;
