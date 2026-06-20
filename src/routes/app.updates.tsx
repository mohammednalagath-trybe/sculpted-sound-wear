import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { PageBody, PageHeader } from "@/components/app/PageHeader";
import { Reveal } from "@/components/app/Reveal";
import { AdminOnly } from "@/components/app/AdminOnly";
import { updates } from "@/data/mock";

export const Route = createFileRoute("/app/updates")({
  component: UpdatesPage,
});

function UpdatesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Updates"
        title="Platform & product."
        description="Product changes, policy updates, and anything new on the platform."
        actions={
          <AdminOnly>
            <button className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-primary-foreground transition hover:scale-[1.02]">
              <Plus size={14} /> New update
            </button>
          </AdminOnly>
        }
      />
      <PageBody>
        <ol className="relative space-y-10 border-l border-border pl-6 md:pl-8">
          {updates.map((u, i) => (
            <Reveal key={u.id} delay={i * 0.05} as="li">
              <span className="absolute -left-[7px] mt-1.5 size-3 rounded-full bg-primary ring-4 ring-background" />
              <p className="font-mono text-xs text-muted-foreground">{u.date}</p>
              <p className="mt-1 font-display text-2xl">{u.title}</p>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{u.body}</p>
            </Reveal>
          ))}
        </ol>
      </PageBody>
    </>
  );
}