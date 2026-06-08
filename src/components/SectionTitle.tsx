import { motion } from "framer-motion";
import { ReactNode } from "react";

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "center",
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  children?: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""} mb-12`}
    >
      {eyebrow && (
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold uppercase tracking-wider mb-4">
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" /> {eyebrow}
        </div>
      )}
      <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base lg:text-lg text-muted-foreground leading-relaxed">{description}</p>
      )}
      {children}
    </motion.div>
  );
}
