import { Reveal } from "./Reveal";

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <header className="flex flex-col gap-6 border-b border-border px-6 py-12 md:px-12 md:py-16 lg:flex-row lg:items-end lg:justify-between">
      <div>
        {eyebrow && (
          <Reveal as="p" className="mb-3 text-[11px] uppercase tracking-[0.35em] text-primary/80">
            {eyebrow}
          </Reveal>
        )}
        <Reveal as="h1" delay={0.05} className="font-display text-4xl tracking-tight md:text-6xl display-tight text-balance">
          {title}
        </Reveal>
        {description && (
          <Reveal as="p" delay={0.12} className="mt-4 max-w-2xl text-pretty text-muted-foreground">
            {description}
          </Reveal>
        )}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </header>
  );
}

export function PageBody({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`px-6 py-10 md:px-12 md:py-14 ${className}`}>{children}</div>;
}