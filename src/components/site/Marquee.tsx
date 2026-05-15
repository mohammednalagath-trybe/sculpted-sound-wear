import { motion } from "framer-motion";

export function Marquee() {
  const items = ["Apple Watch", "Oura Ring", "Garmin", "Fitbit", "Whoop", "HRV", "Resting HR", "SpO₂", "Sleep stages", "Skin temp", "VO₂ max", "Recovery"];
  return (
    <div className="marquee-mask overflow-hidden border-y border-border bg-background py-6">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="flex gap-16 whitespace-nowrap font-display text-4xl italic text-muted-foreground md:text-6xl"
      >
        {[...items, ...items].map((s, i) => (
          <span key={i} className="flex items-center gap-16">
            {s}
            <span className="inline-block h-2 w-2 rounded-full bg-amber" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
