const yourTodo = "your-to-do-v1";
const assets = [
  "/",
  "/index.html",
  "/style.css",
  "/app.js",
  "/images/icon-48.png",
  "/images/android-launchericon-48-48.png",
  "/images/android-launchericon-72-72.png",
  "/images/android-launchericon-96-96.png",
  "/images/android-launchericon-144-144.png",
  "/images/android-launchericon-192-192.png",
  "/images/android-launchericon-512-512.png"
];

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(yourTodo).then(cache => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    })
  );
});