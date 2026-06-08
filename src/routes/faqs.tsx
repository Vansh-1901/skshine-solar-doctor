import { createFileRoute } from "@tanstack/react-router";
import { FAQsSection, faqsForJsonLd } from "@/components/sections/FAQs";

export const Route = createFileRoute("/faqs")({
  head: () => ({
    meta: [
      { title: "Solar FAQs — Net Metering, Subsidy, ROI | SK Shine Enterprises" },
      { name: "description", content: "Answers to the most common solar questions: net metering, subsidy, warranty, installation timeline and savings." },
      { property: "og:title", content: "Solar FAQs | SK Shine" },
      { property: "og:description", content: "Quick, honest answers from your solar doctor." },
      { property: "og:url", content: "/faqs" },
    ],
    links: [{ rel: "canonical", href: "/faqs" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqsForJsonLd.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }),
    }],
  }),
  component: () => (
    <div className="pt-24">
      <FAQsSection />
    </div>
  ),
});
