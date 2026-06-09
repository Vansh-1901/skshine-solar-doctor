import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, BadgeIndianRupee, Leaf, Sun, Wallet } from "lucide-react";
import pm from "@/assets/pm-portrait.jpg";
import { CountdownTimer } from "../CountdownTimer";
import { CONTACT } from "@/lib/contact";

const BENEFITS = [
  { icon: BadgeIndianRupee, title: "Government Subsidy", desc: "Up to ₹78,000 direct benefit for residential rooftop systems." },
  { icon: Wallet, title: "Monthly Savings", desc: "Cut your electricity bill by up to 90% from day one." },
  { icon: Sun, title: "Solar Adoption", desc: "Join 1 crore households moving to clean rooftop energy." },
  { icon: Leaf, title: "Clean Energy", desc: "Reduce your carbon footprint with every sunny day." },
];

export function PMSuryaGharSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [60, -80]);

  return (
    <section ref={sectionRef} id="subsidy" className="relative py-24 lg:py-32 overflow-hidden bg-gradient-to-b from-secondary to-background">
      <div className="absolute top-20 left-10 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute bottom-20 right-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

      <div className="container mx-auto px-4 max-w-7xl relative">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-4"
          >
            PM Surya Ghar: Muft Bijli Yojana
          </motion.div>

          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.2 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gradient"
          >
            {`Up To 300 Units Free Electricity Every Month`.split('').map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.05,
                  delay: index * 0.04,
                }}
                className={char === ' ' ? 'inline-block w-2' : ''}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-6 text-muted-foreground text-lg"
          >
            A Government of India scheme to bring affordable rooftop solar to 1 crore households nationwide.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-card rounded-3xl border border-border shadow-elegant p-8 lg:p-12 mb-16"
        >
          <h3 className="text-center font-display text-4xl font-bold mb-10">
            <span className="text-gradient">Benefits</span>
          </h3>

          <div className="grid lg:grid-cols-2 gap-10">
            <div>
              <h4 className="text-center font-display text-3xl font-bold mb-8">
                Subsidy for <span className="text-gradient">Residential</span> Households
              </h4>

              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-4xl font-bold text-primary">₹30,000</div>
                  <div className="text-xl font-semibold mt-1">per kW</div>
                  <p className="text-muted-foreground mt-2">Up to 2 kW</p>
                </div>

                <div>
                  <div className="text-4xl font-bold text-primary">₹18,000</div>
                  <div className="text-xl font-semibold mt-1">per kW</div>
                  <p className="text-muted-foreground mt-2">Additional capacity up to 3 kW</p>
                </div>

                <div>
                  <div className="text-4xl font-bold text-primary">₹78,000</div>
                  <div className="text-xl font-semibold mt-1">Maximum</div>
                  <p className="text-muted-foreground mt-2">Total subsidy cap</p>
                </div>
              </div>
            </div>

            <div className="lg:border-l lg:pl-10 border-border">
              <h4 className="text-center font-display text-3xl font-bold mb-8">
                Subsidy for <span className="text-gradient">GHS/RWA</span>
              </h4>

              <div className="text-center">
                <div className="text-5xl font-bold text-primary">₹18,000</div>
                <div className="text-2xl font-semibold mt-1">per kW</div>

                <p className="text-muted-foreground mt-6 leading-relaxed max-w-xl mx-auto">
                  For common facilities including EV charging. Support available up to
                  <strong> 500 kW capacity</strong> (maximum 3 kW per house), inclusive of
                  rooftop solar systems installed by individual residents.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          <motion.div
            style={{ y: imageY }}
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="lg:col-span-5 relative h-[800px] rounded-3xl overflow-hidden shadow-elegant"
          >
            <img src={pm} alt="Prime Minister of India" className="absolute inset-0 w-full h-full object-cover object-center scale-116" width={1080} height={1280} loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-primary via-primary/80 to-transparent text-primary-foreground">
              <div className="text-[10px] uppercase tracking-widest text-accent-glow font-semibold">PM Modi</div>
              <blockquote className="mt-2 text-base lg:text-lg italic leading-relaxed">
                “In order to further sustainable development and people's well-being, we are launching the PM Surya Ghar: Muft Bijli Yojana. This project, with an investment of over ₹75,000 crores, aims to light up 1 crore households by providing up to 300 units of free electricity every month.”
              </blockquote>
            </div>
          </motion.div>

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            {BENEFITS.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.9, delay: i * 0.18 }}
                className="glass rounded-2xl p-6 hover-lift border border-white/40 hover:scale-[1.05] hover:-translate-y-2 transition-all duration-500"
              >
                <div className="h-12 w-12 rounded-xl gradient-primary text-primary-foreground inline-flex items-center justify-center mb-4 shadow-soft">
                  <b.icon className="h-6 w-6" />
                </div>
                <div className="font-display font-bold text-lg text-foreground">{b.title}</div>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}

            <div className="sm:col-span-2 flex flex-col sm:flex-row items-center gap-4 mt-4">
              <a
                href="https://pmsuryaghar.gov.in/"
                target="_blank"
                rel="noreferrer"
                className="h-14 px-8 rounded-full gradient-primary text-primary-foreground font-semibold shadow-soft hover:shadow-glow transition-all inline-flex items-center justify-center gap-2 whitespace-nowrap"
              >
                Apply For Subsidy <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={CONTACT.whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="h-14 px-8 rounded-full border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition-colors inline-flex items-center justify-center whitespace-nowrap"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9 }}
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
