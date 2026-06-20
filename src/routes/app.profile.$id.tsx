import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Mail, Phone } from "lucide-react";
import { PageBody } from "@/components/app/PageHeader";
import { Reveal } from "@/components/app/Reveal";
import { findPerson, currentMember } from "@/data/mock";
import { useSession } from "@/lib/session";

export const Route = createFileRoute("/app/profile/$id")({
  component: Profile,
  notFoundComponent: () => (
    <div className="p-12">
      <p className="font-display text-3xl">Profile not found.</p>
      <Link to="/app/teams" className="mt-3 inline-block text-sm text-primary underline-offset-4 hover:underline">Back to teams</Link>
    </div>
  ),
});

function Profile() {
  const { id } = Route.useParams();
  const { role } = useSession();
  const person = findPerson(id);
  if (!person) throw notFound();

  // members can edit their own profile's L/R values
  const editable = role === "member" && person.id === currentMember.id;
  const [left, setLeft] = useState(person.leftBV);
  const [right, setRight] = useState(person.rightBV);

  return (
    <>
      <div className="border-b border-border px-6 py-6 md:px-12">
        <Link to="/app/teams" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground transition hover:text-foreground">
          <ArrowLeft size={14} /> Teams
        </Link>
      </div>

      <PageBody className="space-y-10">
        <Reveal>
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
            <img src={person.photo} alt={person.name} className="size-28 rounded-full ring-2 ring-primary/40 md:size-32" />
            <div className="min-w-0 flex-1">
              <p className="text-[11px] uppercase tracking-[0.3em] text-primary/80">{person.rank}</p>
              <h1 className="mt-1 font-display text-5xl tracking-tight md:text-6xl">{person.name}</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                {person.userId} · Tez ID {person.tezId} · Reporting into {person.leaderName}
              </p>
              <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5"><Phone size={13} /> {person.contact}</span>
                <span className="inline-flex items-center gap-1.5"><Mail size={13} /> {person.email}</span>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-2">
          <Reveal>
            <ValueCard label="Left business value" value={left} onChange={setLeft} editable={editable} />
          </Reveal>
          <Reveal delay={0.05}>
            <ValueCard label="Right business value" value={right} onChange={setRight} editable={editable} />
          </Reveal>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Reveal>
            <div className="rounded-xl border border-border bg-surface/60 p-6 backdrop-blur-md">
              <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">Current rank</p>
              <p className="mt-3 font-display text-3xl">{person.rank}</p>
              <p className="mt-1 text-sm text-muted-foreground">Reward: <span className="text-foreground">{person.reward}</span></p>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="rounded-xl border border-primary/40 bg-gradient-to-br from-primary/10 to-transparent p-6 backdrop-blur-md">
              <p className="text-[11px] uppercase tracking-[0.3em] text-primary/80">Upcoming rank</p>
              <p className="mt-3 font-display text-3xl">{person.upcomingRank}</p>
              <p className="mt-1 text-sm text-muted-foreground">Reward: <span className="text-foreground">{person.upcomingReward}</span></p>
            </div>
          </Reveal>
        </div>

        {editable && (
          <div className="rounded-xl border border-dashed border-primary/40 bg-primary/5 p-6 text-sm">
            You can update your own Left & Right values here. Rank and rewards are set by your super admin.
          </div>
        )}
      </PageBody>
    </>
  );
}

function ValueCard({
  label,
  value,
  onChange,
  editable,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  editable: boolean;
}) {
  return (
    <div className="rounded-xl border border-border bg-surface/60 p-6 backdrop-blur-md">
      <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">{label}</p>
      {editable ? (
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="mt-3 w-full bg-transparent font-display text-5xl outline-none focus:text-primary"
        />
      ) : (
        <p className="mt-3 font-display text-5xl">{value.toLocaleString()}</p>
      )}
      <p className="mt-2 text-[10px] uppercase tracking-widest text-muted-foreground">
        {editable ? "Editable by you" : "Read-only"}
      </p>
    </div>
  );
}