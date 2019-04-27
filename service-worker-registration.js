async function register() {
    if ("serviceWorker" in navigator && !navigator.serviceWorker.controller) {
          navigator.serviceWorker
            .register("service-worker.js", { scope: "./" });
    }
}

register();