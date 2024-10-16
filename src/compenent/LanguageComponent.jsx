import React, { useState, useEffect, useContext } from 'react';
import { LanguageStateContext } from '../context/LanguageStateContext'
const translations = {
  th: "ภาษาไทย",
  en: "English",
  my: "မြန်မာစာ",
  km: "ខ្មែរ"
};

const LanStateComponent = () => {
  const { languageState, setLanguageState } = useContext(LanguageStateContext); 

  useEffect(() => {    

    const onStateChanged = (event) => {
      try {                        
        const newState = event.detail;
        console.log('React received new state from Flutter: ', newState);
        setLanguageState(newState);  
      } catch (error) {
        console.error("Error handling state change from Flutter: ", error);
      }
    };

    window.addEventListener('state-updated', onStateChanged); 

    return () => {
      window.removeEventListener('state-updated', onStateChanged);
    };
  }, [setLanguageState]);


  const handleStateChange = (newState) => {
    setLanguageState(newState); 
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
