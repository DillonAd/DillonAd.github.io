async function register() {
  if ("serviceWorker" in navigator) {
      if (navigator.serviceWorker.controller) {
          console.log("Active service worker found, skipping registration.");
      } else {
          navigator.serviceWorker
              .register("service-worker.js", { scope: "./" })
              .then(function (reg) {
                  console.log("Service worker has been registered for scope: " + reg.scope);
              });
      }
  }
}

register();