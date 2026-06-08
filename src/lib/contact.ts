// Centralised contact info — swap placeholders for real values.
export const CONTACT = {
  phone: "+91-9XXXXXXXXX",
  phoneHref: "tel:+919000000000",
  whatsapp: "+91-9XXXXXXXXX",
  whatsappHref: "https://wa.me/919000000000?text=Hi%20SK%20Shine%2C%20I%20want%20a%20free%20solar%20site%20survey",
  email: "info@skshine.in",
  emailHref: "mailto:info@skshine.in",
  address: "Office address — update in src/lib/contact.ts",
  mapsHref: "https://www.google.com/maps/dir/?api=1&destination=SK+Shine+Enterprises+India",
  mapsEmbed:
    "https://www.google.com/maps?q=India&output=embed",
  brand: "SK Shine Enterprises",
  tagline: "YOUR SOLAR DOCTOR",
  subsidyDeadline: new Date("2027-03-31T23:59:59+05:30"),
} as const;
