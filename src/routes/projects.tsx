import { createFileRoute } from "@tanstack/react-router";
import { GallerySection } from "@/components/sections/Gallery";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Solar Project Gallery — Residential, Commercial, Industrial | SK Shine" },
      { name: "description", content: "Browse rooftop solar installations delivered by SK Shine Enterprises across India." },
      { property: "og:title", content: "Solar Project Gallery | SK Shine" },
      { property: "og:description", content: "Real installations — residential villas, commercial buildings, industrial rooftops and ground-mount farms." },
      { property: "og:url", content: "/projects" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  component: () => (
    <div className="pt-24">
      <GallerySection />
    </div>
  ),
});
