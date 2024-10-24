import React, { createContext, useState, useEffect,useContext } from 'react';
import { json } from 'react-router-dom';

export const WeatherStateContext = createContext();

export const WeatherStateProvider = ({ children }) => {

  const [flutterState, setFlutterState] = useState(null);
  const [country, setCountry] = useState(''); // Add country state
  useEffect(() => {
    const onFlutterReady = (event) => {
      const exportedState = event.detail;
      setFlutterState(exportedState);
    };
    window.addEventListener("flutter-weather", onFlutterReady);
    return () => {
      window.removeEventListener("flutter-weather", onFlutterReady);
    };
  }, []);


  useEffect(() => {
    if (country) {
      flutterState.fetchWeather(country);
    }   
  }, [country]);


  return (
    <WeatherStateContext.Provider value={{ flutterState, setCountry,country }}>
      {children}
    </WeatherStateContext.Provider>
  );
};
export const useWeatherStateContext = () => {
  return useContext(WeatherStateContext);
};