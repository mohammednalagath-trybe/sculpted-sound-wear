import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

/* Smooth-scroll, made edible.
 * A vertical ribbon of buttercream is piped down the right edge as you scroll.
 * The rosette (a tiny SVG cupcake top) rides the Lenis-smoothed scroll position,
 * while macaron / éclair / cake markers light up as each section passes.
 */

const STOPS = [
  { id: "atelier", label: "Atelier", glyph: "rosette" as const },
  { id: "cupcakes", label: "Cupcakes", glyph: "cupcake" as const },
  { id: "cakes", label: "Cakes", glyph: "cake" as const },
  { id: "pastries", label: "Pastries", glyph: "macaron" as const },
  { id: "reserve", label: "Reserve", glyph: "cherry" as const },
];

export function ScrollPastry() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  // Ribbon height fills from 0 → 100% as you scroll.
  const ribbonScaleY = progress;
  // The rosette icon's vertical position (0–100% of the rail height).
  const yPct = useTransform(progress, (p) => `${p * 100}%`);

  // Gentle "piping" wobble while scrolling.
  const [scrolling, setScrolling] = useState(false);
  useEffect(() => {
    let t: number | undefined;
    const onScroll = () => {
      setScrolling(true);
      window.clearTimeout(t);
      t = window.setTimeout(() => setScrolling(false), 180);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(t);
    };
  }, []);

  const [active, setActive] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const mid = window.innerHeight * 0.4;
      let idx = 0;
      STOPS.forEach((s, i) => {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= mid) idx = i;
      });
      setActive(idx);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <aside
      aria-hidden="true"
      className="pointer-events-none fixed right-4 top-1/2 z-40 hidden h-[60vh] -translate-y-1/2 md:flex"
    >
      <div className="relative flex h-full w-10 flex-col items-center">
        {/* The rail — a pale ribbon of icing */}
        <div className="relative h-full w-[3px] overflow-hidden rounded-full bg-foreground/8">
          <motion.div
            style={{ scaleY: ribbonScaleY, transformOrigin: "top", background: "var(--gradient-rose)" }}
            className="absolute inset-0 rounded-full"
          />
        </div>

        {/* Section markers */}
        <ul className="pointer-events-auto absolute inset-y-0 left-1/2 -translate-x-1/2 flex flex-col justify-between py-1">
          {STOPS.map((s, i) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="group relative flex h-5 w-5 items-center justify-center"
                aria-label={`Jump to ${s.label}`}
              >
                <Glyph kind={s.glyph} active={i <= active} />
                <span className="absolute right-7 whitespace-nowrap rounded-full bg-foreground/90 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.25em] text-background opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {s.label}
                </span>
              </a>
            </li>
          ))}
        </ul>

        {/* The travelling rosette — rides the smoothed scroll */}
        <motion.div
          style={{ top: yPct }}
          className="pointer-events-none absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <motion.div
            animate={{
              scale: scrolling ? 1.15 : 1,
              rotate: scrolling ? [0, -6, 6, 0] : 0,
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Rosette />
          </motion.div>
          <motion.div
            animate={{ opacity: scrolling ? 0.7 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute left-1/2 top-full h-6 w-[2px] -translate-x-1/2 rounded-full"
            style={{ background: "var(--gradient-rose)" }}
          />
        </motion.div>
      </div>
    </aside>
  );
}

function Rosette() {
  // A small piped-buttercream rosette, drawn as concentric swirls.
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <defs>
        <radialGradient id="rose-grad" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="oklch(0.95 0.04 20)" />
          <stop offset="60%" stopColor="oklch(0.82 0.09 20)" />
          <stop offset="100%" stopColor="oklch(0.68 0.12 15)" />
        </radialGradient>
      </defs>
      <circle cx="11" cy="11" r="9.5" fill="url(#rose-grad)" stroke="oklch(0.22 0.03 30 / 0.25)" strokeWidth="0.6" />
      <path d="M11 4.5 C 14 6, 16 8, 16.5 11 C 14.5 10, 13 9.5, 11 9.5 C 9 9.5, 7.5 10, 5.5 11 C 6 8, 8 6, 11 4.5 Z"
            fill="oklch(0.98 0.02 20 / 0.55)" />
      <circle cx="11" cy="11" r="2.2" fill="oklch(0.74 0.12 75)" />
      <circle cx="11" cy="11" r="0.8" fill="oklch(0.32 0.04 30)" />
    </svg>
  );
}

function Glyph({ kind, active }: { kind: "rosette" | "cupcake" | "cake" | "macaron" | "cherry"; active: boolean }) {
  const fill = active ? "var(--rose)" : "oklch(0.22 0.03 30 / 0.25)";
  const stroke = active ? "oklch(0.22 0.03 30 / 0.6)" : "oklch(0.22 0.03 30 / 0.3)";
  const common = { fill, stroke, strokeWidth: 0.6 } as const;
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" className="transition-all">
      {kind === "rosette" && <circle cx="6" cy="6" r="3" {...common} />}
      {kind === "cupcake" && (
        <>
          <path d="M2.5 7 L 9.5 7 L 8.5 11 L 3.5 11 Z" {...common} />
          <circle cx="6" cy="5" r="2.5" {...common} />
        </>
      )}
      {kind === "cake" && (
        <>
          <rect x="2" y="6" width="8" height="4.5" rx="0.5" {...common} />
          <path d="M2 6 Q 6 3.5 10 6" {...common} fill="none" />
          <circle cx="6" cy="3" r="0.7" fill="oklch(0.74 0.12 75)" />
        </>
      )}
      {kind === "macaron" && (
        <>
          <ellipse cx="6" cy="4.5" rx="3.5" ry="1.8" {...common} />
          <ellipse cx="6" cy="7.5" rx="3.5" ry="1.8" {...common} />
          <rect x="2.5" y="5.7" width="7" height="1.1" fill="oklch(0.98 0.03 20)" stroke={stroke as string} strokeWidth="0.4" />
        </>
      )}
      {kind === "cherry" && (
        <>
          <circle cx="5" cy="8.5" r="2" {...common} />
          <circle cx="8" cy="8.5" r="2" {...common} />
          <path d="M5 6.5 Q 6.5 3 8 6.5" stroke="oklch(0.45 0.08 140)" strokeWidth="0.7" fill="none" />
        </>
      )}
    </svg>
  );
}