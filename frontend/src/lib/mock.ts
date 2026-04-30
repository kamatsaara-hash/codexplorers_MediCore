// Mock data for the UI skeleton. Replace with FastAPI calls.
export const MOCK_DOCTORS = [
  { id: "d1", name: "Dr. Aria Chen", email: "aria.chen@medicore.ai", phone: "+1 415 555 0101", specialization: "Cardiology", patientsAssigned: 12, patientsToday: 7 },
  { id: "d2", name: "Dr. Marcus Vega", email: "marcus.vega@medicore.ai", phone: "+1 415 555 0102", specialization: "Neurology", patientsAssigned: 9, patientsToday: 10 },
  { id: "d3", name: "Dr. Lina Park", email: "lina.park@medicore.ai", phone: "+1 415 555 0103", specialization: "Pulmonology", patientsAssigned: 14, patientsToday: 4 },
  { id: "d4", name: "Dr. Owen Reyes", email: "owen.reyes@medicore.ai", phone: "+1 415 555 0104", specialization: "Dermatology", patientsAssigned: 6, patientsToday: 2 },
  { id: "d5", name: "Dr. Sana Iqbal", email: "sana.iqbal@medicore.ai", phone: "+1 415 555 0105", specialization: "General Medicine", patientsAssigned: 21, patientsToday: 9 },
];

export const MOCK_PATIENTS = [
  { id: "p1", name: "Jordan Blake", age: 34, gender: "M", disease: "Hypertension", doctorId: "d1", symptoms: "chest tightness, fatigue", severity: "medium" as const },
  { id: "p2", name: "Mei Tanaka", age: 27, gender: "F", disease: "Migraine", doctorId: "d2", symptoms: "throbbing headache, nausea", severity: "low" as const },
  { id: "p3", name: "Samir Khan", age: 52, gender: "M", disease: "Asthma flare", doctorId: "d3", symptoms: "wheezing, shortness of breath", severity: "high" as const },
  { id: "p4", name: "Elena Rossi", age: 41, gender: "F", disease: "Eczema", doctorId: "d4", symptoms: "itchy skin patches", severity: "low" as const },
  { id: "p5", name: "Diego Alvarez", age: 19, gender: "M", disease: "Flu", doctorId: "d5", symptoms: "fever, body ache", severity: "medium" as const },
  { id: "p6", name: "Naomi Park", age: 60, gender: "F", disease: "Arrhythmia", doctorId: "d1", symptoms: "palpitations", severity: "high" as const },
];

export const MOCK_PHARMACY = [
  { id: "m1", name: "Amoxicillin 500mg", quantity: 320, category: "Antibiotic" },
  { id: "m2", name: "Ibuprofen 200mg", quantity: 540, category: "NSAID" },
  { id: "m3", name: "Salbutamol Inhaler", quantity: 78, category: "Bronchodilator" },
  { id: "m4", name: "Atorvastatin 20mg", quantity: 12, category: "Statin" },
  { id: "m5", name: "Metformin 500mg", quantity: 240, category: "Antidiabetic" },
  { id: "m6", name: "Hydrocortisone Cream", quantity: 45, category: "Topical" },
  { id: "m7", name: "Paracetamol 500mg", quantity: 880, category: "Analgesic" },
];

export const MAX_PER_DAY = 10;

export function severityColor(s: "low" | "medium" | "high") {
  if (s === "low") return "text-success border-success/40 bg-success/10";
  if (s === "medium") return "text-warning border-warning/40 bg-warning/10";
  return "text-destructive border-destructive/40 bg-destructive/10";
}
