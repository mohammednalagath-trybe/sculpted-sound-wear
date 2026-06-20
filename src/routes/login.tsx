import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSession } from "@/lib/session";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — Apex" }] }),
  component: LoginPage,
});

function LoginPage() {
  const { signIn } = useSession();
  const navigate = useNavigate();
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState(false);
  const [resend, setResend] = useState(60);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (step !== "otp") return;
    setResend(60);
    const id = setInterval(() => setResend((r) => (r > 0 ? r - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, [step]);

  const submitEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setStep("otp");
    setTimeout(() => inputs.current[0]?.focus(), 250);
  };

  const setDigit = (i: number, v: string) => {
    const d = v.replace(/\D/g, "").slice(-1);
    const next = [...otp];
    next[i] = d;
    setOtp(next);
    setError(false);
    if (d && i < 5) inputs.current[i + 1]?.focus();
  };

  const verify = (e?: React.FormEvent) => {
    e?.preventDefault();
    const code = otp.join("");
    if (code.length !== 6) return;
    // demo: any 6 digits except "000000" works; admins land on /app
    if (code === "000000") {
      setError(true);
      return;
    }
    // first character even? admin; else member — fun easter-egg routing for demo
    const isAdmin = Number(code[0]) % 2 === 0;
    signIn(isAdmin ? "admin" : "member");
    navigate({ to: "/app" });
  };

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-background text-foreground grain px-4">
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "var(--gradient-glow)" }} />

      <Link to="/" className="absolute left-6 top-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground transition hover:text-foreground">
        <ArrowLeft size={14} /> Back
      </Link>

      <div className="relative w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="rounded-2xl border border-border bg-surface/60 p-8 shadow-[var(--shadow-sculpt)] backdrop-blur-xl md:p-10"
        >
          <Link to="/" className="font-display text-3xl tracking-tight">
            Apex<span className="text-primary">.</span>
          </Link>
          <p className="mt-1 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">Sign in</p>

          <AnimatePresence mode="wait">
            {step === "email" ? (
              <motion.form
                key="email"
                onSubmit={submitEmail}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
                className="mt-10 space-y-6"
              >
                <div>
                  <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Email</label>
                  <div className="mt-2 flex items-center gap-2 rounded-md border border-border bg-background/50 px-3 py-2.5 focus-within:border-primary">
                    <Mail size={16} className="text-muted-foreground" />
                    <input
                      autoFocus
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@apex.team"
                      className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary py-3 text-sm font-medium text-primary-foreground transition hover:scale-[1.01]"
                >
                  Send one-time code
                  <ArrowRight size={14} className="transition group-hover:translate-x-1" />
                </button>
                <p className="text-center text-xs text-muted-foreground">
                  We'll email a 6-digit code. No password — ever.
                </p>
              </motion.form>
            ) : (
              <motion.form
                key="otp"
                onSubmit={verify}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="mt-10 space-y-6"
              >
                <div>
                  <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Code sent to {email}
                  </label>
                  <motion.div
                    animate={error ? { x: [0, -8, 8, -6, 6, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mt-3 flex justify-between gap-2"
                  >
                    {otp.map((d, i) => (
                      <input
                        key={i}
                        ref={(el) => { inputs.current[i] = el; }}
                        value={d}
                        onChange={(e) => setDigit(i, e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Backspace" && !otp[i] && i > 0) inputs.current[i - 1]?.focus();
                        }}
                        inputMode="numeric"
                        maxLength={1}
                        className={`size-12 rounded-md border bg-background/50 text-center font-display text-2xl outline-none transition focus:border-primary md:size-14 md:text-3xl ${error ? "border-destructive" : "border-border"}`}
                      />
                    ))}
                  </motion.div>
                  {error && <p className="mt-2 text-xs text-destructive">Code rejected. Try again.</p>}
                </div>
                <button
                  type="submit"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary py-3 text-sm font-medium text-primary-foreground transition hover:scale-[1.01]"
                >
                  Verify & continue
                  <ArrowRight size={14} className="transition group-hover:translate-x-1" />
                </button>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <button type="button" onClick={() => setStep("email")} className="underline-offset-4 hover:underline">
                    Change email
                  </button>
                  <span>
                    {resend > 0 ? (
                      <>Resend in <span className="font-mono text-foreground">00:{String(resend).padStart(2, "0")}</span></>
                    ) : (
                      <button type="button" onClick={() => setResend(60)} className="text-primary underline-offset-4 hover:underline">
                        Resend code
                      </button>
                    )}
                  </span>
                </div>
                <p className="text-center text-xs text-muted-foreground">
                  Demo: any 6 digits work. Codes starting with even digit → Admin, odd → Member. <span className="opacity-60">(000000 fails)</span>
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </main>
  );
}