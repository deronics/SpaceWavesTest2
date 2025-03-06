const cacheName = "do.Games-Space Waves-1.0-ms";
const contentToCache = [
    "Build/dae5c7bd2b15915f51ae4e56b8f5367d.loader.js",
    "Build/d216611ceb3e10d2934dbd58a8029ed7.framework.js.unityweb",
    "Build/84f2a438e63209fb4eb4fc9963c90c2a.data.unityweb",
    "Build/5862c99a4ed4162e551671caacff8552.wasm.unityweb",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
