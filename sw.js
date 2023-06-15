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
