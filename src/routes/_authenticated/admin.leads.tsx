import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, Trash2, Download } from "lucide-react";
import { listLeads, updateLeadStatus, deleteLead } from "@/lib/admin-leads.functions";
import { useState } from "react";

export const Route = createFileRoute("/_authenticated/admin/leads")({
  component: AdminLeads,
});

function AdminLeads() {
  const getLeads = useServerFn(listLeads);
  const updateStatus = useServerFn(updateLeadStatus);
  const removeLead = useServerFn(deleteLead);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const { data = [], isLoading } = useQuery({
    queryKey: ["admin-leads"],
    queryFn: () => getLeads(),
  });

  const totalLeads = data.length;

  const newLeads = data.filter((lead: any) => lead.status === "new").length;

  const todayLeads = data.filter((lead: any) => {
    const today = new Date();
    const created = new Date(lead.created_at);

    return (
      created.getDate() === today.getDate() &&
      created.getMonth() === today.getMonth() &&
      created.getFullYear() === today.getFullYear()
    );
  }).length;

  const filteredLeads = data.filter((lead: any) => {
    const matchesSearch =
      lead.name?.toLowerCase().includes(search.toLowerCase()) ||
      lead.mobile?.includes(search);

    const matchesStatus =
      statusFilter === 'all' || lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  function exportToCSV() {
    const headers = [
      "Name",
      "Mobile",
      "City",
      "Monthly Bill",
      "Source",
      "Status",
      "Created At",
    ];

    const rows = data.map((lead: any) => [
      lead.name ?? "",
      lead.mobile ?? "",
      lead.city ?? "",
      lead.monthly_bill ?? "",
      lead.source ?? "",
      lead.status ?? "",
      lead.created_at ?? "",
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `leads-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();

    URL.revokeObjectURL(url);
  }

  async function handleStatusChange(id: string, status: string) {
    await updateStatus({ data: { id, status } });
    window.location.reload();
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this lead?')) return;
    await removeLead({ data: { id } });
    window.location.reload();
  }

  return (
    <div className="pt-28 pb-20 px-4 min-h-screen bg-secondary">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold mb-8">Lead Dashboard</h1>

        {isLoading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="bg-card rounded-2xl border border-border p-6 shadow-soft">
                <div className="text-sm text-muted-foreground">Total Leads</div>
                <div className="text-3xl font-bold mt-2">{totalLeads}</div>
              </div>

              <div className="bg-card rounded-2xl border border-border p-6 shadow-soft">
                <div className="text-sm text-muted-foreground">New Leads</div>
                <div className="text-3xl font-bold mt-2">{newLeads}</div>
              </div>

              <div className="bg-card rounded-2xl border border-border p-6 shadow-soft">
                <div className="text-sm text-muted-foreground">Today's Leads</div>
                <div className="text-3xl font-bold mt-2">{todayLeads}</div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name or mobile"
                className="border rounded-xl px-4 py-2 flex-1"
              />

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border rounded-xl px-4 py-2"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="qualified">Qualified</option>
                <option value="converted">Converted</option>
              </select>
              <button
                onClick={exportToCSV}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-medium"
              >
                <Download className="h-4 w-4" />
                Export Leads
              </button>
            </div>

            <div className="overflow-x-auto bg-card border border-border rounded-2xl shadow-soft">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="p-4 text-left">Name</th>
                    <th className="p-4 text-left">Mobile</th>
                    <th className="p-4 text-left">City</th>
                    <th className="p-4 text-left">Bill</th>
                    <th className="p-4 text-left">Source</th>
                    <th className="p-4 text-left">Status</th>
                    <th className="p-4 text-left">Created</th>
                    <th className="p-4 text-left">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredLeads.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="p-8 text-center text-muted-foreground">
                        No leads found.
                      </td>
                    </tr>
                  ) : (
                    filteredLeads.map((lead: any) => (
                      <tr key={lead.id} className="border-b border-border hover:bg-muted/20">
                        <td className="p-4 font-medium">{lead.name}</td>

                        <td className="p-4">{lead.mobile}</td>

                        <td className="p-4">{lead.city || "-"}</td>

                        <td className="p-4">₹{lead.monthly_bill || "-"}</td>

                        <td className="p-4 capitalize">{lead.source}</td>

                        <td className="p-4">
                          <select
                            value={lead.status}
                            onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                            className="border rounded px-2 py-1"
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="qualified">Qualified</option>
                            <option value="converted">Converted</option>
                          </select>
                        </td>

                        <td className="p-4 text-sm">
                          {new Date(lead.created_at).toLocaleString()}
                        </td>

                        <td className="p-4">
                          <button
                            onClick={() => handleDelete(lead.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
