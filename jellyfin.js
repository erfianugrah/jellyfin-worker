addEventListener('fetch', event => {
    return event.respondWith(handleRequest(event.request));
})

async function handleRequest(request) {

const newRequest = new URL(request.url)
let subRequest = new Request(request.headers)
const customCacheKey = `${newRequest.hostname}${newRequest.pathname}}`
const rangeCacheKey = `${newRequest.hostname}${newRequest.pathname}${subRequest.headers.get("Range")}`
const queryCacheKey = `${newRequest.hostname}${newRequest.pathname}${newRequest.search}`

const cacheAssets = [
    {asset: 'transcode', key: customCacheKey, regex: /(.*\.(m4s|ts|webm|m2ts|mts))/, info: 0, ok: 31556952, redirects: 30, clientError: 10, serverError: 0 },
    {asset: 'direct', key: rangeCacheKey, regex: /(.*\.(avi|mpeg|mpg|mkv|bin|webm|vob|flv|3gp|m4v|wmv|qt))/, info: 0, ok: 31556952, redirects: 30, clientError: 10, serverError: 0 },
    {asset: 'image', key: queryCacheKey, regex: /(.*\.(jpg|jpeg|png|bmp|pict|tif|tiff|webp|gif|heif|exif|bat|bpg|ppm|pgn|pbm|pnm))/, info: 0, ok: 3600, redirects: 30, clientError: 10, serverError: 0 },
    {asset: 'audio', key: customCacheKey, regex: /(.*\.(flac|aac|mp3|alac|aiff|wav|ogg|aiff|opus|ape|wma|3gp))/, info: 0, ok: 31556952, redirects: 30, clientError: 10, serverError: 0 }
    // {asset: 'manifest', key: customCacheKey, regex: /^.*\.(m3u8|mpd)/, info: 0, ok: 1, redirects: 2, clientError: 1, serverError: 0 }
]

const { asset, regex, ...cache } = cacheAssets.find( ({regex}) => newRequest.pathname.match(regex)) ?? {}

const newResponse = await fetch(request,
        { cf:
            {
                mirage: false,
                cacheKey: cache.key,
                cacheEverything: true,
                cacheTtlByStatus: {
                    '100-199': cache.info,
                    '200-299': cache.ok,
                    '300-399': cache.redirects,
                    '400-499': cache.clientError,
                    '500-599': cache.serverError
                    },
                cacheTags:[
                    "video"
                ]
            },
        
        })

const response = new Response(newResponse.body, newResponse)
response.headers.set('debug', JSON.stringify(cache))

const catchResponseError = response.ok || response.redirected ? response : await fetch(request)
return catchResponseError
}