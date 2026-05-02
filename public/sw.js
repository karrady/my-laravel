// YAS TaxiCentrale — Service Worker
// Strategy: app-shell network-first for HTML, cache-first for static assets.

const VERSION = "yas-v1";
const SHELL_CACHE = `${VERSION}-shell`;
const ASSET_CACHE = `${VERSION}-assets`;

const SHELL_URLS = [
    "/",
    "/manifest.webmanifest",
    "/favicon.svg",
    "/pwa-icon.svg",
    "/pwa-icon-maskable.svg",
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(SHELL_CACHE).then((cache) => cache.addAll(SHELL_URLS)).catch(() => {}),
    );
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys
                    .filter((k) => !k.startsWith(VERSION))
                    .map((k) => caches.delete(k)),
            ),
        ),
    );
    self.clients.claim();
});

self.addEventListener("fetch", (event) => {
    const { request } = event;

    // Only handle GET, same-origin (skip API + admin so dynamic stuff isn't cached)
    if (request.method !== "GET") return;
    const url = new URL(request.url);
    if (url.origin !== self.location.origin) return;
    if (url.pathname.startsWith("/api/")) return;
    if (url.pathname.startsWith("/admin")) return;

    const isHTML = request.mode === "navigate" || request.headers.get("accept")?.includes("text/html");

    if (isHTML) {
        // Network-first for HTML: fresh content, fallback to cached shell when offline.
        event.respondWith(
            fetch(request)
                .then((res) => {
                    const copy = res.clone();
                    caches.open(SHELL_CACHE).then((c) => c.put(request, copy)).catch(() => {});
                    return res;
                })
                .catch(() => caches.match(request).then((r) => r || caches.match("/"))),
        );
        return;
    }

    // Cache-first for static assets (JS, CSS, images, fonts).
    event.respondWith(
        caches.match(request).then((cached) => {
            if (cached) return cached;
            return fetch(request).then((res) => {
                if (!res || res.status !== 200 || res.type === "opaque") return res;
                const copy = res.clone();
                caches.open(ASSET_CACHE).then((c) => c.put(request, copy)).catch(() => {});
                return res;
            });
        }),
    );
});
