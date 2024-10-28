
export function setupNotifyStateChangeShop(onStateChangeCallback) {
  window.notifyStateChangeShop = (state) => {
    try {
      const parsedData = JSON.parse(state);
      const cartLength = parsedData.cart.items.length;
      console.log("Parsed cart length from Flutter:", cartLength);
      onStateChangeCallback(cartLength);
    } catch (error) {
      console.error("Failed to parse JSON:", error);
    }
  };
  return () => {
    delete window.notifyStateChangeShop;
  };
}

export function setupNotifyStateChangeSocket(setProtocolVersion) {
  let parsedData;
  window.notifyStateChangeSocket = (state) => {
    try {
      parsedData = JSON.parse(state);
      if (parsedData.event) {
        try {
          const parsedEvent = JSON.parse(parsedData.event);
          console.log("Parsed event:", parsedEvent);
          setProtocolVersion(parsedEvent);
        } catch (error) {
          console.error("Failed to parse event JSON:", error);
        }
      }
    } catch (error) {
      console.error("Failed to parse JSON:", error);
    }
  };
  return () => {
    delete window.notifyStateChangeSocket;
  };
}

