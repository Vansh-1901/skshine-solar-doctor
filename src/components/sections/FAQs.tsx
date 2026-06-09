import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listFaqs } from "@/lib/faq.functions";
import { ChevronDown } from "lucide-react";
import { SectionTitle } from "../SectionTitle";

export function FAQsSection() {
  const [open, setOpen] = useState<number | null>(0);

  const list = useServerFn(listFaqs);

  const { data: faqs = [] } = useQuery({
    queryKey: ["public-faqs"],
    queryFn: () => list(),
  });

  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <SectionTitle
          eyebrow="FAQs"
          title={<>Frequently Asked <span className="text-gradient">Questions</span></>}
          description="Quick answers to what our customers ask us most often."
        />

        <div className="space-y-3">
          {faqs.map((f: any, i: number) => (
            <motion.div
              key={f.id}
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
                <span className="font-display font-semibold text-foreground">{f.question}</span>
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
                    <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{f.answer}</div>
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

export const faqsForJsonLd = [];
