const yourTodo = "your-to-do-v1";
const assets = [
  "/todo-app-js-pwa/",
  "/todo-app-js-pwa/index.html",
  "/todo-app-js-pwa/style.css",
  "/todo-app-js-pwa/app.js",
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
    caches.open(yourTodo).then(cache => {
      return cache.match(fetchEvent.request).then(res => res || fetch(fetchEvent.request)
        .then(networkRes => {
          cache.put(evt.request, networkResponse.clone());
          return networkResponse;
        })
      )
    }));
});