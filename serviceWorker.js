const staticCascheName = "todo-app-static-v4";
const assets = [
  "/todo-app-js-pwa/",
  "/todo-app-js-pwa/index.html",
  "/todo-app-js-pwa/style.css",
  "/todo-app-js-pwa/app.js",
  "/todo-app-js-pwa/fallback.html",
  "https://fonts.googleapis.com/css2?family=Poppins&display=swap",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css",
  "https://fonts.gstatic.com/s/poppins/v15/pxiEyp8kv8JHgFVrJJnecmNE.woff2"
];

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticCascheName).then(cache => {
      cache.addAll(assets);
      console.log("service worker installed -- assets cached");
    }).catch(err => console.log("issue caching assets on install - ", err))
  );
});

self.addEventListener("activate", activateEvent => {
  // console.log("service worker activated");
  activateEvent.waitUntil(
    caches.keys().then(keys => {
      console.log("service worker activated");
      return Promise.all(keys
        .filter(key => key !== staticCascheName)
        .map(key => caches.delete(key))
      )
    }).catch(err => console.log("issue getting cacheKeys on activate - ", err))
  );
});

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.open(staticCascheName).then(cache => {
      console.log("fetching from service worker");
      return cache.match(fetchEvent.request).then(res => res || fetch(fetchEvent.request)
        .then(networkRes => {
          console.log("puting network response to cache");
          cache.put(fetchEvent.request, networkRes.clone());
          return networkRes;
        })
      ).catch(() => {
        if(fetchEvent.request.url.indexOf(".html") > -1 || fetchEvent.request.url === "https://github.com/Davion"){
          return caches.match("/todo-app-js-pwa/fallback.html");
        }
      })
    }).catch(err => console.log("issue opening cache on fetch", err))
  );
});