import { supabase } from '../lib/supabaseClient.js'
import { MEDIA_BUCKET } from '../lib/supabaseConfig.js'

/*
 * All admin reads/writes. Row Level Security in Supabase makes sure
 * only the admin account can change anything.
 */

const unwrap = ({ data, error }) => {
    if (error) throw new Error(error.message)
    return data
}

export async function listItems(table) {
    return unwrap(
        await supabase
            .from(table)
            .select('*')
            .order('sort_order', { ascending: true })
            .order('created_at', { ascending: false }),
    )
}

export async function uploadImage(table, prepared) {
    const id = crypto.randomUUID()
    const imagePath = `${table}/${id}.${prepared.extension}`
    const thumbPath = `${table}/${id}-thumb.${prepared.extension}`
    const options = { contentType: prepared.full.type, cacheControl: '31536000', upsert: false }

    unwrap(await supabase.storage.from(MEDIA_BUCKET).upload(imagePath, prepared.full, options))
    unwrap(await supabase.storage.from(MEDIA_BUCKET).upload(thumbPath, prepared.thumb, options))

    return { image_path: imagePath, thumb_path: thumbPath }
}

export async function removeImages(...paths) {
    const existing = paths.filter(Boolean)
    if (existing.length === 0) return
    unwrap(await supabase.storage.from(MEDIA_BUCKET).remove(existing))
}

export async function createItem(table, values, sortOrder) {
    return unwrap(
        await supabase
            .from(table)
            .insert({ ...values, sort_order: sortOrder })
            .select()
            .single(),
    )
}

export async function updateItem(table, id, values) {
    return unwrap(
        await supabase
            .from(table)
            .update(values)
            .eq('id', id)
            .select()
            .single(),
    )
}

export async function deleteItem(table, item) {
    unwrap(await supabase.from(table).delete().eq('id', item.id))
    await removeImages(item.image_path, item.thumb_path)
}

export async function swapOrder(table, first, second) {
    // Distinct values even if both had the same sort_order
    const a = first.sort_order === second.sort_order ? second.sort_order - 1 : second.sort_order
    const b = first.sort_order

    await updateItem(table, first.id, { sort_order: a })
    await updateItem(table, second.id, { sort_order: b })
}
