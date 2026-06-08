import { motion } from "framer-motion";
import { Check, X, Home, Building2, Factory } from "lucide-react";
import { SectionTitle } from "../SectionTitle";

const ROWS: Array<{ feature: string; on: string | boolean; off: string | boolean; hybrid: string | boolean }> = [
  { feature: "Battery Requirement", on: false, off: true, hybrid: true },
  { feature: "Subsidy Availability", on: true, off: false, hybrid: "Partial" },
  { feature: "Power During Outage", on: false, off: true, hybrid: true },
  { feature: "Installation Cost", on: "Low", off: "High", hybrid: "Medium" },
  { feature: "Maintenance", on: "Low", off: "Medium", hybrid: "Medium" },
  { feature: "Return On Investment", on: "Fast (4–5 yr)", off: "Slow (7–9 yr)", hybrid: "Medium (5–6 yr)" },
  { feature: "Energy Independence", on: false, off: true, hybrid: true },
  { feature: "Best Use Case", on: "Urban Homes", off: "Remote Areas", hybrid: "Backup + Savings" },
  { feature: "Complexity", on: "Simple", off: "Medium", hybrid: "Advanced" },
  { feature: "Long-Term Savings", on: "High", off: "High", hybrid: "Highest" },
];

const RECOMMEND = [
  { icon: Home, title: "Choose On-Grid", desc: "If you live in a city, get reliable grid power and want fastest payback with subsidy.", tag: "Recommended" },
  { icon: Factory, title: "Choose Off-Grid", desc: "If you face frequent power cuts or live where grid power is unreliable or absent.", tag: "Independence" },
  { icon: Building2, title: "Choose Hybrid", desc: "If you want savings + backup and run sensitive appliances like servers or medical devices.", tag: "Best Balance" },
];

function Cell({ v }: { v: string | boolean }) {
  if (v === true) return <span className="inline-flex h-7 w-7 rounded-full bg-accent/15 text-accent items-center justify-center"><Check className="h-4 w-4" /></span>;
  if (v === false) return <span className="inline-flex h-7 w-7 rounded-full bg-destructive/10 text-destructive items-center justify-center"><X className="h-4 w-4" /></span>;
  return <span className="text-sm font-semibold text-foreground">{v}</span>;
}

export function ComparisonSection() {
  return (
    <section className="py-24 lg:py-32 bg-secondary">
      <div className="container mx-auto px-4 max-w-7xl">
        <SectionTitle
          eyebrow="Detailed Comparison"
          title={<>On-Grid <span className="text-muted-foreground font-normal">vs</span> Off-Grid <span className="text-muted-foreground font-normal">vs</span> Hybrid</>}
          description="Side-by-side comparison of the three solar systems we install — the same chart we use during free site surveys."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden rounded-3xl bg-card shadow-elegant border border-border"
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="gradient-primary text-primary-foreground">
                  <th className="text-left font-display text-sm font-semibold p-4 lg:p-5">Feature</th>
                  <th className="font-display text-sm font-semibold p-4 lg:p-5">On-Grid</th>
                  <th className="font-display text-sm font-semibold p-4 lg:p-5 bg-white/10">Off-Grid</th>
                  <th className="font-display text-sm font-semibold p-4 lg:p-5">Hybrid</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r, i) => (
                  <tr key={r.feature} className={i % 2 === 0 ? "bg-card" : "bg-background"}>
                    <td className="p-4 lg:p-5 text-sm font-medium text-foreground">{r.feature}</td>
                    <td className="p-4 lg:p-5 text-center"><Cell v={r.on} /></td>
                    <td className="p-4 lg:p-5 text-center bg-primary/5"><Cell v={r.off} /></td>
                    <td className="p-4 lg:p-5 text-center"><Cell v={r.hybrid} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <div className="mt-16">
          <h3 className="font-display text-2xl lg:text-3xl font-bold text-center mb-8">Which Solar System Is Right For You?</h3>
          <div className="grid md:grid-cols-3 gap-5">
            {RECOMMEND.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl bg-card border border-border p-6 hover-lift"
              >
                <div className="h-12 w-12 rounded-xl gradient-primary text-primary-foreground inline-flex items-center justify-center">
                  <r.icon className="h-6 w-6" />
                </div>
                <div className="mt-3 inline-flex px-2.5 py-0.5 rounded-full bg-accent/10 text-accent text-[10px] uppercase tracking-widest font-semibold">{r.tag}</div>
                <h4 className="mt-2 font-display text-lg font-bold">{r.title}</h4>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
