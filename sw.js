const cacheName = "takin-shots-files";
const assets = [
  "/",
  "index.html",
  "wishlist.html",
  "css/custom.css",
  "js/main.js",
];

// escuchar el evento de instalacion

self.addEventListener("install", (event) => {
  console.log("SW. Se instalo");
  event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(assets)));
});

// escuchar el evento de activacion

self.addEventListener("activate", (event) => {
  console.log("SW. Se activo");
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((respuesta) => {
      if (respuesta) {
        return respuesta;
      }

      let requestToCache = event.request.clone();

      return fetch(requestToCache).then((res) => {
        // no hubo internet o error al buscar en el servidor
        if (!res || res.status !== 200) {
          return res;
        }
        // encontro lo que pediamos
        let respuestaCache = res.clone();
        caches.open(cacheName).then((cache) => {
          cache.put(requestToCache, respuestaCache);
        });
        return res;
      });
    })
  );
});
self.addEventListener("push", (event) => {
  let title = event.data.text();
  let options = {
    body: "New recipies!",
    icon: "icons/icon-192x192.png",
    // milisegundos
    vibrate: [500, 300, 500, 300, 500, 300],
    tag: 1,
    actions: [
      { action: 1, icon: "icons/icon-192x192.png", title: "Find new drinks" },
      { action: 2, icon: "icons/icon-192x192.png", title: "Not drinkin today" },
    ],
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  if (event.action == 1) {
    console.log("el usuario quiere encontrar nuevos tragos");
    clients.openWindow(
      "http://localhost/pwa-parcial-2-dwn3ap-poletto-matias/index.html"
    );
  } else if (event.action == 2) {
    console.log("el usuario no quiere tomar hoy");
  }
  event.notification.close();
});
