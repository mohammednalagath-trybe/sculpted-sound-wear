import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageBody, PageHeader } from "@/components/app/PageHeader";
import { calendarItems } from "@/data/mock";

export const Route = createFileRoute("/app/calendar")({
  component: CalendarPage,
});

function CalendarPage() {
  // Client-side gate: members are bounced. (Demo prototype — role lives in localStorage.)
  const [allowed, setAllowed] = useState(true);
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem("apex.session.v1");
      const role = raw ? JSON.parse(raw).role : "admin";
      setAllowed(role === "admin");
    } catch {}
  }, []);

  if (!allowed) {
    return (
      <PageBody>
        <div className="rounded-2xl border border-dashed border-destructive/40 bg-destructive/5 p-12 text-center">
          <p className="font-display text-3xl">Calendar is admin-only.</p>
          <p className="mt-2 text-sm text-muted-foreground">Top leaders (Diamond and above) get viewing access.</p>
        </div>
      </PageBody>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow="Calendar"
        title="Your schedule, on stage."
        description="A clean view of what's coming. Top leaders in your org see this view — your team always knows when you're available."
      />
      <PageBody>
        <div className="overflow-hidden rounded-2xl border border-border bg-surface/40 backdrop-blur-md">
          <ul className="divide-y divide-border">
            {calendarItems.map((c) => (
              <li key={c.id} className="grid grid-cols-[auto_1fr_auto] items-center gap-6 px-6 py-5 transition hover:bg-background/30">
                <div className="flex size-14 flex-col items-center justify-center rounded-md border border-border bg-background/40 text-center">
                  <span className="font-mono text-[10px] uppercase text-muted-foreground">{new Date(c.date).toLocaleString("en", { month: "short" })}</span>
                  <span className="font-display text-xl leading-none">{new Date(c.date).getDate()}</span>
                </div>
                <p className="text-sm font-medium">{c.title}</p>
                <span className="font-mono text-xs text-muted-foreground">{c.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </PageBody>
    </>
  );
}