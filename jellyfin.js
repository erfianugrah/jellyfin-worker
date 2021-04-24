addEventListener('fetch', event => {
    return event.respondWith(handleRequest(event.request));
})

async function handleRequest(request) {

const newRequest = new URL(request.url)
const customCacheKey = newRequest.hostname + newRequest.pathname
const queryCacheKey = newRequest.hostname + newRequest.pathname + newRequest.searchParams

const cacheAssets = [
    {asset: 'video', key: customCacheKey, regex: /^.*\.(m4s|mp4|ts|avi|mpeg|mpg|mkv|bin|webm|vob|flv|m2ts|mts|3gp|m4v|wmv|qt)/, info: 0, ok: 31556952, redirects: 30, clientError: 10, serverError: 0 },
    {asset: 'image', key: queryCacheKey, regex: /^.*\.(jpeg|jpg|png|dng|tiff|webp|gif)/, info: 0, ok: 3600, redirects: 30, clientError: 10, serverError: 0 },
    {asset: 'frontEnd', key: queryCacheKey, regex: /^.*\.(css|js)/, info: 0, ok: 3600, redirects: 30, clientError: 10, serverError: 0 },
    {asset: 'audio', key: customCacheKey, regex: /^.*\.(flac|aac|mp3|alac|aiff|wav|ogg|aiff|opus|ape|wma|3gp)/, info: 0, ok: 31556952, redirects: 30, clientError: 10, serverError: 0 },
    {asset: 'directPlay', key: customCacheKey, regex: /^.*(\/Download|\/Audio)/, info: 0, ok: 31556952, redirects: 30, clientError: 10, serverError: 0 },
    {asset: 'manifest', key: customCacheKey, regex: /^.*\.(m3u8|mpd)/, info: 0, ok: 3, redirects: 2, clientError: 1, serverError: 0 }
]

const cacheAssets_match = cacheAssets.find( ({regex}) => newRequest.pathname.toLowerCase().match(regex))
const cache = cacheAssets_match ? cacheAssets_match : {}

const newResponse = await fetch(request,
        { cf:
            {
                cacheKey: cache.key,
                cacheEverything: true,
                cacheTtlByStatus: {
                    '100-199': cache.info,
                    '200-299': cache.ok,
                    '300-399': cache.redirects,
                    '400-499': cache.clientError,
                    '500-599': cache.serverError
                    },
            },
        
        })

const response = new Response(newResponse.body, newResponse)
response.headers.set('debug', JSON.stringify(cache))
return response
}