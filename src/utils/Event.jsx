export function initializeFlutterListener(event,setFlutterState) {
    const onFlutterReady = (event) => {
      const exportedState = event.detail;
      setFlutterState(exportedState);
    };
    window.addEventListener(event, onFlutterReady);
    return () => {
      window.removeEventListener(event, onFlutterReady);
    };
  }
  