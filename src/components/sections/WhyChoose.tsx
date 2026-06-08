import { motion } from "framer-motion";
import {
  ClipboardCheck, BadgeIndianRupee, Award, Wrench, Headphones, ShieldCheck,
  Clock, Sparkles, Building, IndianRupee, GraduationCap, Smile,
} from "lucide-react";
import { SectionTitle } from "../SectionTitle";

const FEATURES = [
  { icon: ClipboardCheck, title: "Free Site Survey" },
  { icon: BadgeIndianRupee, title: "Subsidy Assistance" },
  { icon: Award, title: "Premium Components" },
  { icon: Wrench, title: "Expert Installation" },
  { icon: GraduationCap, title: "Professional Consultation" },
  { icon: Headphones, title: "Maintenance Support" },
  { icon: Clock, title: "Quick Service" },
  { icon: ShieldCheck, title: "Trusted Solutions" },
  { icon: Sparkles, title: "Long-Term Reliability" },
  { icon: IndianRupee, title: "Affordable Pricing" },
  { icon: Building, title: "Certified Team" },
  { icon: Smile, title: "Customer Satisfaction" },
];

export function WhyChooseSection() {
  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <SectionTitle
          eyebrow="Why SK Shine"
          title={<>Why SK Shine Is <span className="text-gradient">Your Solar Doctor</span></>}
          description="A full-service solar partner — from your first question to a 25-year reliable installation."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, delay: (i % 4) * 0.07 }}
              className="group rounded-2xl bg-card border border-border p-6 text-center hover-lift"
            >
              <div className="mx-auto h-14 w-14 rounded-2xl bg-secondary inline-flex items-center justify-center group-hover:gradient-primary group-hover:text-primary-foreground transition-all">
                <f.icon className="h-7 w-7 text-primary group-hover:text-primary-foreground" />
              </div>
              <div className="mt-4 font-display font-semibold text-foreground text-sm">{f.title}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
