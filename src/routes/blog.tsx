import { createFileRoute } from "@tanstack/react-router";
import { BlogSection } from "@/components/sections/BlogSection";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Solar Knowledge Hub — Blog | SK Shine Enterprises" },
      { name: "description", content: "Practical guides on rooftop solar, subsidies, system sizing and ROI — written by SK Shine solar experts." },
      { property: "og:title", content: "Solar Blog | SK Shine" },
      { property: "og:description", content: "Everything you need to make a confident solar decision." },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: () => (
    <div className="pt-24">
      <BlogSection />
    </div>
  ),
});
