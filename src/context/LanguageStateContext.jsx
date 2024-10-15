// import React, { createContext, useState, useEffect } from 'react';

// export const LanguageStateContext = createContext();

// export const LanguageStateProvider = ({ children }) => {
//   const [languageState, setLanguageState] = useState(() => {
//     return localStorage.getItem('languageState') || 'en';
//   });

//   useEffect(() => {
//     localStorage.setItem('languageState', languageState);
//     if (window.sendStateToFlutter) {
//       window.sendStateToFlutter(languageState);
//     } else {
//       console.warn("sendStateToFlutter is not defined.");
//     }
//   }, [languageState]);
  
//   useEffect(() => {
//     const onFlutterReady = () => {
//       if (window.receiveStateFromFlutter) {
//         const initialState = window.receiveStateFromFlutter();
//         setLanguageState(initialState);
//       } else {
//         console.warn("receiveStateFromFlutter is not defined.");
//       }
//     };

//     const onStateChanged = (event) => {
//       try {
//         const newState = event.detail;
//         console.log('React received new state from Flutter: ', newState);
//         setLanguageState(newState);
//       } catch (error) {
//         console.error("Error handling state change from Flutter: ", error);
//       }
//     };

//     window.addEventListener('flutter-initialized', onFlutterReady);
//     window.addEventListener('state-updated', onStateChanged); 
//     return () => {
//       window.removeEventListener('flutter-initialized', onFlutterReady);
//       window.removeEventListener('state-updated', onStateChanged);
//     };
//   }, []);

//   return (
//     <LanguageStateContext.Provider value={{ languageState, setLanguageState }}>
//       {children}
//     </LanguageStateContext.Provider>
//   );
// };
import React, { createContext, useState, useEffect } from 'react';

export const LanguageStateContext = createContext();

export const LanguageStateProvider = ({ children }) => {
  const [languageState, setLanguageState] = useState(() => {
    return localStorage.getItem('languageState') || 'en';
  });

  useEffect(() => {
    if (window.sendStateToFlutter) {
      window.sendStateToFlutter(languageState);
    } else {
      console.warn("sendStateToFlutter is not defined.");
    }
    localStorage.setItem('languageState', languageState);
  }, [languageState]);

  useEffect(() => {
    // When Flutter is ready, send the stored language state to Flutter
    const onFlutterReady = () => {
      if (window.receiveStateFromFlutter) {
        const initialState = window.receiveStateFromFlutter();

        // Set the language state from Flutter if available
        if (initialState) {
          setLanguageState(initialState);
        }
      }

      // Send the current languageState (from storage) to Flutter
      if (window.sendStateToFlutter) {
        window.sendStateToFlutter(languageState);
      } else {
        console.warn("sendStateToFlutter is not defined.");
      }
    };

    const onStateChanged = (event) => {
      try {
        const newState = event.detail;
        console.log('React received new state from Flutter: ', newState);
        setLanguageState(newState);
      } catch (error) {
        console.error("Error handling state change from Flutter: ", error);
      }
    };

    window.addEventListener('flutter-initialized', onFlutterReady);
    window.addEventListener('state-updated', onStateChanged); 
    
    return () => {
      window.removeEventListener('flutter-initialized', onFlutterReady);
      window.removeEventListener('state-updated', onStateChanged);
    };
  }, [languageState]);

  return (
    <LanguageStateContext.Provider value={{ languageState, setLanguageState }}>
      {children}
    </LanguageStateContext.Provider>
  );
};
