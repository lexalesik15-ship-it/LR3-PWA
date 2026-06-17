const CACHE_VERSION = "pwa-lr3-v1";
const STATIC_CACHE_URLS = [
  "/",
  "/index.html",
  "/help/index.html",
  "/manifest.json",
  "/src/css/app.css",
  "/src/css/feed.css",
  "/src/css/help.css",
  "/src/js/app.js",
  "/src/js/feed.js",
  "/src/js/material.min.js",
  "/src/images/main-image.jpg",
  "/src/images/main-image-sm.jpg",
  "/src/images/main-image-lg.jpg"
];

self.addEventListener("install", event => {
  console.log("Service Workers installing... ", event);
  event.waitUntil(
    caches.open(CACHE_VERSION).then(cache => cache.addAll(STATIC_CACHE_URLS))
  );
});

self.addEventListener("activate", event => {
  console.log("Activating Service Workers ", event);
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_VERSION).map(key => caches.delete(key))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  console.log("Fetching something... ", event);
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
