import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  Image,
  Users,
  Settings,
  FileQuestion,
  Shield,
  LogOut,
  Loader2,
  TrendingUp,
  UserCheck,
  BadgeCheck,
  CheckCircle,
} from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { getDashboardStats } from "@/lib/admin-leads.functions";

export const Route = createFileRoute("/_authenticated/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const navigate = useNavigate();

  const statsFn = useServerFn(getDashboardStats);

  const { data, isLoading } = useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: () => statsFn(),
  });

  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  }

  const cards = [
    {
      title: "Lead Dashboard",
      description: "View and manage enquiries",
      icon: Users,
      href: "/admin/leads",
    },
    {
      title: "Gallery Manager",
      description: "Upload and manage project photos",
      icon: Image,
      href: "/admin/gallery",
    },
    {
      title: "FAQ Manager",
      description: "Manage frequently asked questions",
      icon: FileQuestion,
      href: "/admin/faq",
    },
    {
      title: "Settings",
      description: "Website settings",
      icon: Settings,
      href: "/admin/settings",
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 px-4 min-h-screen bg-secondary">
      <div className="container mx-auto max-w-7xl">
        {/* HERO */}
        <div className="rounded-3xl border border-border bg-card p-8 mb-8 shadow-soft">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Shield className="h-4 w-4" />
                Admin Control Center
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-3">SK Shine Solar Dashboard</h1>

              <p className="text-muted-foreground max-w-2xl">
                Manage leads, gallery content and business operations from a single dashboard.
              </p>
            </div>

            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-border bg-background hover:bg-muted transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>

        {/* MAIN STATS */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
          <div className="bg-card rounded-3xl border border-border p-6 shadow-soft">
            <div className="text-sm text-muted-foreground">Total Leads</div>
            <div className="text-4xl font-bold mt-2">{data?.totalLeads ?? 0}</div>
          </div>

          <div className="bg-card rounded-3xl border border-border p-6 shadow-soft">
            <div className="text-sm text-muted-foreground">New Leads</div>
            <div className="text-4xl font-bold mt-2">{data?.newLeads ?? 0}</div>
          </div>

          <div className="bg-card rounded-3xl border border-border p-6 shadow-soft">
            <div className="text-sm text-muted-foreground">Gallery Images</div>
            <div className="text-4xl font-bold mt-2">{data?.galleryCount ?? 0}</div>
          </div>

          <div className="bg-card rounded-3xl border border-border p-6 shadow-soft">
            <div className="text-sm text-muted-foreground">Converted Leads</div>
            <div className="text-4xl font-bold mt-2">{data?.convertedLeads ?? 0}</div>
          </div>
        </div>

        {/* LEAD FUNNEL */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card rounded-2xl border p-5">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5" />
              <span>New</span>
            </div>
            <div className="text-3xl font-bold">{data?.newLeads ?? 0}</div>
          </div>

          <div className="bg-card rounded-2xl border p-5">
            <div className="flex items-center gap-2 mb-2">
              <UserCheck className="h-5 w-5" />
              <span>Contacted</span>
            </div>
            <div className="text-3xl font-bold">{data?.contactedLeads ?? 0}</div>
          </div>

          <div className="bg-card rounded-2xl border p-5">
            <div className="flex items-center gap-2 mb-2">
              <BadgeCheck className="h-5 w-5" />
              <span>Qualified</span>
            </div>
            <div className="text-3xl font-bold">{data?.qualifiedLeads ?? 0}</div>
          </div>

          <div className="bg-card rounded-2xl border p-5">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-5 w-5" />
              <span>Converted</span>
            </div>
            <div className="text-3xl font-bold">{data?.convertedLeads ?? 0}</div>
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <Link
                key={card.title}
                to={card.href}
                className="group bg-card border border-border rounded-3xl p-6 shadow-soft hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="h-7 w-7" />
                </div>

                <h3 className="text-xl font-semibold mb-2">{card.title}</h3>

                <p className="text-sm text-muted-foreground">{card.description}</p>
              </Link>
            );
          })}
        </div>

        {/* RECENT LEADS */}
        <div className="bg-card border border-border rounded-3xl p-6 shadow-soft">
          <h2 className="text-2xl font-bold mb-6">Recent Leads</h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Name</th>
                  <th className="text-left p-3">Mobile</th>
                  <th className="text-left p-3">City</th>
                  <th className="text-left p-3">Status</th>
                </tr>
              </thead>

              <tbody>
                {data?.recentLeads?.map((lead: any) => (
                  <tr key={lead.id} className="border-b">
                    <td className="p-3">{lead.name}</td>
                    <td className="p-3">{lead.mobile}</td>
                    <td className="p-3">{lead.city}</td>
                    <td className="p-3">{lead.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
