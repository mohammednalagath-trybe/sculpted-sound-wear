import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import cakeImg from "@/assets/cake-hero.jpg";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.35]);
  const yImg = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 80, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 80, damping: 20 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  const word = "smile".split("");

  return (
    <section id="atelier" ref={ref} className="relative min-h-[110vh] overflow-hidden grain">
      <motion.div style={{ opacity }} className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: "var(--gradient-glow)" }}
        />
      </motion.div>

      <motion.div
        style={{ scale, y: yImg, opacity, rotateX: rx, rotateY: ry, transformPerspective: 1400 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <img
          src={cakeImg}
          alt="A sculptural blush ruffle cake with gold leaf — Slice & Smile signature"
          width={1536}
          height={1536}
          className="h-[88vh] w-auto max-w-none object-contain drop-shadow-[0_40px_80px_oklch(0.4_0.08_20_/_0.35)]"
        />
      </motion.div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1600px] flex-col justify-between px-6 pb-20 pt-40 md:px-10 md:pt-48">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground"
        >
          Slice &amp; Smile — Pâtisserie, Belgravia &amp; Marylebone
        </motion.p>

        <div className="self-end text-right md:max-w-2xl">
          <h1 className="font-display display-tight text-[18vw] font-light leading-none md:text-[10vw]">
            Every bite
            <br />
            <span className="italic">a&nbsp;</span>
            <span className="italic">
              {word.map((c, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.6 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block"
                >
                  {c}
                </motion.span>
              ))}
            </span>
            <span className="text-rose">.</span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="mt-8 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground md:ml-auto"
          >
            A chic London bakery for creative cupcakes, fancy cakes and
            high-end pastries — piped, glazed and finished by hand each
            morning before the doors open.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="mt-16 flex items-end justify-between text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground"
        >
          <div className="flex flex-col gap-1">
            <span className="text-rose">●</span>
            <span>Scroll the vitrine</span>
          </div>
          <div className="hidden gap-12 md:flex">
            <div><div className="text-foreground text-2xl font-display">04:30</div><div>ovens on</div></div>
            <div><div className="text-foreground text-2xl font-display">42</div><div>daily creations</div></div>
            <div><div className="text-foreground text-2xl font-display">12yr</div><div>French training</div></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
