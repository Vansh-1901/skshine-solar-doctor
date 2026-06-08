import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { CONTACT } from "@/lib/contact";
import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-20">
      <div className="container mx-auto px-4 max-w-7xl py-14 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <img src={logo} alt="SK Shine Enterprises" className="h-10 w-10 object-contain bg-white rounded-lg p-1" width={40} height={40} />
            <div>
              <div className="font-display font-bold">SK Shine Enterprises</div>
              <div className="text-[10px] tracking-[0.18em] text-accent-glow">{CONTACT.tagline}</div>
            </div>
          </div>
          <p className="mt-4 text-sm text-primary-foreground/75 leading-relaxed">
            Trusted solar energy solutions for residential, commercial and industrial customers across India.
          </p>
          <div className="flex gap-3 mt-5">
            {[Facebook, Instagram, Linkedin, Youtube].map((Icon, i) => (
              <a key={i} href="#" aria-label="Social" className="h-9 w-9 inline-flex items-center justify-center rounded-full bg-white/10 hover:bg-accent transition-colors">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            {[
              ["/services", "Services"],
              ["/projects", "Projects"],
              ["/subsidy", "PM Surya Ghar"],
              ["/comparison", "Solar Comparison"],
              ["/blog", "Blog"],
              ["/faqs", "FAQs"],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="hover:text-accent-glow transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Services</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li>On-Grid Solar System</li>
            <li>Off-Grid Solar System</li>
            <li>Hybrid Solar System</li>
            <li>Subsidy Assistance</li>
            <li>Free Site Survey</li>
            <li>Maintenance & Support</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Contact</h4>
          <ul className="space-y-3 text-sm text-primary-foreground/80">
            <li className="flex gap-2"><Phone className="h-4 w-4 mt-0.5 text-accent-glow shrink-0" /> {CONTACT.phone}</li>
            <li className="flex gap-2"><Mail className="h-4 w-4 mt-0.5 text-accent-glow shrink-0" /> {CONTACT.email}</li>
            <li className="flex gap-2"><MapPin className="h-4 w-4 mt-0.5 text-accent-glow shrink-0" /> {CONTACT.address}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 max-w-7xl py-5 text-xs flex flex-col md:flex-row justify-between gap-2 text-primary-foreground/60">
          <span>© {new Date().getFullYear()} SK Shine Enterprises. All rights reserved.</span>
          <span>{CONTACT.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
