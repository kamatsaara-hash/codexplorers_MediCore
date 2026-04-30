import { useNavigate } from "react-router-dom";
import { Shield, Stethoscope, User, ArrowRight } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { AmbientBackground } from "@/components/AmbientBackground";
import { Role, ROLE_META } from "@/lib/auth";

const ROLES: Array<{ id: Role; icon: any; gradient: string; bullets: string[] }> = [
  { id: "admin", icon: Shield, gradient: "from-cyan-400/30 to-blue-500/20", bullets: ["Doctors & patients", "Pharmacy inventory", "System overview"] },
  { id: "doctor", icon: Stethoscope, gradient: "from-emerald-400/30 to-cyan-500/20", bullets: ["Patient diagnostics", "Daily schedule (max 10)", "Prescription assist"] },
  { id: "patient", icon: User, gradient: "from-blue-400/30 to-violet-500/20", bullets: ["AI symptom check", "Medical reports", "Book appointments"] },
];

const RoleSelect = () => {
  const navigate = useNavigate();

  const choose = (role: Role) => navigate(`/auth/login?role=${role}`);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AmbientBackground />

      <header className="relative z-10 flex items-center justify-between px-6 py-5 md:px-10">
        <BrandLogo />
        <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
          AI Core online · v2.4
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-6 pt-10 pb-20">
        <div className="text-center mb-12 animate-slide-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Hospital Intelligence Platform
          </div>
          <h1 className="mt-5 font-display text-4xl md:text-6xl font-bold tracking-tight">
            Welcome to <span className="gradient-text">MediCore AI</span>
          </h1>
          <p className="mt-4 max-w-xl mx-auto text-muted-foreground">
            Select your role to access the secure command center for diagnostics, scheduling and care.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {ROLES.map((r, idx) => {
            const meta = ROLE_META[r.id];
            return (
              <button
                key={r.id}
                onClick={() => choose(r.id)}
                style={{ animationDelay: `${idx * 100}ms` }}
                className="glass group relative overflow-hidden rounded-2xl p-6 text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-glow animate-slide-up"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${r.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div className="rounded-xl border border-primary/30 bg-primary/10 p-3 text-primary transition-transform group-hover:scale-110">
                      <r.icon className="h-6 w-6" />
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground transition-all group-hover:text-primary group-hover:translate-x-1" />
                  </div>
                  <div className="mt-5">
                    <div className="font-display text-xl font-bold">{meta.label}</div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground mt-0.5">{meta.tagline}</div>
                  </div>
                  <ul className="mt-5 space-y-1.5 text-sm text-muted-foreground">
                    {r.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2">
                        <span className="h-1 w-1 rounded-full bg-primary" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-10 text-center text-xs text-muted-foreground">
          By continuing you agree to MediCore AI's clinical use policy.
        </div>
      </main>
    </div>
  );
};

export default RoleSelect;
