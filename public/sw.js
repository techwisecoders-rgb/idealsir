/* HAI SuperHero service worker: intentionally lightweight to avoid GET /sw.js 404. */
self.addEventListener("install", (event) => {
  self.skipWaiting();
});
self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});
self.addEventListener("fetch", (event) => {
  // Network-first: no offline cache is required for this portal.
  if (event.request.method !== "GET") return;
});
