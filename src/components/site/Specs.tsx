import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

const ROWS = [
  ["Cupcakes", "12 daily", "rose · pistachio · salted caramel · matcha · velvet"],
  ["Layered cakes", "6 signatures", "ruffle · naked · entremet · mille-crêpe"],
  ["Macarons", "9 colours", "shells aged 24h · ganache cured 48h"],
  ["Éclairs", "By the half-dozen", "Madagascar chocolate · Tahitian vanilla · rose"],
  ["Bespoke", "From 14 days", "weddings · christenings · private orders"],
  ["Afternoon tea", "Wed–Sun", "three-tier · loose-leaf · Champagne option"],
  ["Boutiques", "Two", "Belgravia · Marylebone — 8 am to 7 pm"],
  ["Delivery", "Same-day", "Zone 1 · cream linen box · silk ribbon"],
];

export function Specs() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineWidth = useTransform(scrollYProgress, [0.1, 0.6], ["0%", "100%"]);

  return (
    <section id="pastries" ref={ref} className="relative border-t border-border bg-surface py-32 md:py-48">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="mb-20 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">04 — The menu</p>
            <h2 className="mt-6 font-display display-tight text-5xl font-light md:text-7xl">
              A vitrine,
              <br />
              <span className="italic">curated daily.</span>
            </h2>
          </div>
        </div>

        <div className="relative">
          <motion.div style={{ width: lineWidth }} className="absolute left-0 top-0 h-px bg-rose" />
          {ROWS.map(([k, v, n], i) => (
            <SpecRow key={k} k={k} v={v} n={n} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SpecRow({ k, v, n, i }: { k: string; v: string; n: string; i: number }) {
  const [hover, setHover] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group relative grid cursor-default grid-cols-12 items-baseline gap-4 border-b border-border py-8 transition-colors"
    >
      <motion.div
        animate={{ scaleX: hover ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ originX: 0 }}
        className="absolute inset-x-0 bottom-0 h-px bg-rose"
      />
      <span className="col-span-3 font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground md:col-span-2">
        {String(i + 1).padStart(2, "0")} · {k}
      </span>
      <span className="col-span-4 font-display text-3xl font-light md:col-span-3 md:text-5xl">
        {v}
      </span>
      <span className="col-span-5 text-right text-xs text-muted-foreground md:col-span-7 md:text-sm">
        {n}
      </span>
    </motion.div>
  );
}
