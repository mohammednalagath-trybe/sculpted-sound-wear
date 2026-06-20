import { createFileRoute } from "@tanstack/react-router";
import { Download, FileText, Film, Plus } from "lucide-react";
import { PageBody, PageHeader } from "@/components/app/PageHeader";
import { Reveal } from "@/components/app/Reveal";
import { AdminOnly } from "@/components/app/AdminOnly";
import { documents } from "@/data/mock";

export const Route = createFileRoute("/app/documents")({
  component: DocumentsPage,
});

function DocumentsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Business documents"
        title="Knowledge & training."
        description="Plans, playbooks, training material. Posted by admin, downloadable by the team."
        actions={
          <AdminOnly>
            <button className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-primary-foreground transition hover:scale-[1.02]">
              <Plus size={14} /> Upload document
            </button>
          </AdminOnly>
        }
      />
      <PageBody>
        <ul className="overflow-hidden rounded-2xl border border-border bg-surface/40 backdrop-blur-md">
          {documents.map((d, i) => (
            <Reveal key={d.id} delay={i * 0.04} as="li">
              <div className="group grid grid-cols-[auto_1fr_auto_auto] items-center gap-4 border-b border-border px-6 py-4 transition last:border-b-0 hover:bg-background/30">
                <div className="flex size-11 items-center justify-center rounded-md border border-border bg-background/40 text-primary">
                  {d.type === "MP4" ? <Film size={18} /> : <FileText size={18} />}
                </div>
                <div className="min-w-0">
                  <p className="truncate font-medium">{d.title}</p>
                  <p className="text-xs text-muted-foreground">{d.type} · {d.size} · {d.date}</p>
                </div>
                <span className="hidden rounded-full border border-border px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground md:inline-block">
                  {d.type}
                </span>
                <button className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs transition hover:border-primary hover:text-primary">
                  <Download size={12} /> Download
                </button>
              </div>
            </Reveal>
          ))}
        </ul>
      </PageBody>
    </>
  );
}