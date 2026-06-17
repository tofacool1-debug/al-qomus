// Service Worker - Shorof Digital Pro v3
const CACHE_NAME = "shorof-digital-pro-v3";
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/offline.html",
  "/manifest.json",
  "/icon-192.png",
  "/icon-512.png",
  "/style.css",
  "/app.js"
];

// 1. INSTALL - Cache semua asset inti
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// 2. ACTIVATE - Hapus cache lama
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. FETCH - Strategi cache
self.addEventListener("fetch", (event) => {
  // Skip request non http/https
  if (!event.request.url.startsWith("http")) return;

  // API/DATA = Network First, fallback ke cache
  if (event.request.url.includes("/api/") || event.request.destination === "json") {
    event.respondWith(
      fetch(event.request)
        .then((res) => {
          if (res.status === 200) {
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, res.clone()));
          }
          return res;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Asset/HTML = Cache First, fallback ke network
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request).then((networkResponse) => {
        // Cache response yg sukses GET doang
        if (networkResponse && networkResponse.status === 200 && event.request.method === "GET") {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        // Offline fallback khusus halaman HTML
        if (event.request.destination === "document") {
          return caches.match("/offline.html");
        }
        // Asset lain kasih response kosong biar gak error
        return new Response("", { status: 503 });
      });
    })
  );
});