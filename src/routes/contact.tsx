import { createFileRoute } from "@tanstack/react-router";
import { ContactSection } from "@/components/sections/ContactSection";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact SK Shine — Free Solar Site Survey | India" },
      { name: "description", content: "Talk to your solar doctor. Free site survey, transparent quote, full subsidy assistance — call, WhatsApp or fill the form." },
      { property: "og:title", content: "Contact SK Shine Enterprises" },
      { property: "og:description", content: "Book your free solar site survey today." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: () => (
    <div className="pt-24">
      <ContactSection />
    </div>
  ),
});
