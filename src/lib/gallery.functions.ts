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

export const listGalleryImages = createServerFn({ method: "GET" })
  .handler(async (): Promise<GalleryItem[]> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("gallery_images")
      .select("id, category, storage_path, caption, sort_order, created_at")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (error) {
      console.error("[gallery] list failed", error);
      return [];
    }
    if (!data || data.length === 0) return [];
    const items: GalleryItem[] = [];
    for (const row of data) {
      const { data: signed } = await supabaseAdmin.storage
        .from("project-gallery")
        .createSignedUrl(row.storage_path, SIGNED_TTL);
      if (signed?.signedUrl) {
        items.push({
          id: row.id,
          category: row.category as GalleryItem["category"],
          url: signed.signedUrl,
          caption: row.caption,
        });
      }
    }
    return items;
  });

export const deleteGalleryImage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => z.object({ id: z.string().uuid() }).parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row } = await supabaseAdmin
      .from("gallery_images")
      .select("storage_path")
      .eq("id", data.id)
      .maybeSingle();
    if (row?.storage_path) {
      await supabaseAdmin.storage.from("project-gallery").remove([row.storage_path]);
    }
    await supabaseAdmin.from("gallery_images").delete().eq("id", data.id);
    return { ok: true as const };
  });

export const registerGalleryImage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z.object({
      category: Category,
      storage_path: z.string().min(1),
      caption: z.string().max(200).optional(),
    }).parse(data),
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("gallery_images").insert({
      category: data.category,
      storage_path: data.storage_path,
      caption: data.caption ?? null,
    });
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });
