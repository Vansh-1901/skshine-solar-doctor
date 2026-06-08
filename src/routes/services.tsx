import { createFileRoute } from "@tanstack/react-router";
import { ServicesSection } from "@/components/sections/Services";
import { ComparisonSection } from "@/components/sections/Comparison";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Solar Services — On-Grid, Off-Grid & Hybrid | SK Shine" },
      { name: "description", content: "Compare our three solar systems: On-Grid for fast payback, Off-Grid for independence, Hybrid for backup + savings." },
      { property: "og:title", content: "Solar Services | SK Shine Enterprises" },
      { property: "og:description", content: "On-Grid, Off-Grid and Hybrid rooftop solar — installed, certified and supported by SK Shine." },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: () => (
    <div className="pt-24">
      <ServicesSection />
      <ComparisonSection />
    </div>
  ),
});
