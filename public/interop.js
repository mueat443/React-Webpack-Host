(function() {
  "use strict";
  console.log("Interop.js loaded");

  // Define receiveCountFromFlutter to handle updates from Flutter
  window.receiveCountFromFlutter = function(count) {
    console.log('Received count from Flutter:', count);
    if (window.updateReactCount) {
      window.updateReactCount(count); // Update React component if the function exists
    }
  };

  // Define callMethod to handle calls from Flutter
  window.callMethod = function(methodName, args) {
    if (methodName === 'receiveCountFromFlutter') {
      window.receiveCountFromFlutter(args[0]);
    }
  };

  // This function will be called from Flutter when it prepares the JS-interop.
  window._stateSet = function () {
    window._stateSet = function () {
      console.log("Call _stateSet only once!");
    };  

    // The state of the Flutter app
    let appState = window._appState;

    // Ensure the DOM is fully loaded
    document.addEventListener('DOMContentLoaded', function() {
      let valueField = document.querySelector("#value");
      let updateState = function () {
        if (appState && valueField) {
          valueField.value = appState.count; // Update count in HTML from Flutter
        }
      };

      // Register a callback to update the HTML field from Flutter.
      if (appState && appState.addHandler) {
        appState.addHandler(updateState);
      }

      // Render the first value (0).
      updateState();

      let incrementButton = document.querySelector("#increment");
      if (incrementButton) {
        incrementButton.addEventListener("click", (event) => {
          if (appState) {
            appState.increment(); // Call Flutter function to increment count
          }
        });
      }

      let screenSelector = document.querySelector("#screen-selector");
      if (screenSelector) {
        screenSelector.addEventListener("change", (event) => {
          if (appState) {
            appState.changeDemoScreenTo(event.target.value);
            setJsInteropControlsEnabled(event.target.value === 'counter');
          }
        });
      }

      // Enables/disables the Value/Increment controls.
      function setJsInteropControlsEnabled(enabled) {
        let elements = document.querySelectorAll("#increment, label[for='value']");
        elements.forEach((el) => {
          el.classList.toggle('disabled', !enabled);
        });
      }
    });
  };
}());
