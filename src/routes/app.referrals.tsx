import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { PageBody, PageHeader } from "@/components/app/PageHeader";
import { AdminOnly } from "@/components/app/AdminOnly";
import { members } from "@/data/mock";

export const Route = createFileRoute("/app/referrals")({
  component: Referrals,
});

function Referrals() {
  const refs = members.filter((m) => m.leg === "referrals");
  const total = refs.reduce((s, m) => s + m.leftBV + m.rightBV, 0);

  return (
    <>
      <PageHeader
        eyebrow="Referrals leg"
        title="Leaders you brought in."
        description="Members and leaders you personally recruited — your direct organisation."
        actions={
          <AdminOnly>
            <button className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-primary-foreground transition hover:scale-[1.02]">
              <Plus size={14} /> Invite referral
            </button>
          </AdminOnly>
        }
      />

      <PageBody className="space-y-8">
        <div className="grid gap-4 md:grid-cols-3">
          <Stat label="Active referrals" value={refs.length.toString()} />
          <Stat label="Combined BV" value={total.toLocaleString()} accent />
          <Stat label="Top rank" value={refs[0]?.rank ?? "—"} />
        </div>

        <div className="overflow-hidden rounded-2xl border border-border bg-surface/40 backdrop-blur-md">
          <header className="flex items-center justify-between border-b border-border px-6 py-4">
            <p className="font-display text-xl">Your referrals</p>
            <p className="text-xs text-muted-foreground">{refs.length} leaders</p>
          </header>
          <ul className="divide-y divide-border">
            {refs.map((m) => (
              <li key={m.id}>
                <Link
                  to="/app/profile/$id" params={{ id: m.id }}
                  className="grid grid-cols-[auto_1fr_auto] items-center gap-4 px-6 py-4 transition hover:bg-background/30 md:grid-cols-[auto_1fr_auto_auto]"
                >
                  <img src={m.photo} alt={m.name} className="size-12 rounded-full ring-1 ring-border" />
                  <div className="min-w-0">
                    <p className="truncate font-medium">{m.name}</p>
                    <p className="text-xs text-muted-foreground">{m.userId} · {m.contact}</p>
                  </div>
                  <span className="hidden rounded-full border border-primary/40 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-primary md:inline-block">
                    {m.rank}
                  </span>
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">BV</p>
                    <p className="font-mono text-sm">{(m.leftBV + m.rightBV).toLocaleString()}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </PageBody>
    </>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className={`rounded-xl border bg-surface/50 p-6 backdrop-blur-md ${accent ? "border-primary/40" : "border-border"}`}>
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className={`mt-3 font-display text-4xl ${accent ? "text-primary" : ""}`}>{value}</p>
    </div>
  );
}