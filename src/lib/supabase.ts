import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

let _client: SupabaseClient | null = null;

export function isSupabaseConfigured(): boolean {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

export const supabase: SupabaseClient = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase is not configured');
    }
    if (!_client) {
      _client = createClient(supabaseUrl, supabaseAnonKey);
    }
    return (_client as unknown as Record<string | symbol, unknown>)[prop];
  },
});
