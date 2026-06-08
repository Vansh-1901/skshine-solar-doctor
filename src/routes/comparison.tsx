import { createFileRoute } from "@tanstack/react-router";
import { ComparisonSection } from "@/components/sections/Comparison";
import { CapacityGuideSection } from "@/components/sections/CapacityGuide";

export const Route = createFileRoute("/comparison")({
  head: () => ({
    meta: [
      { title: "On-Grid vs Off-Grid vs Hybrid Solar — Detailed Comparison | SK Shine" },
      { name: "description", content: "10-point comparison of On-Grid, Off-Grid and Hybrid solar systems. Pros, cons, costs and ROI explained." },
      { property: "og:title", content: "Solar Systems Compared | SK Shine" },
      { property: "og:description", content: "Pick the right rooftop solar system for your home or business." },
      { property: "og:url", content: "/comparison" },
    ],
    links: [{ rel: "canonical", href: "/comparison" }],
  }),
  component: () => (
    <div className="pt-24">
      <ComparisonSection />
      <CapacityGuideSection />
    </div>
  ),
});
