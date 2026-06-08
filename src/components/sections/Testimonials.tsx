import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionTitle } from "../SectionTitle";

const TESTIMONIALS = [
  {
    name: "Rajesh Kumar",
    location: "Bengaluru, Karnataka",
    initials: "RK",
    rating: 5,
    text: "Our 5kW system paid for itself in just 4 years. Electricity bill dropped from ₹6,500 to under ₹500. The team was professional from survey to commissioning. Truly the solar doctors!",
  },
  {
    name: "Priya Sharma",
    location: "Pune, Maharashtra",
    initials: "PS",
    rating: 5,
    text: "SK Shine handled my entire PM Surya Ghar subsidy paperwork. I just had to sign. Saved over ₹60,000 in subsidy and now generate more than I consume.",
  },
  {
    name: "Anand Patel",
    location: "Ahmedabad, Gujarat",
    initials: "AP",
    rating: 5,
    text: "Installed a 10kW hybrid system for my factory. Power cuts no longer hurt production. ROI clearly visible within 18 months. Excellent component quality.",
  },
  {
    name: "Meera Iyer",
    location: "Chennai, Tamil Nadu",
    initials: "MI",
    rating: 5,
    text: "After getting quotes from 3 companies, SK Shine was the most transparent and fairly priced. Their engineer explained every component. Highly recommend.",
  },
  {
    name: "Vikram Singh",
    location: "Jaipur, Rajasthan",
    initials: "VS",
    rating: 5,
    text: "Off-grid system for our farmhouse — runs everything including pumps. No more diesel generator. Service team responds within hours.",
  },
];

export function TestimonialsSection() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(id);
  }, []);
  const next = () => setI((p) => (p + 1) % TESTIMONIALS.length);
  const prev = () => setI((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const t = TESTIMONIALS[i];

  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <SectionTitle
          eyebrow="Testimonials"
          title={<>Hear It From <span className="text-gradient">Happy Customers</span></>}
          description="Over 1,100 families and businesses across India trust SK Shine for their solar journey."
        />

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute -top-6 left-6 h-14 w-14 rounded-2xl gradient-primary text-primary-foreground inline-flex items-center justify-center shadow-elegant">
            <Quote className="h-7 w-7" />
          </div>

          <div className="bg-card rounded-3xl shadow-elegant border border-border p-8 lg:p-12 min-h-[280px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={t.name}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex gap-1 text-sun">
                  {Array.from({ length: t.rating }).map((_, k) => <Star key={k} className="h-5 w-5 fill-current" />)}
                </div>
                <p className="mt-5 text-lg lg:text-xl leading-relaxed text-foreground font-medium">
                  "{t.text}"
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full gradient-primary text-primary-foreground font-display font-bold flex items-center justify-center">
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-display font-bold">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.location}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-between mt-6 items-center">
            <div className="flex gap-1.5">
              {TESTIMONIALS.map((_, k) => (
                <button
                  key={k}
                  onClick={() => setI(k)}
                  aria-label={`Testimonial ${k + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    i === k ? "w-8 bg-primary" : "w-1.5 bg-border"
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={prev} aria-label="Previous" className="h-10 w-10 rounded-full border border-border bg-card hover:bg-primary hover:text-primary-foreground transition-colors inline-flex items-center justify-center">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button onClick={next} aria-label="Next" className="h-10 w-10 rounded-full border border-border bg-card hover:bg-primary hover:text-primary-foreground transition-colors inline-flex items-center justify-center">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
