const BASE_URL = (import.meta.env.VITE_API_URL as string) || "http://127.0.0.1:8000";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
    ...init,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API ${res.status}: ${text || res.statusText}`);
  }

  return res.json() as Promise<T>;
}

export interface PredictionResult {
  disease: string;
  severity: "low" | "medium" | "high";
  confidence: number;
  recommended_specialization: string;
  recommended_doctors: Array<{
    id: string;
    name: string;
    specialization: string;
    patients_today: number;
    available: boolean;
  }>;
}

// ------------------------
// 🔥 API METHODS
// ------------------------
export const api = {
  // ---------------- AUTH ----------------
  login: (email: string, password: string, role: string) =>
    request<{ role: string; email: string }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password, role }),
    }),

  signup: (data: {
    name: string;
    email: string;
    phone: string;
    age: number;
    gender: string;
    password: string;
  }) =>
    request("/auth/signup", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // ---------------- AI ----------------
  predict: (symptoms: string) =>
    request<PredictionResult>("/ai/predict", {
      method: "POST",
      body: JSON.stringify({ symptoms }),
    }),

  // ---------------- APPOINTMENTS ----------------
  bookAppointment: (payload: {
    doctor_id: string;
    patient_email: string;
    date: string;
  }) =>
    request<{ status: "booked" | "full" }>("/appointments", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  // ---------------- ADMIN ----------------
  getAdminOverview: () => request("/admin/overview"),
  getAdminDoctors: () => request("/admin/doctors"),
  getAdminPatients: () => request("/admin/patients"),
  getAdminPharmacy: () => request("/admin/pharmacy"),
  getAdminWorkload: () => request("/admin/workload"),

  // ---------------- GENERAL ----------------
  getDoctors: () => request("/doctors"),
  getPharmacy: () => request("/pharmacy"),
};

export const API_BASE_URL = BASE_URL;