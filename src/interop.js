(function() {
  "use strict";
  console.log("Interop.js loaded");

  // This function receives the count from Flutter and updates the React UI
  window.receiveCountFromFlutter = function(count) {
    console.log('Received count from Flutter:', count);
    // Update React or any other JS logic
    if (window.updateReactCount) {
      window.updateReactCount(count);
    }
  };

  // Function to handle setting up state between Flutter and React
  window._stateSet = function() {
    console.log("Calling _stateSet");

    if (!window._appState) {
      console.error('Flutter _appState is not available');
      return;
    }

    let appState = window._appState;
    console.log('Flutter appState:', appState);

    // Example: Automatically set the count in Flutter from React
    appState.setCount(10); // Set an initial count value from React

    // React can register a handler to listen for updates from Flutter
    appState.addHandler(function(updatedCount) {
      console.log('Received updated count from Flutter:', updatedCount);
      // You can update the React UI here if needed
    });

    // Bind increment button in JS to Flutter's increment function
    let incrementButton = document.querySelector("#increment");
    incrementButton.addEventListener("click", () => {
      if (appState) {
        appState.increment(); // Call Flutter's increment method
      }
    });
  };
})();
