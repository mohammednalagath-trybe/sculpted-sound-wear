import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { PageBody, PageHeader } from "@/components/app/PageHeader";
import { Reveal } from "@/components/app/Reveal";
import { AdminOnly } from "@/components/app/AdminOnly";
import { news } from "@/data/mock";

export const Route = createFileRoute("/app/news")({
  component: NewsPage,
});

function NewsPage() {
  return (
    <>
      <PageHeader
        eyebrow="News"
        title="What the room needs to know."
        description="Posted by the super admin. Visible to every member."
        actions={
          <AdminOnly>
            <button className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-primary-foreground transition hover:scale-[1.02]">
              <Plus size={14} /> New post
            </button>
          </AdminOnly>
        }
      />
      <PageBody className="space-y-6">
        {news.map((n, i) => (
          <Reveal key={n.id} delay={i * 0.05}>
            <article className="group rounded-2xl border border-border bg-surface/50 p-6 backdrop-blur-md transition hover:border-primary/40 md:p-8">
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="rounded-full border border-primary/40 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-primary">News</span>
                <span>{n.date}</span>
                <span>·</span>
                <span>{n.author}</span>
              </div>
              <h2 className="mt-3 font-display text-3xl leading-tight text-balance">{n.title}</h2>
              <p className="mt-3 max-w-3xl text-pretty text-muted-foreground">{n.body}</p>
            </article>
          </Reveal>
        ))}
      </PageBody>
    </>
  );
}