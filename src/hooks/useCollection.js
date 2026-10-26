import { useEffect, useState } from 'react'
import { fetchTable, isSupabaseConfigured } from '../lib/supabaseConfig.js'

/*
 * Loads a Supabase table for the public site.
 * status: 'disabled' (no Supabase keys) | 'loading' | 'ready' | 'error'
 * Changing refreshKey loads the table again.
 */
export function useCollection(table, refreshKey) {
    const [state, setState] = useState(() => ({
        status: isSupabaseConfigured ? 'loading' : 'disabled',
        items: [],
    }))

    useEffect(() => {
        if (!isSupabaseConfigured) return

        const controller = new AbortController()

        fetchTable(table, { signal: controller.signal })
            .then((items) => setState({ status: 'ready', items }))
            .catch((error) => {
                if (error.name === 'AbortError') return
                console.error(error)
                setState({ status: 'error', items: [] })
            })

        return () => controller.abort()
    }, [table, refreshKey])

    return state
}
