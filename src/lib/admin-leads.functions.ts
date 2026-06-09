import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const listLeads = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  const { data, error } = await supabaseAdmin
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[leads] list failed", error);
    throw new Error(error.message);
  }

  return data ?? [];
});

export const updateLeadStatus = createServerFn({ method: "POST" })
  .validator((data: unknown) =>
    z.object({ id: z.string(), status: z.string() }).parse(data)
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { error } = await supabaseAdmin
      .from("leads")
      .update({ status: data.status })
      .eq("id", data.id);

    if (error) throw new Error(error.message);

    return { ok: true as const };
  });

export const deleteLead = createServerFn({ method: "POST" })
  .validator((data: unknown) =>
    z.object({ id: z.string() }).parse(data)
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { error } = await supabaseAdmin
      .from("leads")
      .delete()
      .eq("id", data.id);

    if (error) throw new Error(error.message);

    return { ok: true as const };
  });

export const getDashboardStats = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  const { data: leads, error: leadsError } = await supabaseAdmin
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (leadsError) throw new Error(leadsError.message);

  const { count: galleryCount, error: galleryError } = await supabaseAdmin
    .from("gallery")
    .select("*", { count: "exact", head: true });

  if (galleryError) throw new Error(galleryError.message);

  const totalLeads = leads?.length ?? 0;
  const newLeads = leads?.filter((l: any) => l.status === "new").length ?? 0;
  const contactedLeads = leads?.filter((l: any) => l.status === "contacted").length ?? 0;
  const qualifiedLeads = leads?.filter((l: any) => l.status === "qualified").length ?? 0;
  const convertedLeads = leads?.filter((l: any) => l.status === "converted").length ?? 0;

  return {
    totalLeads,
    newLeads,
    contactedLeads,
    qualifiedLeads,
    convertedLeads,
    galleryCount: galleryCount ?? 0,
    recentLeads: (leads ?? []).slice(0, 5),
  };
});
