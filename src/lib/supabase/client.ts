import { createBrowserClient } from "@supabase/ssr";

export const isSupabaseConfigured = (): boolean => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) return false;
  if (url.includes("your-project") || anonKey.includes("your-supabase-anon-key")) return false;
  return true;
};

let browserClient: ReturnType<typeof createBrowserClient> | null = null;

export const createClient = () => {
  if (!isSupabaseConfigured()) {
    return null;
  }

  if (typeof window !== "undefined" && browserClient) {
    return browserClient;
  }

  const client = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  if (typeof window !== "undefined") {
    browserClient = client;
  }

  return client;
};
