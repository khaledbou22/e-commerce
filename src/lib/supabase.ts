import { createClient, SupabaseClient } from "@supabase/supabase-js";

let supabaseInstance: SupabaseClient | null = null;

/** الحصول على عميل Supabase (تهيئة مؤجّلة لتجنب أخطاء البناء) */
export function getSupabase(): SupabaseClient {
  if (!supabaseInstance) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !key || url === "YOUR_SUPABASE_URL") {
      throw new Error(
        "يرجى إعداد متغيرات Supabase في ملف .env.local"
      );
    }

    supabaseInstance = createClient(url, key);
  }

  return supabaseInstance;
}
