import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CalendarDays, Check, Download, MapPin, Upload, X } from "lucide-react";
import { PageBody } from "@/components/app/PageHeader";
import { Reveal } from "@/components/app/Reveal";
import { AdminOnly } from "@/components/app/AdminOnly";
import { events, findPerson, superAdmin, currentMember } from "@/data/mock";
import { useSession } from "@/lib/session";

export const Route = createFileRoute("/app/events/$eventId")({
  component: EventDetail,
  notFoundComponent: () => (
    <div className="p-12">
      <p className="font-display text-3xl">Event not found.</p>
      <Link to="/app/events" className="mt-3 inline-block text-sm text-primary underline-offset-4 hover:underline">Back to events</Link>
    </div>
  ),
});

function EventDetail() {
  const { eventId } = Route.useParams();
  const event = events.find((e) => e.id === eventId);
  if (!event) throw notFound();

  const { role } = useSession();
  const me = role === "admin" ? superAdmin : currentMember;
  const myBV = me.leftBV + me.rightBV;
  const eligible = myBV >= event.threshold;
  const gap = event.threshold - myBV;

  const [nominated, setNominated] = useState(false);

  return (
    <>
      <div className="border-b border-border px-6 py-6 md:px-12">
        <Link to="/app/events" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground transition hover:text-foreground">
          <ArrowLeft size={14} /> Events
        </Link>
      </div>

      <div className="relative h-[40vh] min-h-[320px] w-full overflow-hidden">
        <img src={event.banner} alt={event.title} className="size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <p className="text-[11px] uppercase tracking-[0.35em] text-primary">Event</p>
          <h1 className="mt-2 font-display text-4xl tracking-tight md:text-6xl">{event.title}</h1>
          <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><CalendarDays size={14} /> {event.date}</span>
            <span className="inline-flex items-center gap-1.5"><MapPin size={14} /> {event.location}</span>
            <span>Ticket ₹{event.ticket.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <PageBody className="grid gap-8 lg:grid-cols-[1fr_360px]">
        {/* Left: eligibility + nomination form */}
        <div className="space-y-8">
          <Reveal>
            <EligibilityCard eligible={eligible} myBV={myBV} threshold={event.threshold} gap={gap} role={role} />
          </Reveal>

          <Reveal>
            <div className="rounded-2xl border border-border bg-surface/40 p-6 backdrop-blur-md md:p-8">
              <p className="font-display text-2xl">About the event</p>
              <p className="mt-3 max-w-2xl text-pretty text-muted-foreground">{event.description}</p>
            </div>
          </Reveal>

          <Reveal>
            <div className={`rounded-2xl border ${eligible ? "border-primary/40" : "border-border"} bg-surface/40 p-6 backdrop-blur-md md:p-8`}>
              <div className="flex items-center justify-between">
                <p className="font-display text-2xl">Self-nominate</p>
                {role === "member" && (
                  <span className={`rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] ${eligible ? "border-accent/50 text-accent" : "border-destructive/50 text-destructive"}`}>
                    {eligible ? "Open to you" : "Locked"}
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">All fields are required. Receipt upload is required as proof of payment.</p>

              <form
                onSubmit={(e) => { e.preventDefault(); if (eligible) setNominated(true); }}
                className="mt-6 grid gap-4 md:grid-cols-2"
              >
                <Field label="Name" defaultValue={me.name} />
                <Field label="User ID (auto)" defaultValue={me.userId} readOnly />
                <Field label="Tez ID" defaultValue={me.tezId} />
                <Field label="Contact number" defaultValue={me.contact} />
                <Field label="Main leader" defaultValue={me.leaderName} />
                <Field label="Business volume" defaultValue={myBV.toLocaleString()} />
                <Field label="Achieved date" type="date" />
                <Field label="Paid to" placeholder="e.g. Apex Events Pvt Ltd" />
                <div className="md:col-span-2">
                  <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Payment receipt</label>
                  <label className="mt-2 flex cursor-pointer items-center justify-between gap-3 rounded-md border border-dashed border-border bg-background/40 px-4 py-3 text-sm transition hover:border-primary">
                    <span className="inline-flex items-center gap-2 text-muted-foreground"><Upload size={14} /> Upload receipt (PDF, PNG, JPG)</span>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-primary/80">Required</span>
                    <input type="file" className="hidden" />
                  </label>
                </div>
                <div className="md:col-span-2">
                  <button
                    disabled={!eligible || nominated}
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary py-3 text-sm font-medium text-primary-foreground transition disabled:cursor-not-allowed disabled:opacity-50 enabled:hover:scale-[1.01]"
                  >
                    {nominated ? (
                      <><Check size={14} /> Nomination received</>
                    ) : eligible ? "Confirm nomination" : `Locked · need ${gap.toLocaleString()} more BV`}
                  </button>
                </div>
              </form>
            </div>
          </Reveal>
        </div>

        {/* Right: attendees */}
        <aside className="space-y-4">
          <div className="sticky top-6 overflow-hidden rounded-2xl border border-border bg-surface/40 backdrop-blur-md">
            <header className="flex items-center justify-between border-b border-border px-5 py-4">
              <div>
                <p className="font-display text-lg">Attendees</p>
                <p className="text-xs text-muted-foreground">{event.attendees.length} confirmed</p>
              </div>
              <AdminOnly
                fallback={
                  <span className="rounded-full border border-border px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    Admin only
                  </span>
                }
              >
                <button className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-xs transition hover:border-primary hover:text-primary">
                  <Download size={12} /> Excel
                </button>
              </AdminOnly>
            </header>
            <ul className="divide-y divide-border">
              {event.attendees.map((a) => {
                const p = findPerson(a.memberId);
                if (!p) return null;
                return (
                  <li key={a.memberId} className="flex items-center gap-3 px-5 py-3">
                    <img src={p.photo} alt={p.name} className="size-9 rounded-full ring-1 ring-border" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm">{p.name}</p>
                      <p className="truncate text-xs text-muted-foreground">{p.userId} · {a.paidTo}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>
      </PageBody>
    </>
  );
}

function EligibilityCard({
  eligible,
  myBV,
  threshold,
  gap,
  role,
}: {
  eligible: boolean;
  myBV: number;
  threshold: number;
  gap: number;
  role: "admin" | "member";
}) {
  const pct = Math.min(100, Math.round((myBV / threshold) * 100));
  return (
    <div className={`relative overflow-hidden rounded-2xl border p-6 backdrop-blur-md md:p-8 ${eligible ? "border-accent/40 bg-accent/5" : "border-destructive/30 bg-destructive/5"}`}>
      <div className="flex flex-wrap items-center gap-3">
        {eligible ? (
          <span className="flex size-10 items-center justify-center rounded-full bg-accent text-accent-foreground"><Check size={18} /></span>
        ) : (
          <span className="flex size-10 items-center justify-center rounded-full bg-destructive text-destructive-foreground"><X size={18} /></span>
        )}
        <div>
          <p className="font-display text-2xl">
            {eligible ? "You're eligible." : "Not eligible yet."}
          </p>
          <p className="text-sm text-muted-foreground">
            {eligible
              ? `Your BV ${myBV.toLocaleString()} meets the ${threshold.toLocaleString()} threshold.`
              : `Need ${gap.toLocaleString()} more BV — keep going.`}
          </p>
        </div>
        {role === "admin" && (
          <span className="ml-auto rounded-full border border-primary/40 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-primary">Admin view</span>
        )}
      </div>
      <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-background/60">
        <motion.div
          initial={{ width: 0 }} whileInView={{ width: `${pct}%` }} viewport={{ once: true }} transition={{ duration: 1.2, ease: "easeOut" }}
          className={`h-full rounded-full ${eligible ? "bg-accent" : "bg-destructive"}`}
        />
      </div>
      <p className="mt-2 text-xs text-muted-foreground">{pct}% of threshold</p>
    </div>
  );
}

function Field({
  label,
  defaultValue,
  readOnly,
  placeholder,
  type = "text",
}: {
  label: string;
  defaultValue?: string;
  readOnly?: boolean;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</label>
      <input
        type={type}
        defaultValue={defaultValue}
        readOnly={readOnly}
        placeholder={placeholder}
        className={`mt-2 w-full rounded-md border border-border bg-background/40 px-3 py-2.5 text-sm outline-none transition focus:border-primary ${readOnly ? "opacity-60" : ""}`}
      />
    </div>
  );
}