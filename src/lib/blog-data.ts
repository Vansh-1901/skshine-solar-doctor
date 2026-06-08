import b1 from "@/assets/blog-1.jpg";
import b2 from "@/assets/blog-2.jpg";
import b3 from "@/assets/blog-3.jpg";
import b4 from "@/assets/blog-4.jpg";
import b5 from "@/assets/blog-5.jpg";
import b6 from "@/assets/blog-6.jpg";
import b7 from "@/assets/blog-7.jpg";
import b8 from "@/assets/blog-8.jpg";
import b9 from "@/assets/blog-9.jpg";
import b10 from "@/assets/blog-10.jpg";

export type Blog = {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  image: string;
};

export const BLOGS: Blog[] = [
  { slug: "3kw-vs-5kw-solar-system", title: "3kW vs 5kW Solar System — Which One Fits Your Home?", category: "Solar Guide", date: "May 20, 2026", readTime: "6 min", excerpt: "Compare generation, savings and payback for the two most popular residential systems in India.", image: b1 },
  { slug: "pm-surya-ghar-subsidy-guide", title: "PM Surya Ghar Subsidy Guide — How to Claim Up To ₹78,000", category: "Subsidy", date: "May 14, 2026", readTime: "7 min", excerpt: "A simple, step-by-step walkthrough of the Muft Bijli Yojana application and disbursal.", image: b2 },
  { slug: "on-grid-vs-off-grid-vs-hybrid", title: "On-Grid vs Off-Grid vs Hybrid Solar — Honest Comparison", category: "Compare", date: "May 02, 2026", readTime: "8 min", excerpt: "Pros, cons and the ideal use case for each system, explained without jargon.", image: b3 },
  { slug: "home-solar-capacity", title: "How Much Solar Capacity Does Your Home Actually Need?", category: "Solar Guide", date: "Apr 24, 2026", readTime: "5 min", excerpt: "Use your monthly bill and roof area to size the right kW for your family.", image: b4 },
  { slug: "solar-installation-cost-guide", title: "Solar Installation Cost Guide — 2026 Edition", category: "Pricing", date: "Apr 11, 2026", readTime: "6 min", excerpt: "Transparent breakdown of panels, inverters, mounting, wiring and installation labour.", image: b5 },
  { slug: "benefits-rooftop-solar", title: "10 Real Benefits of Rooftop Solar Systems", category: "Benefits", date: "Mar 28, 2026", readTime: "4 min", excerpt: "From savings to sustainability — why over a million Indian homes have switched.", image: b6 },
  { slug: "complete-home-solar-buying-guide", title: "Complete Home Solar Buying Guide", category: "Solar Guide", date: "Mar 18, 2026", readTime: "9 min", excerpt: "The 12-point checklist every homeowner should follow before signing a solar contract.", image: b7 },
  { slug: "understanding-net-metering", title: "Understanding Net Metering — How Excess Solar Becomes Money", category: "Compare", date: "Mar 06, 2026", readTime: "5 min", excerpt: "Net, gross and behind-the-meter explained for Indian DISCOMs.", image: b8 },
  { slug: "how-solar-saves-money", title: "How Solar Saves You Money Every Month", category: "Savings", date: "Feb 22, 2026", readTime: "5 min", excerpt: "Run the numbers — your bill, your subsidy, your monthly savings.", image: b9 },
  { slug: "future-of-solar-energy", title: "The Future Of Solar Energy In India", category: "Industry", date: "Feb 10, 2026", readTime: "6 min", excerpt: "Where the market is headed by 2030 — capacity, cost and policy.", image: b10 },
];
