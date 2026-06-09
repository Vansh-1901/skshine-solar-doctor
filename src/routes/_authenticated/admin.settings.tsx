import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState, useEffect } from "react";
import { Loader2, Save } from "lucide-react";

import { getSettings, updateSettings } from "@/lib/settings.functions";

export const Route = createFileRoute("/_authenticated/admin/settings")({
  component: AdminSettings,
});

function AdminSettings() {
  const getSettingsFn = useServerFn(getSettings);
  const updateSettingsFn = useServerFn(updateSettings);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["settings"],
    queryFn: () => getSettingsFn(),
  });

  const [form, setForm] = useState<any>({});

  useEffect(() => {
    if (data) {
      setForm(data);
    }
  }, [data]);

  async function handleSave() {
    await updateSettingsFn({ data: form });
    alert("Settings saved successfully");
    refetch();
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 px-4 min-h-screen bg-secondary">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Website Settings</h1>

        <div className="bg-card border border-border rounded-3xl p-8 shadow-soft space-y-6">
          <input
            className="w-full border rounded-xl px-4 py-3"
            placeholder="Email"
            value={form.email ?? ""}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <textarea
            className="w-full border rounded-xl px-4 py-3"
            rows={3}
            placeholder="Address"
            value={form.address ?? ""}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />

          <input
            className="w-full border rounded-xl px-4 py-3"
            placeholder="Facebook URL"
            value={form.facebook ?? ""}
            onChange={(e) => setForm({ ...form, facebook: e.target.value })}
          />

          <input
            className="w-full border rounded-xl px-4 py-3"
            placeholder="Instagram URL"
            value={form.instagram ?? ""}
            onChange={(e) => setForm({ ...form, instagram: e.target.value })}
          />

          <input
            className="w-full border rounded-xl px-4 py-3"
            placeholder="LinkedIn URL"
            value={form.linkedin ?? ""}
            onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
          />

          <input
            className="w-full border rounded-xl px-4 py-3"
            placeholder="YouTube URL"
            value={form.youtube ?? ""}
            onChange={(e) => setForm({ ...form, youtube: e.target.value })}
          />

          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-primary text-primary-foreground font-semibold"
          >
            <Save className="h-4 w-4" />
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
