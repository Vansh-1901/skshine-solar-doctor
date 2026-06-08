import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const LeadSchema = z.object({
  name: z.string().trim().min(2).max(80),
  mobile: z.string().trim().min(7).max(20).regex(/^[+0-9 \-()]+$/, "Invalid phone"),
  monthly_bill: z.string().trim().max(40).optional().nullable(),
  city: z.string().trim().max(80).optional().nullable(),
  source: z.enum(["widget", "hero", "survey", "contact"]).default("widget"),
});

export type LeadInput = z.infer<typeof LeadSchema>;

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => LeadSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("leads").insert({
      name: data.name,
      mobile: data.mobile,
      monthly_bill: data.monthly_bill ?? null,
      city: data.city ?? null,
      source: data.source,
    });
    if (error) {
      console.error("[leads] insert failed", error);
      throw new Error("Could not save your enquiry. Please try again.");
    }
    return { ok: true as const };
  });
