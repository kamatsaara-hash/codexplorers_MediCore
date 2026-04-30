// Lightweight client-side role/session store (UI-only, no real auth).
export type Role = "admin" | "doctor" | "patient";

const KEY = "medicore.session";

export interface Session {
  role: Role;
  name: string;
  email: string;
}

export const auth = {
  get(): Session | null {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? (JSON.parse(raw) as Session) : null;
    } catch {
      return null;
    }
  },
  set(s: Session) {
    localStorage.setItem(KEY, JSON.stringify(s));
  },
  clear() {
    localStorage.removeItem(KEY);
  },
};

export const ROLE_META: Record<Role, { label: string; tagline: string; color: string }> = {
  admin: { label: "Administrator", tagline: "System command & oversight", color: "from-cyan-400 to-blue-500" },
  doctor: { label: "Doctor", tagline: "Patient care & diagnostics", color: "from-emerald-400 to-cyan-500" },
  patient: { label: "Patient", tagline: "Symptom analysis & care", color: "from-blue-400 to-violet-500" },
};
