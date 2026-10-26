import { createClient } from '@supabase/supabase-js'
import { SUPABASE_URL, SUPABASE_ANON_KEY, isSupabaseConfigured } from './supabaseConfig.js'

// Full client with auth + storage — imported only by the admin page
export const supabase = isSupabaseConfigured
    ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : null
