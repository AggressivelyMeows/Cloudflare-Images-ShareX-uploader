import { response } from 'cfw-easy-utils'

const CONFIG = {
    key: KEY,
    account_id: ACCOUNT_ID,
    account_token: ACCOUNT_TOKEN,
    thumbnail_variant: 'small',
    full_variant: 'public'
}

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
    const { pathname, host, searchParams } = new URL(request.url)

    // For importing with ShareX, we allow a key via the URL parameters
    var key = request.headers.get('Authorization') || searchParams.get('key')

    if (!key) {
        return response.json({
            success: false,
            error: 'Auth key is not set, please make sure to include the key in the Authorization header',
            code: 'NOT_AUTHORIZED'
        }, { status: 403 })
    }

    if (key.startsWith('Bearer')) {
        key = key.replace('Bearer ', '')
    }

    if (key != CONFIG.key) {
        return response.json({
            success: false,
            error: 'Auth key is incorrect',
            code: 'AUTH_KEY_INCORRECT'
        }, { status: 403 })
    }

    if (pathname.startsWith('/v1/upload/')) {
        const filename = pathname.replace('/v1/upload/', '')

        const formData = await request.formData()
        const file = formData.get('file')

        if (!file) {
            return response.json({
                success: false,
                error: 'You need to submit a image or file to upload using the "file" field name',
                code: 'FIELD_MISSING'
            }, { status: 400 })
        }

        const destination = `https://api.cloudflare.com/client/v4/accounts/${CONFIG.account_id}/images/v1`

        const data = new FormData()
        data.append('file', file, filename)

        const resp = await fetch(destination, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${CONFIG.account_token}`
            },
            body: data
        }).then(resp => resp.json())

        if (!resp.success) {
            return response.json({
                success: false,
                error: (resp.errors || ['Unknown error']).join(', '),
                code: 'CF_IMAGES_ERROR'
            }, { status: 400 })
        }

        var full_variant = ''
        var thumbnail_variant = ''

        resp.result.variants.forEach(img => {
            // this will allow the thumbnail and full variant names to be the same
            if (img.includes(CONFIG.full_variant)) {
                full_variant = img
            }

            if (img.includes(CONFIG.thumbnail_variant)) {
                thumbnail_variant = img
            }
        })

        return response.json({
            success: true,
            full_url: full_variant,
            thumbnail_url: thumbnail_variant
        })
    }

    return response.json({
        "Version": "0.1.2",
        "Name": "Cloudflare Images ShareX",
        "DestinationType": "ImageUploader",
        "RequestMethod": "POST",
        "RequestURL": `https://${host}/v1/upload/$filename$`,
        "Headers": {
            "Authorization": `Bearer ${key}`
        },
        "Body": "MultipartFormData",
        "FileFormName": "file",
        "URL": "$json:full_url$",
        "ThumbnailURL": "$json:thumbnail_url$",
        "ErrorMessage": "$json:error$"
    })
}
