/* Illinois Engineering Jobs service worker.
   Pages (navigations and HTML documents): network-first so site
   updates reach returning visitors promptly, with the cached copy
   only as an offline fallback. Job data (data.json at the root and
   assets/data.json): network-first so the board stays fresh after
   each data update, with the last good copy as an offline fallback.
   Other static assets (manifest, icons): cache-first so the
   installed app opens fast and works offline. */
var CACHE = "iej-shell-v3";
var SHELL = [
  ".",
  "index.html",
  "manifest.webmanifest",
  "icon-192.png",
  "icon-512.png",
  "icon-maskable-192.png",
  "icon-maskable-512.png",
  "icon-monochrome-512.png",
  "apple-touch-icon.png"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE).then(function (cache) {
      return Promise.all(
        SHELL.map(function (url) {
          return cache.add(url).catch(function () {});
        })
      );
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.map(function (key) {
          if (key !== CACHE) return caches.delete(key);
        })
      );
    }).then(function () {
      return self.clients.claim();
    })
  );
});

function isDataRequest(url) {
  return url.pathname.endsWith("/data.json") || url.pathname.endsWith("data.json");
}

function isHtmlRequest(req, url) {
  if (req.mode === "navigate") return true;
  if (req.destination === "document") return true;
  var accept = req.headers.get("accept") || "";
  if (accept.indexOf("text/html") !== -1) return true;
  if (url.pathname.endsWith(".html") || url.pathname.endsWith("/")) return true;
  return false;
}

function networkFirst(req) {
  return fetch(req).then(function (res) {
    if (res && res.ok) {
      var copy = res.clone();
      caches.open(CACHE).then(function (cache) { cache.put(req, copy); });
    }
    return res;
  }).catch(function () {
    return caches.match(req, { ignoreSearch: true }).then(function (cached) {
      if (cached) return cached;
      if (req.mode === "navigate") {
        return caches.match("index.html", { ignoreSearch: true });
      }
      throw new Error("offline");
    });
  });
}

self.addEventListener("fetch", function (event) {
  var req = event.request;
  if (req.method !== "GET") return;
  var url;
  try { url = new URL(req.url); } catch (e) { return; }

  if (isDataRequest(url)) {
    /* Network-first for job data: always try the live file, fall
       back to the cached copy only when the network is unavailable. */
    event.respondWith(networkFirst(req));
    return;
  }

  if (isHtmlRequest(req, url)) {
    /* Network-first for pages: always try the live page so updates
       are seen promptly, fall back to cache only when offline. */
    event.respondWith(networkFirst(req));
    return;
  }

  /* Cache-first for the shell assets and everything else same-origin. */
  event.respondWith(
    caches.match(req, { ignoreSearch: true }).then(function (cached) {
      if (cached) return cached;
      return fetch(req).then(function (res) {
        if (res && res.ok && url.origin === self.location.origin) {
          var copy = res.clone();
          caches.open(CACHE).then(function (cache) { cache.put(req, copy); });
        }
        return res;
      });
    })
  );
});
