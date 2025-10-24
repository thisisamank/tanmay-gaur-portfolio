// Simplified Service Worker for Performance
const CACHE_NAME = 'portfolio-media-v3'
const IMAGE_CACHE_NAME = 'portfolio-image-cache-v3'
const VIDEO_CACHE_NAME = 'portfolio-video-cache-v3'

// Cache media for 1 year
const CACHE_DURATION = 365 * 24 * 60 * 60 * 1000

self.addEventListener('install', (event) => {
    console.log('[SW] Installing...')
    self.skipWaiting()
})

self.addEventListener('activate', (event) => {
    console.log('[SW] Activating...')
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheName.includes('v3')) {
                        console.log('[SW] Deleting old cache:', cacheName)
                        return caches.delete(cacheName)
                    }
                })
            )
        }).then(() => clients.claim())
    )
})

self.addEventListener('fetch', (event) => {
    const url = event.request.url
    const isR2 = url.includes('r2.dev')
    
    // Skip service worker for favicon and non-media requests
    if (url.includes('favicon') || url.includes('localhost') && !isR2) {
        return
    }
    
    // Only handle R2 images and videos for performance
    if (event.request.destination === 'image' && isR2) {
        event.respondWith(
            caches.match(event.request).then((cachedResponse) => {
                if (cachedResponse) {
                    return cachedResponse
                }
                
                return fetch(event.request).then((networkResponse) => {
                    if (networkResponse.ok) {
                        const cache = caches.open(IMAGE_CACHE_NAME)
                        cache.then(c => c.put(event.request, networkResponse.clone()))
                    }
                    return networkResponse
                }).catch(() => {
                    return new Response('', { status: 503 })
                })
            })
        )
    }
    // Handle video requests - cache but don't block
    else if ((event.request.destination === 'video' || url.match(/\.(mp4|webm)$/i)) && isR2) {
        event.respondWith(
            fetch(event.request).then((networkResponse) => {
                if (networkResponse.ok && networkResponse.status === 200) {
                    const cache = caches.open(VIDEO_CACHE_NAME)
                    cache.then(c => {
                        c.put(event.request, networkResponse.clone()).catch(() => {
                            // Silently fail video caching to avoid blocking
                        })
                    })
                }
                return networkResponse
            }).catch(() => {
                return caches.match(event.request).then(cachedResponse => {
                    return cachedResponse || new Response('', { status: 503 })
                })
            })
        )
    }
})
