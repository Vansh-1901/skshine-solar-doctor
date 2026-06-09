import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { CONTACT } from "@/lib/contact";
import logo from "@/assets/logo.png";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/comparison", label: "Solar Comparison" },
  { to: "/projects", label: "Projects" },
  { to: "/subsidy", label: "Subsidy" },
  { to: "/blog", label: "Blog" },
  { to: "/faqs", label: "FAQs" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass shadow-soft"
          : "bg-white/90 backdrop-blur-md border-b border-border/30 shadow-sm"
      }`}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex h-16 lg:h-20 items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 group">
            <img src={logo} alt="SK Shine Enterprises" className="h-10 w-10 object-contain" width={40} height={40} />
            <div className="leading-tight">
              <div className="font-display font-bold text-base lg:text-lg text-primary">SK Shine</div>
              <div className="text-[10px] tracking-[0.18em] font-semibold text-accent">YOUR SOLAR DOCTOR</div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                activeOptions={{ exact: n.to === "/" }}
                className="whitespace-nowrap px-2.5 xl:px-3 py-2 text-[13px] xl:text-sm font-medium text-foreground/80 hover:text-primary rounded-md transition-colors"
                activeProps={{ className: "whitespace-nowrap px-2.5 xl:px-3 py-2 text-[13px] xl:text-sm font-semibold text-primary rounded-md" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="hidden xl:flex items-center gap-2">
            <a
              href={CONTACT.whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="whitespace-nowrap px-4 py-2 text-sm font-semibold rounded-full border border-accent/30 text-accent hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              WhatsApp Now
            </a>
            <Link
              to="/contact"
              className="whitespace-nowrap px-4 py-2 text-sm font-semibold rounded-full gradient-primary text-primary-foreground shadow-soft hover:shadow-glow transition-shadow"
            >
              Free Site Survey
            </Link>
          </div>
          <Link
            to="/contact"
            className="hidden lg:inline-flex xl:hidden whitespace-nowrap px-4 py-2 text-sm font-semibold rounded-full gradient-primary text-primary-foreground shadow-soft"
          >
            Free Survey
          </Link>

          <button
            aria-label="Menu"
            className="lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-md border border-border bg-card"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <div className="lg:hidden pb-4 animate-fade-in">
            <nav className="flex flex-col gap-1 mt-2">
              {NAV.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary"
                >
                  {n.label}
                </Link>
              ))}
              <div className="flex gap-2 mt-3">
                <a href={CONTACT.phoneHref} className="flex-1 px-4 py-2.5 text-sm font-semibold rounded-full border border-primary text-primary inline-flex items-center justify-center gap-2">
                  <Phone className="h-4 w-4" /> Call
                </a>
                <a href={CONTACT.whatsappHref} target="_blank" rel="noreferrer" className="flex-1 px-4 py-2.5 text-sm font-semibold rounded-full bg-accent text-accent-foreground text-center">
                  WhatsApp
                </a>
              </div>
              <Link to="/contact" onClick={() => setOpen(false)} className="mt-2 px-4 py-2.5 text-sm font-semibold rounded-full gradient-primary text-primary-foreground text-center">
                Get Free Site Survey
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
