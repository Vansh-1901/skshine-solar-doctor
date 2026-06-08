import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Calculator, IndianRupee, Zap, TrendingUp, Calendar, PiggyBank } from "lucide-react";
import { SectionTitle } from "../SectionTitle";

const TARIFF = 8;            // ₹ / kWh weighted assumption
const GEN_PER_KW = 120;      // kWh per kW per month (avg India)
const COST_PER_KW = 65000;   // installation ₹/kW after typical subsidy
const LIFETIME_YEARS = 25;

function calc(bill: number) {
  const monthlyUnits = bill / TARIFF;
  const kw = Math.max(1, Math.round((monthlyUnits / GEN_PER_KW) * 2) / 2);
  const monthlySavings = Math.round(Math.min(bill, kw * GEN_PER_KW * TARIFF));
  const annualSavings = monthlySavings * 12;
  const systemCost = Math.round(kw * COST_PER_KW);
  const paybackYears = +(systemCost / Math.max(1, annualSavings)).toFixed(1);
  const lifetimeSavings = annualSavings * LIFETIME_YEARS;
  return { kw, monthlySavings, annualSavings, paybackYears, lifetimeSavings };
}

const fmt = (n: number) => "₹" + n.toLocaleString("en-IN");

export function CalculatorSection() {
  const [bill, setBill] = useState(3000);
  const result = useMemo(() => calc(bill), [bill]);

  return (
    <section id="calculator" className="py-24 lg:py-32 bg-gradient-to-b from-background to-secondary">
      <div className="container mx-auto px-4 max-w-7xl">
        <SectionTitle
          eyebrow="Solar Savings Calculator"
          title={<>See <span className="text-gradient">How Much You'll Save</span> With Solar</>}
          description="Move the slider to your average monthly bill and get an instant savings estimate."
        />

        <div className="max-w-5xl mx-auto bg-card rounded-3xl shadow-elegant border border-border overflow-hidden grid lg:grid-cols-2">
          {/* Input */}
          <div className="p-8 lg:p-10 gradient-primary text-primary-foreground">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-accent-glow font-semibold">
              <Calculator className="h-4 w-4" /> Your Numbers
            </div>
            <h3 className="font-display text-2xl lg:text-3xl font-bold mt-3">Monthly Electricity Bill</h3>

            <div className="mt-8">
              <div className="font-display text-6xl font-bold tabular-nums">{fmt(bill)}</div>
              <input
                type="range"
                min={500}
                max={20000}
                step={100}
                value={bill}
                onChange={(e) => setBill(+e.target.value)}
                className="w-full mt-6 accent-accent"
                aria-label="Monthly bill"
              />
              <div className="flex justify-between text-xs text-primary-foreground/70 mt-2">
                <span>₹500</span><span>₹20,000+</span>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-2 text-center text-xs">
              {[1500, 4000, 8000].map((v) => (
                <button
                  key={v}
                  onClick={() => setBill(v)}
                  className={`py-2 rounded-lg border transition-colors ${
                    bill === v ? "bg-white text-primary border-white" : "border-white/30 text-white/80 hover:bg-white/10"
                  }`}
                >
                  ₹{v.toLocaleString("en-IN")}
                </button>
              ))}
            </div>
          </div>

          {/* Outputs */}
          <div className="p-8 lg:p-10 bg-card">
            <div className="text-xs uppercase tracking-widest text-accent font-semibold">Your Estimate</div>
            <h3 className="font-display text-2xl lg:text-3xl font-bold mt-2">Recommended {result.kw} kW System</h3>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <Stat icon={IndianRupee} label="Monthly Savings" value={fmt(result.monthlySavings)} accent />
              <Stat icon={TrendingUp} label="Annual Savings" value={fmt(result.annualSavings)} />
              <Stat icon={Calendar} label="Payback Period" value={`${result.paybackYears} yrs`} />
              <Stat icon={PiggyBank} label="Lifetime Savings" value={fmt(result.lifetimeSavings)} highlight />
            </div>

            <div className="mt-6 p-4 bg-secondary rounded-2xl text-xs text-muted-foreground leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-foreground mb-1">
                <Zap className="h-3.5 w-3.5 text-accent" /> How we calculated this
              </div>
              Based on ₹{TARIFF}/unit tariff, {GEN_PER_KW} kWh/kW monthly generation, ₹{COST_PER_KW.toLocaleString("en-IN")}/kW post-subsidy cost and a {LIFETIME_YEARS}-year panel life. Actual figures vary by location, roof and DISCOM.
            </div>

            <a
              href="#contact"
              className="mt-5 w-full inline-flex justify-center items-center gap-2 px-5 py-3 rounded-full gradient-primary text-primary-foreground font-semibold shadow-soft hover:shadow-glow transition-shadow"
            >
              Get My Exact Quote
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({
  icon: Icon, label, value, accent, highlight,
}: { icon: any; label: string; value: string; accent?: boolean; highlight?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      key={value}
      transition={{ duration: 0.3 }}
      className={`rounded-2xl p-4 border ${
        highlight ? "border-accent/40 bg-accent/5" : accent ? "border-primary/30 bg-primary/5" : "border-border bg-background"
      }`}
    >
      <Icon className={`h-4 w-4 ${highlight ? "text-accent" : "text-primary"}`} />
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-2">{label}</div>
      <div className="font-display text-xl font-bold mt-1 tabular-nums">{value}</div>
    </motion.div>
  );
}
