import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Plus, Trash2, Loader2 } from "lucide-react";

import { listFaqs, createFaq, deleteFaq } from "@/lib/faq.functions";

export const Route = createFileRoute("/_authenticated/admin/faq")({
  component: AdminFaq,
});

function AdminFaq() {
  const qc = useQueryClient();

  const list = useServerFn(listFaqs);
  const addFaq = useServerFn(createFaq);
  const removeFaq = useServerFn(deleteFaq);

  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["faqs"],
    queryFn: () => list(),
  });

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleAdd() {
    if (!question.trim() || !answer.trim()) return;

    setSaving(true);

    await addFaq({
      data: {
        question,
        answer,
        sort_order: data.length + 1,
      },
    });

    setQuestion("");
    setAnswer("");

    await refetch();
    qc.invalidateQueries({ queryKey: ["faqs"] });

    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete FAQ?")) return;

    await removeFaq({ data: { id } });

    await refetch();
    qc.invalidateQueries({ queryKey: ["faqs"] });
  }

  return (
    <div className="pt-28 pb-20 px-4 min-h-screen bg-secondary">
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-4xl font-bold mb-8">FAQ Manager</h1>

        <div className="bg-card border border-border rounded-3xl p-6 shadow-soft mb-8">
          <input
            className="w-full border rounded-xl px-4 py-3 mb-4"
            placeholder="Question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />

          <textarea
            rows={4}
            className="w-full border rounded-xl px-4 py-3 mb-4"
            placeholder="Answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />

          <button
            onClick={handleAdd}
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl gradient-primary text-primary-foreground font-semibold"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
            Add FAQ
          </button>
        </div>

        {isLoading ? (
          <div className="text-center py-20">
            <Loader2 className="h-6 w-6 animate-spin mx-auto" />
          </div>
        ) : (
          <div className="space-y-4">
            {data.map((faq: any) => (
              <div
                key={faq.id}
                className="bg-card border border-border rounded-2xl p-5 shadow-soft"
              >
                <div className="flex justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-lg">{faq.question}</h3>

                    <p className="text-muted-foreground mt-2">{faq.answer}</p>
                  </div>

                  <button
                    onClick={() => handleDelete(faq.id)}
                    className="h-10 w-10 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
