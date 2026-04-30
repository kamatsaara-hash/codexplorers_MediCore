import { Activity, Pill, Stethoscope, Users } from "lucide-react";
import { MetricCard } from "@/components/MetricCard";
import { PageHeader } from "@/components/PageHeader";
import { MOCK_DOCTORS, MOCK_PATIENTS, MOCK_PHARMACY } from "@/lib/mock";

const AdminOverview = () => {
  const totalDoctors = MOCK_DOCTORS.length;
  const totalPatients = MOCK_PATIENTS.length;
  const activeAppts = MOCK_DOCTORS.reduce((s, d) => s + d.patientsToday, 0);
  const lowStock = MOCK_PHARMACY.filter((m) => m.quantity < 50).length;

  return (
    <div>
      <PageHeader
        title="Command Overview"
        subtitle="Real-time pulse of doctors, patients and pharmacy across the hospital."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="Doctors" value={totalDoctors} delta="+1 this week" icon={Stethoscope} accent="primary" />
        <MetricCard label="Patients" value={totalPatients} delta="+12 today" icon={Users} accent="secondary" />
        <MetricCard label="Active appointments" value={activeAppts} delta="across all clinics" icon={Activity} accent="accent" />
        <MetricCard label="Low-stock medicines" value={lowStock} delta="need restock" icon={Pill} accent="destructive" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="glass rounded-2xl p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold">Live patient flow</h3>
            <span className="text-xs text-muted-foreground">Last 24h</span>
          </div>
          <Waveform />
        </div>
        <div className="glass rounded-2xl p-6">
          <h3 className="font-display text-lg font-semibold">System status</h3>
          <ul className="mt-4 space-y-3 text-sm">
            {[
              { label: "AI Diagnostic Core", status: "online" },
              { label: "Pharmacy Sync", status: "online" },
              { label: "Scheduler", status: "online" },
              { label: "Backups", status: "idle" },
            ].map((s) => (
              <li key={s.label} className="flex items-center justify-between">
                <span className="text-foreground/80">{s.label}</span>
                <span className={`inline-flex items-center gap-1.5 text-xs ${s.status === "online" ? "text-success" : "text-muted-foreground"}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${s.status === "online" ? "bg-success animate-pulse" : "bg-muted-foreground"}`} />
                  {s.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const Waveform = () => {
  const points = Array.from({ length: 60 }, (_, i) => {
    const y = 50 + Math.sin(i / 3) * 18 + Math.cos(i / 6) * 10;
    return `${i * 8},${y}`;
  }).join(" ");
  return (
    <svg viewBox="0 0 480 110" className="mt-4 h-40 w-full">
      <defs>
        <linearGradient id="wf" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.5" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline fill="none" stroke="hsl(var(--primary))" strokeWidth="2" points={points} className="drop-shadow-[0_0_8px_hsl(var(--primary)/0.7)]" />
      <polygon fill="url(#wf)" points={`0,110 ${points} 480,110`} />
    </svg>
  );
};

export default AdminOverview;
