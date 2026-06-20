import { useSession } from "@/lib/session";
import type { ReactNode } from "react";

export function AdminOnly({ children, fallback = null }: { children: ReactNode; fallback?: ReactNode }) {
  const { role } = useSession();
  if (role !== "admin") return <>{fallback}</>;
  return <>{children}</>;
}

export function RoleBadge() {
  const { role } = useSession();
  return (
    <span className={`rounded-full border px-2.5 py-0.5 text-[10px] uppercase tracking-[0.2em] ${role === "admin" ? "border-primary/50 text-primary" : "border-accent/50 text-accent"}`}>
      {role === "admin" ? "Super Admin" : "Member"}
    </span>
  );
}