import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus, MapPin, CalendarDays } from "lucide-react";
import { motion } from "framer-motion";
import { PageBody, PageHeader } from "@/components/app/PageHeader";
import { AdminOnly } from "@/components/app/AdminOnly";
import { events, superAdmin, currentMember } from "@/data/mock";
import { useSession } from "@/lib/session";

export const Route = createFileRoute("/app/events")({
  component: EventsPage,
});

function EventsPage() {
  const { role } = useSession();
  const me = role === "admin" ? superAdmin : currentMember;
  const myBV = me.leftBV + me.rightBV;

  return (
    <>
      <PageHeader
        eyebrow="Events · next 3 months"
        title="Earn the room."
        description="Self-nominate to events you're eligible for. Eligibility is checked against your business value, automatically."
        actions={
          <AdminOnly>
            <button className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-primary-foreground transition hover:scale-[1.02]">
              <Plus size={14} /> New event
            </button>
          </AdminOnly>
        }
      />
      <PageBody>
        <div className="grid gap-6 lg:grid-cols-2">
          {events.map((e, i) => {
            const eligible = myBV >= e.threshold;
            const gap = e.threshold - myBV;
            return (
              <motion.article
                key={e.id}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.06 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-surface/40 backdrop-blur-md transition hover:border-primary/40"
              >
                <Link to="/app/events/$eventId" params={{ eventId: e.id }} className="block">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img src={e.banner} alt={e.title} loading="lazy" className="size-full object-cover transition duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                    <div className="absolute left-4 top-4 flex items-center gap-2">
                      <span className="rounded-full border border-primary/40 bg-background/70 px-2.5 py-1 text-[10px] uppercase tracking-[0.25em] text-primary backdrop-blur">
                        BV ≥ {e.threshold.toLocaleString()}
                      </span>
                    </div>
                    {role === "member" && (
                      <span className={`absolute right-4 top-4 rounded-full border bg-background/70 px-2.5 py-1 text-[10px] uppercase tracking-[0.25em] backdrop-blur ${eligible ? "border-accent/50 text-accent" : "border-destructive/50 text-destructive"}`}>
                        {eligible ? "Eligible" : `Need ${gap.toLocaleString()}`}
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <p className="font-display text-2xl">{e.title}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5"><CalendarDays size={12} /> {e.date}</span>
                      <span className="inline-flex items-center gap-1.5"><MapPin size={12} /> {e.location}</span>
                      <span>Ticket ₹{e.ticket.toLocaleString()}</span>
                    </div>
                    <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{e.description}</p>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </div>
      </PageBody>
    </>
  );
}