import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { PageBody, PageHeader } from "@/components/app/PageHeader";
import { AdminOnly } from "@/components/app/AdminOnly";
import { members, superAdmin, RANKS } from "@/data/mock";

export const Route = createFileRoute("/app/teams")({
  component: Teams,
});

const LEGS = [
  { key: "support-a", label: "Support Leg A", caption: "Your first team" },
  { key: "support-b", label: "Support Leg B", caption: "Your second team" },
] as const;

function Teams() {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<"rank" | "bv">("bv");

  const grouped = useMemo(() => {
    const filter = (m: typeof members[number]) =>
      m.name.toLowerCase().includes(q.toLowerCase()) ||
      m.userId.toLowerCase().includes(q.toLowerCase());
    const cmp = (a: typeof members[number], b: typeof members[number]) =>
      sort === "bv"
        ? b.leftBV + b.rightBV - (a.leftBV + a.rightBV)
        : RANKS.indexOf(b.rank as any) - RANKS.indexOf(a.rank as any);
    return LEGS.map((l) => ({
      ...l,
      members: members.filter((m) => m.leg === l.key).filter(filter).sort(cmp),
    }));
  }, [q, sort]);

  return (
    <>
      <PageHeader
        eyebrow="Teams · Hierarchy"
        title="Your team, sculpted."
        description="Support legs grouped, not a genealogical tree. Click any leader to see their values and full profile."
        actions={
          <AdminOnly>
            <button className="group inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-primary-foreground transition hover:scale-[1.02]">
              <Plus size={14} /> Add member
            </button>
          </AdminOnly>
        }
      />

      <PageBody className="space-y-10">
        {/* Filters */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex w-full max-w-sm items-center gap-2 rounded-md border border-border bg-surface/50 px-3 py-2 backdrop-blur-md focus-within:border-primary">
            <Search size={14} className="text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name or User-ID"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
            />
          </div>
          <div className="inline-flex rounded-md border border-border p-1 text-xs">
            {(["bv", "rank"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSort(s)}
                className={`relative rounded px-3 py-1.5 capitalize transition ${sort === s ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                Sort by {s === "bv" ? "BV" : "rank"}
              </button>
            ))}
          </div>
        </div>

        {/* Top: super admin card */}
        <div className="rounded-2xl border border-primary/40 bg-gradient-to-br from-primary/10 to-transparent p-6 backdrop-blur-md">
          <p className="text-[10px] uppercase tracking-[0.3em] text-primary/80">Network founder</p>
          <div className="mt-3 flex flex-wrap items-center gap-4">
            <img src={superAdmin.photo} alt={superAdmin.name} className="size-14 rounded-full ring-2 ring-primary/50" />
            <div>
              <p className="font-display text-2xl">{superAdmin.name}</p>
              <p className="text-xs text-muted-foreground">{superAdmin.rank} · {superAdmin.userId}</p>
            </div>
            <div className="ml-auto grid grid-cols-2 gap-6 text-right">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Left BV</p>
                <p className="font-display text-xl">{superAdmin.leftBV.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Right BV</p>
                <p className="font-display text-xl">{superAdmin.rightBV.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Legs */}
        <div className="grid gap-6 lg:grid-cols-2">
          {grouped.map((leg) => {
            const left = leg.members.reduce((s, m) => s + m.leftBV, 0);
            const right = leg.members.reduce((s, m) => s + m.rightBV, 0);
            return (
              <motion.section
                key={leg.key}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="overflow-hidden rounded-2xl border border-border bg-surface/40 backdrop-blur-md"
              >
                <header className="flex items-center justify-between border-b border-border px-6 py-4">
                  <div>
                    <p className="font-display text-xl">{leg.label}</p>
                    <p className="text-xs text-muted-foreground">{leg.caption} · {leg.members.length} members</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Leg total</p>
                    <p className="font-display text-lg">{(left + right).toLocaleString()}</p>
                  </div>
                </header>
                <ul className="divide-y divide-border">
                  {leg.members.length === 0 && <li className="p-6 text-sm text-muted-foreground">No members match your search.</li>}
                  {leg.members.map((m) => (
                    <li key={m.id}>
                      <Link
                        to="/app/profile/$id" params={{ id: m.id }}
                        className="group flex items-center gap-4 px-6 py-4 transition hover:bg-background/30"
                      >
                        <img src={m.photo} alt={m.name} className="size-10 rounded-full ring-1 ring-border" />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">{m.name}</p>
                          <p className="truncate text-xs text-muted-foreground">{m.rank} · {m.userId}</p>
                        </div>
                        <div className="hidden text-right md:block">
                          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">BV</p>
                          <p className="font-mono text-sm">{(m.leftBV + m.rightBV).toLocaleString()}</p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.section>
            );
          })}
        </div>
      </PageBody>
    </>
  );
}