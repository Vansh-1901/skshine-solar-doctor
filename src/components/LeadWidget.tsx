import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Stethoscope, X, Loader2, CheckCircle2 } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { submitLead } from "@/lib/leads.functions";

export function LeadWidget() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const send = useServerFn(submitLead);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    try {
      await send({
        data: {
          name: String(fd.get("name") || ""),
          mobile: String(fd.get("mobile") || ""),
          monthly_bill: String(fd.get("monthly_bill") || ""),
          city: String(fd.get("city") || ""),
          source: "widget",
        },
      });
      setDone(true);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Could not submit");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed z-40 bottom-5 right-5">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-3 w-[92vw] max-w-sm bg-card rounded-3xl shadow-elegant border border-border overflow-hidden"
          >
            <div className="gradient-primary p-5 text-primary-foreground">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[10px] tracking-widest text-accent-glow font-semibold">SK SHINE</div>
                  <div className="font-display text-lg font-bold">Talk To Your Solar Doctor</div>
                </div>
                <button onClick={() => setOpen(false)} aria-label="Close" className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 inline-flex items-center justify-center">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <p className="text-xs text-primary-foreground/80 mt-2">Get a free consultation in under 30 seconds.</p>
            </div>
            <div className="p-5">
              {done ? (
                <div className="text-center py-6">
                  <CheckCircle2 className="h-10 w-10 text-accent mx-auto mb-2" />
                  <div className="font-semibold">Thank you!</div>
                  <p className="text-sm text-muted-foreground mt-1">Our solar expert will call you shortly.</p>
                </div>
              ) : (
                <form className="space-y-3" onSubmit={onSubmit}>
                  <Input name="name" placeholder="Your Name" required />
                  <Input name="mobile" placeholder="Mobile Number" required type="tel" />
                  <Input name="monthly_bill" placeholder="Monthly Electricity Bill (₹)" />
                  <Input name="city" placeholder="City" />
                  {err && <p className="text-xs text-destructive">{err}</p>}
                  <button
                    disabled={loading}
                    className="w-full py-2.5 rounded-xl gradient-primary text-primary-foreground font-semibold shadow-soft hover:shadow-glow transition-shadow inline-flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                    Get Free Consultation
                  </button>
                  <p className="text-[10px] text-muted-foreground text-center">We respect your privacy. No spam, ever.</p>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => { setOpen((o) => !o); setDone(false); }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="gradient-primary text-primary-foreground pl-4 pr-5 h-14 rounded-full shadow-elegant inline-flex items-center gap-2 font-semibold"
      >
        <span className="h-9 w-9 rounded-full bg-white/15 inline-flex items-center justify-center">
          <Stethoscope className="h-5 w-5" />
        </span>
        <span className="hidden sm:inline text-sm">Talk To Solar Doctor</span>
        <span className="sm:hidden text-sm">Solar Doctor</span>
      </motion.button>
    </div>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
    />
  );
}
