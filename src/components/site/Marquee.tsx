import { motion } from "framer-motion";

export function Marquee() {
  const items = [
    "Vanilla bean", "Tahitian", "Valrhona 70%", "Sicilian pistachio",
    "Madagascar", "Hand-piped", "Edible gold", "Buttercream rose",
    "Champagne ganache", "Fresh raspberry", "Brown butter", "Bourbon vanilla",
  ];
  return (
    <div className="marquee-mask overflow-hidden border-y border-border bg-surface py-6">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        className="flex gap-16 whitespace-nowrap font-display text-4xl italic text-cocoa md:text-6xl"
      >
        {[...items, ...items].map((s, i) => (
          <span key={i} className="flex items-center gap-16">
            {s}
            <span className="inline-block h-2 w-2 rounded-full bg-rose" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
