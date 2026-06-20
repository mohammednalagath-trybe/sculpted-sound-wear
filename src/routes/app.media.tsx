import { createFileRoute } from "@tanstack/react-router";
import { Play, Plus, Images as ImagesIcon } from "lucide-react";
import { motion } from "framer-motion";
import { PageBody, PageHeader } from "@/components/app/PageHeader";
import { AdminOnly } from "@/components/app/AdminOnly";
import { media } from "@/data/mock";

export const Route = createFileRoute("/app/media")({
  component: MediaPage,
});

function MediaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Photos & Videos"
        title="The moments, kept."
        description="Memories from trips, dinners, summits, and milestones."
        actions={
          <AdminOnly>
            <button className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-primary-foreground transition hover:scale-[1.02]">
              <Plus size={14} /> Add album
            </button>
          </AdminOnly>
        }
      />
      <PageBody>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {media.map((m, i) => (
            <motion.figure
              key={m.id}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.05 }}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-border"
            >
              <img src={m.thumb} alt={m.title} loading="lazy" className="size-full object-cover transition duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-5">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-primary/90">
                  {m.kind === "video" ? <Play size={12} /> : <ImagesIcon size={12} />}
                  <span>{m.kind === "video" ? "Video" : `${m.count} photos`}</span>
                </div>
                <p className="mt-1 font-display text-xl">{m.title}</p>
              </div>
            </motion.figure>
          ))}
        </div>
      </PageBody>
    </>
  );
}