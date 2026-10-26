/*
 * Lightweight Supabase access for the public site.
 * Reads go straight to the REST API with fetch, so visitors never
 * download the full supabase-js client (only the admin page does).
 */

export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL ?? ''
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY ?? ''

export const MEDIA_BUCKET = 'media'

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY)

export function publicImageUrl(path) {
    if (!path) return null
    return `${SUPABASE_URL}/storage/v1/object/public/${MEDIA_BUCKET}/${path}`
}

export async function fetchTable(table, { signal } = {}) {
    const url = `${SUPABASE_URL}/rest/v1/${table}?select=*&order=sort_order.asc,created_at.desc`

    const response = await fetch(url, {
        signal,
        headers: {
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
    })

    if (!response.ok) {
        throw new Error(`Failed to load ${table}: ${response.status}`)
    }

    return response.json()
}
