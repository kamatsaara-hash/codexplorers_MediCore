import { useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Shield, Stethoscope, User, ArrowRight, Eye, EyeOff } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { AmbientBackground } from "@/components/AmbientBackground";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth, Role, ROLE_META } from "@/lib/auth";
import { toast } from "sonner";

const ICONS: Record<Role, any> = { admin: Shield, doctor: Stethoscope, patient: User };

const Login = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const role = (params.get("role") as Role) || "patient";
  const meta = ROLE_META[role];
  const Icon = ICONS[role];

  const [email, setEmail] = useState(role === "admin" ? "admin@medicore.ai" : role === "doctor" ? "aria.chen@medicore.ai" : "");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const name = useMemo(() => {
    if (!email) return meta.label;
    const local = email.split("@")[0].replace(/[._-]/g, " ");
    return local.replace(/\b\w/g, (c) => c.toUpperCase());
  }, [email, meta.label]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Enter email and password");
      return;
    }

    try {
      setLoading(true);

      await auth.login(email, password, role);

      toast.success(`Welcome back`);

      navigate(`/${role}`);
    } catch (err: any) {
      console.error(err);
      toast.error("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AmbientBackground />

      <header className="relative z-10 flex items-center justify-between px-6 py-5 md:px-10">
        <BrandLogo />
        <Link to="/" className="text-xs text-muted-foreground hover:text-primary transition">
          ← Change role
        </Link>
      </header>

      <main className="relative z-10 mx-auto flex max-w-md flex-col px-6 py-8">
        <div className="glass scanline relative overflow-hidden rounded-3xl p-8 animate-slide-up">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-2xl border border-primary/40 bg-primary/10 p-3 text-primary animate-pulse-glow">
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{meta.tagline}</div>
              <div className="font-display text-2xl font-bold">{meta.label} Sign In</div>
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@hospital.org" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={show ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShow((s) => !s)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1.5 text-muted-foreground hover:text-primary"
                >
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" disabled={loading} className="group w-full bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-glow">
              {loading ? "Authenticating…" : "Enter system"}
              <ArrowRight className="ml-1.5 h-4 w-4 transition group-hover:translate-x-0.5" />
            </Button>
          </form>

          {role === "patient" && (
            <div className="mt-6 text-center text-sm text-muted-foreground">
              New patient?{" "}
              <Link to="/auth/signup?role=patient" className="text-primary hover:underline">
                Create an account
              </Link>
            </div>
          )}
          {role !== "patient" && (
            <div className="mt-6 text-center text-xs text-muted-foreground">
              {role === "admin" ? "Administrator" : "Doctor"} accounts are provisioned by the hospital.
            </div>
          )}
        </div>

        <div className="mt-4 text-center text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          Secured · End-to-end encrypted
        </div>
      </main>
    </div>
  );
};

export default Login;
