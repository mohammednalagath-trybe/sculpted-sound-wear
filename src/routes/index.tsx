import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Layers, Sparkles } from "lucide-react";
import { useLenis } from "@/hooks/useLenis";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Apex — Lead the room." },
      { name: "description", content: "A sculpted leadership platform for ranks, business value, referrals and events." },
    ],
  }),
  component: Landing,
});

function Landing() {
  useLenis();
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground grain">
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "var(--gradient-glow)" }} />

      <nav className="relative z-10 flex items-center justify-between px-6 py-6 md:px-12">
        <Link to="/" className="font-display text-2xl tracking-tight">
          Apex<span className="text-primary">.</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link to="/wireframes" className="hidden text-xs uppercase tracking-[0.3em] text-muted-foreground transition hover:text-foreground md:inline">
            Wireframes
          </Link>
          <Link
            to="/login"
            className="group relative inline-flex items-center gap-2 rounded-full border border-border bg-surface/40 px-4 py-2 text-xs uppercase tracking-[0.3em] backdrop-blur-md transition hover:border-primary"
          >
            Sign in
            <ArrowRight size={14} className="transition group-hover:translate-x-0.5" />
          </Link>
        </div>
      </nav>

      <section className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6 pb-24 pt-16 text-center md:pt-28">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 text-[11px] uppercase tracking-[0.5em] text-primary"
        >
          Leadership · Ranks · Business value · Events
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display display-tight text-5xl text-balance md:text-8xl"
        >
          Run the room.
          <br />
          <span className="italic text-primary">Sculpt the team.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mt-8 max-w-xl text-pretty text-base text-muted-foreground md:text-lg"
        >
          Apex is a private platform for leaders who manage teams by rank and
          business value. Hierarchy you can read at a glance. Events your team
          earns into. A schedule the top of the org can see.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            to="/login"
            className="group relative inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-[0_0_60px_-10px_oklch(0.82_0.12_78/0.6)] transition hover:scale-[1.02]"
          >
            Enter the platform
            <ArrowRight size={16} className="transition group-hover:translate-x-1" />
          </Link>
          <Link
            to="/app"
            className="rounded-full border border-border bg-surface/40 px-6 py-3 text-sm uppercase tracking-[0.25em] backdrop-blur transition hover:border-primary"
          >
            Skip — explore demo
          </Link>
        </motion.div>

        <div className="mt-24 grid w-full gap-4 md:grid-cols-3">
          {[
            { icon: Layers, t: "Hierarchy, not a tree", d: "Support legs and referrals shown grouped — easy to read at any size of team." },
            { icon: ShieldCheck, t: "Role-aware everything", d: "Admin edits and adds. Members view, self-edit their own values, and self-nominate to events." },
            { icon: Sparkles, t: "Events you earn into", d: "Auto-eligibility against business value. Receipts uploaded. Attendees exported." },
          ].map((f, i) => (
            <motion.div
              key={f.t}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-xl border border-border bg-surface/50 p-6 text-left backdrop-blur-md transition hover:border-primary/40"
            >
              <div className="absolute -right-10 -top-10 size-32 rounded-full bg-primary/10 blur-2xl transition group-hover:bg-primary/20" />
              <f.icon size={22} className="relative text-primary" />
              <p className="relative mt-4 font-display text-2xl">{f.t}</p>
              <p className="relative mt-2 text-sm text-muted-foreground">{f.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className="relative z-10 border-t border-border px-6 py-8 text-center text-xs text-muted-foreground">
        Prototype · UI only · No real data persisted ·{" "}
        <Link to="/wireframes" className="underline-offset-4 hover:underline">View wireframes</Link>
      </footer>
    </main>
  );
}