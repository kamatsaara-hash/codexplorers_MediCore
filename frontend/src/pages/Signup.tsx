import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, User } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { AmbientBackground } from "@/components/AmbientBackground";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { auth } from "@/lib/auth";
import { api } from "@/lib/api";
import { toast } from "sonner";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    password: "",
    confirm: "",
  });
  const [loading, setLoading] = useState(false);

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) return toast.error("Please fill required fields");
    if (form.password !== form.confirm) return toast.error("Passwords do not match");
    
    setLoading(true);
    try {
      // 1. Create account on backend
      await api.signup({
        name: form.name,
        email: form.email,
        phone: form.phone,
        age: parseInt(form.age) || 0,
        gender: form.gender,
        password: form.password,
      });

      // 2. Log in directly
      await auth.login(form.email, form.password, "patient");
      
      toast.success("Account created. Welcome!");
      navigate("/patient");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to create account");
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
          ← Home
        </Link>
      </header>

      <main className="relative z-10 mx-auto flex max-w-lg flex-col px-6 py-8">
        <div className="glass scanline relative overflow-hidden rounded-3xl p-8 animate-slide-up">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-2xl border border-primary/40 bg-primary/10 p-3 text-primary animate-pulse-glow">
              <User className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Patient onboarding</div>
              <div className="font-display text-2xl font-bold">Create your health profile</div>
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Full name *</Label>
              <Input id="name" value={form.name} onChange={update("name")} placeholder="Jane Doe" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="email">Email *</Label>
                <Input id="email" type="email" value={form.email} onChange={update("email")} placeholder="jane@email.com" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" value={form.phone} onChange={update("phone")} placeholder="+1 555 0100" />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="age">Age</Label>
                <Input id="age" type="number" min={0} value={form.age} onChange={update("age")} placeholder="32" />
              </div>
              <div className="space-y-1.5">
                <Label>Gender</Label>
                <Select value={form.gender} onValueChange={(v) => setForm({ ...form, gender: v })}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="nonbinary">Non-binary</SelectItem>
                    <SelectItem value="other">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="password">Password *</Label>
                <Input id="password" type="password" value={form.password} onChange={update("password")} placeholder="••••••••" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="confirm">Confirm *</Label>
                <Input id="confirm" type="password" value={form.confirm} onChange={update("confirm")} placeholder="••••••••" />
              </div>
            </div>

            <Button type="submit" disabled={loading} className="group w-full bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-glow">
              {loading ? "Creating profile…" : "Create account"}
              <ArrowRight className="ml-1.5 h-4 w-4 transition group-hover:translate-x-0.5" />
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Already registered?{" "}
            <Link to="/auth/login?role=patient" className="text-primary hover:underline">Sign in</Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Signup;
