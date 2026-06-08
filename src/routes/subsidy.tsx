import { createFileRoute } from "@tanstack/react-router";
import { PMSuryaGharSection } from "@/components/sections/PMSuryaGhar";
import { CalculatorSection } from "@/components/sections/Calculator";

export const Route = createFileRoute("/subsidy")({
  head: () => ({
    meta: [
      { title: "PM Surya Ghar Muft Bijli Yojana — Subsidy Up To ₹78,000 | SK Shine" },
      { name: "description", content: "Get up to ₹78,000 government subsidy on rooftop solar under PM Surya Ghar. SK Shine handles the full application." },
      { property: "og:title", content: "PM Surya Ghar Subsidy | SK Shine" },
      { property: "og:description", content: "Up to 300 units of free electricity every month under the Government of India scheme." },
      { property: "og:url", content: "/subsidy" },
    ],
    links: [{ rel: "canonical", href: "/subsidy" }],
  }),
  component: () => (
    <div className="pt-24">
      <PMSuryaGharSection />
      <CalculatorSection />
    </div>
  ),
});
