addEventListener('fetch', event => {
    return event.respondWith(handleRequest(event.request));
})

async function handleRequest(request) {

const newRequest = new URL(request.url)
const customCacheKey = newRequest.hostname + newRequest.pathname

const cacheAssets = [
    {asset: 'video', key: customCacheKey, regex: /^.*\.(m4s|mp4|ts|avi|mpeg|mpg|mkv|bin|webm|vob|flv|m2ts|mts|3gp|m4v|wmv|qt)/, info: -1, ok: 3, redirects: 3, clientError: 10, serverError: 0 },
    {asset: 'image', key: customCacheKey, regex: /^.*\.(jpeg|jpg|png|dng|tiff|webp|gif)/, info: -1, ok: 3, redirects: 30, clientError: 10, serverError: 0 },
    {asset: 'frontEnd', key: customCacheKey, regex: /^.*\.(css|js)/, info: -1, ok: 3, redirects: 30, clientError: 10, serverError: 0 },
    {asset: 'audio', key: customCacheKey, regex: /^.*\.(flac|aac|mp3|alac|aiff|wav|ogg|aiff|opus|ape|wma|3gp)/, info: -1, ok: 86400, redirects: 30, clientError: 10, serverError: 0 },
    {asset: 'directPlay', key: customCacheKey, regex: /^.*(\/Download|\/Audio)/, info: -1, ok: 3, redirects: 30, clientError: 10, serverError: 0 },
    {asset: 'manifest', key: customCacheKey, regex: /^.*\.(m3u8|mpd)/, info: -1, ok: 3, redirects: 30, clientError: 10, serverError: 0 }
]

/*
const video = /^.*\.(m4s|mp4|ts|avi|mpeg|mpg|mkv|bin|webm|vob|flv|m2ts|mts|3gp|m4v|wmv|qt)/
const image = /^.*\.(jpeg|jpg|png|dng|tiff|webp|gif)/
const frontEnd = /^.*\.(css|js)/
const audio = /^.*\.(flac|aac|mp3|alac|aiff|wav|ogg|aiff|opus|ape|wma|3gp)/
const directPlay = /^.*(\/Download|\/Audio)/
const manifest = /^.*\.(m3u8|mpd)/
*/

const cacheAssets_match = cacheAssets.find( ({regex}) => newRequest.pathname.toLowerCase().match(regex))
const cache = cacheAssets_match ? cacheAssets_match : ''
console.log(cacheAssets_match)
//console.log(cache)

return await fetch(request, 
        { cf: 
            { 
                cacheKey: cache.key, 
                cacheEverything: true, 
                cacheTtlByStatus: { 
                    '200-299': cache.ok, 
                    '300-399': cache.redirects, 
                    '400-499': cache.clientError, 
                    '500-599': cache.serverError 
                    },
            },
        
        })


/*
if (newRequest.pathname.match(video)) {
    return await fetch(request, 
        { cf: { cacheEverything: true, cacheTtlByStatus: { '200-399': 10, '300-399': 10, '400-499': 1, '500-599': 0 },},
    }) 
} else

if (newRequest.pathname.match(manifest)) {
    return await fetch(request, 
        { cf: {cacheKey: customCacheKey, cacheEverything: true, cacheTtlByStatus: { '200-299': 3, '300-399': 2, '400-499': 1, '500-599': 0 },},
    })
} else

if (newRequest.pathname.match(image)) {
    return await fetch(request, 
        { cf: {cacheKey: customCacheKey, cacheEverything: true, cacheTtlByStatus: { '200-299': 86400, '300-399': 5, '400-499': 1, '500-599': 0 },},
    })
} else

if (newRequest.pathname.match(frontEnd)) {
    return await fetch(request, 
        { cf: {cacheKey: customCacheKey, cacheEverything: true, cacheTtlByStatus: { '200-299': 3600, '300-399': 5, '400-499': 1, '500-599': 0 },},
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

*/
//return fetch(request)
}