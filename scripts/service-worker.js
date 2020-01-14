const CACHE = "codejanitor";
const offlineFallbackPage = "/offline.html";

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.add(offlineFallbackPage))
  );
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") {
      return;
  }

  event.respondWith(
    fetch(event.request)
      .then(response => {
        event.waitUntil(updateCache(event.request, response.clone()));
        return response;
      })
      .catch(error => fromCache(event.request))
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