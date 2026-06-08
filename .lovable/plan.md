## SK Shine Enterprises — "Your Solar Doctor"

A premium, conversion-focused solar website built on TanStack Start + Tailwind v4 + Framer Motion, with Lovable Cloud powering the project gallery (admin upload) and lead capture (database).

### Design system

- Palette in `src/styles.css`: primary `#0F3D7A` (deep blue), accent `#1E8E3E` (solar green), white, soft gray surfaces, dark slate text — all as oklch tokens with gradient + glassmorphism utilities.
- Typography: Inter (body) + Plus Jakarta Sans (display) via `<link>` in `__root.tsx`.
- Motion: Framer Motion for fade-in, scroll reveal, counters, hover lift, accordion. Subtle, professional — not excessive.

### Routes (all SSR, each with own SEO head)

- `/` — Home (all marketing sections below)
- `/services`, `/comparison`, `/projects`, `/subsidy`, `/blog`, `/faqs`, `/contact` — dedicated pages reusing section components, each with unique title/description/og
- `/_authenticated/admin/gallery` — admin upload page for project gallery (protected)
- `/auth` — sign-in for admin

### Home page sections

1. **Hero** — full-bleed AI-generated solar rooftop image, headline, sub, description, 3 CTAs (Site Survey scroll-to-form, WhatsApp link, tel: link), animated counters (Projects, kW Installed, Customers, Satisfaction %).
2. **PM Surya Ghar Yojana** — premium block with AI-generated stylized portrait of PM Modi (respectful, professional), 4 benefit cards (glassmorphism), Apply/Learn More CTAs, countdown timer to **31 March 2027** (Days/Hours/Mins/Secs). This statement of modi should be there - in order to further sustainable development and people's well-being, we are launching the PM Surya Ghar: Muft Bijli Yojana. This project, with an investment of over Rs. 75,000 crores, aims to light up 1 crore households by providing up to 300 units of free electricity every month."
3. **Capacity Guide** — 3 tier cards (3kW / 5kW / 5kW+) tied to monthly units utilised, icons, hover animation.
4. **Savings Calculator** — interactive: monthly bill input → kW, monthly/annual/lifetime savings, payback period. Pure client calculation with documented assumptions.
5. **Services** — 3 cards (On-Grid, Off-Grid, Hybrid) with benefits + Learn More.
6. **Comparison Table** — On vs Off vs Hybrid across 10 criteria + pros/cons + "which is right for you" recommendation cards.
7. **Why SK Shine** — 12 feature tiles with icons, staggered entrance.
8. **Project Gallery** — masonry + lightbox, tabs for Residential / Commercial / Industrial, images loaded from Lovable Cloud storage bucket `project-gallery/{category}/*`. New uploads via admin page appear instantly — no code changes.
9. **Testimonials** — auto-sliding carousel, photo, name, location, stars, review; pre-seeded with realistic India-based testimonials.
10. **Blog** — 10 pre-created cards (titles per brief), image, category, date, read time, excerpt; cards link to `/blog/{slug}` stub article pages.
11. **FAQs** — animated accordion with 10 questions.
12. **Lead Widget** — floating expandable widget bottom-right "Talk To Your Solar Doctor" (Name, Mobile, Monthly units utilised, City) → writes to `leads` table.
13. **Contact** — phone, WhatsApp, email, address, embedded Google Maps iframe (generic India placeholder), Call / WhatsApp / Directions buttons (`tel:`, `wa.me`, maps deep link).

### Floating elements

- Fixed WhatsApp + Call buttons (bottom-left stack), visible on every route.
- Sticky glass navbar with smooth-scroll for in-page anchors, route links for separate pages.

### Lovable Cloud backend

- Enable Lovable Cloud.
- Storage bucket `project-gallery` (public read) with folders `residential/`, `commercial/`, `industrial/`.
- Tables:
  - `leads` — id, name, mobile, monthly_bill, city, source ('hero'|'widget'|'survey'), created_at. RLS: anon INSERT only; authenticated SELECT.
  - `gallery_images` — id, category, storage_path, caption, sort_order, created_at. RLS: anon SELECT; authenticated INSERT/DELETE.
- Server functions:
  - `submitLead` (public) — Zod-validated insert into `leads`.
  - `listGalleryImages` (public) — lists images per category, returns public URLs.
  - `uploadGalleryImage`, `deleteGalleryImage` (admin, `requireSupabaseAuth`).
- Admin gallery page: drag-drop upload, category picker, list with delete. Behind `_authenticated` layout.

### Placeholders

- Phone: `+91-9XXXXXXXXX`, WhatsApp: `+91-9XXXXXXXXX`, Email: `info@skshine.in`, Address: `Office address — update in code`. Centralized in `src/lib/contact.ts` for easy swap.

### SEO

- Per-route title/description/og/canonical (relative paths — no domain yet).
- JSON-LD Organization on root, FAQPage on `/faqs`, Article on blog routes.
- Semantic HTML, single H1 per page, alt text on every image, lazy loading on gallery.

### AI-generated images

- Hero rooftop solar (premium photographic).
- PM Modi stylized portrait (professional, respectful).
- 3 service icons / illustrations.
- 10 blog cover images.
- Seed gallery images (3 per category) so the gallery looks populated before user uploads.

### Out of scope (will note to user)

- Real CMS for blog (articles are static React content for now).
- SMS/email notifications on lead submit.
- Real Google Maps API key (using iframe embed of a search query).

### Files (high-level)

- `src/styles.css` — tokens, gradients, glass utilities.
- `src/routes/__root.tsx` — fonts, nav, footer, floating buttons, JSON-LD, auth listener.
- `src/routes/index.tsx` — composes home sections.
- `src/routes/{services,comparison,projects,subsidy,blog,faqs,contact,auth}.tsx`
- `src/routes/blog.$slug.tsx` — blog detail.
- `src/routes/_authenticated/route.tsx` + `admin.gallery.tsx`
- `src/routes/api/...` — none needed (server fns only).
- `src/components/sections/*` — Hero, PMSuryaGhar, CapacityGuide, Calculator, Services, Comparison, WhyChoose, Gallery, Testimonials, Blog, FAQs, Contact.
- `src/components/{Navbar,Footer,FloatingActions,LeadWidget,CountdownTimer,Counter}.tsx`
- `src/lib/{contact.ts,leads.functions.ts,gallery.functions.ts,blog-data.ts}`
- `src/assets/*` — generated images.

After build I'll verify the home page renders cleanly across mobile/desktop and the admin upload flow works end-to-end.