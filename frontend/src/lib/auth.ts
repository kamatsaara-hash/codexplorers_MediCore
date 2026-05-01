import { api } from "./api";

export type Role = "admin" | "doctor" | "patient";

const KEY = "medicore.session";

export interface Session {
  role: Role;
  email: string;
  name?: string;
}

export const auth = {
  async login(email: string, password: string, role: Role) {
    const res = await api.login(email, password, role);

    const session: Session = {
      role: res.role as Role,
      email: res.email,
      name: (res as any).name || "User",
    };

    localStorage.setItem(KEY, JSON.stringify(session));
    return session;
  },

  get(): Session | null {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? (JSON.parse(raw) as Session) : null;
    } catch {
      return null;
    }
  },

  logout() {
    localStorage.removeItem(KEY);
  },
};

export const ROLE_META: Record<Role, { label: string; tagline: string; color: string }> = {
  admin: { label: "Administrator", tagline: "System command & oversight", color: "from-cyan-400 to-blue-500" },
  doctor: { label: "Doctor", tagline: "Patient care & diagnostics", color: "from-emerald-400 to-cyan-500" },
  patient: { label: "Patient", tagline: "Symptom analysis & care", color: "from-blue-400 to-violet-500" },
};