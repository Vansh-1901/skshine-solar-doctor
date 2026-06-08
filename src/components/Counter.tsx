import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

export function Counter({ to, suffix = "", duration = 1.8 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [inView, to, duration]);

  const formatted = Math.round(val).toLocaleString("en-IN");
  return (
    <motion.span ref={ref} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="tabular-nums">
      {formatted}
      {suffix}
    </motion.span>
  );
}
