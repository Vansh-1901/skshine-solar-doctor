import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Loader2, Trash2, Upload, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { listGalleryImages, registerGalleryImage, deleteGalleryImage } from "@/lib/gallery.functions";

export const Route = createFileRoute("/_authenticated/admin/gallery")({
  head: () => ({ meta: [{ title: "Admin · Gallery | SK Shine" }, { name: "robots", content: "noindex" }] }),
  component: AdminGallery,
});

function AdminGallery() {
  const nav = useNavigate();
  const qc = useQueryClient();
  const list = useServerFn(listGalleryImages);
  const register = useServerFn(registerGalleryImage);
  const remove = useServerFn(deleteGalleryImage);

  const { data = [], isLoading, refetch } = useQuery({ queryKey: ["gallery"], queryFn: () => list() });
  const [category, setCategory] = useState<"residential" | "commercial" | "industrial">("residential");
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;
    setUploading(true); setErr(null);
    try {
      for (const file of files) {
        const ext = file.name.split(".").pop() || "jpg";
        const path = `${category}/${crypto.randomUUID()}.${ext}`;
        const { error: upErr } = await supabase.storage.from("project-gallery").upload(path, file, {
          contentType: file.type,
          upsert: false,
        });
        if (upErr) throw upErr;
        await register({ data: { category, storage_path: path, caption: file.name.replace(/\.[^.]+$/, "") } });
      }
      await refetch();
      qc.invalidateQueries({ queryKey: ["gallery"] });
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  async function onDelete(id: string) {
    if (!confirm("Delete this image?")) return;
    await remove({ data: { id } });
    await refetch();
    qc.invalidateQueries({ queryKey: ["gallery"] });
  }

  async function signOut() {
    await supabase.auth.signOut();
    nav({ to: "/auth" });
  }

  return (
    <div className="pt-28 pb-20 px-4 min-h-screen bg-secondary">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs uppercase tracking-widest text-accent font-semibold">Admin Panel</div>
            <h1 className="font-display text-3xl font-bold">Project Gallery</h1>
            <p className="text-sm text-muted-foreground mt-1">Upload new project photos — they appear instantly on the website.</p>
          </div>
          <button onClick={signOut} className="px-4 py-2 rounded-full border border-border bg-card text-sm inline-flex items-center gap-2">
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>

        <div className="bg-card rounded-3xl border border-border shadow-soft p-6 mb-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-semibold">Category:</span>
            {(["residential", "commercial", "industrial"] as const).map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold capitalize ${
                  category === c ? "gradient-primary text-primary-foreground" : "bg-secondary text-foreground/70"
                }`}
              >{c}</button>
            ))}
            <label className="ml-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full gradient-primary text-primary-foreground font-semibold cursor-pointer shadow-soft hover:shadow-glow transition-shadow">
              {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
              Upload Photos
              <input type="file" accept="image/*" multiple className="hidden" onChange={onUpload} disabled={uploading} />
            </label>
          </div>
          {err && <p className="mt-3 text-sm text-destructive">{err}</p>}
        </div>

        {isLoading ? (
          <div className="text-center py-20 text-muted-foreground"><Loader2 className="h-6 w-6 animate-spin mx-auto" /></div>
        ) : data.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground text-sm">No uploaded photos yet. The website also shows seed photos until you upload your own.</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.map((g) => (
              <div key={g.id} className="group relative rounded-2xl overflow-hidden bg-card border border-border shadow-soft">
                <img src={g.url} alt={g.caption ?? ""} loading="lazy" className="w-full aspect-square object-cover" />
                <div className="absolute top-2 left-2 inline-flex px-2 py-0.5 rounded-full bg-accent text-accent-foreground text-[10px] uppercase font-semibold">{g.category}</div>
                <button
                  onClick={() => onDelete(g.id)}
                  aria-label="Delete"
                  className="absolute top-2 right-2 h-9 w-9 rounded-full bg-destructive text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center justify-center"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                {g.caption && <div className="p-3 text-xs truncate">{g.caption}</div>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
