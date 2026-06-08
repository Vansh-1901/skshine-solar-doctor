import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { SectionTitle } from "../SectionTitle";

const FAQS = [
  { q: "What Is Net Metering?", a: "Net metering lets you export excess solar power back to the grid. Your DISCOM credits the units against your consumption, so you only pay for the net energy used." },
  { q: "How Much Subsidy Can I Receive?", a: "Under the PM Surya Ghar scheme, you can receive ₹30,000 for 1kW, ₹60,000 for 2kW and up to ₹78,000 for 3kW and above — directly credited to your bank account." },
  { q: "Which Solar System Is Best For My Home?", a: "On-grid is best for urban homes with reliable power. Hybrid is ideal where outages are frequent. Off-grid suits remote or farm locations. Our free site survey gives you a personalised recommendation." },
  { q: "How Long Do Solar Panels Last?", a: "Quality solar panels carry a 25-year performance warranty and last 25–30 years. The inverter typically lasts 10–12 years and can be replaced separately." },
  { q: "What Maintenance Is Required?", a: "Very little — gentle cleaning of panels every 2–3 months and an annual electrical inspection. We offer AMC packages that cover everything." },
  { q: "How Much Can I Save?", a: "Most households save 70–90% on their electricity bill and recover the full system cost in 4–6 years. Lifetime savings run into lakhs of rupees." },
  { q: "Does Solar Work During Power Cuts?", a: "On-grid systems shut down during outages (safety regulation). Hybrid and off-grid systems with batteries continue to power your home during cuts." },
  { q: "What Is The Installation Process?", a: "Site survey → design proposal → subsidy registration → installation (1–3 days) → net-meter inspection → commissioning. We handle all paperwork." },
  { q: "How Long Does Installation Take?", a: "Most residential systems are installed in 1 to 3 working days. Including paperwork and net-meter approval, the full timeline is typically 4–6 weeks." },
  { q: "What Is The Warranty Period?", a: "25 years on panels (performance), 5–10 years on inverters, 5 years on structure and workmanship. All warranties are honoured directly by us as your local partner." },
];

export function FAQsSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <SectionTitle
          eyebrow="FAQs"
          title={<>Frequently Asked <span className="text-gradient">Questions</span></>}
          description="Quick answers to what our customers ask us most often."
        />

        <div className="space-y-3">
          {FAQS.map((f, i) => (
            <motion.div
              key={f.q}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="bg-card rounded-2xl border border-border shadow-soft overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full p-5 flex items-center justify-between gap-4 text-left"
                aria-expanded={open === i}
              >
                <span className="font-display font-semibold text-foreground">{f.q}</span>
                <ChevronDown
                  className={`h-5 w-5 text-primary shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{f.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export const faqsForJsonLd = FAQS;
