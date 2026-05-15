import { createFileRoute } from "@tanstack/react-router";
import { useLenis } from "@/hooks/useLenis";
import { Nav } from "@/components/site/Nav";
import { Cursor } from "@/components/site/Cursor";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { SoundViz } from "@/components/site/SoundViz";
import { Materials } from "@/components/site/Materials";
import { Specs } from "@/components/site/Specs";
import { CTA } from "@/components/site/CTA";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  useLenis();
  return (
    <main id="top" className="relative bg-background text-foreground">
      <Cursor />
      <Nav />
      <Hero />
      <Marquee />
      <SoundViz />
      <Materials />
      <Specs />
      <CTA />
      <Footer />
    </main>
  );
}
