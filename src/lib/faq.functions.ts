import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const FAQSchema = z.object({
  id: z.string().optional(),
  question: z.string(),
  answer: z.string(),
  sort_order: z.number().optional(),
});

export const listFaqs = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  const { data, error } = await supabaseAdmin
    .from("faqs")
    .select("*")
    .order("sort_order", { ascending: true });

  console.log("[FAQ] DATA:", data);
  console.log("[FAQ] ERROR:", error);

  if (error) throw new Error(error.message);

  return data ?? [];
});


export const createFaq = createServerFn({ method: "POST" })
  .validator((data: unknown) => FAQSchema.parse(data))

  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { error } = await supabaseAdmin.from("faqs").insert({
      question: data.question,

      answer: data.answer,

      sort_order: data.sort_order ?? 0,
    });

    console.log("[FAQ CREATE] ERROR:", error);

    if (error) throw new Error(error.message);

    return { success: true };
  });

export const deleteFaq = createServerFn({ method: "POST" })
  .validator((data: unknown) => z.object({ id: z.string() }).parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { error } = await supabaseAdmin.from("faqs").delete().eq("id", data.id);

    if (error) throw new Error(error.message);

    return { success: true };
  });
