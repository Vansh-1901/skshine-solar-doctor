import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Award, ShieldCheck, Sun, Users } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | SK Shine Enterprises" },
      {
        name: "description",
        content:
          "Learn about SK Shine Enterprises, your trusted solar energy partner for residential, commercial and industrial rooftop solar solutions.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="pt-24">
      <section className="py-20 bg-gradient-to-br from-primary to-primary/90 text-white">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <h1 className="text-5xl font-bold mb-6">About SK Shine Enterprises</h1>
          <p className="max-w-4xl mx-auto text-xl text-white/90 leading-relaxed">
            Transforming the way India powers homes, businesses and industries through innovative,
            sustainable and cost-effective solar energy solutions. Our mission is to help customers
            reduce electricity costs, increase energy independence and contribute to a greener future.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-4xl font-bold mb-6">Who We Are</h2>
          <p className="text-lg text-muted-foreground leading-8">
            SK Shine Enterprises is one of the emerging solar solution providers committed to delivering
            high-quality rooftop solar systems across residential, commercial and industrial sectors.
            We provide complete end-to-end support including consultation, site assessment, system
            design, installation, government subsidy guidance and after-sales service. Our focus is on
            helping customers achieve long-term savings while embracing clean and renewable energy.
            With a customer-first approach, quality products and expert technical support, we ensure
            every installation delivers maximum efficiency and long-term value.
          </p>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-background rounded-3xl shadow-lg p-8 md:p-12 border">
            <h2 className="text-4xl font-bold mb-6 text-center">Founder’s Message</h2>

            <p className="text-lg text-muted-foreground leading-8 mb-6">
              At SK Shine Enterprises, we believe solar energy is more than just a technology—it is a
              commitment to a cleaner, smarter and more sustainable future. Our vision has always been
              to help families, businesses and industries reduce their dependence on conventional power
              sources while achieving significant long-term savings.
            </p>

            <p className="text-lg text-muted-foreground leading-8 mb-6">
              Since our inception, we have focused on delivering quality workmanship, transparent
              service and reliable solar solutions tailored to each customer's needs. Every project we
              undertake reflects our dedication to excellence, innovation and customer satisfaction.
            </p>

            <p className="text-lg text-muted-foreground leading-8">
              We sincerely thank our customers, partners and supporters for their trust. Together, we
              are building a brighter future powered by clean energy.
            </p>

            <div className="mt-8 text-right">
              <h4 className="text-xl font-bold">SK Shine Enterprises</h4>
              <p className="text-muted-foreground">Founder & Management Team</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4 max-w-7xl grid md:grid-cols-2 gap-8">
          <div className="bg-background p-8 rounded-2xl shadow">
            <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
            <p>
              To accelerate the adoption of clean energy by providing reliable, affordable and efficient
              solar solutions that create lasting value for customers and the environment.
            </p>
          </div>

          <div className="bg-background p-8 rounded-2xl shadow">
            <h3 className="text-3xl font-bold mb-4">Our Vision</h3>
            <p>
              To become a trusted leader in the renewable energy sector by empowering thousands of
              households and businesses with sustainable energy solutions across India.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose Us</h2>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="p-6 border rounded-xl text-center">
              <Sun className="mx-auto mb-4 h-10 w-10" />
              <h4 className="font-bold mb-2">High-Efficiency Solar Systems</h4>
            </div>

            <div className="p-6 border rounded-xl text-center">
              <ShieldCheck className="mx-auto mb-4 h-10 w-10" />
              <h4 className="font-bold mb-2">Expert Installation Team</h4>
            </div>

            <div className="p-6 border rounded-xl text-center">
              <Award className="mx-auto mb-4 h-10 w-10" />
              <h4 className="font-bold mb-2">Premium Quality Components</h4>
            </div>

            <div className="p-6 border rounded-xl text-center">
              <Users className="mx-auto mb-4 h-10 w-10" />
              <h4 className="font-bold mb-2">Dedicated After-Sales Support</h4>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-4">Ready to Go Solar?</h2>
          <p className="mb-8 text-white/90 text-lg">
            Join hundreds of satisfied customers who are reducing electricity bills and investing in a
            cleaner future with solar energy.
          </p>

          <Button size="lg" asChild>
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
