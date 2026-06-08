import { motion } from "framer-motion";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Phone, MessageCircle, MapPin, Mail, Loader2, CheckCircle2, Navigation } from "lucide-react";
import { SectionTitle } from "../SectionTitle";
import { CONTACT } from "@/lib/contact";
import { submitLead } from "@/lib/leads.functions";

export function ContactSection() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const send = useServerFn(submitLead);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true); setErr(null);
    const fd = new FormData(e.currentTarget);
    try {
      await send({
        data: {
          name: String(fd.get("name") || ""),
          mobile: String(fd.get("mobile") || ""),
          monthly_bill: String(fd.get("monthly_bill") || ""),
          city: String(fd.get("city") || ""),
          source: "survey",
        },
      });
      setDone(true);
      (e.target as HTMLFormElement).reset();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Could not submit");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="py-24 lg:py-32 bg-secondary">
      <div className="container mx-auto px-4 max-w-7xl">
        <SectionTitle
          eyebrow="Get In Touch"
          title={<>Book Your <span className="text-gradient">Free Site Survey</span></>}
          description="Our solar doctor will inspect your roof, estimate generation, walk you through the subsidy and give you a transparent quote — at zero cost."
        />

        <div className="grid lg:grid-cols-5 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 space-y-4"
          >
            <InfoCard icon={Phone} label="Call us anytime" value={CONTACT.phone} href={CONTACT.phoneHref} cta="Call Now" />
            <InfoCard icon={MessageCircle} label="WhatsApp chat" value={CONTACT.whatsapp} href={CONTACT.whatsappHref} cta="WhatsApp Now" external />
            <InfoCard icon={Mail} label="Email" value={CONTACT.email} href={CONTACT.emailHref} cta="Send email" />
            <InfoCard icon={MapPin} label="Office address" value={CONTACT.address} href={CONTACT.mapsHref} cta="Get Directions" external Icon2={Navigation} />

            <div className="rounded-3xl overflow-hidden border border-border shadow-soft aspect-[16/10] bg-card">
              <iframe
                src={CONTACT.mapsEmbed}
                title="Office location"
                className="w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onSubmit={onSubmit}
            className="lg:col-span-3 bg-card rounded-3xl shadow-elegant border border-border p-7 lg:p-10"
          >
            <div className="text-xs uppercase tracking-widest text-accent font-semibold">Free Site Survey Request</div>
            <h3 className="font-display text-2xl lg:text-3xl font-bold mt-2">Tell us about your home</h3>

            <div className="grid sm:grid-cols-2 gap-4 mt-6">
              <Field name="name" label="Your Name" required />
              <Field name="mobile" label="Mobile Number" type="tel" required />
              <Field name="monthly_bill" label="Monthly Electricity Bill (₹)" />
              <Field name="city" label="City" />
            </div>

            {err && <p className="mt-3 text-sm text-destructive">{err}</p>}
            {done && (
              <div className="mt-4 p-4 rounded-2xl bg-accent/10 text-accent flex items-center gap-2 text-sm font-medium">
                <CheckCircle2 className="h-5 w-5" /> Thanks! Our solar doctor will reach out within 1 business day.
              </div>
            )}

            <button
              disabled={loading}
              className="mt-6 px-6 py-3.5 rounded-full gradient-primary text-primary-foreground font-semibold shadow-soft hover:shadow-glow transition-shadow inline-flex items-center gap-2 disabled:opacity-60"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              Request Free Site Survey
            </button>
            <p className="text-xs text-muted-foreground mt-3">Your information stays with SK Shine. We never sell or share it.</p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}{required && " *"}</span>
      <input
        type={type}
        name={name}
        required={required}
        className="mt-1.5 w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
      />
    </label>
  );
}

function InfoCard({
  icon: Icon, label, value, href, cta, external, Icon2,
}: { icon: any; label: string; value: string; href: string; cta: string; external?: boolean; Icon2?: any }) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="flex items-center gap-4 p-5 rounded-2xl bg-card border border-border shadow-soft hover-lift"
    >
      <div className="h-12 w-12 shrink-0 rounded-xl gradient-primary text-primary-foreground inline-flex items-center justify-center">
        <Icon className="h-6 w-6" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">{label}</div>
        <div className="font-display font-bold text-foreground truncate">{value}</div>
        <div className="text-xs text-primary mt-0.5 inline-flex items-center gap-1">
          {Icon2 ? <Icon2 className="h-3 w-3" /> : null} {cta}
        </div>
      </div>
    </a>
  );
}
