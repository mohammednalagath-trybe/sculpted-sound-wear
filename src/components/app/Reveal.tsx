import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const variants: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "header" | "h1" | "h2" | "p" | "li";
}) {
  const Comp = motion[as] as any;
  return (
    <Comp
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={variants}
      transition={{ delay }}
      className={className}
    >
      {children}
    </Comp>
  );
}