// Centralized API client for the FastAPI backend.
// Configure VITE_API_URL in your environment (e.g. http://localhost:8000).
const BASE_URL = (import.meta.env.VITE_API_URL as string) || "http://localhost:8000";

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
    max_per_day: number;
    available: boolean;
  }>;
}

export const api = {
  predict: (symptoms: string) =>
    request<PredictionResult>("/ai/predict", {
      method: "POST",
      body: JSON.stringify({ symptoms }),
    }),

  bookAppointment: (payload: { doctor_id: string; patient_email: string; date: string }) =>
    request<{ id: string; status: "booked" | "full" }>("/appointments", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  getProfile: (role: "admin" | "doctor" | "patient", email: string) =>
    request<UserProfile>(`/users/profile?role=${encodeURIComponent(role)}&email=${encodeURIComponent(email)}`),
};

export interface UserProfile {
  id?: string;
  role: "admin" | "doctor" | "patient";
  name: string;
  email: string;
  phone?: string;
  avatar_url?: string;
  joined_at?: string;
  // doctor
  specialization?: string;
  license_no?: string;
  experience_years?: number;
  patients_today?: number;
  max_per_day?: number;
  // patient
  age?: number;
  gender?: string;
  blood_group?: string;
  allergies?: string[];
  // admin
  department?: string;
  access_level?: string;
}

export const API_BASE_URL = BASE_URL;
