import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const SettingsSchema = z.object({
  id: z.string().optional(),
  company_name: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  whatsapp: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
  address: z.string().nullable().optional(),
  facebook: z.string().nullable().optional(),
  instagram: z.string().nullable().optional(),
  linkedin: z.string().nullable().optional(),
  youtube: z.string().nullable().optional(),
  hero_title: z.string().nullable().optional(),
  hero_subtitle: z.string().nullable().optional(),
});

export const getSettings = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  const { data, error } = await supabaseAdmin.from("settings").select("*").limit(1).single();

  if (error) throw new Error(error.message);

  return data;
});

export const updateSettings = createServerFn({ method: "POST" })
  .validator((data: unknown) => SettingsSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

   if (!data.id) {
  throw new Error("Settings ID missing");
}

const { error } = await supabaseAdmin
  .from("settings")
  .update({
    company_name: data.company_name,
    phone: data.phone,
    whatsapp: data.whatsapp,
    email: data.email,
    address: data.address,
    facebook: data.facebook,
    instagram: data.instagram,
    linkedin: data.linkedin,
    youtube: data.youtube,
    hero_title: data.hero_title,
    hero_subtitle: data.hero_subtitle,
  })
  .eq("id", data.id);

    if (error) throw new Error(error.message);

    return { success: true };
  });
