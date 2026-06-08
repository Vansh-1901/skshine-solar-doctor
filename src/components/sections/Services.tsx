import { motion } from "framer-motion";
import { Zap, BatteryCharging, Layers, ArrowRight, Check } from "lucide-react";
import { SectionTitle } from "../SectionTitle";

const SERVICES = [
  {
    icon: Zap,
    title: "On-Grid Solar System",
    tag: "Most Popular",
    desc: "Grid-tied system with net metering. Lowest cost, fastest ROI.",
    benefits: [
      "Lower installation cost",
      "Net metering benefits",
      "No battery required",
      "Fast ROI (4–5 years)",
      "Reduced electricity bills",
      "Best for urban areas",
    ],
  },
  {
    icon: BatteryCharging,
    title: "Off-Grid Solar System",
    tag: "Energy Independence",
    desc: "Fully independent with battery backup, no grid dependency.",
    benefits: [
      "Works without grid",
      "Battery backup included",
      "Total energy independence",
      "Perfect for remote areas",
      "Reliable power supply",
      "Ideal for farms & cabins",
    ],
  },
  {
    icon: Layers,
    title: "Hybrid Solar System",
    tag: "Best of Both Worlds",
    desc: "Grid + battery combo for outage-proof, future-ready homes.",
    benefits: [
      "Grid + battery combination",
      "Power backup during outages",
      "Maximum flexibility",
      "High reliability",
      "Long-term savings",
      "Smart energy management",
    ],
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <SectionTitle
          eyebrow="Our Services"
          title={<>Solar Systems Built For <span className="text-gradient">Every Need</span></>}
          description="Whether you live in a city apartment, run a factory or own a remote farmhouse — we have the right solar system for you."
        />

        <div className="grid md:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative rounded-3xl bg-card border border-border p-8 shadow-soft hover-lift overflow-hidden"
            >
              <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full gradient-primary opacity-5 group-hover:opacity-20 transition-opacity" />
              <div className="h-14 w-14 rounded-2xl gradient-primary text-primary-foreground inline-flex items-center justify-center shadow-soft">
                <s.icon className="h-7 w-7" />
              </div>
              <div className="mt-5 inline-flex px-2.5 py-0.5 rounded-full bg-accent/10 text-accent text-[10px] uppercase tracking-widest font-semibold">{s.tag}</div>
              <h3 className="mt-3 font-display text-xl font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              <ul className="mt-5 space-y-2.5">
                {s.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm">
                    <span className="h-5 w-5 rounded-full bg-accent/15 text-accent inline-flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="h-3 w-3" />
                    </span>
                    <span className="text-foreground/85">{b}</span>
                  </li>
                ))}
              </ul>
              <a href="#contact" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all">
                Learn More <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
