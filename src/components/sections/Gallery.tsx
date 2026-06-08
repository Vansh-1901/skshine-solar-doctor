import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { X, ZoomIn } from "lucide-react";
import { SectionTitle } from "../SectionTitle";
import { listGalleryImages, type GalleryItem } from "@/lib/gallery.functions";

import r1 from "@/assets/gallery-res-1.jpg";
import r2 from "@/assets/gallery-res-2.jpg";
import r3 from "@/assets/gallery-res-3.jpg";
import c1 from "@/assets/gallery-com-1.jpg";
import c2 from "@/assets/gallery-com-2.jpg";
import c3 from "@/assets/gallery-com-3.jpg";
import i1 from "@/assets/gallery-ind-1.jpg";
import i2 from "@/assets/gallery-ind-2.jpg";
import i3 from "@/assets/gallery-ind-3.jpg";

const SEED: GalleryItem[] = [
  { id: "s-r-1", category: "residential", url: r1, caption: "5kW On-Grid · Hyderabad Villa" },
  { id: "s-r-2", category: "residential", url: r2, caption: "8kW Hybrid · Bengaluru" },
  { id: "s-r-3", category: "residential", url: r3, caption: "3kW On-Grid · Pune Rowhouse" },
  { id: "s-c-1", category: "commercial", url: c1, caption: "120kW Commercial · Mumbai" },
  { id: "s-c-2", category: "commercial", url: c2, caption: "200kW Mall + Carport" },
  { id: "s-c-3", category: "commercial", url: c3, caption: "60kW Hotel Rooftop" },
  { id: "s-i-1", category: "industrial", url: i1, caption: "850kW Industrial Rooftop" },
  { id: "s-i-2", category: "industrial", url: i2, caption: "1.2MW Warehouse Complex" },
  { id: "s-i-3", category: "industrial", url: i3, caption: "Ground-Mount Solar Farm" },
];

const TABS = ["all", "residential", "commercial", "industrial"] as const;

export function GallerySection() {
  const list = useServerFn(listGalleryImages);
  const { data: cloud = [] } = useQuery({
    queryKey: ["gallery"],
    queryFn: () => list(),
    staleTime: 5 * 60_000,
  });

  const all = [...cloud, ...SEED];
  const [tab, setTab] = useState<typeof TABS[number]>("all");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  const filtered = tab === "all" ? all : all.filter((x) => x.category === tab);

  return (
    <section id="projects" className="py-24 lg:py-32 bg-secondary">
      <div className="container mx-auto px-4 max-w-7xl">
        <SectionTitle
          eyebrow="Project Gallery"
          title={<>Some Of Our <span className="text-gradient">Recent Installations</span></>}
          description="Residential, commercial and industrial projects delivered across India — every one inspected, certified and saving money."
        />

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-full text-sm font-semibold capitalize transition-all ${
                tab === t
                  ? "gradient-primary text-primary-foreground shadow-soft"
                  : "bg-card border border-border text-foreground/70 hover:text-primary"
              }`}
            >
              {t === "all" ? "All Projects" : `${t} Projects`}
            </button>
          ))}
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
          {filtered.map((g, i) => (
            <motion.button
              key={g.id}
              onClick={() => setLightbox(g)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="group break-inside-avoid mb-5 block w-full rounded-2xl overflow-hidden bg-card shadow-soft hover:shadow-elegant transition-shadow text-left"
            >
              <div className="relative overflow-hidden">
                <img
                  src={g.url}
                  alt={g.caption ?? `${g.category} solar project`}
                  loading="lazy"
                  className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-3 right-3 h-9 w-9 rounded-full glass opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center justify-center">
                  <ZoomIn className="h-4 w-4 text-foreground" />
                </div>
                <div className="absolute bottom-3 left-3 inline-flex px-2.5 py-0.5 rounded-full bg-accent text-accent-foreground text-[10px] uppercase font-semibold">
                  {g.category}
                </div>
              </div>
              {g.caption && (
                <div className="p-4 text-sm font-medium text-foreground">{g.caption}</div>
              )}
            </motion.button>
          ))}
        </div>

        <AnimatePresence>
          {lightbox && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setLightbox(null)}
              className="fixed inset-0 z-[60] bg-black/85 backdrop-blur p-4 flex items-center justify-center"
            >
              <motion.img
                initial={{ scale: 0.92 }} animate={{ scale: 1 }} exit={{ scale: 0.92 }}
                src={lightbox.url}
                alt={lightbox.caption ?? "Project"}
                className="max-h-[90vh] max-w-[95vw] rounded-2xl shadow-elegant"
              />
              <button onClick={() => setLightbox(null)} aria-label="Close" className="absolute top-5 right-5 h-10 w-10 rounded-full glass-dark text-white inline-flex items-center justify-center">
                <X className="h-5 w-5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
