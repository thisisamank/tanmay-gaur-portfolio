// Service Worker for Image Caching
const CACHE_NAME = 'portfolio-images-v1'
const IMAGE_CACHE_NAME = 'portfolio-image-cache-v1'

// Cache images for 1 year
const CACHE_DURATION = 365 * 24 * 60 * 60 * 1000 // 1 year in milliseconds

self.addEventListener('install', (event) => {
    console.log('Service Worker installing...')
    self.skipWaiting()
})

self.addEventListener('activate', (event) => {
    console.log('Service Worker activating...')
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME && cacheName !== IMAGE_CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName)
                        return caches.delete(cacheName)
                    }
                })
            )
        })
    )
})

self.addEventListener('fetch', (event) => {
    // Only handle image requests
    if (event.request.destination === 'image') {
        const url = event.request.url
        const isNotionS3 = url.includes('prod-files-secure.s3.us-west-2.amazonaws.com')
        const isR2 = url.includes('r2.dev')

        event.respondWith(
            caches.open(IMAGE_CACHE_NAME).then((cache) => {
                return cache.match(event.request).then((response) => {
                    if (response) {
                        // Check if cache is still valid
                        const cacheTime = response.headers.get('sw-cache-time')
                        let cacheDuration = CACHE_DURATION

                        // Shorter cache for temporary URLs
                        if (isNotionS3) {
                            cacheDuration = 3600000 // 1 hour for Notion S3
                        } else if (isR2) {
                            cacheDuration = 86400000 // 1 day for R2
                        }

                        if (cacheTime && Date.now() - parseInt(cacheTime) < cacheDuration) {
                            return response
                        }
                    }

                    // Fetch from network and cache
                    const timeoutDuration = isNotionS3 ? 10000 : isR2 ? 15000 : 30000

                    return fetch(event.request, {
                        signal: AbortSignal.timeout(timeoutDuration)
                    }).then((networkResponse) => {
                        if (networkResponse.ok) {
                            const responseToCache = networkResponse.clone()
                            responseToCache.headers.set('sw-cache-time', Date.now().toString())
                            cache.put(event.request, responseToCache)
                        }
                        return networkResponse
                    }).catch((error) => {
                        console.log('Fetch failed, trying cache:', error)
                        // Return cached version if network fails
                        return cache.match(event.request)
                    })
                })
            })
        )
    }
})
