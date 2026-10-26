/*
 * Shrinks photos in the browser before upload, so a 6 MB phone photo
 * becomes a ~200 KB WebP. Produces a full-size image and a thumbnail.
 */

const FULL_SIZE = 1600
const THUMB_SIZE = 640

async function loadBitmap(file) {
    if ('createImageBitmap' in window) {
        try {
            return await createImageBitmap(file, { imageOrientation: 'from-image' })
        } catch {
            // Fall through to <img> decoding below
        }
    }

    const url = URL.createObjectURL(file)

    try {
        const image = new Image()
        image.src = url
        await image.decode()
        return image
    } finally {
        URL.revokeObjectURL(url)
    }
}

function resize(source, maxSize, quality) {
    const scale = Math.min(1, maxSize / Math.max(source.width, source.height))
    const width = Math.round(source.width * scale)
    const height = Math.round(source.height * scale)

    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    canvas.getContext('2d').drawImage(source, 0, 0, width, height)

    return new Promise((resolve, reject) => {
        canvas.toBlob(
            (blob) => {
                if (!blob) {
                    reject(new Error('Could not process this image.'))
                    return
                }

                // Older Safari can't encode WebP and silently returns PNG — use JPEG instead
                if (blob.type !== 'image/webp') {
                    canvas.toBlob(resolve, 'image/jpeg', quality)
                    return
                }

                resolve(blob)
            },
            'image/webp',
            quality,
        )
    })
}

export async function prepareImage(file) {
    if (!file.type.startsWith('image/')) {
        throw new Error(`"${file.name}" is not an image.`)
    }

    let bitmap

    try {
        bitmap = await loadBitmap(file)
    } catch {
        throw new Error(`"${file.name}" can't be opened by this browser. Try a JPG, PNG or WebP.`)
    }

    const full = await resize(bitmap, FULL_SIZE, 0.85)
    const thumb = await resize(bitmap, THUMB_SIZE, 0.8)
    bitmap.close?.()

    return {
        full,
        thumb,
        extension: full.type === 'image/webp' ? 'webp' : 'jpg',
        previewUrl: URL.createObjectURL(thumb),
    }
}

export function imageFromClipboard(event) {
    const items = [...(event.clipboardData?.files ?? [])]
    return items.find((file) => file.type.startsWith('image/')) ?? null
}
