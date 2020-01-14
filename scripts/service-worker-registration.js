async function register() {
    if ("serviceWorker" in navigator && !navigator.serviceWorker.controller) {
          navigator.serviceWorker
            .register("scripts/service-worker.js", { scope: "scripts/" });
    }
}

register();