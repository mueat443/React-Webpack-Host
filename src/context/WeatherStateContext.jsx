import React, { createContext, useState, useEffect,useContext } from 'react';
// import {setupNotifyStateChangeShop} from "../interop"
import {initializeFlutterListener} from "../utils/Event"

export const WeatherStateContext = createContext();

export const WeatherStateProvider = ({ children }) => {

  const [flutterState, setFlutterState] = useState(null);
  const [country, setCountry] = useState(''); 

  useEffect(() => {
    const cleanupFlutterListener = initializeFlutterListener("flutter-weather",setFlutterState);
    return cleanupFlutterListener; 
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