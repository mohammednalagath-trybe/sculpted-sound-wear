import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutGrid,
  Users2,
  UserPlus2,
  CalendarDays,
  Newspaper,
  Megaphone,
  FolderKanban,
  FileText,
  Images,
  Sparkles,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useLenis } from "@/hooks/useLenis";
import { useSession } from "@/lib/session";
import { superAdmin, currentMember } from "@/data/mock";

type NavItem = { to: string; label: string; icon: typeof LayoutGrid; admin?: boolean };

const NAV: NavItem[] = [
  { to: "/app", label: "Dashboard", icon: LayoutGrid },
  { to: "/app/teams", label: "Teams", icon: Users2 },
  { to: "/app/referrals", label: "Referrals", icon: UserPlus2 },
  { to: "/app/calendar", label: "Calendar", icon: CalendarDays, admin: true },
  { to: "/app/news", label: "News", icon: Newspaper },
  { to: "/app/updates", label: "Updates", icon: Megaphone },
  { to: "/app/projects", label: "Projects", icon: FolderKanban },
  { to: "/app/documents", label: "Documents", icon: FileText },
  { to: "/app/media", label: "Photos & Videos", icon: Images },
  { to: "/app/events", label: "Events", icon: Sparkles },
];

export function AppShell() {
  useLenis();
  const { role, setRole, signOut } = useSession();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const me = role === "admin" ? superAdmin : currentMember;
  const [mobileOpen, setMobileOpen] = useState(false);

  // close drawer on route change
  useEffect(() => setMobileOpen(false), [pathname]);

  const items = NAV.filter((n) => !n.admin || role === "admin");

  return (
    <div className="relative min-h-screen bg-background text-foreground grain">
      {/* Ambient gold glow */}
      <div aria-hidden className="pointer-events-none fixed inset-0 opacity-60" style={{ background: "var(--gradient-glow)" }} />

      {/* Top bar (mobile) */}
      <header className="lg:hidden sticky top-0 z-40 flex items-center justify-between border-b border-border bg-background/80 px-4 py-3 backdrop-blur-md">
        <Link to="/app" className="font-display text-xl tracking-tight">
          Apex<span className="text-primary">.</span>
        </Link>
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="rounded-md border border-border p-2 transition hover:border-primary/60 hover:text-primary"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </header>

      <div className="relative mx-auto flex max-w-[1500px]">
        {/* Sidebar — desktop */}
        <aside className="sticky top-0 hidden h-screen w-72 shrink-0 flex-col border-r border-border bg-surface/40 px-6 py-8 backdrop-blur-md lg:flex">
          <SidebarInner items={items} me={me} role={role} setRole={setRole} signOut={signOut} pathname={pathname} />
        </aside>

        {/* Sidebar — mobile drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 left-0 z-50 flex w-[88%] max-w-sm flex-col border-r border-border bg-surface/95 px-6 py-8 backdrop-blur-xl lg:hidden"
            >
              <SidebarInner items={items} me={me} role={role} setRole={setRole} signOut={signOut} pathname={pathname} />
            </motion.aside>
          )}
        </AnimatePresence>
        {mobileOpen && (
          <button
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm lg:hidden"
          />
        )}

        {/* Main */}
        <main className="relative min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function SidebarInner({
  items,
  me,
  role,
  setRole,
  signOut,
  pathname,
}: {
  items: NavItem[];
  me: typeof superAdmin;
  role: "admin" | "member";
  setRole: (r: "admin" | "member") => void;
  signOut: () => void;
  pathname: string;
}) {
  return (
    <>
      <Link to="/app" className="font-display text-3xl tracking-tight">
        Apex<span className="text-primary">.</span>
      </Link>
      <p className="mt-1 text-xs uppercase tracking-[0.3em] text-muted-foreground">Leadership platform</p>

      {/* Profile chip */}
      <Link
        to="/app/profile/$id"
        params={{ id: me.id }}
        className="group mt-8 flex items-center gap-3 rounded-lg border border-border bg-surface-elevated/60 p-3 transition hover:border-primary/50"
      >
        <img src={me.photo} alt={me.name} className="size-11 rounded-full ring-1 ring-primary/40" />
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{me.name}</p>
          <p className="truncate text-xs text-muted-foreground">{me.rank} · {me.userId}</p>
        </div>
      </Link>

      {/* Role switcher (prototype) */}
      <div className="mt-4 rounded-lg border border-dashed border-border-strong/50 p-2">
        <p className="px-1 pb-1 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Demo as</p>
        <div className="relative grid grid-cols-2 rounded-md bg-background/40 p-1 text-xs">
          <motion.span
            layout
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className="absolute inset-y-1 w-[calc(50%-4px)] rounded bg-primary"
            style={{ left: role === "admin" ? 4 : "calc(50% + 0px)" }}
          />
          <button
            onClick={() => setRole("admin")}
            className={`relative z-10 rounded py-1.5 font-medium transition ${role === "admin" ? "text-primary-foreground" : "text-muted-foreground"}`}
          >
            Super Admin
          </button>
          <button
            onClick={() => setRole("member")}
            className={`relative z-10 rounded py-1.5 font-medium transition ${role === "member" ? "text-primary-foreground" : "text-muted-foreground"}`}
          >
            Member
          </button>
        </div>
      </div>

      {/* Nav */}
      <nav className="mt-6 flex flex-col gap-0.5">
        {items.map((it) => {
          const active = pathname === it.to || (it.to !== "/app" && pathname.startsWith(it.to));
          const Icon = it.icon;
          return (
            <Link
              key={it.to}
              to={it.to}
              className="group relative flex items-center gap-3 rounded-md px-3 py-2 text-sm transition"
            >
              {active && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-md border border-primary/30 bg-primary/10"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <Icon
                size={16}
                className={`relative transition ${active ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`}
              />
              <span className={`relative transition ${active ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`}>
                {it.label}
              </span>
              {it.admin && (
                <span className="relative ml-auto rounded border border-primary/40 px-1.5 py-px text-[9px] uppercase tracking-widest text-primary/80">
                  admin
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-2 pt-6">
        <Link
          to="/wireframes"
          className="rounded-md border border-border px-3 py-2 text-center text-xs text-muted-foreground transition hover:border-primary/50 hover:text-foreground"
        >
          View wireframes
        </Link>
        <button
          onClick={signOut}
          className="flex items-center justify-center gap-2 rounded-md border border-border px-3 py-2 text-xs text-muted-foreground transition hover:border-destructive/50 hover:text-destructive"
        >
          <LogOut size={14} /> Sign out
        </button>
      </div>
    </>
  );
}