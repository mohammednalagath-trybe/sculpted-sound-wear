import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

const ROWS = [
  ["Mass", "3.6 g", "lighter than a paperclip"],
  ["Profile", "2.4 mm", "thinnest production wearable"],
  ["Battery", "9 days", "solid-state lithium-sulfur"],
  ["Sensors", "11", "PPG · ECG · SpO₂ · accel · skin temp"],
  ["Sample rate", "128 Hz", "continuous biometrics"],
  ["Water", "100 m", "ISO 22810"],
  ["Materials", "Ti / Al₂O₃", "grade 5 titanium · sapphire"],
  ["Connectivity", "BLE 5.4", "encrypted on-device"],
];

export function Specs() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineWidth = useTransform(scrollYProgress, [0.1, 0.6], ["0%", "100%"]);

  return (
    <section id="specs" ref={ref} className="relative border-t border-border bg-surface py-32 md:py-48">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="mb-20 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">04 — Specification</p>
            <h2 className="mt-6 font-display display-tight text-5xl font-light md:text-7xl">
              Every number,
              <br />
              <span className="italic">earned.</span>
            </h2>
          </div>
        </div>

        <div className="relative">
          <motion.div style={{ width: lineWidth }} className="absolute left-0 top-0 h-px bg-amber" />
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
        className="absolute inset-x-0 bottom-0 h-px bg-amber"
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
