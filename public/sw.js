// Service Worker for Image and Video Caching
const CACHE_NAME = 'portfolio-media-v2'
const IMAGE_CACHE_NAME = 'portfolio-image-cache-v2'
const VIDEO_CACHE_NAME = 'portfolio-video-cache-v2'

// Cache media for 1 year
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
                    if (cacheName !== CACHE_NAME && cacheName !== IMAGE_CACHE_NAME && cacheName !== VIDEO_CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName)
                        return caches.delete(cacheName)
                    }
                })
            )
        })
    )
})

self.addEventListener('fetch', (event) => {
    const url = event.request.url
    const isNotionS3 = url.includes('prod-files-secure.s3.us-west-2.amazonaws.com')
    const isR2 = url.includes('r2.dev')
    
    // Handle image requests
    if (event.request.destination === 'image') {
        event.respondWith(
            caches.open(IMAGE_CACHE_NAME).then((cache) => {
                return cache.match(event.request).then((response) => {
                    if (response) {
                        const cacheTime = response.headers.get('sw-cache-time')
                        let cacheDuration = CACHE_DURATION

                        if (isNotionS3) {
                            cacheDuration = 3600000 // 1 hour for Notion S3
                        } else if (isR2) {
                            cacheDuration = CACHE_DURATION // 1 year for R2
                        }

                        if (cacheTime && Date.now() - parseInt(cacheTime) < cacheDuration) {
                            return response
                        }
                    }

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
                        console.log('Fetch failed for image, trying cache:', error)
                        return cache.match(event.request)
                    })
                })
            })
        )
    }
    // Handle video requests
    else if (event.request.destination === 'video' || url.match(/\.(mp4|webm|mov)$/i)) {
        event.respondWith(
            caches.open(VIDEO_CACHE_NAME).then((cache) => {
                return cache.match(event.request).then((response) => {
                    if (response) {
                        console.log('Serving video from cache:', url)
                        return response
                    }

                    console.log('Fetching video from network:', url)
                    return fetch(event.request).then((networkResponse) => {
                        if (networkResponse.ok && networkResponse.status === 200) {
                            // Only cache complete responses
                            const responseToCache = networkResponse.clone()
                            cache.put(event.request, responseToCache).then(() => {
                                console.log('Video cached successfully:', url)
                            }).catch(err => {
                                console.log('Failed to cache video:', err)
                            })
                        }
                        return networkResponse
                    }).catch((error) => {
                        console.log('Fetch failed for video, trying cache:', error)
                        return cache.match(event.request)
                    })
                })
            })
        )
    }
})
