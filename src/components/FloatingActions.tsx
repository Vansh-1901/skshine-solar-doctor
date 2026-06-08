import { MessageCircle, Phone } from "lucide-react";
import { CONTACT } from "@/lib/contact";

export function FloatingActions() {
  return (
    <div className="fixed z-40 bottom-5 left-5 flex flex-col gap-3">
      <a
        href={CONTACT.whatsappHref}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
        className="h-14 w-14 rounded-full bg-accent text-accent-foreground inline-flex items-center justify-center shadow-elegant hover:scale-110 transition-transform"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="absolute -top-1 -right-1 h-3 w-3 bg-accent rounded-full animate-ping" />
      </a>
      <a
        href={CONTACT.phoneHref}
        aria-label="Call"
        className="h-14 w-14 rounded-full gradient-primary text-primary-foreground inline-flex items-center justify-center shadow-elegant hover:scale-110 transition-transform"
      >
        <Phone className="h-6 w-6" />
      </a>
    </div>
  );
}
