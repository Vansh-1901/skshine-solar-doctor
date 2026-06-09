import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Phone, MessageCircle, ArrowRight, ShieldCheck, BadgeCheck, Zap, Users } from "lucide-react";
import hero from "@/assets/hero-solar.jpg";
import { Counter } from "../Counter";
import { CONTACT } from "@/lib/contact";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-32 md:pt-36 pb-32 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img src={hero} alt="Premium rooftop solar installation" className="w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 gradient-hero" />
      </div>

      {/* Floating sun glow */}
      <motion.div
        animate={{ y: [0, -18, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-24 right-10 hidden md:block h-40 w-40 rounded-full gradient-sun blur-3xl opacity-50"
      />

      <div className="container mx-auto px-4 max-w-7xl relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl text-white"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-dark text-xs font-semibold text-accent-glow uppercase tracking-widest">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-glow animate-pulse" /> {CONTACT.tagline}
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mt-5">
            Your <span className="text-gradient bg-gradient-to-r from-accent-glow to-sun bg-clip-text text-transparent">Solar Doctor</span><br />
            for a Sustainable Future
          </h1>
          <p className="mt-4 text-lg lg:text-xl text-white/85 font-medium">
            Trusted solar solutions for residential, commercial and industrial energy needs.
          </p>
          <p className="mt-3 text-sm lg:text-base text-white/70 leading-relaxed max-w-2xl">
            SK Shine Enterprises provides complete solar energy solutions including On-Grid, Off-Grid and Hybrid systems. We help you slash electricity bills, maximise savings and transition to clean renewable energy through expert consultation, professional installation and long-term support.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="px-6 py-3.5 rounded-full gradient-primary text-primary-foreground font-semibold shadow-elegant hover:shadow-glow transition-shadow inline-flex items-center gap-2"
            >
              Get Free Site Survey <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={CONTACT.whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 rounded-full bg-accent text-accent-foreground font-semibold shadow-soft inline-flex items-center gap-2 hover:scale-[1.02] transition-transform"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp Now
            </a>
            <a
              href={CONTACT.phoneHref}
              className="px-6 py-3.5 rounded-full glass text-foreground font-semibold inline-flex items-center gap-2 hover:bg-white transition-colors"
            >
              <Phone className="h-4 w-4" /> Call Now
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/80">
            <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-accent-glow" /> 25-Year Panel Warranty</span>
            <span className="inline-flex items-center gap-1.5"><BadgeCheck className="h-4 w-4 text-accent-glow" /> MNRE Approved</span>
            <span className="inline-flex items-center gap-1.5"><Zap className="h-4 w-4 text-accent-glow" /> Subsidy Assistance</span>
          </div>
        </motion.div>
      </div>

      {/* Stats */}
      <div className="absolute bottom-0 inset-x-0 translate-y-[35%] md:translate-y-1/2 z-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-card rounded-3xl shadow-elegant p-4 md:p-6 border border-border min-h-[140px]"
          >
            {[
              { v: 1200, s: "+", label: "Projects Completed", icon: BadgeCheck },
              { v: 8500, s: " kW", label: "Solar Capacity Installed", icon: Zap },
              { v: 1100, s: "+", label: "Happy Customers", icon: Users },
              { v: 98, s: "%", label: "Customer Satisfaction", icon: ShieldCheck },
            ].map((s) => (
              <div key={s.label} className="text-center px-2">
                <s.icon className="h-5 w-5 text-accent mx-auto mb-2" />
                <div className="font-display text-2xl md:text-3xl font-bold text-primary">
                  <Counter to={s.v} suffix={s.s} />
                </div>
                <div className="text-[11px] md:text-xs text-muted-foreground mt-1 uppercase tracking-wide font-medium">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
