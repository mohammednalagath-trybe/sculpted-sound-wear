import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import titanium from "@/assets/material-titanium.jpg";
import exploded from "@/assets/exploded.jpg";

export function Materials() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const y1 = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const scaleImg = useTransform(scrollYProgress, [0, 1], [1.2, 1]);

  return (
    <section id="inside" ref={ref} className="relative overflow-hidden py-32 md:py-48">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="mb-24 max-w-3xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            03 — Materials & engineering
          </p>
          <h2 className="mt-6 font-display display-tight text-5xl font-light md:text-7xl">
            Forged from
            <br />
            <span className="italic text-amber">aerospace silence.</span>
          </h2>
        </div>

        <div className="grid gap-12 md:grid-cols-12">
          <motion.div style={{ y: y1 }} className="relative md:col-span-7">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-border">
              <motion.img
                style={{ scale: scaleImg }}
                src={titanium}
                alt="Brushed titanium and sapphire surface"
                width={1280}
                height={1600}
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 font-mono text-[10px] uppercase tracking-[0.3em]">
                <div className="text-amber">Grade 5 Ti / 6Al-4V</div>
                <div className="mt-1 text-muted-foreground">density 4.43 g/cm³</div>
              </div>
            </div>
          </motion.div>

          <motion.div style={{ y: y2 }} className="md:col-span-5 md:pt-32">
            <div className="space-y-16">
              <Spec n="01" t="Sapphire shell" d="Mohs 9 monocrystalline. Optically transparent to a 940 nm light pulse, opaque to scratches." />
              <Spec n="02" t="Pico-PCB stack" d="Six layers folded into a 1.1 mm cross-section. Hand-aligned in a Class 100 cleanroom." />
              <Spec n="03" t="Solid-state cell" d="Lithium-sulfur, no liquid electrolyte. 9-day median life, 1500 cycle warranty." />
              <Spec n="04" t="Skin contact" d="Hypoallergenic medical-grade DLC coating. Three discrete optical wells, never felt." />
            </div>
          </motion.div>
        </div>

        <div className="mt-32 grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4 md:pt-12">
            <h3 className="font-display text-3xl font-light md:text-5xl">
              Twenty-three<br />components.
            </h3>
            <p className="mt-6 max-w-sm text-sm text-muted-foreground">
              Every part — every screw, capacitor, thread — accounted for.
              Drag the timeline at the bottom of the page to disassemble.
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-8"
          >
            <img
              src={exploded}
              alt="Exploded view of internal components"
              width={1600}
              height={1280}
              loading="lazy"
              className="w-full rounded-sm border border-border"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Spec({ n, t, d }: { n: string; t: string; d: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="border-t border-border pt-8"
    >
      <div className="flex items-baseline gap-6">
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-amber">{n}</span>
        <h4 className="font-display text-2xl font-light">{t}</h4>
      </div>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">{d}</p>
    </motion.div>
  );
}
