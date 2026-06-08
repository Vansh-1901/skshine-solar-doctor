import { motion } from "framer-motion";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { SectionTitle } from "../SectionTitle";
import { BLOGS } from "@/lib/blog-data";

export function BlogSection({ limit }: { limit?: number }) {
  const items = limit ? BLOGS.slice(0, limit) : BLOGS;
  return (
    <section className="py-24 lg:py-32 bg-secondary">
      <div className="container mx-auto px-4 max-w-7xl">
        <SectionTitle
          eyebrow="Solar Knowledge Hub"
          title={<>Learn About <span className="text-gradient">Solar Energy</span></>}
          description="Practical guides written by our solar experts — everything you need to make a confident decision."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((b, i) => (
            <motion.article
              key={b.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="group rounded-3xl bg-card overflow-hidden border border-border shadow-soft hover-lift"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img src={b.image} alt={b.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="p-6">
                <div className="inline-flex px-2.5 py-0.5 rounded-full bg-accent/10 text-accent text-[10px] uppercase tracking-widest font-semibold">{b.category}</div>
                <h3 className="font-display text-lg font-bold mt-3 leading-snug group-hover:text-primary transition-colors">{b.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{b.excerpt}</p>
                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {b.date}</span>
                    <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {b.readTime}</span>
                  </div>
                </div>
                <Link to="/blog" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all">
                  Read More <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {limit && (
          <div className="mt-12 text-center">
            <Link to="/blog" className="px-6 py-3 rounded-full border-2 border-primary text-primary font-semibold inline-flex items-center gap-2 hover:bg-primary hover:text-primary-foreground transition-colors">
              View All Articles <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
