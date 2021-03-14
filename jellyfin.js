addEventListener('fetch', event => {
    return event.respondWith(handleRequest(event.request));
})

async function handleRequest(request) {

const newRequest = new URL(request.url)
let customCacheKey = newRequest.hostname + newRequest.pathname

const video = /^.*\.(m4s|mp4|ts|avi|mpeg|mpg|mkv|bin|webm|vob|flv|m2ts|mts|3gp|m4v|wmv|qt)/
const image = /^.*\.(jpeg|jpg|png|dng|tiff|webp|gif)/
const frontEnd = /^.*\.(css|js)/
const audio = /^.*\.(flac|aac|mp3|alac|aiff|wav|ogg|aiff|opus|ape|wma|3gp)/
const directPlay = /^.*(\/Download|\/Audio)/
const manifest = /^.*\.(m3u8|mpd)/


if (newRequest.pathname.match(video)) {
    return await fetch(request, 
        { cf: {cacheKey: customCacheKey, cacheEverything: true, cacheTtlByStatus: { '200-299': 86400, '300-399': 5, '400-499': 1, '500-599': 0 },},
    }) 
} else

if (newRequest.pathname.match(manifest)) {
    return await fetch(request, 
        { cf: {cacheKey: customCacheKey, cacheEverything: true, cacheTtlByStatus: { '200-299': 86400, '300-399': 5, '400-499': 1, '500-599': 0 },},
    })
} else

if (newRequest.pathname.match(image)) {
    return await fetch(request, 
        { cf: {cacheKey: customCacheKey, cacheEverything: true, cacheTtlByStatus: { '200-299': 86400, '300-399': 5, '400-499': 1, '500-599': 0 },},
    })
} else

if (newRequest.pathname.match(frontEnd)) {
    return await fetch(request, 
        { cf: {cacheKey: customCacheKey, cacheEverything: true, cacheTtlByStatus: { '200-299': 86400, '300-399': 5, '400-499': 1, '500-599': 0 },},
    })
} else

if (newRequest.pathname.match(audio)) {
    return await fetch(request, 
        { cf: {cacheKey: customCacheKey, cacheEverything: true, cacheTtlByStatus: { '200-299': 86400, '300-399': 5, '400-499': 1, '500-599': 0 },},
    })
} else

if (newRequest.pathname.match(directPlay)) {
    return await fetch(request, 
        { cf: {cacheKey: customCacheKey, cacheEverything: true, cacheTtlByStatus: { '200-299': 86400, '300-399': 5, '400-499': 1, '500-599': 0 },},
    })
} else

return fetch(request)

}

