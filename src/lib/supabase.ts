import { createClient, SupabaseClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let _client: SupabaseClient | null = null;

/**
 * Cliente de Supabase. Solo falla al llamarlo si faltan variables en .env.
 * Crea un archivo .env en la raíz (copia .env.example) con VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY.
 */
export function getSupabase(): SupabaseClient {
  if (!url || !anonKey) {
    throw new Error(
      'Faltan VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY. Crea un archivo .env en la raíz (copia desde .env.example).'
    );
  }
  if (!_client) _client = createClient(url, anonKey);
  return _client;
}
