import { motion } from "framer-motion";

export function Marquee() {
  const items = ["Sapphire", "Titanium grade 5", "9-day cell", "128 Hz biometrics", "DLC coating", "Sub-vocal AI", "2.4 mm profile", "IP68"];
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
