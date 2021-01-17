const yourTodo = "your-to-do-v1";
const assets = [
  "/",
  "/index.html",
  "/style.css",
  "/app.js",
  "https://fonts.gstatic.com",
  "https://fonts.googleapis.com/css2?family=Poppins&display=swap",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"
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