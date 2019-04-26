const CACHE = "pwabuilder-offline-page";
const offlineFallbackPage = "offline.html";

self.addEventListener("install", event => {
  console.log("Installing PWA Event processing");

  event.waitUntil(
    caches.open(CACHE).then(cache => {
      console.log("Cached offline page during install");
      return cache.add(offlineFallbackPage);
    })
  );
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") {
      return;
  }

  event.respondWith(
    fetch(event.request)
      .then(response => {
        console.log("Adding page to offline cache: " + response.url);
        event.waitUntil(updateCache(event.request, response.clone()));
        return response;
      })
      .catch(error => {
        console.log("Network request failed. Serving content from cache: " + error);
        return fromCache(event.request);
      })
  );
});

async function fromCache(request) {
    const cache = await caches.open(CACHE);
    const matching = await cache.match(request);
    
    if (!matching || matching.status === 404) {
        if (request.destination !== "document" || request.mode !== "navigate") {
            return Promise.reject("no-match");
        } else {
            return cache.match(offlineFallbackPage);
        }
    }
    return matching;
}

async function updateCache(request, response) {
    const cache = await caches.open(CACHE);
    return cache.put(request, response);
}