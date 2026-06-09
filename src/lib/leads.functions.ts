import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";

const LeadSchema = z.object({
  name: z.string().trim().min(2).max(80),
  mobile: z
    .string()
    .trim()
    .min(7)
    .max(20)
    .regex(/^[+0-9 \-()]+$/, "Invalid phone"),
  monthly_bill: z.string().trim().max(40).optional().nullable(),
  city: z.string().trim().max(80).optional().nullable(),
  source: z.enum(["widget", "hero", "survey", "contact"]).default("widget"),
});

export type LeadInput = z.infer<typeof LeadSchema>;

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => LeadSchema.parse(data))
  .handler(async ({ data }) => {
    console.log("LEAD RECEIVED:", data);
    let supabaseAdmin;

    try {
      console.log("BEFORE CREATE CLIENT");

      supabaseAdmin = createClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      );

      console.log("AFTER CREATE CLIENT");
    } catch (err) {
      console.error("CREATE CLIENT ERROR:", err);
      throw err;
    }

    console.log("DIRECT CLIENT CREATED");
    console.log("ABOUT TO INSERT INTO SUPABASE");
    console.log("TESTING SUPABASE CONNECTION");

    const test = await supabaseAdmin.from("leads").select("*").limit(1);

    console.log("TEST RESULT:", test);
    const result = await supabaseAdmin
      .from("leads")
      .insert({
        name: data.name,
        mobile: data.mobile,
        monthly_bill: data.monthly_bill ?? null,
        city: data.city ?? null,
        source: data.source,
      })
      .select();

    console.log("SUPABASE RESULT:", result);

    const { error } = result;
    console.log("SUPABASE ERROR:", error);
    if (error) {
      console.error("[leads] insert failed", error);
      throw new Error("Could not save your enquiry. Please try again.");
    }
    return { ok: true as const };
  });
