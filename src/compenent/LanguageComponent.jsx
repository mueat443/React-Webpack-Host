import React, { useState, useEffect, useContext } from 'react';
import { LanguageStateContext } from '../context/LanguageStateContext'
const translations = {
  th: "ภาษาไทย",
  en: "English",
  my: "မြန်မာစာ",
  km: "ខ្មែរ"
};

const LanStateComponent = () => {
  const { languageState, setLanguageState } = useContext(LanguageStateContext); // ใช้ context แทน useState

  useEffect(() => {    
    // const onFlutterReady = () => {
    //   console.log('Flutter is ready');  // Debug message        
    //   if (window.receiveStateFromFlutter) {
    //     const initialState = window.receiveStateFromFlutter();
    //     console.log("Updated from Flutter: ", initialState);
    //     setLanguageState(initialState);  // อัพเดต context
    //   } else {
    //     console.warn("receiveStateFromFlutter is not defined.");
    //   }
    // };

    const onStateChanged = (event) => {
      try {                        
        const newState = event.detail;
        console.log('React received new state from Flutter: ', newState);
        setLanguageState(newState);  // อัพเดต context
      } catch (error) {
        console.error("Error handling state change from Flutter: ", error);
      }
    };

    // window.addEventListener('flutter-language-initialized', onFlutterReady);
    window.addEventListener('state-updated', onStateChanged); // Listen for state changes

    return () => {
      // window.removeEventListener('flutter-language-initialized', onFlutterReady);
      window.removeEventListener('state-updated', onStateChanged);
    };
  }, [setLanguageState]);

  // useEffect(() => {  
  //   console.log("window.sendStateToFlutter()",window.setText());    
  //   if (window.setText) {
  //     console.log('[React] Calling sendStateToFlutter with:', languageState);
  //     window.setText(languageState); 
  //   } else {
  //     console.error('[React] sendStateToFlutter function is not defined.');
  //   }
  // }, []);

  const handleStateChange = (newState) => {
    setLanguageState(newState); // อัพเดต context
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
      React Language: {translations[languageState]}
    </p>
    <div className='flex flex-col items-center space-y-4'>
      <label className='flex items-center space-x-2'>
        <input
          type='radio'
          value='th'
          checked={languageState === 'th'}
          onChange={() => handleStateChange('th')}
          className='accent-green-500'
        />
        <span>ภาษาไทย</span>
      </label>
      <label className='flex items-center space-x-2'>
        <input
          type='radio'
          value='en'
          checked={languageState === 'en'}
          onChange={() => handleStateChange('en')}
          className='accent-green-500'
        />
        <span>English</span>
      </label>
      <label className='flex items-center space-x-2'>
        <input
          type='radio'
          value='my'
          checked={languageState === 'my'}
          onChange={() => handleStateChange('my')}
          className='accent-green-500'
        />
        <span>မြန်မာစာ</span>
      </label>
      <label className='flex items-center space-x-2'>
        <input
          type='radio'
          value='km'
          checked={languageState === 'km'}
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
