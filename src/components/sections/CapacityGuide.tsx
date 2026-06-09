import { motion } from "framer-motion";
import { Home, Building2, Factory, ArrowRight } from "lucide-react";
import { SectionTitle } from "../SectionTitle";

const TIERS = [
  {
    icon: Home,
    bill: "300 – 400",
    capacity: "3 kW",
    desc: "Ideal for small families. Powers lights, fans, TV, fridge and basic appliances.",
    panels: "~7 panels",
    space: "~250 sq ft",
    color: "from-accent to-accent-glow",
  },
  {
    icon: Building2,
    bill: "400 – 600",
    capacity: "5 kW",
    desc: "Most popular for Indian homes. Runs AC, geyser and full household load comfortably.",
    panels: "~12 panels",
    space: "~420 sq ft",
    color: "from-primary to-primary-glow",
    featured: true,
  },
  {
    icon: Factory,
    bill: "Above 600",
    capacity: "5+ kW",
    desc: "For larger homes, villas and small commercial setups with high consumption.",
    panels: "15+ panels",
    space: "500+ sq ft",
    color: "from-primary to-accent",
  },
];

export function CapacityGuideSection() {
  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <SectionTitle
          eyebrow="Capacity Guide"
          title={<>Find The Right Solar System <span className="text-gradient">For Your Home</span></>}
          description="Match your monthly electricity bill with the right solar capacity. A quick rule of thumb our solar doctors use every day."
        />

        <div className="grid md:grid-cols-3 gap-6">
          {TIERS.map((t, i) => (
            <motion.div
              key={t.capacity}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className={`relative rounded-3xl p-7 border ${
                t.featured ? "border-primary/40 shadow-elegant bg-card" : "border-border bg-card shadow-soft"
              } hover-lift`}
            >
              {t.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-accent text-accent-foreground text-[10px] font-bold uppercase tracking-widest shadow-soft">
                  Most Popular
                </div>
              )}
              <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${t.color} text-white inline-flex items-center justify-center shadow-soft`}>
                <t.icon className="h-7 w-7" />
              </div>
              <div className="mt-5 text-xs uppercase tracking-widest text-muted-foreground font-semibold">Monthly Units Utilised</div>
              <div className="font-display text-2xl font-bold text-foreground">{t.bill}</div>
              <div className="mt-5 pt-5 border-t border-border">
                <div className="text-xs uppercase tracking-widest text-accent font-semibold">Recommended</div>
                <div className="font-display text-5xl font-bold text-gradient mt-1">{t.capacity}</div>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{t.desc}</p>
              </div>
              <div className="mt-5 flex justify-between text-xs">
                <span className="text-muted-foreground"><b className="text-foreground">{t.panels}</b></span>
                <span className="text-muted-foreground"><b className="text-foreground">{t.space}</b> rooftop</span>
              </div>
              <a href="#calculator" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all">
                Calculate exact savings <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
