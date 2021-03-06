async function handleRequest(request) {

let newRequest = new URL(request.url)
let cacheRequest = newRequest.pathname

const media = new Map ([
    ['video', /^.*\.(m4s|mp4|ts|avi|mpeg|mpg|mkv|bin|webm|vob|flv|m2ts|mts|3gp|m4v|wmv|qt)/],
    ['image', /^.*\.(jpeg|jpg|png|dng|tiff|webp|gif)/],
    ['frontEnd', /^.*\.(css|js)/],
    ['audio', /^.*\.(flac|aac|mp3|alac|aiff|wav|ogg|aiff|opus|ape|wma|3gp)/],
    ['directPlay', /^.*(\/Download|\/Audio|\/Video)/],
    ['manifest', /^.*\.(m3u8|mpd)/]
])

    if (cacheRequest.match(media.get('video')))
        return await fetch(newRequest, { cf: {cacheEverything: true, cacheTtlByStatus: { '200-299': 86400, '400-499': 5, '500-599': 1 }},
        })
    if (cacheRequest.match(media.get('image')))
        return await fetch(newRequest, { cf: {cacheEverything: true, cacheTtlByStatus: { '200-299': 86400, '400-499': 5, '500-599': 1 }},
        })
    if (cacheRequest.match(media.get('frontEnd')))
        return await fetch(newRequest, { cf: {cacheEverything: true, cacheTtlByStatus: { '200-299': 3600, '400-499': 5, '500-599': 1 }},
        })
    if (cacheRequest.match(media.get('audio')))
        return await fetch(newRequest, { cf: {cacheEverything: true, cacheTtlByStatus: { '200-299': 86400, '400-499': 5, '500-599': 1 }},
        })
    if (cacheRequest.match(media.get('directPlay')))
        return await fetch(newRequest, { cf: {cacheEverything: true, cacheTtlByStatus: { '200-299': 86400, '400-499': 5, '500-599': 1 }},
        })
    if (cacheRequest.match(media.get('manifest')))
        return await fetch(newRequest, { cf: {cacheEverything: true, cacheTtlByStatus: { '200-299': 1, '400-499': 1, '500-599': 1 }},
        })
    return fetch(request)
}

addEventListener('fetch', event => {
    return event.respondWith(handleRequest(event.request))
})