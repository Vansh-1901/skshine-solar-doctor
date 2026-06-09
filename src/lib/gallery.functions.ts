import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const Category = z.enum(["residential", "commercial", "industrial"]);

export type GalleryItem = {
  id: string;
  category: "residential" | "commercial" | "industrial";
  url: string;
  caption: string | null;
};

const SIGNED_TTL = 60 * 60; // 1 hour

export const listGalleryImages = createServerFn({ method: "GET" }).handler(
  async (): Promise<GalleryItem[]> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("gallery")
      .select("id, title, category, image_url, created_at")
      .order("created_at", { ascending: false });
    if (error) {
      console.error("[gallery] list failed", error);
      return [];
    }
    if (!data || data.length === 0) return [];
    const items: GalleryItem[] = [];
    for (const row of data) {
      if (!row.image_url || !row.category) continue;

      items.push({
        id: row.id,
        category: row.category as GalleryItem["category"],
        url: row.image_url,
        caption: row.title,
      });
    }
    return items;
  },
);

export const deleteGalleryImage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => z.object({ id: z.string().uuid() }).parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row } = await supabaseAdmin
      .from("gallery")
      .select("image_url")
      .eq("id", data.id)
      .maybeSingle();
    await supabaseAdmin.from("gallery").delete().eq("id", data.id);
    return { ok: true as const };
  });

export const registerGalleryImage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z
      .object({
        category: Category,
        image_url: z.string().min(1),
        title: z.string().max(200).optional(),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("gallery").insert({
      category: data.category,
      image_url: data.image_url,
      title: data.title ?? null,
    });
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });
