import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useLenis } from "@/hooks/useLenis";

export const Route = createFileRoute("/wireframes")({
  head: () => ({ meta: [{ title: "Wireframes — Apex" }] }),
  component: Wireframes,
});

// These are saved under /mnt/documents/wireframes; expose via presentation-artifact tags too.
const FRAMES = [
  { src: "/wireframes/01-login-wireframe.png", title: "Login — Email + OTP" },
  { src: "/wireframes/02-admin-dashboard-wireframe.png", title: "Super Admin — Home" },
  { src: "/wireframes/03-member-home-wireframe.png", title: "Team Member — Home" },
  { src: "/wireframes/04-event-detail-member-wireframe.png", title: "Event Detail — Member View" },
  { src: "/wireframes/05-teams-hierarchy-wireframe.png", title: "Teams — Hierarchy" },
];

function Wireframes() {
  useLenis();
  return (
    <main className="relative min-h-screen bg-background text-foreground grain">
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "var(--gradient-glow)" }} />

      <header className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-8 md:px-12">
        <Link to="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground transition hover:text-foreground">
          <ArrowLeft size={14} /> Apex
        </Link>
        <Link to="/app" className="text-xs uppercase tracking-[0.3em] text-muted-foreground transition hover:text-foreground">
          Open prototype →
        </Link>
      </header>

      <section className="relative mx-auto max-w-6xl px-6 pb-24 md:px-12">
        <motion.p
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="text-[11px] uppercase tracking-[0.5em] text-primary"
        >
          Workflow · v0.1
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-3 font-display display-tight text-5xl md:text-7xl"
        >
          Wireframes &<br /><span className="italic text-primary">workflows.</span>
        </motion.h1>
        <p className="mt-6 max-w-2xl text-muted-foreground">
          Hand-drawn sketches of the core screens — login, admin home, member home,
          event detail (member view), and team hierarchy. A Mermaid flow diagram is
          attached at the end.
        </p>

        <div className="mt-16 space-y-20">
          {FRAMES.map((f, i) => (
            <motion.figure
              key={f.src}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.05 }}
              className="group overflow-hidden rounded-2xl border border-border bg-surface/40 shadow-[var(--shadow-sculpt)] backdrop-blur-md"
            >
              <div className="flex items-center justify-between border-b border-border px-6 py-4">
                <p className="font-display text-xl">{f.title}</p>
                <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  0{i + 1} / 0{FRAMES.length}
                </span>
              </div>
              <div className="relative aspect-[16/9] overflow-hidden bg-[oklch(0.95_0.02_80)]">
                <img src={f.src} alt={f.title} loading="lazy" className="size-full object-cover transition duration-700 group-hover:scale-[1.02]" />
              </div>
            </motion.figure>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-dashed border-border-strong/50 bg-surface/30 p-8 text-center backdrop-blur-md">
          <p className="text-[11px] uppercase tracking-[0.35em] text-primary">Mermaid flow</p>
          <p className="mt-2 font-display text-2xl">platform-flow.mmd</p>
          <p className="mt-3 text-sm text-muted-foreground">
            End-to-end navigation flow including role-based branching and event eligibility — delivered as a Mermaid file alongside this prototype.
          </p>
        </div>
      </section>
    </main>
  );
}