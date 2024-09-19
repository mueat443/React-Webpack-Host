(function() {
  "use strict";
  console.log("Interop.js loaded");

  // Define function to handle counter updates from Flutter
  window.jsNotifyCounterChanged = function(newCounter) {
    console.log('Received counter from Flutter:', newCounter);
    // Handle counter update in your JS code here
  };

  // Expose the Flutter methods to JavaScript
  window.counterUp = function() {
    if (window.flutterCounterProvider) {
      window.flutterCounterProvider.counterUp();
    }
  };

  window.counterDown = function() {
    if (window.flutterCounterProvider) {
      window.flutterCounterProvider.counterDown();
    }
  };

  // Example of setting the Flutter provider instance
  window.setFlutterCounterProvider = function(provider) {
    window.flutterCounterProvider = provider;
  };
})();