import { useEffect, useState } from "react";
import { Activity, Pill, Stethoscope, Users } from "lucide-react";
import { MetricCard } from "@/components/MetricCard";
import { PageHeader } from "@/components/PageHeader";
import { api } from "@/lib/api";

type Overview = {
  totals: {
    doctors: number;
    patients: number;
    appointments: number;
  };
  system_status: {
    available_doctors: number;
    full_doctors: number;
  };
};

const AdminOverview = () => {
  const [data, setData] = useState<Overview | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔥 Fetch from backend
  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const res: Overview = await api.getAdminOverview();
        setData(res);
      } catch (err) {
        console.error("Failed to load overview:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOverview();
  }, []);

  if (loading) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  if (!data) {
    return <div className="p-6">Failed to load data</div>;
  }

  return (
    <div>
      <PageHeader
        title="Command Overview"
        subtitle="Real-time pulse of doctors, patients and pharmacy across the hospital."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          label="Doctors"
          value={data.totals.doctors}
          icon={Stethoscope}
          accent="primary"
        />

        <MetricCard
          label="Patients"
          value={data.totals.patients}
          icon={Users}
          accent="secondary"
        />

        <MetricCard
          label="Appointments"
          value={data.totals.appointments}
          icon={Activity}
          accent="accent"
        />

        <MetricCard
          label="Available Doctors"
          value={data.system_status.available_doctors}
          icon={Pill}
          accent="destructive"
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="glass rounded-2xl p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold">
              Live patient flow
            </h3>
            <span className="text-xs text-muted-foreground">Last 24h</span>
          </div>
          <Waveform />
        </div>

        <div className="glass rounded-2xl p-6">
          <h3 className="font-display text-lg font-semibold">
            System status
          </h3>

          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex justify-between">
              <span>Available Doctors</span>
              <span className="text-success">
                {data.system_status.available_doctors}
              </span>
            </li>

            <li className="flex justify-between">
              <span>Full Doctors</span>
              <span className="text-destructive">
                {data.system_status.full_doctors}
              </span>
            </li>
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

      <polyline
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="2"
        points={points}
      />

      <polygon fill="url(#wf)" points={`0,110 ${points} 480,110`} />
    </svg>
  );
};

export default AdminOverview;