import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Role } from "@/data/mock";

type SessionState = {
  role: Role;
  signedIn: boolean;
  setRole: (r: Role) => void;
  signIn: (r: Role) => void;
  signOut: () => void;
};

const SessionContext = createContext<SessionState | null>(null);
const KEY = "apex.session.v1";

export function SessionProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<Role>("admin");
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" && window.localStorage.getItem(KEY);
      if (raw) {
        const v = JSON.parse(raw);
        if (v.role) setRoleState(v.role);
        if (typeof v.signedIn === "boolean") setSignedIn(v.signedIn);
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(KEY, JSON.stringify({ role, signedIn }));
    } catch {}
  }, [role, signedIn]);

  return (
    <SessionContext.Provider
      value={{
        role,
        signedIn,
        setRole: setRoleState,
        signIn: (r) => {
          setRoleState(r);
          setSignedIn(true);
        },
        signOut: () => setSignedIn(false),
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession must be used inside SessionProvider");
  return ctx;
}