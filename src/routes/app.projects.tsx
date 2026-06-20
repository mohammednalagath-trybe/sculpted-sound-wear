import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { PageBody, PageHeader } from "@/components/app/PageHeader";
import { Reveal } from "@/components/app/Reveal";
import { AdminOnly } from "@/components/app/AdminOnly";
import { projects } from "@/data/mock";

export const Route = createFileRoute("/app/projects")({
  component: ProjectsPage,
});

const STATUS_TONE: Record<string, string> = {
  "In progress": "border-accent/50 text-accent",
  Review: "border-primary/50 text-primary",
  Planning: "border-muted-foreground/40 text-muted-foreground",
};

function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="What we're building."
        description="Initiatives owned by leaders across the network. TBD: link projects to teams and events."
        actions={
          <AdminOnly>
            <button className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-primary-foreground transition hover:scale-[1.02]">
              <Plus size={14} /> New project
            </button>
          </AdminOnly>
        }
      />
      <PageBody>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.05}>
              <article className="group flex h-full flex-col rounded-2xl border border-border bg-surface/50 p-6 backdrop-blur-md transition hover:border-primary/40">
                <span className={`inline-flex w-fit rounded-full border px-2.5 py-0.5 text-[10px] uppercase tracking-[0.2em] ${STATUS_TONE[p.status]}`}>{p.status}</span>
                <h2 className="mt-4 font-display text-2xl">{p.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">Owner · {p.owner}</p>
                <p className="mt-auto pt-6 font-mono text-xs text-muted-foreground">Due {p.due}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </PageBody>
    </>
  );
}