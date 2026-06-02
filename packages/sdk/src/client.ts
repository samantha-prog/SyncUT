/**
 * Cliente Centralizado de Supabase para Componentes del Lado del Cliente
 * Este es el punto único de conexión para todas las operaciones de BD
 * 
 * @usage
 * import { createSupabaseBrowserClient } from '@plataforma/sdk';
 * const supabase = createSupabaseBrowserClient();
 * const { data, error } = await supabase.from('profiles').select('*');
 */

import { createBrowserClient } from '@supabase/ssr';
import type { Database } from '@plataforma/types';

export const createSupabaseBrowserClient = () => {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
};

/**
 * Función auxiliar para inicializar auth en el cliente
 */
export const getSupabaseAuth = () => {
  const client = createSupabaseBrowserClient();
  return client.auth;
};

/**
 * Función auxiliar para queries de datos
 */
export const getSupabaseData = () => {
  const client = createSupabaseBrowserClient();
  return client;
};
