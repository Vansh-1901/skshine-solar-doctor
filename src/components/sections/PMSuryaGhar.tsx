import { motion } from "framer-motion";
import { ArrowRight, BadgeIndianRupee, Leaf, Sun, Wallet } from "lucide-react";
import pm from "@/assets/pm-portrait.jpg";
import { SectionTitle } from "../SectionTitle";
import { CountdownTimer } from "../CountdownTimer";
import { CONTACT } from "@/lib/contact";

const BENEFITS = [
  { icon: BadgeIndianRupee, title: "Government Subsidy", desc: "Up to ₹78,000 direct benefit for residential rooftop systems." },
  { icon: Wallet, title: "Monthly Savings", desc: "Cut your electricity bill by up to 90% from day one." },
  { icon: Sun, title: "Solar Adoption", desc: "Join 1 crore households moving to clean rooftop energy." },
  { icon: Leaf, title: "Clean Energy", desc: "Reduce your carbon footprint with every sunny day." },
];

export function PMSuryaGharSection() {
  return (
    <section id="subsidy" className="relative py-24 lg:py-32 overflow-hidden bg-gradient-to-b from-secondary to-background">
      <div className="absolute top-20 left-10 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute bottom-20 right-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

      <div className="container mx-auto px-4 max-w-7xl relative">
        <SectionTitle
          eyebrow="PM Surya Ghar: Muft Bijli Yojana"
          title={<>Up To <span className="text-gradient">300 Units Free Electricity</span> Every Month</>}
          description="A Government of India scheme to bring affordable rooftop solar to 1 crore households nationwide."
        />

        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative rounded-3xl overflow-hidden shadow-elegant"
          >
            <img src={pm} alt="Prime Minister of India" className="w-full h-full object-cover aspect-[4/5]" width={1024} height={1280} loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-primary-foreground">
              <div className="text-[10px] uppercase tracking-widest text-accent-glow font-semibold">PM Modi</div>
              <blockquote className="mt-2 text-sm lg:text-base italic leading-relaxed">
                “In order to further sustainable development and people's well-being, we are launching the PM Surya Ghar: Muft Bijli Yojana. This project, with an investment of over ₹75,000 crores, aims to light up 1 crore households by providing up to 300 units of free electricity every month.”
              </blockquote>
            </div>
          </motion.div>

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            {BENEFITS.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass rounded-2xl p-6 hover-lift border border-white/40"
              >
                <div className="h-12 w-12 rounded-xl gradient-primary text-primary-foreground inline-flex items-center justify-center mb-4 shadow-soft">
                  <b.icon className="h-6 w-6" />
                </div>
                <div className="font-display font-bold text-lg text-foreground">{b.title}</div>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}

            <div className="sm:col-span-2 flex flex-wrap gap-3 mt-2">
              <a
                href="https://pmsuryaghar.gov.in/"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-full gradient-primary text-primary-foreground font-semibold shadow-soft hover:shadow-glow transition-shadow inline-flex items-center gap-2"
              >
                Apply For Subsidy <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={CONTACT.whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-full border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex px-3 py-1 rounded-full bg-destructive/10 text-destructive text-xs font-semibold uppercase tracking-wider">
            Limited Time Subsidy Window
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-bold mt-3">Start Saving With Solar Today</h3>
          <p className="text-muted-foreground mt-2 text-sm">Scheme deadline closes 31 March 2027 — book your free site survey now.</p>
          <div className="mt-6">
            <CountdownTimer target={CONTACT.subsidyDeadline} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
