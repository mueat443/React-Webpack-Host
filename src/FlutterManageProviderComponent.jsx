import React, { useEffect, useState } from 'react';

const FlutterManageProviderComponent = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    window.jsNotifyCounterChanged = (newCounterValue) => {
      console.log('Received counter update from Flutter:', newCounterValue);
      setCounter(newCounterValue);
    };

    return () => {
      delete window.jsNotifyCounterChanged;
    };
  }, []);

  const handleCounterUp = () => {
      window.counterUp(); 
  };

  const handleCounterDown = () => {
      window.counterDown();
  };

  return (
    <div className='h-60'>
      <h2 className='text-center text-3xl'>React and Flutter Counter: {counter}</h2>
      <div className='flex flex-col m-4'>
      <button onClick={handleCounterUp} className=' bg-green h-10 rounded-lg mt-5'>Increase</button>
      <button onClick={handleCounterDown} className='bg-green h-10 rounded-lg mt-5'>Decrease</button>
      </div>
    </div>
  );
};

export default FlutterManageProviderComponent;
