import React, { useContext, useEffect, useState } from "react";
import PlayIcon from "../assets/play-button.svg";
import PauseIcon from "../assets/pause-button.svg";
import RefreshIcon from "../assets/refresh-button.svg";

const BlocMultiComponent = ({event}) => {
  const [flutterState, setFlutterState] = useState(null);
  const [duration, setDuration] = useState(60);
  const [isPlaying, setIsPlaying] = useState(true); 
  const [hasStarted, setHasStarted] = useState(false);

  const togglePlayPause = () => {    
    if(!isPlaying) {
        flutterState.onResumed()
    } else {
        flutterState.onPaused()
    }
    setIsPlaying(!isPlaying); 
  };
  const startHandler = () => {
    flutterState.onStarted(duration)
    setHasStarted(true); 
  };

  useEffect(() => {    
    const onFlutterReady = (event) => {                
      const exportedState = event.detail;
      setFlutterState(exportedState);
    };

    window.addEventListener(event, onFlutterReady);

    return () => {
      window.removeEventListener(event, onFlutterReady);
    };
  }, []);

  useEffect(() => {
    window.notifyStateChangeTimer = (state) => {
      try {
        const parsedData = JSON.parse(state);
        const parsedDuration = parsedData.duration;
        const parsedEvent = parsedData.event; // แยก event ออกมา
        console.log("Event:", event, "Parsed Data:", parsedData);
        setDuration(parsedDuration);
      } catch (error) {
        console.error("Failed to parse JSON:", error);
      }
    };

    return () => {
      window.notifyStateChangeShop = null;
    };
  }, []);

  return (
    <div className="flex mt-10 font-kanit text-3xl w-full items-center justify-center">
      {!hasStarted && (
        <button 
          onClick={startHandler} 
          className="bg-green-500 text-white py-2 px-4 rounded"
        >
          Start
        </button>
      )}

      {hasStarted && (
        <div className="flex flex-row">
          <img
            src={isPlaying ? PauseIcon : PlayIcon}
            alt={isPlaying ? "Pause Icon" : "Play Icon"}
            className="ml-2 h-10 w-10"
            onClick={togglePlayPause}
          />
          <p className="ml-10 mr-10">duration: {formatDuration(duration)} </p>
          <img
            src={RefreshIcon}
            alt={"Refresh Icon"}
            className="ml-2 h-10 w-10"
            onClick={() => {
              if (flutterState) {
                flutterState.onReset(); 
              }
              setHasStarted(false);

            }}
          />
        </div>
      )}
    </div>
  );
};

export default BlocMultiComponent;

const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
      return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };