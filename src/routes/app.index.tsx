import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight, CalendarDays, Crown, TrendingUp } from "lucide-react";
import { PageBody, PageHeader } from "@/components/app/PageHeader";
import { Reveal } from "@/components/app/Reveal";
import { useSession } from "@/lib/session";
import { superAdmin, currentMember, news, events, calendarItems, members } from "@/data/mock";

export const Route = createFileRoute("/app/")({
  component: Dashboard,
});

function Dashboard() {
  const { role } = useSession();
  const me = role === "admin" ? superAdmin : currentMember;
  const isAdmin = role === "admin";
  const totalBV = me.leftBV + me.rightBV;

  return (
    <>
      <PageHeader
        eyebrow={isAdmin ? "Super admin · home" : "Member · home"}
        title={isAdmin ? `Good evening, ${me.name.split(" ")[0]}.` : `Welcome back, ${me.name.split(" ")[0]}.`}
        description={
          isAdmin
            ? "Your room. Your ranks. Your team's business value at a glance."
            : "Your rank and rewards. Your own values, your own pace."
        }
      />

      <PageBody className="space-y-12">
        {/* Team banner */}
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-surface-elevated to-surface p-8 shadow-[var(--shadow-sculpt)] md:p-12">
            <div aria-hidden className="absolute -right-20 -top-20 size-72 rounded-full bg-primary/20 blur-3xl" />
            <div className="relative flex flex-col gap-6 md:flex-row md:items-center">
              <img src={me.photo} alt={me.name} className="size-24 rounded-full object-cover ring-2 ring-primary/40 md:size-28" />
              <div className="min-w-0 flex-1">
                <p className="text-[11px] uppercase tracking-[0.3em] text-primary/80">Team banner · {me.userId}</p>
                <h2 className="mt-2 font-display text-3xl md:text-4xl">{me.name}</h2>
                <p className="text-sm text-muted-foreground">
                  {isAdmin ? "Network founder" : `Reporting into ${me.leaderName}`} · {me.email}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Combined BV</p>
                <p className="font-display text-4xl text-primary">{totalBV.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* L/R values */}
        <div className="grid gap-4 md:grid-cols-2">
          {[
            { label: "Left business value", value: me.leftBV, hint: "Support leg A" },
            { label: "Right business value", value: me.rightBV, hint: "Support leg B + referrals" },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 0.05}>
              <div className="group relative overflow-hidden rounded-xl border border-border bg-surface/60 p-6 backdrop-blur-md transition hover:border-primary/40">
                <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">{s.label}</p>
                <motion.p
                  initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                  transition={{ duration: 1.2 }}
                  className="mt-4 font-display text-5xl md:text-6xl"
                >
                  {s.value.toLocaleString()}
                </motion.p>
                <div className="mt-4 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{s.hint}</span>
                  <span className="inline-flex items-center gap-1 text-accent">
                    <TrendingUp size={12} /> +{Math.round(s.value * 0.08).toLocaleString()} this month
                  </span>
                </div>
                {!isAdmin && (
                  <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-primary/80">Editable by you</p>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        {/* Rank tiles */}
        <div className="grid gap-4 md:grid-cols-2">
          <Reveal>
            <div className="rounded-xl border border-border bg-surface/60 p-6 backdrop-blur-md">
              <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">Current rank</p>
              <p className="mt-3 font-display text-4xl">{me.rank}</p>
              <p className="mt-1 text-sm text-muted-foreground">Reward: <span className="text-foreground">{me.reward}</span></p>
              {isAdmin && <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-primary/80">Manual entry · admin</p>}
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="relative overflow-hidden rounded-xl border border-primary/40 bg-gradient-to-br from-primary/10 to-transparent p-6 backdrop-blur-md">
              <Crown className="absolute right-4 top-4 text-primary/40" size={64} />
              <p className="text-[11px] uppercase tracking-[0.3em] text-primary/80">Upcoming rank</p>
              <p className="mt-3 font-display text-4xl">{me.upcomingRank}</p>
              <p className="mt-1 text-sm text-muted-foreground">Reward: <span className="text-foreground">{me.upcomingReward}</span></p>
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-background/60">
                <motion.div
                  initial={{ width: 0 }} whileInView={{ width: "68%" }} viewport={{ once: true }} transition={{ duration: 1.2, ease: "easeOut" }}
                  className="h-full rounded-full bg-primary"
                />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">68% of the way there</p>
            </div>
          </Reveal>
        </div>

        {/* Calendar (admin only) + Upcoming events */}
        <div className="grid gap-4 lg:grid-cols-2">
          {isAdmin && (
            <Reveal>
              <div className="rounded-xl border border-border bg-surface/60 p-6 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <p className="font-display text-xl">Your schedule</p>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-primary/80">visible to top leaders</span>
                </div>
                <ul className="mt-4 divide-y divide-border">
                  {calendarItems.slice(0, 4).map((c) => (
                    <li key={c.id} className="flex items-center justify-between gap-3 py-3 text-sm">
                      <div className="flex items-center gap-3">
                        <CalendarDays size={14} className="text-primary" />
                        <span>{c.title}</span>
                      </div>
                      <span className="font-mono text-xs text-muted-foreground">{c.date} · {c.time}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/app/calendar" className="mt-4 inline-flex items-center gap-1 text-xs uppercase tracking-[0.2em] text-primary transition hover:gap-2">
                  Open calendar <ArrowUpRight size={12} />
                </Link>
              </div>
            </Reveal>
          )}

          <Reveal delay={isAdmin ? 0.05 : 0}>
            <div className="rounded-xl border border-border bg-surface/60 p-6 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <p className="font-display text-xl">Upcoming events</p>
                <Link to="/app/events" className="text-[10px] uppercase tracking-[0.25em] text-primary transition hover:opacity-80">All →</Link>
              </div>
              <ul className="mt-4 space-y-3">
                {events.slice(0, 3).map((e) => {
                  const myBV = me.leftBV + me.rightBV;
                  const eligible = myBV >= e.threshold;
                  return (
                    <li key={e.id}>
                      <Link
                        to="/app/events/$eventId" params={{ eventId: e.id }}
                        className="group flex items-center justify-between gap-3 rounded-lg border border-transparent p-3 transition hover:border-border hover:bg-background/40"
                      >
                        <div>
                          <p className="text-sm">{e.title}</p>
                          <p className="text-xs text-muted-foreground">{e.date} · {e.location}</p>
                        </div>
                        {!isAdmin && (
                          <span className={`rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] ${eligible ? "border-accent/50 text-accent" : "border-destructive/40 text-destructive"}`}>
                            {eligible ? "Eligible" : `Need ${(e.threshold - myBV).toLocaleString()} BV`}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Latest news quick row */}
        <Reveal>
          <div className="rounded-xl border border-border bg-surface/60 p-6 backdrop-blur-md">
            <div className="flex items-center justify-between">
              <p className="font-display text-xl">Latest news</p>
              <Link to="/app/news" className="text-[10px] uppercase tracking-[0.25em] text-primary">All →</Link>
            </div>
            <ul className="mt-4 space-y-3 text-sm">
              {news.slice(0, 3).map((n) => (
                <li key={n.id} className="border-l border-primary/40 pl-3">
                  <p className="font-medium">{n.title}</p>
                  <p className="text-xs text-muted-foreground">{n.date} · {n.author}</p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {isAdmin && (
          <Reveal>
            <div className="rounded-xl border border-dashed border-border-strong/50 bg-surface/30 p-6">
              <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">Network at a glance</p>
              <p className="mt-1 font-display text-2xl">
                {members.length + 1} active leaders · {members.reduce((s, m) => s + m.leftBV + m.rightBV, 0).toLocaleString()} combined BV
              </p>
            </div>
          </Reveal>
        )}
      </PageBody>
    </>
  );
}