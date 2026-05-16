export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-16">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-12 px-6 md:flex-row md:items-end md:justify-between md:px-10">
        <div>
          <div className="flex items-center gap-2 font-display text-2xl">
            <span className="inline-block h-2 w-2 rounded-full bg-rose shadow-[0_0_12px_var(--rose)]" />
            Slice <span className="italic text-rose">&amp;</span> Smile
          </div>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            A chic London pâtisserie. Creative cupcakes, fancy cakes and
            high-end pastries, hand-finished in Belgravia.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-12 text-xs uppercase tracking-[0.2em] text-muted-foreground md:grid-cols-3">
          <div className="space-y-3">
            <div className="text-foreground">Boutique</div>
            <a className="block hover:text-foreground" href="#cupcakes">Cupcakes</a>
            <a className="block hover:text-foreground" href="#cakes">Cakes</a>
            <a className="block hover:text-foreground" href="#pastries">Pastries</a>
          </div>
          <div className="space-y-3">
            <div className="text-foreground">Maison</div>
            <a className="block hover:text-foreground" href="#">Our story</a>
            <a className="block hover:text-foreground" href="#">Pastry chefs</a>
            <a className="block hover:text-foreground" href="#">Press</a>
          </div>
          <div className="space-y-3">
            <div className="text-foreground">Visit</div>
            <a className="block hover:text-foreground" href="#">Belgravia</a>
            <a className="block hover:text-foreground" href="#">Marylebone</a>
            <a className="block hover:text-foreground" href="#">Contact</a>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-16 flex max-w-[1600px] items-center justify-between px-6 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground md:px-10">
        <span>© 2026 Slice &amp; Smile Pâtisserie Ltd</span>
        <span>Every bite, a smile.</span>
      </div>
    </footer>
  );
}
