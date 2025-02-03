const cacheName = "pwa-quiz-cache-v1";
const filesToCache = [
  "/",
  "/index.html",
  "/quiz.html",
  "/quizaudiotory.html",
  "/css/styles.css",
  "/js/app.js",
  "/js/quizaudiotory.js",
  "/js/quizvisual.js",
  "/assets/icons/kids.png",
  "/assets/icons/kidds.png"
];

self.addEventListener("install", (event) => {
  console.log("Service Worker: Menginstal...");
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker: Aktif!");
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((key) => {
          if (key !== cacheName) {
            console.log("Service Worker: Menghapus cache lama:", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
