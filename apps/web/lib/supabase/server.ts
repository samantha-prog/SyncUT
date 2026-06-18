import "server-only";

import { createServerClient } from "@supabase/ssr";
import type { Database } from "@plataforma/types";
import { cookies } from "next/headers";

import { getSupabasePublicConfig } from "./config";

export async function createSupabaseServerClient() {
  const cookieStore = await cookies();
  const { url, anonKey } = getSupabasePublicConfig();

  return createServerClient<Database>(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Server Components cannot always write cookies. proxy.ts refreshes
          // the session and applies any changed cookies to the response.
        }
      },
    },
  });
}
